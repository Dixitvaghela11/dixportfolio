import React from 'react';
import { GraduationCap, Calendar, BookOpen, Award, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider";

interface EducationItemProps {
  degree: string;
  institution: string;
  specialization: string;
  board: string;
  duration: string;
  grade: string;
  location?: string;
}

const EducationItem = ({ degree, institution, specialization, board, duration, grade, location }: EducationItemProps) => {
  const { theme } = useTheme();
  
  return (
    <Card className={`min-h-[100px] h-auto transition-all duration-300 hover:shadow-lg ${
      theme === 'light' 
        ? 'bg-white hover:shadow-gray-200/60' 
        : 'glass hover:neon-glow'
    }`}>
      <CardContent className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex items-start mb-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
            <GraduationCap size={16} className="text-white sm:text-[20px]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`text-lg sm:text-xl font-bold break-words ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              {degree}
            </h3>
            <p className={`text-sm sm:text-base break-words ${
              theme === 'light' ? 'text-purple-600' : 'text-purple-300'
            }`}>
              {institution}
            </p>
          </div>
        </div>
        
        <div className="space-y-2 flex-grow">
          {specialization && (
            <p className={`flex items-start text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <BookOpen size={14} className={`mr-2 mt-1 shrink-0 ${
                theme === 'light' ? 'text-purple-600' : 'text-purple-400'
              }`} />
              <span className="break-words">{specialization}</span>
            </p>
          )}
          <p className={`flex items-start text-sm sm:text-base ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <Award size={14} className={`mr-2 mt-1 shrink-0 ${
              theme === 'light' ? 'text-purple-600' : 'text-purple-400'
            }`} />
            <span className="break-words">{board}</span>
          </p>
          {location && (
            <p className={`flex items-start text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <MapPin size={14} className={`mr-2 mt-1 shrink-0 ${
                theme === 'light' ? 'text-purple-600' : 'text-purple-400'
              }`} />
              <span className="break-words">{location}</span>
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 gap-2">
          <p className={`flex items-center ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <Calendar size={14} className="mr-2 shrink-0" />
            {duration}
          </p>
          <p className={`flex items-center px-2 py-1 rounded-full ${
            theme === 'light'
              ? 'text-green-600 bg-green-50'
              : 'text-green-400 bg-green-400/10'
          }`}>
            {grade}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const EducationSection = () => {
  const { theme } = useTheme();
  const education = [
    {
      degree: "M.Sc. Information and Communication Technology",
      institution: "VNSGU",
      specialization: "Computer Engineering",
      board: "Veer Narmad South Gujarat University",
      duration: "2023–2025",
      grade: "CGPA: 6.65",
      location: "Surat, Gujarat"
    },
    {
      degree: "BCA",
      institution: "VNSGU",
      specialization: "Computer Engineering",
      board: "Veer Narmad South Gujarat University",
      duration: "2020–2023",
      grade: "CGPA: 7.00",
      location: "Surat, Gujarat"
    },
    {
      degree: "H.S.C Commerce",
      institution: "GSHSEB",
      specialization: "Commerce Stream",
      board: "Gujarat Secondary and Higher Secondary Education Board",
      duration: "2020",
      grade: "66%",
      location: "Surat, Gujarat"
    },
    {
      degree: "S.S.C",
      institution: "GSEB",
      specialization: "",
      board: "Gujarat Secondary Education Board",
      duration: "2018",
      grade: "63.83%",
      location: "Surat, Gujarat"
    },
  ];

  return (
    <section id="education" className={`
      py-8 sm:py-12 md:py-16 relative
      ${theme === 'light' ? 'bg-gray-50' : ''}
    `}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Education
          </span>
        </h2>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:-translate-y-2"
              style={{ 
                transformStyle: 'preserve-3d', 
                perspective: '1000px',
                zIndex: education.length - index 
              }}
            >
              <EducationItem
                degree={edu.degree}
                institution={edu.institution}
                specialization={edu.specialization}
                board={edu.board}
                duration={edu.duration}
                grade={edu.grade}
                location={edu.location}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
