import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Rocket } from "lucide-react";

const experiences = [
  {
    year: "2024",
    title: "AI Developer Intern",
    organization: "Tech Innovation Lab",
    description: "Developed ML models for natural language processing and computer vision applications. Built production-ready APIs for AI services.",
    icon: Rocket,
    type: "work",
  },
  {
    year: "2023",
    title: "Hackathon Winner",
    organization: "National AI Challenge",
    description: "First place in AI/ML category for developing an intelligent document processing system using transformers.",
    icon: Award,
    type: "achievement",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    organization: "Freelance Projects",
    description: "Built responsive web applications for startups, implementing modern frontend frameworks and scalable backend solutions.",
    icon: Briefcase,
    type: "work",
  },
  {
    year: "2021",
    title: "B.E. Computer Engineering",
    organization: "University of Technology",
    description: "Specialized in Artificial Intelligence and Machine Learning with focus on deep learning architectures.",
    icon: GraduationCap,
    type: "education",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // MY JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and academic achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 rounded-full border-2 border-primary bg-background"
                  />
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div 
                    className="bento-card group"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Year badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-primary/20 text-primary">
                        {exp.year}
                      </span>
                      <div className={`p-2 rounded-lg ${
                        exp.type === "work" ? "bg-blue-500/20 text-blue-400" :
                        exp.type === "education" ? "bg-purple-500/20 text-purple-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-primary mb-3">{exp.organization}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;