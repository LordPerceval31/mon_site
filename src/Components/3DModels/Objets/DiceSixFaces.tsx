import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import moiTexture from '../../../assets/moi.webp';

const DiceSixFaces: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Configuration de la scène
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, 
    });
    
    // Lumière
    const light = new THREE.PointLight(0xffffff, 5);
    light.position.set(0, 0, 2);
    scene.add(light);

    // Activer les pixels à haute densité
    renderer.setPixelRatio(window.devicePixelRatio);

    // Mise en place du renderer
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    
    // Création du dé
    const dice = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(moiTexture) })
    );
    scene.add(dice);
    
    // Positionnement de la caméra
    camera.position.z = 1.5;
    
    // Gestion du redimensionnement
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    // Observer le redimensionnement
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);
    
    // Boucle d'animation
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      dice.rotation.x += 0.001;
      dice.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Nettoyage
    return () => {
      cancelAnimationFrame(requestRef.current as number);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      
      // Libération des ressources
      (dice.geometry as THREE.BufferGeometry).dispose();
      (dice.material as THREE.Material).dispose();
      ((dice.material as THREE.MeshPhongMaterial).map as THREE.Texture)?.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default DiceSixFaces;