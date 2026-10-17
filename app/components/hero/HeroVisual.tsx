import {
  Component,
  lazy,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { usePrefersReducedMotion } from "~/lib/usePrefersReducedMotion";

import { HeroFallback } from "./HeroFallback";
import styles from "./HeroVisual.module.css";

// Three.js va en un chunk aparte: solo se descarga en el cliente, tras el montaje.
const HeroScene = lazy(() => import("./HeroScene"));

let sceneSupport: boolean | undefined;

/** Three.js requiere WebGL 2. Con ahorro de datos activo se usa el fallback. */
function supportsScene() {
  if (sceneSupport !== undefined) return sceneSupport;

  const { connection } = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (connection?.saveData) return (sceneSupport = false);

  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    sceneSupport = gl !== null;
  } catch {
    sceneSupport = false;
  }
  return sceneSupport;
}

const noopSubscribe = () => () => {};

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Punto único de decisión del visual del hero: escena 3D o composición estática.
 * El fallback se muestra durante la carga, sin WebGL, si la escena falla o se
 * pierde el contexto. Para sustituir el 3D por un render pre-producido basta
 * con cambiar este componente.
 */
export function HeroVisual({ className }: { className?: string }) {
  const canRenderScene = useSyncExternalStore(noopSubscribe, supportsScene, () => false);
  const reducedMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Detiene la animación cuando el hero sale de la pantalla.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const showScene = canRenderScene && !failed;
  const handleFailure = () => {
    setFailed(true);
    setReady(false);
  };

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-ready={showScene && ready}
      aria-hidden="true"
    >
      <HeroFallback className={`${styles.layer} ${styles.fallback}`} />
      {showScene && (
        <SceneBoundary onError={handleFailure}>
          <Suspense fallback={null}>
            <HeroScene
              className={`${styles.layer} ${styles.scene}`}
              animate={inView && !reducedMotion}
              onReady={() => setReady(true)}
              onContextLost={handleFailure}
            />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
