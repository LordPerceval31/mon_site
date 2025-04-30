import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import moiTexture from '../../../assets/moi.jpg';

const DiceSixFaces: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Setup
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const light: THREE.PointLight = new THREE.PointLight(0xffffff, 5);
    scene.add(light);
    
    mount.appendChild(renderer.domElement);
    
    // Create dice
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Correction du chargement de texture
    const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
    const texture: THREE.Texture = textureLoader.load(moiTexture);
    
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const dice: THREE.Mesh = new THREE.Mesh(geometry, material);
    scene.add(dice);
    
    // Position camera
    camera.position.z = 1.5;
    light.position.set(0, 0, 2);
    
    // Handle resize automatically
    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      const width: number = mount.clientWidth;
      const height: number = mount.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    });
    
    resizeObserver.observe(mount);
    
    // Initial sizing
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    
    // Animation loop
    const animate = (): void => {
      requestRef.current = requestAnimationFrame(animate);
      
      dice.rotation.x += 0.0005;
      dice.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
      
      resizeObserver.disconnect();
      
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default DiceSixFaces;