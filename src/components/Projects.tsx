import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Bot, Brain, Globe, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExternalLinkLoader from "./ExternalLinkLoader";

const projects = [
  {
    id: 1,
    title: "Nalgirkar Brand Website",
    description: "Developed a professional brand website for Nalgirkar during TechLeaper internship, featuring responsive design, modern UI/UX, and optimized performance.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    icon: Globe,
    color: "from-blue-500 to-purple-500",
    size: "large",
    links: { demo: "https://amazonbrand.in/Nalgirkar", github: null },
    isClient: true
  },
  {
    id: 2,
    title: "TechMantra Website",
    description: "Created an engaging website for TechMantra during TechLeaper internship, implementing clean design principles and interactive elements.",
    tags: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
    icon: Globe,
    color: "from-purple-500 to-pink-500",
    size: "large",
    links: { demo: "https://amazonbrand.in/TechMantra", github: null },
    isClient: true
  },
  {
    id: 3,
    title: "AI Product Development",
    description: "Integrated AI features into production web applications using API-based AI responses and backend logic, focusing on performance and reliability.",
    tags: ["Python", "APIs", "Web Integration"],
    icon: Bot,
    color: "from-green-500 to-blue-500",
    size: "medium",
    links: { demo: "#", github: "#" }
  },
  {
    id: 4,
    title: "Tic Tac Toe Game",
    description: "Developed a graphical desktop game implementing game logic, window management, and event-driven input.",
    tags: ["C++", "SFML"],
    icon: Database,
    color: "from-orange-500 to-red-500",
    size: "medium",
    links: { demo: "#", github: "#" }
  },
];

const Projects = () => {
  const [loaderState, setLoaderState] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ""
  });

  const handleExternalLinkClick = (url: string) => {
    setLoaderState({ isOpen: true, url });
  };

  const handleLoaderComplete = () => {
    setLoaderState({ isOpen: false, url: "" });
  };

  return (
    <section id="projects" className="py-24 px-6">
      <ExternalLinkLoader
        isOpen={loaderState.isOpen}
        url={loaderState.url}
        onComplete={handleLoaderComplete}
      />
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
                  {project.isClient ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExternalLinkClick(project.links.demo)}
                      className="cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Client Website
                    </Button>
                  ) : (
                    <>
                      {project.links.demo !== "#" && (
                        <button
                          onClick={() => handleExternalLinkClick(project.links.demo)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </button>
                      )}
                      {project.links.github && project.links.github !== "#" && (
                        <button
                          onClick={() => handleExternalLinkClick(project.links.github!)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source</span>
                        </button>
                      )}
                    </>
                  )}
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