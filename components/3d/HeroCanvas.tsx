"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Group ──────────────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    // Icosahedron solid
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x0a0a1a,
      emissive: 0x1a1040,
      emissiveIntensity: 0.8,
      shininess: 120,
      transparent: true,
      opacity: 0.95,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    group.add(ico);

    // Icosahedron wireframe (slightly larger)
    const wireGeo = new THREE.IcosahedronGeometry(1.84, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    // Outer glow shell
    const glowGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowMesh);

    // ── Orbiting rings ─────────────────────────────────────────────────────
    const buildRing = (
      count: number,
      radius: number,
      dotSize: number,
      colors: number[],
      rotX: number,
      rotZ: number
    ) => {
      const rg = new THREE.Group();
      rg.rotation.x = rotX;
      rg.rotation.z = rotZ;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const geo = new THREE.SphereGeometry(dotSize, 8, 8);
        const mat = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.9,
        });
        const dot = new THREE.Mesh(geo, mat);
        dot.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        rg.add(dot);
      }
      return rg;
    };

    const ring1 = buildRing(
      16,
      2.9,
      0.055,
      [0x6366f1, 0x8b5cf6, 0x06b6d4],
      Math.PI / 4,
      0
    );
    const ring2 = buildRing(
      10,
      2.5,
      0.04,
      [0x8b5cf6, 0xec4899],
      -Math.PI / 6,
      Math.PI / 3
    );
    const ring3 = buildRing(
      8,
      3.3,
      0.03,
      [0x06b6d4, 0x6366f1],
      Math.PI / 2.5,
      Math.PI / 5
    );
    group.add(ring1, ring2, ring3);

    // ── Particle field ─────────────────────────────────────────────────────
    const particleCount = window.innerWidth < 768 ? 600 : 1200;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xffffff),
    ];
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 40;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl1 = new THREE.PointLight(0x6366f1, 4, 20);
    pl1.position.set(5, 5, 5);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x8b5cf6, 3, 20);
    pl2.position.set(-5, -5, -4);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0x06b6d4, 2, 15);
    pl3.position.set(0, 6, -6);
    scene.add(pl3);

    // ── Mouse parallax ─────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let tX = 0;
    let tY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      tX += (mouseX - tX) * 0.04;
      tY += (mouseY - tY) * 0.04;

      group.rotation.y = t * 0.18 + tX * 0.5;
      group.rotation.x = tY * 0.25;

      ring1.rotation.z = t * 0.45;
      ring2.rotation.z = -t * 0.35;
      ring3.rotation.z = t * 0.28;

      // Pulse wireframe + glow
      wireMat.opacity = 0.35 + Math.sin(t * 1.8) * 0.2;
      glowMat.opacity = 0.03 + Math.sin(t * 1.2) * 0.015;
      pl1.intensity = 3 + Math.sin(t * 2) * 1;
      pl2.intensity = 2 + Math.cos(t * 1.5) * 0.8;

      particles.rotation.y = t * 0.015;
      particles.rotation.x = t * 0.008;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
