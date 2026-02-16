"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Mail } from "lucide-react";
import React, { useEffect, useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Let's Build Together
        </h2>
        <div className="h-1 w-20 bg-zinc-800 rounded-full mx-auto mb-12" />

        <div ref={contentRef}>
          <p className="text-zinc-400 text-lg mb-12">
            I'm currently open to new opportunities and collaborations. Whether
            you have a question or just want to say hi, I'll try my best to get
            back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a
              href="mailto:rakib@example.com"
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all w-full sm:w-auto justify-center group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>rakib@example.com</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all w-full sm:w-auto justify-center group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </div>

          <form
            className="max-w-md mx-auto space-y-4 text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="Tell me about your project..."
              />
            </div>
            <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
