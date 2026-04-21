import * as React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Bot, 
  Workflow, 
  MessageSquare, 
  LineChart, 
  ArrowRight,
  Shield,
  Target,
  Sparkles,
  Users,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesGrid = () => {
  const services = [
    {
      title: "AI Tools Development",
      desc: "Custom software tailored to your operational needs.",
      icon: <Zap className="w-6 h-6 text-accent" />
    },
    {
      title: "AI Agents",
      desc: "Autonomous task-based & conversational intelligence.",
      icon: <Bot className="w-6 h-6 text-accent" />
    },
    {
      title: "AI Automation",
      desc: "Connect your stack with intelligent logical flows.",
      icon: <Workflow className="w-6 h-6 text-accent" />
    },
    {
      title: "Website Development",
      desc: "Premium, high-performance digital experiences.",
      icon: <Monitor className="w-6 h-6 text-accent" />
    },
    {
      title: "AI Integrated Web",
      desc: "Modern web experiences powered by LLMs.",
      icon: <MessageSquare className="w-6 h-6 text-accent" />
    },
    {
      title: "Workflow Optimization",
      desc: "Strategic analysis and restructuring of operations.",
      icon: <LineChart className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service, idx) => (
        <motion.div
          key={idx}
          variants={fadeIn}
          whileHover={{ y: -5 }}
          className="p-10 rounded-none border border-zinc-100 hover:border-black transition-all group bg-white shadow-sm hover:shadow-xl hover:shadow-black/[0.02]"
        >
          <div className="w-12 h-12 flex items-center justify-center mb-8 bg-zinc-50 border border-zinc-100 group-hover:bg-black group-hover:text-white transition-all transform group-hover:scale-110 duration-500">
            {service.icon}
          </div>
          <h3 className="text-xl font-extrabold mb-4 uppercase tracking-tight">{service.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium">{service.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const TeamSection = () => {
  const team = [
    {
      name: "Aditya",
      role: "Founder",
      desc: "Leads product vision and technical direction.",
      image: "/aditya.jpg" // REPLACE: Place aditya.jpg in public/ folder
    },
    {
      name: "Alex Reed",
      role: "Co-Founder",
      desc: "Focuses on operations and tactical scaling.",
      image: "/alex.jpg" // REPLACE: Place alex.jpg in public/ folder
    },
    {
      name: "Sarah Chen",
      role: "Creative Head",
      desc: "Handles branding and media presence.",
      image: "/sarah.jpg" // REPLACE: Place sarah.jpg in public/ folder
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-12"
    >
      {team.map((member, idx) => (
        <motion.div
          key={idx}
          variants={fadeIn}
          className="group"
        >
          <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-zinc-100 bg-zinc-100 relative group">
            {/* Local Image with Fallback */}
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 z-10 relative" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If image fails to load, we show the placeholder div behind it
                (e.target as HTMLImageElement).style.opacity = '0';
              }}
            />
            {/* Placeholder UI shown when image is missing */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-100 border-2 border-dashed border-zinc-200">
              <Users className="w-10 h-10 text-zinc-300 mb-4" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                Place {member.name.toLowerCase()}.jpg <br/> in public/ folder
              </p>
            </div>
          </div>
          <div className="pt-8 space-y-3">
            <Badge variant="outline" className="border-accent/20 text-accent uppercase tracking-widest text-[9px] font-bold">
              {member.role}
            </Badge>
            <h4 className="text-3xl font-extrabold uppercase tracking-tighter">{member.name}</h4>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-[240px]">{member.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function AboutPage() {
  const EMAIL = "opsiyss@gmail.com";

  return (
    <div className="min-h-screen bg-white text-[#0B0B0B] font-sans selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 sm:px-10 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-10 md:space-y-12"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="outline" className="rounded-full px-4 py-1 text-[10px] md:text-xs border-accent/20 text-accent bg-accent/5 backdrop-blur-sm">
                Efficiency Redefined
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.95] uppercase max-w-5xl"
            >
              We don’t just build tools. <br/>
              <span className="text-accent underline underline-offset-[12px] decoration-accent/10">We build experiences.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-zinc-500 max-w-2xl font-medium leading-relaxed"
            >
              OPSIYS is an AI automation agency focused on AI tools, agents, and high-performance digital systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-32 px-6 sm:px-10 border-y border-zinc-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-3">
               <span className="w-8 h-px bg-accent/20" /> Who We Are
            </h2>
            <div className="space-y-8 text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight uppercase">
              <p>We help businesses automate workflows using the cutting edge of <span className="text-accent">intelligence</span>.</p>
              <p className="text-zinc-300">Focusing on clarity, efficiency, and real impact.</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Shield />, label: "Structured", desc: "Predictable engineering" },
              { icon: <Sparkles />, label: "Reliable", desc: "24/7 autonomous ops" },
              { icon: <Target />, label: "Scalable", desc: "Built to grow" },
              { icon: <Users />, label: "Aligned", desc: "Human-centric AI" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-none border border-zinc-100 bg-white hover:border-black transition-all group"
              >
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-extrabold uppercase tracking-tight mb-2 text-lg">{item.label}</h4>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 sm:px-10 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-3">
                 <span className="w-8 h-px bg-zinc-200" /> Capabilities
              </h2>
              <p className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">Core Competencies</p>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm font-medium leading-relaxed border-l-2 border-zinc-100 pl-8">
              Every system is designed to eliminate operational friction and accelerate high-value output.
            </p>
          </div>
          
          <ServicesGrid />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 sm:px-10 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-3">
               <span className="w-8 h-px bg-accent/20" /> The Collective
            </h2>
            <p className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">Meet The Architects</p>
          </div>
          
          <TeamSection />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 sm:px-10 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
             <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] flex items-center justify-center gap-4">
               <span className="w-12 h-px bg-accent/20" /> The Creed
            </h2>
            <h2 className="text-5xl md:text-[100px] font-extrabold tracking-tight uppercase leading-[0.8] max-w-5xl">
              Most people build tools. <br/>
              <span className="text-zinc-200">We build outcomes.</span>
            </h2>
            <div className="h-px w-32 bg-zinc-100 mx-auto" />
            <p className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-zinc-400">
              Tools solve tasks. Great execution creates real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 sm:px-10 bg-[#0B0B0B] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.1]"
          >
            Let’s build something <br/> <span className="text-accent underline underline-offset-8 decoration-white/5">extraordinary.</span>
          </motion.h2>
          
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="lg" className="rounded-none px-16 py-9 bg-white text-black hover:bg-accent transition-all font-bold uppercase tracking-[0.3em] text-xs md:text-sm group shadow-2xl">
              Get in Touch <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer Mini */}
      <footer className="py-16 bg-white border-t border-zinc-100 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">
        &copy; 2026 OPSIYS Operational Logic.
      </footer>
    </div>
  );
}
