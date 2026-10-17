import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AgXToneMapping,
  BackSide,
  BoxGeometry,
  type BufferGeometry,
  CanvasTexture,
  Color,
  type Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  type WebGLRenderer,
} from "three";

import { applyBlobShader, type BlobUniforms, createBlobUniforms } from "./blobShader";

/** Colores leídos de tokens.css para no duplicar la paleta en JavaScript. */
function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string) => new Color(styles.getPropertyValue(name).trim());
  return {
    bg: token("--color-bg"),
    surface: token("--color-surface"),
    primary: token("--color-primary"),
    accent: token("--color-accent"),
    text: token("--color-text"),
  };
}

type Palette = ReturnType<typeof readPalette>;

/**
 * Entorno de reflejos generado en código (sin HDRI externo): una sala oscura con
 * tiras de luz estrechas. Las tiras dan brillos nítidos al cromo y dibujan las
 * estrías del cristal; el azul y el violeta tiñen los laterales.
 */
function buildEnvironment(gl: WebGLRenderer, palette: Palette) {
  const room = new Scene();
  const disposables: { dispose: () => void }[] = [];

  const add = (geometry: BoxGeometry | PlaneGeometry, material: MeshBasicMaterial) => {
    disposables.push(geometry, material);
    const mesh = new Mesh(geometry, material);
    room.add(mesh);
    return mesh;
  };
  const emissive = (color: Color, intensity: number) =>
    new MeshBasicMaterial({ color: color.clone().multiplyScalar(intensity) });
  const strip = (
    width: number,
    height: number,
    color: Color,
    intensity: number,
    position: [number, number, number],
  ) => {
    const mesh = add(new PlaneGeometry(width, height), emissive(color, intensity));
    mesh.position.set(...position);
    mesh.lookAt(0, 0, 0);
  };

  add(
    new BoxGeometry(20, 20, 20),
    new MeshBasicMaterial({
      color: palette.surface.clone().multiplyScalar(3),
      side: BackSide,
    }),
  );

  // Softbox cenital amplio y contraluz bajo: dan el brillo nacarado al metal.
  strip(12, 4, palette.text, 4.5, [0, 7, 1]);
  strip(12, 1.2, palette.text, 3, [0, -6, -3]);
  // Paneles de color amplios: la iridiscencia tiñe lo que refleja.
  strip(4, 12, palette.primary, 5, [-7, 0, 2]);
  strip(4, 12, palette.accent, 5, [7, 1, -2]);
  strip(10, 3, palette.accent, 2.5, [0, -6, 4]);
  // Tiras verticales finas: filos nítidos en los lóbulos.
  strip(0.4, 12, palette.text, 6, [3.5, 0, 7]);
  strip(0.4, 12, palette.text, 4, [-4.5, 0, 6]);
  // Relleno frontal: el metal no se lee como un hueco negro.
  strip(10, 6, palette.text, 0.6, [0, -1, 9]);

  // Solo se conserva el mapa resultante; la sala auxiliar se libera al momento.
  const pmrem = new PMREMGenerator(gl);
  const target = pmrem.fromScene(room, 0.02);
  pmrem.dispose();
  disposables.forEach((item) => item.dispose());
  return target;
}

function StudioEnvironment({ palette }: { palette: Palette }) {
  const gl = useThree((state) => state.gl);
  const target = useMemo(() => buildEnvironment(gl, palette), [gl, palette]);

  useEffect(() => () => target.dispose(), [target]);

  return <primitive object={target.texture} attach="environment" />;
}

/**
 * Fondo de luz propio de la escena: el azul y el violeta del bloom, que se agota
 * en --color-bg. Al pintarlo el canvas, la escena en vivo y el render estático
 * (captura del mismo canvas) son idénticos; la máscara CSS de la capa funde los
 * bordes del canvas con la página.
 */
