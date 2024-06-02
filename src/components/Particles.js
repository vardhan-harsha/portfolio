import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
    const particlesRef = useRef();
    const boundingBoxSize = 500;

    useEffect(() => {
        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        //constant acceleration
        const sizes = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() * 2 - 1) * 500;
            const y = (Math.random() * 2 - 1) * 500;
            const z = (Math.random() * 2 - 1) * 500;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            velocities[i * 3] = (Math.random() - 0.5) * 0.5;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

            sizes[i * 3] = x;
            sizes[i * 3 + 1] = y;
            sizes[i * 3 + 2] = z;
        }

        particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesRef.current.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        particlesRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 3));
    }, []);

    useFrame(() => {
        const positions = particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.geometry.attributes.velocity.array;
        // const sizes = particlesRef.current.geometry.attributes.target.array;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];



            // Restrict particles within the bounding box
            if (positions[i] > boundingBoxSize) positions[i] = boundingBoxSize;
            if (positions[i] < -boundingBoxSize) positions[i] = -boundingBoxSize;
            if (positions[i + 1] > boundingBoxSize) positions[i + 1] = boundingBoxSize;
            if (positions[i + 1] < -boundingBoxSize) positions[i + 1] = -boundingBoxSize;
            if (positions[i + 2] > boundingBoxSize) positions[i + 2] = boundingBoxSize;
            if (positions[i + 2] < -boundingBoxSize) positions[i + 2] = -boundingBoxSize;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });



    return (
        <points
            ref={particlesRef}
        >
            <bufferGeometry attach="geometry" />
            <pointsMaterial attach="material" size={5} color="black" />
        </points>
    );
};

const ParticleSimulation = () => {
    return (
        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [100, 0, 0], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <Particles />
            <CameraHelperComponent />
            <OrbitControls minDistance={500} maxDistance={1500} />
        </Canvas>
    );
};

export default ParticleSimulation;


const CameraHelperComponent = () => {
    const { camera, scene } = useThree();
    const helperRef = useRef();

    useEffect(() => {
        const helper = new THREE.CameraHelper(camera);
        scene.add(helper);
        helperRef.current = helper;

        return () => {
            scene.remove(helper);
        };
    }, [camera, scene]);

    useFrame(() => {
        if (helperRef.current) {
            helperRef.current.update();
        }
    });

    return null;
};