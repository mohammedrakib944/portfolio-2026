"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { EXPERIENCES } from "@/lib/home/constants";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll(".exp-item");

      items?.forEach((item, index) => {
        const isEven = index % 2 === 0;

        gsap.fromTo(
          item,
          {
            x: isEven ? -50 : 50,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
        );
      });

      // Animate timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
          scaleY: 1,
          transformOrigin: "top center",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 bg-black overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Experience
        </h2>
        <div className="h-1 w-20 bg-zinc-800 rounded-full mb-12 md:mb-20" />

        <div ref={itemsRef} className="space-y-12 relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800 md:-translate-x-1/2" />

          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className={`exp-item relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? "md:flex-row-reverse" : ""} group`}
            >
              {/* Timeline Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900 group-hover:bg-zinc-800 group-hover:border-zinc-500 transition-all duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                <div className="w-3 h-3 bg-zinc-500 rounded-full group-hover:bg-white transition-colors" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-900/30 p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-900/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    {exp.period}
                  </span>
                </div>
                <div className="text-zinc-400 font-medium mb-4">
                  {exp.company}
                </div>
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-500 leading-relaxed flex gap-2"
                    >
                      <span className="text-zinc-700 mt-1">›</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
