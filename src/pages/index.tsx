"use client"
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Code2, ArrowRight, Zap, Globe, Check, Cpu, Sparkles } from 'lucide-react';

const MaxWidthWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group relative bg-card/50 backdrop-blur-lg rounded-lg p-6 border border-border hover:border-primary/20 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-secondary-foreground" />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const features = [
  {
    icon: Terminal,
    title: 'Write Code',
    description: 'Write code in multiple programming languages with syntax highlighting and auto-completion.'
  },
  {
    icon: Zap,
    title: 'Run Instantly',
    description: 'Execute your code instantly with our powerful cloud-based compiler infrastructure.'
  },
  {
    icon: Globe,
    title: 'Custom Languages',
    description: 'Support for custom programming languages including BasicCode (bac) and more.'
  }
];

const benefits = [
  "Real-time compilation and execution",
  "Multiple programming language support",
  "Cloud-based infrastructure for speed",
  "Custom language integration capabilities"
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2 animate-pulse" style={{ filter: 'blur(100px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-chart-3 rounded-full mix-blend-multiply animate-blob" style={{ filter: 'blur(100px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-chart-4 rounded-full mix-blend-multiply animate-blob animation-delay-2000" style={{ filter: 'blur(100px)' }} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Terminal className="w-12 h-12 text-chart-1" />
                </motion.div>
                <Code2 className="w-12 h-12 text-chart-2" />
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary">
                Code. Compile. Create.
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                A powerful, browser-based IDE supporting multiple programming languages. Write, compile, and run code directly in your browser with real-time compilation.
              </p>

              <ul className="space-y-2 text-base/7 text-muted-foreground text-left flex flex-col items-start">
                {benefits.map((item, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <Check className="size-5 shrink-0 text-chart-1" />
                    {item}
                  </li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link 
                  to="/editor" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Start Coding Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12"
          >
            Powerful Features for Modern Development
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-t border-border">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10+', label: 'Programming Languages', icon: Code2 },
              { number: '100ms', label: 'Average Compile Time', icon: Cpu },
              { number: '99.9%', label: 'Service Uptime', icon: Sparkles }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-lg border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-chart-1" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
} 