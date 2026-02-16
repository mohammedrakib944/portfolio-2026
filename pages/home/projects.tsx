"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Zap } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { PROJECTS } from "./constants";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".project-card");

      gsap.fromTo(
        cards || [],
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );

      // Hover effects via GSAP for smoother performance than CSS
      cards?.forEach((card) => {
        const overlay = card.querySelector(".card-overlay");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(overlay, { scaleX: 1, duration: 0.4, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(overlay, { scaleX: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Featured Projects
        </h2>
        <div className="h-1 w-20 bg-zinc-800 rounded-full mb-12 md:mb-20" />

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card group h-full flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative"
            >
              {/* Animated gradient line */}
              <div className="card-overlay absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600 transform scale-x-0 origin-left" />

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-zinc-400 mb-6 leading-relaxed flex-1">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-zinc-300">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    {project.metrics}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-zinc-400 bg-zinc-800 rounded-full border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
