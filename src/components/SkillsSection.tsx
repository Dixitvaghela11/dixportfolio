import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench,
  Globe,
  Settings,
  Layout,
  FileCode,
  Braces,
  GitBranch,
  Box,
  Workflow,
  PenTool,
  Layers,
  MonitorSmartphone
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode | string;
  proficiency: number;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode | string;
  skills: Skill[];
}

const SkillsSection = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      name: "Frontend Development",
      icon: <Layout className="w-8 h-8 text-blue-500" />,
      skills: [
        { name: "HTML5", icon: '/skills/html.svg', proficiency: 95 },
        { name: "CSS3", icon: '/skills/css.svg', proficiency: 90 },
        { name: "JavaScript", icon: '/skills/javascript.svg', proficiency: 80 },
        { name: "React.js", icon: '/skills/react.svg', proficiency: 85 },
        { name: "Vue.js", icon: '/skills/vue.svg', proficiency: 70 },
        { name: "Tailwind CSS", icon: '/skills/tailwind.svg', proficiency: 60 }
      ]
    },
    {
      name: "Backend Development",
      icon: <Server className="w-8 h-8 text-purple-500" />,
      skills: [
        { name: "PHP", icon: '/skills/php.svg', proficiency: 88 },
        { name: "Laravel", icon: '/skills/laravel.svg', proficiency: 85 },
        { name: "ASP.NET", icon: '/skills/dotnet.svg', proficiency: 80 },
        // { name: "Node.js", icon: '/skills/nodejs.svg', proficiency: 65 },
        // { name: "C#", icon: '/skills/csharp.svg', proficiency: 60 }
      ]
    },
    {
      name: "Database",
      icon: <Database className="w-8 h-8 text-blue-500" />,
      skills: [
        { name: "MySQL", icon: '/skills/mysql.svg', proficiency: 90 },
        { name: "PostgreSQL", icon: '/skills/postgresql.svg', proficiency: 85 },
        // { name: "MongoDB", icon: '/skills/mongoDB.svg', proficiency: 75 }
        { name: "Sql Server", icon: '/skills/sqlserver.svg', proficiency: 80 }
      ]
    },
    {
      name: "Tools & Technologies",
      icon: <Wrench className="w-8 h-8 text-gray-500" />,
      skills: [
        { name: "Git", icon: '/skills/git.svg', proficiency: 85 },
        { name: "GitHub", icon: '/skills/github.svg', proficiency: 90 },
        { name: "Shopify", icon: '/skills/shopify.svg', proficiency: 85 },
        { name: "Wordpress", icon: '/skills/wordpress.svg', proficiency: 70 },
        { name: "Power BI", icon: '/skills/powerbi.svg', proficiency: 80 }
      ]
    },
    {
      name: "Other",
      icon: <Settings className="w-8 h-8 text-gray-500" />,
      skills: [
        { 
          name: "SharePoint", 
          icon: '/skills/sharepoint.svg', 
          proficiency: 75 
        },
        { 
          name: "Power Automate", 
          icon: '/skills/powerautomate.svg', 
          proficiency: 65 
        },
        { 
          name: "Canvas", 
          icon: '/skills/canva.svg', 
          proficiency: 85 
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const renderIcon = (icon: React.ReactNode | string) => {
    if (typeof icon === 'string') {
      return <img src={icon} alt="skill icon" className="w-6 h-6" />;
    }
    return icon;
  };

  return (
    <section id="skills" className={py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900/30'}}>

      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Technical Skills
          </span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl ${
                theme === 'light' 
                  ? 'bg-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700'
              } transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-700/50'
                }`}>
                  {renderIcon(category.icon)}
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3"
                  >
                    {renderIcon(skill.icon)}
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className={`h-1.5 rounded-full ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Optimization */}
        <div className="mt-12 md:hidden">
          <select 
            className={`w-full p-3 rounded-lg ${
              theme === 'light' 
                ? 'bg-white border border-gray-200' 
                : 'bg-gray-800 border border-gray-700'
            }`}
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory || ''}
          >
            <option value="">Select a skill category</option>
            {skillCategories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              {skillCategories
                .find(cat => cat.name === selectedCategory)
                ?.skills.map(skill => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ x: 4 }}
                    className={`p-4 rounded-lg mb-3 ${
                      theme === 'light' 
                        ? 'bg-white shadow' 
                        : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {renderIcon(skill.icon)}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className={`h-1.5 rounded-full ${
                      theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
