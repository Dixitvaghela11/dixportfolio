import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  Building, 
  Layers, 
  FileText
} from 'lucide-react';
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
  icon?: React.ReactNode;
  position: 'left' | 'right';
}

const ExperienceItem = ({ 
  title, 
  company, 
  duration, 
  responsibilities, 
  icon,
  position,
}: ExperienceItemProps) => {
  const { theme } = useTheme();
  
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: position === 'left' ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div className={`
        absolute z-20 w-3 h-3 md:w-4 md:h-4 bg-[#4B84F2] rounded-full 
        left-[7px] md:left-1/2 md:-translate-x-1/2 top-8 md:top-10
        shadow-[0_0_0_4px_rgba(30,41,59,1)]
        group-hover:shadow-[0_0_0_6px_rgba(30,41,59,1)]
        transition-all duration-300
        ${theme === 'light' ? 'shadow-[0_0_0_4px_#f1f5f9]' : ''}
      `}>
        <div className="absolute w-full h-full rounded-full bg-[#4B84F2] animate-ping opacity-20" />
      </div>

      {/* Content card */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={slideVariants}
        className={`
          relative ml-8 md:mx-4 mb-8 md:mb-16
          ${position === 'left' ? 'md:mr-[50%] md:pr-8' : 'md:ml-[50%] md:pl-8'}
        `}
      >
        <div className={`
          relative border rounded-lg p-6 md:p-8
          shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)]
          hover:shadow-[0_8px_30px_rgba(75,132,242,0.1)]
          transition-all duration-300
          ${theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-[#0A0F1C] border-[#1E293B]'}
        `}>
          {/* Top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#4B84F2] to-transparent" />
          
          <div className="flex items-center gap-3 mb-3">
            <div className={`
              h-6 w-6 rounded flex items-center justify-center
              ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1E293B]'}
            `}>
              {icon || <Briefcase size={16} className="text-[#4B84F2]" />}
            </div>
            <h3 className={`text-lg md:text-xl font-semibold
              ${theme === 'light' ? 'text-gray-900' : 'text-white'}
            `}>
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="text-[#4B84F2] font-medium">{company}</span>
            <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
            <span className={`flex items-center gap-1
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              <Calendar size={14} />
              {duration}
            </span>
          </div>

          <ul className="space-y-3">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-[#4B84F2] mt-1">•</span>
                <span className={`leading-relaxed
                  ${theme === 'light' ? 'text-gray-600' : 'text-[#94A3B8]'}
                `}>
                  {responsibility}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  const { theme } = useTheme();
  
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Kiran Hospital",
      duration: "Dec 2025 – Present",
      responsibilities: [
        "Built OPD Assessment v2, HR Digitization",
        "Developed Dormitory System & Acuity-based staff allocation",
        "Laravel + React + MySQL based stack"
      ],
      icon: <Building size={16} className="text-[#4B84F2]" />
    },
    {
      title: "ASP.NET Intern",
      company: "Invica Infotech",
      duration: "April 2024",
      responsibilities: [
        "Developed Job Portal using ASP.NET MVC",
        "Razor pages, job listings, and employer panel"
      ],
      icon: <Layers size={16} className="text-[#4B84F2]" />
    },
    {
      title: "Data Entry",
      company: "Can't Tech",
      duration: "April 2024",
      responsibilities: [
        "Streamlined data entry for reports",
        "Used automation to improve speed and accuracy"
      ],
      icon: <FileText size={16} className="text-[#4B84F2]" />
    }
  ];

  return (
    <section id="experience" className={`
      py-4 md:py-8 relative
      ${theme === 'light' ? 'bg-gray-50' : ''}
    `}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-4 md:mb-6"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Experience
            </span>
          </h2>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative">
        {/* Center timeline line */}
        <div className={`
          absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px]
          md:-translate-x-1/2
          ${theme === 'light' ? 'bg-gray-200' : 'bg-[#1E293B]'}
        `} />
        
        {/* Experience items */}
        <div className="relative max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              {...exp}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
