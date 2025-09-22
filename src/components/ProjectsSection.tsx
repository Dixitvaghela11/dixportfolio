import React, { useState } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

interface Technology {
  name: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: Technology[];
  category: string;
  github?: string;
  features: string[];
}

const ProjectCard = ({ project, onViewDetails }: { project: Project; onViewDetails: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { theme } = useTheme();

  return (
    <div 
      className="h-[520px] perspective-1000 w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <Card className={`absolute w-full h-full rounded-xl backface-hidden flex flex-col theme-transition overflow-hidden ${
          theme === 'light' ? 'bg-white shadow-lg hover:shadow-xl' : 'glass'
        }`}>
          <div className="h-[280px] relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                {project.title}
              </h3>
              <p className={`text-sm mb-4 line-clamp-2 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>{project.description}</p>
              <div className="flex flex-wrap gap-2 max-h-[60px] overflow-hidden">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-2">
              <p className="text-xs text-gray-400 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
                Click to see details
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className={`absolute w-full h-full rounded-xl backface-hidden rotate-y-180 flex flex-col theme-transition ${
          theme === 'light' ? 'bg-white shadow-lg' : 'glass'
        }`}>
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                {project.title}
              </h3>
              <div className="space-y-4">
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <p className="leading-relaxed line-clamp-4">{project.longDescription}</p>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'light' 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  <span className="text-sm">Code</span>
                </a>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm"
              >
                View More Details
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, isOpen, onClose }: { 
  project: Project; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const { theme } = useTheme();
  if (!isOpen) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal on escape key press
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 ${
        theme === 'light' ? 'bg-white' : 'bg-gray-900'
      }`}>
        {/* Improved close button */}
        <div className="absolute -top-4 -right-4 z-10">
          <button
            onClick={onClose}
            className={`group flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-200 ${
              theme === 'light' 
                ? 'bg-white hover:bg-gray-100' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            aria-label="Close modal"
          >
            <X 
              size={18} 
              className={`transition-transform duration-200 group-hover:rotate-90 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}
            />
          </button>
        </div>

        {/* Add a subtle animation to modal content */}
        <div className="space-y-8 animate-fadeIn">
          {/* Project Image */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <div className="relative aspect-[1536/1024]">
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                onError={e => { e.currentTarget.src = "/projects/placeholder.png"; }}
              />
            </div>
          </div>

          {/* Project Title */}
          <div>
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 rounded-full transition-colors duration-200 hover:opacity-80"
                  style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Project Description */}
          <div>
            <h4 className={`font-semibold mb-3 ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              Overview
            </h4>
            <p className={`text-base leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className={`font-semibold mb-3 ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              Key Features
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className={`flex items-center gap-2 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <span className="text-purple-500">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub Link */}
          {project.github && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md'
                    : 'bg-gray-800 hover:bg-gray-700 text-white hover:shadow-md'
                }`}
              >
                <Github size={18} />
                <span>View Source Code</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();

  const projects: Project[] = [
    {
      title: "Real Estate Management System",
      description: "Property listing, filtering, admin panel, user auth",
      longDescription:
        "A comprehensive property management solution featuring advanced property listing capabilities, robust filtering options, secure user authentication, and an intuitive admin panel. The system streamlines property searches and management tasks for both agents and clients.",
      image: "/projects/realestate-management.png",
      technologies: [
        { name: "PHP (Core)", color: "#8892BF" },
        { name: "HTML", color: "#E34C26" },
        { name: "CSS", color: "#264DE4" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "MySQL", color: "#4479A1" },
        { name: "SMTP Mailer", color: "#6C757D" },
      ],
      category: "php",
      github: "https://github.com/dixitvaghela11/realestate-management",
      features: [
        "Advanced property search and filtering",
        "User authentication and authorization",
        "Admin dashboard with analytics",
        "Property listing management",
        "Image gallery with multiple uploads",
        "OTP wise user authentication",
        "testimonial management",
        "Enquiry management system and emails communication",
      ],
    },
    {
      title: "Job Portal",
      description: "Job search, admin stats, employer panel",
      longDescription:
        "An end-to-end job search platform with powerful search functionality, detailed analytics dashboard for administrators, and a dedicated employer panel. Features include job posting management, applicant tracking, and automated application processing.",
      image: "/projects/job-portal.png",
      technologies: [
        { name: "ASP.NET MVC", color: "#512BD4" },
        { name: "csHtml", color: "#E34C26" },
        { name: "CSS", color: "#264DE4" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "C#", color: "#239120" },
        { name: "SQL Server", color: "#CC2927" },
      ],
      category: "asp",
      github: "https://github.com/dixitvaghela11/job-portal",
      features: [
        "job seeker and employer authentication and authorization",
        "Advanced job search and filtering",
        "Employer dashboard",
        "Job seeker dashboard",
        "Application tracking system",
        "Resume parser",
        "Email notifications",
        "Chat between employer and job seeker",
      ],
    },
    {
      title: "Online Shopping System",
      category: "php",
      description: "Cart, checkout, order management",
      longDescription:
        "A feature-rich e-commerce platform that provides a seamless shopping experience through efficient cart management, a secure checkout system, and robust order tracking. This system also includes inventory management, customer reviews, automated order processing, and coupon-based discount functionality. It's built with a mobile-responsive interface using Bootstrap and JavaScript, and a strong backend powered by PHP and MySQL.",
      image: "/projects/online-shopping.png",
      technologies: [
        { name: "PHP (Core)", color: "#8892BF" },
        { name: "HTML", color: "#E34C26" },
        { name: "CSS", color: "#264DE4" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "MySQL", color: "#4479A1" },
      ],
      features: [
        "Shopping cart management",
        "Order tracking system",
        "Product category and sub category wise filter",
        "Product reviews",
        "Coupon-wise discount",
        "Inventory management",
        "Razorpay integration",
        "User wishlist",
      ],
      github: "https://github.com/dixitvaghela11/online-shopping",
    },
    {
      title: "OPD Assessment System",
      description: "Patient record tracking, OPD data efficiency",
      longDescription:
        "Advanced patient management system for outpatient departments, featuring efficient record tracking, appointment scheduling, and data analysis tools. Improves healthcare delivery through streamlined workflows and accurate patient data management.",
      image: "/projects/opd-assessment-light.png",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "React", color: "#61DAFB" },
        { name: "Taliwand CSS", color: "#264DE4" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "MySQL", color: "#4479A1" },
      ],
      category: "laravel",
      // github: "https://github.com/dixitvaghela11",
      features: [
        "Patient record management",
        "Cluster wise patient management",
        "OPD patient minute to minute management",
        "Data fetching from API",
        "User authentication and authorization",
        "Role based access control",
        "OPD report export in excel and csv",
      ],
    }, 
    {
      title: "HR Digitaliz",
      description: "Streamlined onboarding, employee document management",
      longDescription:
        "Modern HR management solution that digitizes employee onboarding processes and document management. Includes automated workflow processing, document verification, and secure storage of employee information with role-based access control.",
      image:
        "/projects/hr-digitaliz.png",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "React", color: "#61DAFB" },
        { name: "Taliwand CSS", color: "#264DE4" },
        { name: "Power BI", color: "#F0DB4F" },
        { name: "MySQL", color: "#4479A1" },
      ],
      category: "react",
      // github: "https://github.com/dixitvaghela11",
      features: [
        "Digital document management",
        "Employee Master Data Management",
        "Employee and employer dependent medicare data management",
        "Role-based access control",
        "Candidate onboarding workflow",
        "Cadidate master data management",
        "Candidate interview and assessment management",
        "Candidate Document management",
      ],
    },
    {
      title: "AI-Based Prescription Reminder",
      description: "Smart AI system for prescription reminders",
      longDescription:
        "An AI-powered prescription reminder system designed for hospitals and clinics. It utilizes intelligent scheduling and notification systems to ensure patients take their medications on time. Features include voice-to-text prescription analysis, automated reminder notifications, patient compliance tracking, and integration with hospital management systems.",
      image: "/projects/ai-prescription-reminder.png", // You can replace this with the actual image path
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Next JS", color: "#61DAFB" },
        { name: "Tailwind CSS", color: "#264DE4" },
        { name: "MySQL", color: "#4479A1" },
        { name: "OpenAI Whisper", color: "#10A37F" },        // Optional: for medical NLP
      ],
      category: "react",
      // github: "https://github.com/dixitvaghela11/ai-prescription-reminder", // optional
      features: [
        "Voice-to-text prescription transcription using OpenAI Whisper",
        "Smart reminders via SMS, email, and in-app notifications",
        "Prescription schedule management",
        "Real-time patient compliance tracking",
        "Role-based access for doctors, nurses, and patients",
        "Integration with hospital management systems",
        "NLP-based medication parsing and validation using BioBERT"
      ],
    },
    
    {
      title: "Patient Acuity & Workload-Based Duty Roster",
      description: "Smart duty roster system based on patient acuity and workload",
      longDescription:
        "A dynamic duty roster system designed to enhance hospital staffing efficiency. This system enables the creation and management of duty rosters based on patient acuity levels and real-time staff workload. Features include intelligent shift planning, editing, and viewing tools, along with export options and secure user role management.",
      image: "/projects/patient-duty-roster.png", // Replace with the correct image path
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "React", color: "#61DAFB" },
        { name: "Tailwind CSS", color: "#264DE4" },
        { name: "Power BI", color: "#F0DB4F" },
        { name: "MySQL", color: "#4479A1" }
      ],
      category: "php",
      // github: "https://github.com/dixitvaghela11/patient-duty-roster", // optional
      features: [
        "Duty roster generation based on patient acuity and workload",
        "Shift creation, editing, and deletion",
        "Calendar-style duty roster view and management",
        "Secure user authentication and role-based access",
        "Real-time workload tracking for optimized scheduling",
        "Export duty rosters in Excel and CSV formats"
      ]
    },
     
    {
      title: "Dormitory Management System",
      description: "Hospital accommodation tracking, availability filter",
      longDescription:
        "Smart accommodation management system for hospitals with real-time availability tracking, automated Management processes, and comprehensive reporting. Features include maintenance scheduling and occupancy optimization.",
      image:
        "/projects/dormitory-management.png",
      technologies: [
        { name: "PHP (Core)", color: "#8892BF" },
        { name: "HTML", color: "#E34C26" },
        { name: "CSS", color: "#264DE4" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "MySQL", color: "#4479A1" },
      ],
      category: "php",
      // github: "https://github.com/dixitvaghela11",
      features: [
        "Real-time availability tracking",
        "Automated room Management",
        "Maintenance scheduling",
        "Occupancy and vacancy reporting",
        "Extend Occupancy and vacancy reporting",
        "User authentication and authorization for IPD Department",
      ],
    },
    {
      title: "Calendar & Workflow System",
      description: "Calendar management, Google Maps & approval workflows",
      longDescription:
        "A smart scheduling and approval system integrating DayPilot calendar, Google Maps, and workflow automation for enterprise environments. Supports task approvals, location-based planning, and dynamic calendar management.",
      image: "/projects/calendar-workflow-system.png",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Vue.js", color: "#61DAFB" },
        { name: "DayPilot", color: "#1565C0" },
        { name: "JavaScript", color: "#F0DB4F" },
        { name: "Google Maps API", color: "#4285F4" },
        { name: "MySQL", color: "#4479A1" }
      ],
      category: "vue",
      // github: "https://github.com/dixitvaghela11",
      features: [
        "Interactive calendar integration using DayPilot",
        "Google Maps for location-based planning",
        "Multi-step approval workflows",
        "Role-based access and status tracking",
        "Calendar-based task creation and rescheduling",
        "Email notifications for approvals"
      ]
    }
    
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'laravel', name: 'Laravel' },
    { id: 'react', name: 'React' },
    { id: 'asp', name: 'ASP.NET' },
    { id: 'php', name: 'PHP' },
    { id: 'vue', name: 'Vue.js' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Show only first 6 projects unless "View More" is clicked
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <>
      <section id="projects" className={`
      py-12 md:py-16 relative
      ${theme === 'light' ? 'bg-gray-50' : ''}
    `}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Projects
            </span>
          </h2>
          
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setShowAll(false); // Reset showAll when filter changes
                  }}
                  className={`px-4 py-1 rounded-full text-sm transition-all ${
                    activeFilter === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} onViewDetails={() => setSelectedProject(project)} />
            ))}
          </div>

          {/* View More Button */}
          {!showAll && filteredProjects.length > 6 && (
            <div className="flex justify-center mt-10">
              <Button 
                onClick={() => setShowAll(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                View More Projects
              </Button>
            </div>
          )}
        </div>
      </section>
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsSection;
