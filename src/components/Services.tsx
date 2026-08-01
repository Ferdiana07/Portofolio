"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Server, Cpu, PenTool, Webhook, Database } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Responsive, interactive, and beautiful frontend experiences using React and Next.js.",
    icon: MonitorSmartphone,
    gradient: "from-blue-400 to-primary",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Backend Development",
    description: "Scalable and secure backend services, RESTful APIs, and microservices architecture.",
    icon: Server,
    gradient: "from-purple-400 to-secondary",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "AI Integration",
    description: "Intelligent models, LLMs, and computer vision to build smart, next-gen applications.",
    icon: Cpu,
    gradient: "from-cyan-400 to-highlight",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Database Design",
    description: "Efficient schemas and SQL/NoSQL database management for performance and reliability.",
    icon: Database,
    gradient: "from-green-400 to-emerald-600",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and aesthetically pleasing interfaces that provide exceptional user experiences.",
    icon: PenTool,
    gradient: "from-pink-400 to-rose-500",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    title: "Automation & APIs",
    description: "Robust automation scripts and complex third-party API integration.",
    icon: Webhook,
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-5 md:px-12 relative z-10">

        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-highlight mb-3 font-semibold"
          >
            What I offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            My <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group p-6 md:p-8 rounded-2xl border bg-white/[0.03] backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 relative overflow-hidden ${service.bg}`}
              >
                {/* Background glow blob */}
                <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${service.gradient} blur-2xl opacity-15 group-hover:opacity-30 transition-opacity duration-500`} />

                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 relative">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed relative">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
