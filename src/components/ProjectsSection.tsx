import React, { useState } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider";

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
      className="h-[450px] perspective-1000 w-full cursor-pointer"
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
          <div className="h-64 relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
          </div>
          <CardContent className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              {project.title}
            </h3>
            <p className={`text-sm mb-4 flex-grow ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>{project.description}</p>
            <div className="space-y-4">
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
              <p className="text-xs text-gray-400 text-center border-t border-gray-200 dark:border-gray-700 pt-4">
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
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
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
  const { theme } = useTheme();

  const projects: Project[] = [
    {
      title: "Real Estate Management System",
      description: "Property listing, filtering, admin panel, user auth",
      longDescription: "A comprehensive property management solution featuring advanced property listing capabilities, robust filtering options, secure user authentication, and an intuitive admin panel. The system streamlines property searches and management tasks for both agents and clients.",
      image: "/projects/realestate-management.png",
      technologies: [
        { name: "PHP", color: "#777BB3" },
        { name: "MySQL", color: "#4479A1" },
        { name: "Bootstrap", color: "#7952B3" }
      ],
      category: "php",
      github: "https://github.com/dixitvaghela11/realestate-management",
      features: [
        "Advanced property search and filtering",
        "User authentication and authorization",
        "Admin dashboard with analytics",
        "Property listing management",
        "Image gallery with multiple uploads",
        "Enquiry management system"
      ]
    },
    {
      title: "Job Portal",
      description: "Job search, admin stats, employer panel",
      longDescription: "An end-to-end job search platform with powerful search functionality, detailed analytics dashboard for administrators, and a dedicated employer panel. Features include job posting management, applicant tracking, and automated application processing.",
      image: "/projects/job-portal.png",
      technologies: [
        { name: "ASP.NET MVC", color: "#512BD4" },
        { name: "C#", color: "#239120" },
        { name: "SQL Server", color: "#CC2927" }
      ],
      category: "asp",
      github: "https://github.com/dixitvaghela11/job-portal",
      features: [
        "Advanced job search and filtering",
        "Employer dashboard",
        "Application tracking system",
        "Resume parser",
        "Email notifications",
        "Analytics dashboard"
      ]
    },
    {
      title: "Online Shopping System",
      description: "Cart, checkout, order management",
      longDescription: "Feature-rich e-commerce platform with seamless cart management, secure checkout process, and comprehensive order tracking. Includes inventory management, user reviews, and automated order processing capabilities.",
      image: "/projects/online-shopping.png",
      technologies: [
        { name: "PHP", color: "#777BB3" },
        { name: "MySQL", color: "#4479A1" }
      ],
      category: "php",
      github: "https://github.com/dixitvaghela11/online-shopping",
      features: [
        "Shopping cart management",
        "Secure payment gateway",
        "Order tracking system",
        "Product reviews",
        "Inventory management",
        "User wishlist"
      ]
    },
    {
      title: "OPD Assessment System",
      description: "Patient record tracking, OPD data efficiency",
      longDescription: "Advanced patient management system for outpatient departments, featuring efficient record tracking, appointment scheduling, and data analysis tools. Improves healthcare delivery through streamlined workflows and accurate patient data management.",
      image: "/projects/opd-assessment.png",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "MySQL", color: "#4479A1" }
      ],
      category: "laravel",
      github: "https://github.com/dixitvaghela11",
      features: [
        "Patient record management",
        "Appointment scheduling",
        "Medical history tracking",
        "Prescription management",
        "Lab test integration",
        "Billing system"
      ]
    },
    {
      title: "HR Digitaliz",
      description: "Streamlined onboarding, employee document management",
      longDescription: "Modern HR management solution that digitizes employee onboarding processes and document management. Includes automated workflow processing, document verification, and secure storage of employee information with role-based access control.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "React", color: "#61DAFB" }
      ],
      category: "react",
      github: "https://github.com/dixitvaghela11",
      features: [
        "Digital document management",
        "Employee onboarding workflow",
        "Document verification system",
        "Role-based access control",
        "Automated notifications",
        "Document expiry tracking"
      ]
    },
    {
      title: "Dormitory Management System",
      description: "Hospital accommodation tracking, availability filter",
      longDescription: "Smart accommodation management system for hospitals with real-time availability tracking, automated Management processes, and comprehensive reporting. Features include maintenance scheduling and occupancy optimization.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      technologies: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "MySQL", color: "#4479A1" }
      ],
      category: "laravel",
      github: "https://github.com/dixitvaghela11",
      features: [
        "Real-time availability tracking",
        "Automated room Management",
        "Maintenance scheduling",
        "Occupancy reporting",
        "Cleaning management",
        "Resident management"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'laravel', name: 'Laravel' },
    { id: 'react', name: 'React' },
    { id: 'asp', name: 'ASP.NET' },
    { id: 'php', name: 'PHP' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
                  onClick={() => setActiveFilter(category.id)}
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
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} onViewDetails={() => setSelectedProject(project)} />
            ))}
          </div>
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
