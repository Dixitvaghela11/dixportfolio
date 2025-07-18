import React from "react";
import TypewriterAnimation from "./TypewriterAnimation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

const HeroSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center py-8 pt-32 pb-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Left content column - adjusted width and alignment */}
          <div className="w-full lg:w-[45%] space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 leading-tight pb-2">
                Dixit Vaghela
              </h1>
              <div className="h-16 text-xl lg:text-2xl font-medium dark:text-gray-200 text-gray-800">
                <TypewriterAnimation
                  strings={[
                    "Laravel • React Developer",
                    "ASP.NET Developer",
                    "Full Stack Developer"
                  ]}
                />
              </div>
              <p className="text-base lg:text-lg dark:text-gray-300 text-gray-700">
                Passionate full stack developer with hands-on experience in Laravel, React, ASP.NET, and SQL. 
                I specialize in building scalable web apps that improve performance, user experience, and business efficiency.
              </p>
            </div>
            
            {/* Buttons with centered alignment */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8 justify-center lg:justify-start">
              <Button 
                className={`${theme === 'light' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'} 
                  px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 text-sm md:text-base`}
                asChild
              >
                <a href="#projects" className="flex items-center gap-2">
                  <FileText size={16} />
                  My Work
                </a>
              </Button>
              <Button 
                variant="outline" 
                className={`${theme === 'light' 
                  ? 'border-purple-500 text-purple-600 hover:bg-purple-100 bg-white' 
                  : 'border-purple-500 text-purple-400 hover:bg-purple-900/20 bg-transparent'} 
                  px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 text-sm md:text-base`}
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  <ArrowRight size={16} />
                  Contact Me
                </a>
              </Button>
              <Button 
                className={`${theme === 'light' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'} 
                  px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 text-sm md:text-base`}
                asChild
              >
                <a 
                  href="/assets/Dixit_Vaghela_Resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText size={16} />
                  View Resume
                </a>
              </Button>
            </div>

            {/* Social Links with centered alignment */}
            <div className="flex gap-6 justify-center lg:justify-start mt-8">
              <a 
                href="https://github.com/dixitvaghela11" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme === 'light' 
                  ? 'text-gray-700 hover:text-purple-600' 
                  : 'text-gray-400 hover:text-purple-400'} 
                  transition-colors duration-300 transform hover:scale-110`}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/dixneek-vaghela-611588274/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme === 'light' 
                  ? 'text-gray-700 hover:text-purple-600' 
                  : 'text-gray-400 hover:text-purple-400'} 
                  transition-colors duration-300 transform hover:scale-110`}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="mailto:vagheladixit078@gmail.com"
                className={`${theme === 'light' 
                  ? 'text-gray-700 hover:text-purple-600' 
                  : 'text-gray-400 hover:text-purple-400'} 
                  transition-colors duration-300 transform hover:scale-110`}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right profile image column - adjusted width */}
          <div className="w-full lg:w-[45%] flex justify-center items-center mt-4 lg:mt-0 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-purple-500 p-1 bg-gray-900/50 backdrop-blur-sm">
                <div className="w-full h-full bg-gray-800 dark:bg-gray-800 rounded-full relative overflow-hidden">
                  <img 
                    src="/assets/dixitimage.jpeg" 
                    alt="Dixit B. Vaghela" 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Tech icons with improved positioning */}
                <div className="tech-icons absolute inset-0 w-full h-full">
                  {['react', 'laravel', 'php', 'dotnet', 'sql'].map((tech, index) => (
                    <div
                      key={tech}
                      className="absolute w-10 h-10 md:w-12 md:h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 animate-float z-10"
                      style={{
                        top: `${Math.sin(index * (Math.PI / 2.5)) * 110 + 110}px`,
                        left: `${Math.cos(index * (Math.PI / 2.5)) * 110 + 110}px`,
                        animationDelay: `${index * 0.5}s`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-xs font-bold text-white">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
