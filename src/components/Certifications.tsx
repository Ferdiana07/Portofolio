"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const certs = [
  { title: "Code Generation and Optimization Using IBM Granite", issuer: "IBM Skillsbuild" },
  { title: "IBM Granite Models for Software Development", issuer: "IBM Skillsbuild" },
  { title: "Introduction to Large Language Model", issuer: "IBM Skillsbuild" },
  { title: "Build an AI Agent", issuer: "IBM Skillsbuild" },
  { title: "Database Design", issuer: "ORACLE" },
  { title: "Dasar AI", issuer: "DICODING" },
  { title: "Dasar Python", issuer: "DICODING" },
  { title: "Financial Literacy", issuer: "DICODING" },
  { title: "Dasar Machine Learning", issuer: "DICODING" },
  { title: "Visualisasi Data", issuer: "DICODING" },
  { title: "Introduction to Information Security Course", issuer: "Cyber Academy" },
  { title: "Training Legislative", issuer: "Universitas Dian Nuswantoro" },
];

export default function Certifications() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;
    
    // Create a smooth infinite scrolling effect
    const scroll = () => {
      if (!isHovered) {
        scrollPos += 1;
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section id="certifications" className="w-full py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Slider */}
      <div 
        className="relative w-full flex overflow-x-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left and Right gradients for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={scrollRef} 
          className="flex gap-6 px-32 whitespace-nowrap overflow-x-hidden pb-8"
          style={{ width: "fit-content" }}
        >
          {/* We duplicate the array to create a seamless loop */}
          {[...certs, ...certs].map((cert, idx) => (
            <div 
              key={`${cert.title}-${idx}`} 
              className="inline-block w-80 glass p-6 rounded-2xl flex-shrink-0 cursor-default hover:scale-105 hover:bg-white/5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/40 to-primary/40 rounded-full flex items-center justify-center text-white shadow-inner group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-shadow duration-300">
                  <Award size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-semibold text-white whitespace-normal line-clamp-2 leading-tight group-hover:text-highlight transition-colors">
                    {cert.title}
                  </h4>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 my-3" />
              <p className="text-xs text-muted font-medium tracking-wide uppercase">
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
