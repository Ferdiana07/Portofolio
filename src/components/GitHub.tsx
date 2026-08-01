"use client";

import { motion } from "framer-motion";
import { Star, GitFork, GitCommit, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          let start: number;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`counter-${value}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span id={`counter-${value}`}>{count.toLocaleString()}</span>;
}

const stats = [
  { label: "Repositories", value: 42, icon: <GithubIcon size={28} />, color: "text-white", bg: "bg-white/10" },
  { label: "Total Stars", value: 128, icon: <Star size={28} />, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { label: "Forks", value: 35, icon: <GitFork size={28} />, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Contributions", value: 1450, icon: <GitCommit size={28} />, color: "text-green-400", bg: "bg-green-400/10" },
];

export default function GitHubStats() {
  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden bg-[#030610]">
      <div className="container mx-auto px-5 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
            >
              Open Source
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              GitHub <span className="text-gradient">Activity</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ originX: 0 }}
              className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://github.com/Ferdiana07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.06] border border-white/[0.12] text-sm font-semibold text-white hover:bg-white/[0.1] transition-all duration-300 self-start"
          >
            <GithubIcon size={18} />
            github.com/Ferdiana07
          </motion.a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tabular-nums mb-1">
                <AnimatedCounter value={stat.value} />
                {stat.value >= 1000 ? "+" : ""}
              </h3>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
