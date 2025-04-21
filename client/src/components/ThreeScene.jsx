import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene({ texture = "unknown" }) {
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // 🔥 turn off AA if laggy
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // optimize for screens

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.objectFit = "contain";

    mount.appendChild(renderer.domElement);

    // 🌍 Planet setup
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial();
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // ✨ Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 🌌 Texture logic
    const fallback = new THREE.TextureLoader().load("/textures/unknown.png");
    const loader = new THREE.TextureLoader();
    const texturePath = `/textures/${(texture || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")}.png`;

    const planetTexture = loader.load(
      texturePath,
      () => {
        material.map = planetTexture;
        material.needsUpdate = true;
      },
      undefined,
      () => {
        console.warn(`❌ Texture not found: ${texturePath}. Using fallback.`);
        material.map = fallback;
        material.needsUpdate = true;
      }
    );

    // 🧭 Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;

    // 🧊 Throttle: cap to ~30FPS
    let lastFrameTime = 0;
    const desiredFPS = 30;
    const frameInterval = 1000 / desiredFPS;

    const animate = (time) => {
      const delta = time - lastFrameTime;
      if (delta >= frameInterval) {
        planet.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
        lastFrameTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // 🔇 Pause rendering if tab hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [texture]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "600px",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}

export default ThreeScene;
