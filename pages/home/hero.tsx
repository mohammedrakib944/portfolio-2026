"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import MyImage from "@/assets/me.webp";
import Image from "next/image";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.035);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x52525b,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.x += mouseY * 0.005;
      particlesMesh.rotation.y += mouseX * 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0, rotateX: -10 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1 },
          "-=0.4",
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );

      // Scroll-based fade out for hero
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        opacity: 0,
      });

      // Floating animation for image
      if (innerImageRef.current) {
        gsap.to(innerImageRef.current, {
          y: -15,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Mouse dodging logic
      const handleMouseMove = (e: MouseEvent) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        const radius = 250; // Distance at which image starts moving

        if (distance < radius) {
          const angle = Math.atan2(distanceY, distanceX);
          const force = (radius - distance) / radius;
          const movement = force * 100; // Max displacement

          gsap.to(imageRef.current, {
            x: -Math.cos(angle) * movement,
            y: -Math.sin(angle) * movement - 7.5, // Subtracting half of float height to keep it roughly centered
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <div ref={imageRef} className="relative mx-auto inline-block mb-10">
          <div
            ref={innerImageRef}
            className="relative flex items-center justify-center w-[150px] h-[150px]"
          >
            <style>{`
    @keyframes spinCW {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes spinCCW {
      from { transform: rotate(360deg); }
      to   { transform: rotate(0deg); }
    }
    .wave-cw {
      animation: spinCW 8s linear infinite;
      transform-origin: center;
    }
    .wave-ccw {
      animation: spinCCW 12s linear infinite;
      transform-origin: center;
    }
  `}</style>

            {/* Primary wave ring */}
            <svg
              className="wave-cw absolute inset-0 w-full h-full"
              viewBox="0 0 220 220"
              fill="none"
            >
              <defs>
                <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M110 8
         C135 8, 165 22, 182 45
         C198 67, 214 80, 213 105
         C212 130, 198 148, 210 168
         C220 186, 214 205, 194 213
         C173 221, 150 218, 128 213
         C108 208, 95 220, 72 215
         C50 210, 26 203, 14 183
         C2 163, 8 140, 7 118
         C6 96, 2 74, 14 54
         C27 33, 52 14, 78 9
         C92 6, 100 8, 110 8Z"
                stroke="url(#wg1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Secondary counter wave ring */}
            <svg
              className="wave-ccw absolute inset-0 w-full h-full"
              viewBox="0 0 220 220"
              fill="none"
            >
              <defs>
                <linearGradient id="wg2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M110 14
         C130 12, 158 20, 175 40
         C192 60, 208 76, 207 100
         C206 124, 194 144, 205 165
         C215 183, 210 202, 191 211
         C171 220, 148 216, 127 211
         C107 207, 94 218, 72 213
         C51 208, 28 200, 17 181
         C5 162, 11 139, 10 118
         C9 97, 5 76, 18 57
         C31 37, 55 19, 80 13
         C93 10, 102 15, 110 14Z"
                stroke="url(#wg2)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Static base ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />

            {/* Image */}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{ inset: "16px" }}
            >
              <Image
                src={MyImage}
                className="w-full h-full object-cover"
                alt="My Image"
                width={188}
                height={188}
                priority
              />
            </div>
          </div>
        </div>

        <span
          ref={badgeRef}
          className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium mb-6"
        >
          <span className="size-2 animate-pulse bg-green-400 shadow shadow-green-400 rounded-full"></span>
          Available for opportunities
        </span>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 perspective-1000"
        >
          Md Rakibuzzaman
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-zinc-400 font-light mb-8 max-w-2xl mx-auto"
        >
          Frontend Software Engineer specializing in{" "}
          <span className="text-white font-medium">React</span>,{" "}
          <span className="text-white font-medium">TypeScript</span>, and{" "}
          <span className="text-white font-medium">Scalable Architecture</span>.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            View Projects <ChevronDown className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-transparent border border-zinc-700 text-white rounded-full font-medium hover:bg-zinc-900 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
