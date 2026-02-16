"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { SKILLS } from "@/lib/home/constants";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".skill-card");

      gsap.fromTo(
        cards || [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Technical Arsenal
        </h2>
        <div className="h-1 w-20 bg-zinc-800 rounded-full mb-12 md:mb-20" />

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILLS.map((category) => (
            <div
              key={category.title}
              className="skill-card h-full p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 mb-4 group-hover:bg-zinc-700 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-zinc-400 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
