import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BackSide,
  BoxGeometry,
  Color,
  type Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  type WebGLRenderer,
} from "three";

/** Colores leídos de tokens.css para no duplicar la paleta en JavaScript. */
function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string) => new Color(styles.getPropertyValue(name).trim());
  return {
    surface: token("--color-surface"),
    primary: token("--color-primary"),
    accent: token("--color-accent"),
    text: token("--color-text"),
  };
}

type Palette = ReturnType<typeof readPalette>;

/**
 * Entorno de reflejos generado en código (sin HDRI externo): una sala oscura con
 * paneles emisivos azul, violeta y blanco que el metal y el cristal reflejan.
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

  add(
    new BoxGeometry(20, 20, 20),
    new MeshBasicMaterial({ color: palette.surface, side: BackSide }),
  );

  // Softbox superior y relleno frontal suave: definen la lectura del cromo.
  const key = add(new PlaneGeometry(10, 4), emissive(palette.text, 4));
  key.position.set(0, 7, 3);
  key.lookAt(0, 0, 0);

  const fill = add(new PlaneGeometry(8, 8), emissive(palette.text, 0.5));
  fill.position.set(0, 1, 9);
  fill.lookAt(0, 0, 0);

  const blue = add(new PlaneGeometry(5, 12), emissive(palette.primary, 3));
  blue.position.set(7, 0, 1);
  blue.lookAt(0, 0, 0);

  const violet = add(new PlaneGeometry(5, 12), emissive(palette.accent, 3));
  violet.position.set(-7, -1, -1);
  violet.lookAt(0, 0, 0);

  const rim = add(new PlaneGeometry(10, 1), emissive(palette.text, 1.5));
  rim.position.set(0, -6, -3);
  rim.lookAt(0, 0, 0);

  // Solo se conserva el mapa resultante; la sala auxiliar se libera al momento.
  const pmrem = new PMREMGenerator(gl);
  const target = pmrem.fromScene(room, 0.04);
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

/** Anillo de nudo cromado atravesando un cristal facetado. Giro lento y discreto. */
function Sculpture({ palette, animate }: { palette: Palette; animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.35, -0.4, 0.15]}>
      <mesh>
        <torusKnotGeometry args={[0.92, 0.24, 256, 32, 2, 3]} />
        <meshPhysicalMaterial
          color={palette.text}
          metalness={1}
          roughness={0.14}
          clearcoat={0.4}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh rotation={[0.6, 0.2, 0]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.12}
          ior={1.45}
          attenuationColor={palette.accent}
          attenuationDistance={4}
          clearcoat={1}
          iridescence={0.5}
          iridescenceIOR={1.3}
        />
      </mesh>
    </group>
  );
}

type HeroSceneProps = {
  className?: string;
  animate: boolean;
  onReady: () => void;
  onContextLost: () => void;
};

export default function HeroScene({
  className,
  animate,
  onReady,
  onContextLost,
}: HeroSceneProps) {
  const palette = useMemo(() => readPalette(), []);

  return (
    <Canvas
      className={className}
      // Sin animación solo se renderiza al crear la escena o al redimensionar.
      frameloop={animate ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
        onReady();
      }}
    >
      <StudioEnvironment palette={palette} />
      <Sculpture palette={palette} animate={animate} />
    </Canvas>
  );
}