function buildBackdrop(palette: Palette) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const css = (color: Color, alpha = 1) =>
    `#${color.getHexString()}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;
  const glow = (x: number, y: number, radius: number, color: Color, alpha: number) => {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, css(color, alpha));
    gradient.addColorStop(1, css(color, 0));
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  };

  context.fillStyle = css(palette.bg);
  context.fillRect(0, 0, size, size);
  glow(size * 0.62, size * 0.4, size * 0.42, palette.accent, 0.32);
  glow(size * 0.38, size * 0.6, size * 0.42, palette.primary, 0.3);
  glow(size * 0.5, size * 0.5, size * 0.18, palette.text, 0.12);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function Backdrop({ palette }: { palette: Palette }) {
  const texture = useMemo(() => buildBackdrop(palette), [palette]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture ? <primitive object={texture} attach="background" /> : null;
}

const SPHERE_SEGMENTS: [number, number, number] = [1, 160, 120];

/** Calma y agitación: el hover interpola entre ambos estados. */
const CALM = { amplitude: 0.24, frequency: 0.7, speed: 0.2 };
const AGITATED = { amplitude: 0.34, frequency: 1.1, speed: 0.9 };
/** Radio de la forma respecto al lado del canvas, para detectar el hover. */
const HOVER_RADIUS = 0.24;
const MAX_TILT = MathUtils.degToRad(4);
const SPIN_SPEED = 0.06; // rad/s: deriva lenta además de la deformación

/**
 * Metaforma: esfera deformada por ruido que respira de forma constante, en metal
 * holográfico (cromo con iridiscencia de lámina fina). Con el puntero encima se
 * agita más; al salir vuelve a la calma.
 */
function Sculpture({
  palette,
  animate,
  interactive,
}: {
  palette: Palette;
  animate: boolean;
  /** Inclinación y agitación con el puntero (solo puntero fino). */
  interactive: boolean;
}) {
  const gl = useThree((state) => state.gl);
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh<BufferGeometry, MeshPhysicalMaterial>>(null);
  const pointer = useRef({ x: 0, y: 0, hover: false });
  const agitation = useRef(0);

  const material = useMemo(() => {
    const uniforms = createBlobUniforms();
    uniforms.uAmplitude.value = CALM.amplitude;
    uniforms.uFrequency.value = CALM.frequency;
    const value = new MeshPhysicalMaterial({
      color: palette.text,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [100, 1000],
      envMapIntensity: 1.6,
    });
    applyBlobShader(value, uniforms);
    // En userData para animarlos desde useFrame a través de la ref del mesh.
    value.userData.uniforms = uniforms;
    return value;
  }, [palette]);

  useEffect(() => () => material.dispose(), [material]);

  // El canvas no recibe eventos (pointer-events: none): se escucha la ventana y
  // se calcula si el puntero está sobre la forma con el rectángulo del canvas.
  useEffect(() => {
    if (!interactive) return;
    function onPointerMove(event: PointerEvent) {
      const rect = gl.domElement.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      pointer.current.hover = Math.hypot(dx, dy) < HOVER_RADIUS;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    function onPointerLeave() {
      pointer.current.hover = false;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [gl, interactive]);

  useFrame((_, delta) => {
    if (!animate || !mesh.current) return;
    const uniforms = mesh.current.material.userData.uniforms as BlobUniforms;
    const step = Math.min(delta, 0.1);

    // Sube rápido al entrar y se calma despacio al salir.
    const target = interactive && pointer.current.hover ? 1 : 0;
    const rate = target > agitation.current ? 3 : 0.8;
    agitation.current = MathUtils.lerp(
      agitation.current,
      target,
      1 - Math.exp(-step * rate),
    );
    const a = agitation.current;

    // El tiempo avanza a velocidad variable: la agitación no provoca saltos.
    uniforms.uTime.value += step * MathUtils.lerp(CALM.speed, AGITATED.speed, a);
    uniforms.uAmplitude.value = MathUtils.lerp(CALM.amplitude, AGITATED.amplitude, a);
    uniforms.uFrequency.value = MathUtils.lerp(CALM.frequency, AGITATED.frequency, a);

    if (!group.current) return;
    group.current.rotation.y += step * SPIN_SPEED;
    if (interactive) {
      const ease = 1 - Math.exp(-step * 2.5);
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * MAX_TILT,
        ease,
      );
      group.current.rotation.z = MathUtils.lerp(
        group.current.rotation.z,
        -pointer.current.x * MAX_TILT,
        ease,
      );
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} material={material}>
        <sphereGeometry args={SPHERE_SEGMENTS} />
      </mesh>
    </group>
  );
}

type HeroSceneProps = {
  className?: string;
  animate: boolean;
  /** Inclinación y agitación con el puntero: solo con puntero fino. */
  tilt: boolean;
  onReady: () => void;
  onContextLost: () => void;
};

export default function HeroScene({
  className,
  animate,
  tilt,
  onReady,
  onContextLost,
}: HeroSceneProps) {
  const palette = useMemo(() => readPalette(), []);

  return (
    <Canvas
      className={className}
      // Sin animación solo se renderiza al crear la escena o al redimensionar.
      frameloop={animate ? "always" : "demand"}
      // La transmisión añade un pase extra: se limita la densidad de píxeles.
      dpr={[1, 1.5]}
      // La forma ocupa ~50 % del lado: la máscara de bordes no la recorta.
      camera={{ position: [0, 0, 7.6], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        // AgX satura menos los blancos del cromo que el ACES por defecto.
        gl.toneMapping = AgXToneMapping;
        gl.toneMappingExposure = 1.4;
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
        onReady();
      }}
    >
      <Backdrop palette={palette} />
      <StudioEnvironment palette={palette} />
      <Sculpture palette={palette} animate={animate} interactive={tilt && animate} />
    </Canvas>
  );
}
