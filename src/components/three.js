import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Box = () => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x00ff00} />
        </mesh>
    );
};

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight color={0xffffff} intensity={0.5} position={[1, 1, 1]} />
            <pointLight color={0xff0000} intensity={1} position={[5, 5, 5]} />
        </>
    );
};

const ThreeScene = () => {
    return (
        <Canvas>
            <Lights />
            <Box />
        </Canvas>
    );
};

export default ThreeScene;
