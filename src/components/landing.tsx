import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  #define PI 3.1415926535897932384626433832795

  void main() {
    vec3 light = vec3(0.5, 0.2, 1.0);
    light = normalize(light);
    float dProd = max(0.0, dot(vNormal, light));
    vec3 baseColor = vec3(0.0, 1.0, 0.0); // Green color
    
    // Latitude lines
    float latitudeLines = smoothstep(0.98, 1.0, abs(sin(vUv.y * PI * 20.0)));
    
    // Longitude lines
    float longitudeLines = smoothstep(0.98, 1.0, abs(sin(vUv.x * PI * 20.0)));
    
    // Combine latitude and longitude lines
    float gridLines = max(latitudeLines, longitudeLines);
    
    // Mix base color with grid lines
    vec3 finalColor = mix(baseColor * dProd, vec3(1.0), gridLines * 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
    
    // Add rim lighting
    float rimLight = 1.0 - max(dot(normalize(-vPosition), vNormal), 0.0);
    rimLight = smoothstep(0.716, 0.72, rimLight);
    gl_FragColor.rgb += rimLight * 0.3;
  }
`;

function Globe() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    color: { value: new THREE.Color(0x00ff00) }
                }}
            />
        </mesh>
    );
}

export default function Landing() {
    return (
        <div className="flex-auto pointer-events-none z-10 bg-black relative" style={{ width: '100%', height: '100vh' }}>
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 3, 5]} intensity={0.5} />
                <Globe />
            </Canvas>
        </div>
    );
}