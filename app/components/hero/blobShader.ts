import type { MeshPhysicalMaterial } from "three";

/**
 * Deformación orgánica para MeshPhysicalMaterial: desplaza cada vértice de una
 * esfera a lo largo de su normal con ruido simplex 3D animado y recalcula la
 * normal en la GPU (diferencias finitas), para que los reflejos sigan la forma.
 */

export type BlobUniforms = {
  uTime: { value: number };
  uAmplitude: { value: number };
  uFrequency: { value: number };
};

export function createBlobUniforms(): BlobUniforms {
  return {
    uTime: { value: 0 },
    uAmplitude: { value: 0 },
    uFrequency: { value: 0 },
  };
}

// Ruido simplex 3D de Ashima Arts / Stefan Gustavson (licencia MIT),
// github.com/ashima/webgl-noise. Prefijo `blob` para no chocar con three.js.
const SIMPLEX_NOISE = /* glsl */ `
vec3 blobMod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 blobMod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 blobPermute(vec4 x) { return blobMod289(((x * 34.0) + 10.0) * x); }
vec4 blobTaylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float blobNoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = blobMod289(i);
  vec4 p = blobPermute(blobPermute(blobPermute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 q0 = vec3(a0.xy, h.x);
  vec3 q1 = vec3(a0.zw, h.y);
  vec3 q2 = vec3(a1.xy, h.z);
  vec3 q3 = vec3(a1.zw, h.w);

  vec4 norm = blobTaylorInvSqrt(vec4(dot(q0, q0), dot(q1, q1), dot(q2, q2), dot(q3, q3)));
  q0 *= norm.x;
  q1 *= norm.y;
  q2 *= norm.z;
  q3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(q0, x0), dot(q1, x1), dot(q2, x2), dot(q3, x3)));
}
`;

// Dos octavas que derivan en direcciones distintas: la forma nunca se repite.
const DISPLACEMENT = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;

${SIMPLEX_NOISE}

float blobDisplace(vec3 p) {
  float base = blobNoise(p * uFrequency + vec3(0.6, 0.4, -0.5) * uTime);
  float detail = blobNoise(p * uFrequency * 1.9 - vec3(0.7) * uTime) * 0.12;
  return (base + detail) * uAmplitude;
}

// Sobre la esfera unitaria la normal de cada punto es su propia dirección.
vec3 blobPoint(vec3 p) {
  vec3 n = normalize(p);
  return n + n * blobDisplace(n);
}
`;

const NORMAL = /* glsl */ `
vec3 blobNormal = normalize(position);
vec3 blobTangent = normalize(cross(
  blobNormal,
  abs(blobNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)
));
vec3 blobBitangent = normalize(cross(blobNormal, blobTangent));
const float BLOB_EPSILON = 0.01;

vec3 blobPosition = blobPoint(position);
vec3 blobAlongTangent = blobPoint(position + blobTangent * BLOB_EPSILON) - blobPosition;
vec3 blobAlongBitangent = blobPoint(position + blobBitangent * BLOB_EPSILON) - blobPosition;

vec3 objectNormal = normalize(cross(blobAlongTangent, blobAlongBitangent));
#ifdef USE_TANGENT
  vec3 objectTangent = vec3(tangent.xyz);
#endif
`;

/** Inyecta la deformación en el shader estándar de three.js. */
export function applyBlobShader(material: MeshPhysicalMaterial, uniforms: BlobUniforms) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${DISPLACEMENT}`)
      .replace("#include <beginnormal_vertex>", NORMAL)
      .replace("#include <begin_vertex>", "vec3 transformed = blobPosition;");
  };
  material.customProgramCacheKey = () => "blob";
}
