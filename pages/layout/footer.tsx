import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Md Rakibuzzaman. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
