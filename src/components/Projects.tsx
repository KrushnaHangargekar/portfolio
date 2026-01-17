import { motion } from "framer-motion";
import { ExternalLink, Github, Bot, Brain, Globe, Database } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI Chatbot Platform",
    description: "Full-stack conversational AI platform with NLP capabilities, supporting multiple languages and custom training data.",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    icon: Bot,
    color: "from-purple-500 to-pink-500",
    size: "large",
    links: { demo: "#", github: "#" }
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "Interactive tool for visualizing deep learning architectures and training processes in real-time.",
    tags: ["TypeScript", "D3.js", "PyTorch"],
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    size: "medium",
    links: { demo: "#", github: "#" }
  },
  {
    id: 3,
    title: "Smart Analytics Dashboard",
    description: "Real-time data analytics platform with ML-powered insights and predictive modeling.",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    icon: Database,
    color: "from-pink-500 to-orange-500",
    size: "medium",
    links: { demo: "#", github: "#" }
  },
  {
    id: 4,
    title: "Web3 DApp Interface",
    description: "Decentralized application frontend with wallet integration and smart contract interactions.",
    tags: ["Next.js", "Ethers.js", "Solidity"],
    icon: Globe,
    color: "from-cyan-500 to-green-500",
    size: "large",
    links: { demo: "#", github: "#" }
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // FEATURED WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in AI, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bento-card relative overflow-hidden ${
                  project.size === "large" ? "md:col-span-1" : ""
                }`}
              >
                {/* Gradient background on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.links.demo}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.links.github}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-full h-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;