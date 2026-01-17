import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Python", "PHP", "JavaScript", "TypeScript"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "AI & Backend",
    skills: ["AI API Integration", "Serverless Functions", "Supabase", "Anthropic / LLM APIs"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Web Development",
    skills: ["HTML5", "CSS3", "React", "Responsive Design"],
    gradient: "from-pink-500 to-orange-500",
  },
  {
    title: "Databases",
    skills: ["MySQL", "Supabase (PostgreSQL)"],
    gradient: "from-cyan-500 to-green-500",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Netlify", "XAMPP"],
    gradient: "from-orange-500 to-yellow-500",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // TECHNICAL EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML, web development, and cloud technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bento-card group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${category.gradient}`} />
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Decorative gradient line */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;