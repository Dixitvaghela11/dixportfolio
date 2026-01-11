import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import StarfieldBackground from "@/components/StarfieldBackground";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import { useTheme } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import Favicon from '@/components/Favicon';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(section.getAttribute("id") || "home");
      }
    });
  };

  useEffect(() => {
    // Simulate loading time and preload important assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <>
      <Favicon />
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <Chatbot isVisible={!isLoading} />

      <div className={`min-h-screen relative overflow-hidden ${
        theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-950 text-white'
      } theme-transition`}>
        {theme === 'dark' && <StarfieldBackground />}
        <Navbar activeSection={activeSection} />
        
        <main className="relative z-10 scroll-smooth">
          <HeroSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <BlogsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default Index;
