"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Layers, Terminal, Zap } from "lucide-react";
import React, { useEffect, useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        cardRef.current,
        { x: 50, opacity: 0, rotateY: 5 },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
            >
              About
            </h2>
            <div className="h-1 w-20 bg-zinc-800 rounded-full mb-12" />

            <div ref={contentRef}>
              <p className="text-lg text-zinc-400 leading-relaxed mb-6">
                I am a results-driven engineer with a passion for building
                digital products that are both performant and delightful. With
                experience spanning product companies and freelance delivery, I
                bring a unique blend of architectural rigor and startup agility.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                My core philosophy revolves around{" "}
                <span className="text-white">
                  performance-first development
                </span>
                . I don't just write code; I engineer solutions that scale,
                optimizing everything from bundle size to rendering cycles.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="stat-item">
                  <h4 className="text-3xl font-bold text-white mb-1">60+</h4>
                  <p className="text-sm text-zinc-500">Projects Delivered</p>
                </div>
                <div className="stat-item">
                  <h4 className="text-3xl font-bold text-white mb-1">97</h4>
                  <p className="text-sm text-zinc-500">Lighthouse Score</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={cardRef} className="relative perspective-1000">
            <div className="aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Terminal className="w-12 h-12 text-zinc-600 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Engineering Mindset
              </h3>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                  <span>
                    Obsessive about Core Web Vitals and runtime performance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    Advocate for component-driven architecture and design
                    systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>
                    Experienced in real-time systems (WebRTC, WebSockets).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
