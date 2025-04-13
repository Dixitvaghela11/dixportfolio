import React, { useState, useRef } from 'react';
import { Calendar, ArrowRight, X, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  platform: string;
  content?: string;
  comingSoon?: boolean;
  author?: string;
  tags?: string[];
}

const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => {
  return (
    <Card 
      className={cn(
        "glass overflow-hidden group/blog transition-all duration-300 hover:-translate-y-2 theme-transition h-full",
        "min-w-[280px] sm:min-w-[300px] max-w-[400px]",
        "cursor-pointer bg-white/5 backdrop-blur-sm hover:bg-white/10"
      )}
      onClick={onClick}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
        <img 
          src={post.image} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover/blog:scale-110 transition-transform duration-500"
        />
        {post.comingSoon && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full z-20">
            Coming Soon
          </div>
        )}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full z-20">
          {post.platform}
        </div>
      </div>
      <div className="relative z-20 p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover/blog:text-purple-600 dark:group-hover/blog:text-purple-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={12} className="mr-1.5 sm:mr-2" />
            {post.date}
          </div>
          {!post.comingSoon && (
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 dark:text-purple-400 font-medium group-hover/blog:translate-x-1 transition-all text-xs sm:text-sm px-2 sm:px-3"
            >
              Read blog <ArrowRight size={12} className="ml-1" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const BlogDialog = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => {
  const { theme } = useTheme();
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <DialogContent className={cn(
      "max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden p-0",
      "animate-in fade-in-0 zoom-in-95 duration-200",
      "md:rounded-lg shadow-xl",
      theme === 'light' ? 'bg-white' : 'bg-gray-900'
    )}>
      <div className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/20 to-transparent pt-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full",
            "transition-transform hover:scale-110",
            "bg-white/10 backdrop-blur-sm hover:bg-white/20",
            "text-white shadow-lg"
          )}
          onClick={onClose}
        >
          <X size={16} className="sm:size-18" />
        </Button>
      </div>

      <div className="relative h-[30vh] sm:h-[40vh] w-full">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>
      
      <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-30vh)] sm:max-h-[calc(90vh-40vh)] styled-scrollbar">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h1 className={cn(
              "text-2xl sm:text-3xl md:text-4xl font-bold",
              "text-gray-900 dark:text-white"
            )}>
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {post.author && (
                <span className="font-medium flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-1.5 sm:mr-2" />
                  {post.author}
                </span>
              )}
              <time className="flex items-center">
                <Calendar size={12} className="mr-1 sm:mr-1.5" />
                {post.date}
              </time>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                {post.platform}
              </span>
            </div>
          </div>

          <div className={cn(
            "prose max-w-none",
            theme === 'light' ? 'prose-gray' : 'prose-invert',
            "prose-headings:font-bold prose-headings:tracking-tight",
            "prose-p:leading-relaxed prose-p:mb-4",
            "prose-li:marker:text-purple-500",
            "prose-a:text-purple-600 dark:prose-a:text-purple-400"
          )}>
            {post.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}
          </div>

          {post.tags && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 sm:px-2.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 w-full sm:w-auto justify-center"
                onClick={handleShare}
              >
                <Share2 size={14} className="mr-1.5" />
                Share
              </Button>
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

const BlogsSection = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const blogPosts: BlogPost[] = [
    {
      title: "How I Built an OPD System with Laravel",
      excerpt: "A deep dive into the architecture, database design, and performance optimizations for healthcare systems.",
      date: "Apr 2025",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070",
      platform: "Dev.to",
      content: "This comprehensive article explores the architecture and implementation of a robust Outpatient Department (OPD) system I built using Laravel. I cover everything from the database design and API architecture to performance optimizations and real-time features.\n\nThe system handles patient registration, appointment scheduling, doctor assignments, medical records, and billing - all within a unified interface. I implemented advanced features like real-time notifications for staff, automated SMS reminders for patients, and extensive reporting capabilities.\n\nOne of the main challenges was ensuring the application could handle high concurrent users with minimal latency. I'll share techniques for optimizing Laravel applications, including effective database indexing, proper caching strategies, and queue-based processing for resource-intensive tasks. The article will also cover how I implemented role-based access control to manage permissions across different types of users.",
      comingSoon: false,
      tags: ["Laravel", "Healthcare", "Web Development", "Performance"]
    },
    {
      title: "How I Built an OPD System with Laravel",
      excerpt: "A deep dive into the architecture, database design, and performance optimizations for healthcare systems.",
      date: "Apr 2025",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070",
      platform: "Dev.to",
      content: "This comprehensive article explores the architecture and implementation of a robust Outpatient Department (OPD) system I built using Laravel. I cover everything from the database design and API architecture to performance optimizations and real-time features.\n\nThe system handles patient registration, appointment scheduling, doctor assignments, medical records, and billing - all within a unified interface. I implemented advanced features like real-time notifications for staff, automated SMS reminders for patients, and extensive reporting capabilities.\n\nOne of the main challenges was ensuring the application could handle high concurrent users with minimal latency. I'll share techniques for optimizing Laravel applications, including effective database indexing, proper caching strategies, and queue-based processing for resource-intensive tasks. The article will also cover how I implemented role-based access control to manage permissions across different types of users.",
      comingSoon: false,
      tags: ["Laravel", "Healthcare", "Web Development", "Performance"]
    },
    {
      title: "How I Built an OPD System with Laravel",
      excerpt: "A deep dive into the architecture, database design, and performance optimizations for healthcare systems.",
      date: "Apr 2025",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070",
      platform: "Dev.to",
      content: "This comprehensive article explores the architecture and implementation of a robust Outpatient Department (OPD) system I built using Laravel. I cover everything from the database design and API architecture to performance optimizations and real-time features.\n\nThe system handles patient registration, appointment scheduling, doctor assignments, medical records, and billing - all within a unified interface. I implemented advanced features like real-time notifications for staff, automated SMS reminders for patients, and extensive reporting capabilities.\n\nOne of the main challenges was ensuring the application could handle high concurrent users with minimal latency. I'll share techniques for optimizing Laravel applications, including effective database indexing, proper caching strategies, and queue-based processing for resource-intensive tasks. The article will also cover how I implemented role-based access control to manage permissions across different types of users.",
      comingSoon: true,
      tags: ["Laravel", "Healthcare", "Web Development", "Performance"]
    },
    {
      title: "ASP.NET vs Laravel – Real Use Case Breakdown",
      excerpt: "Comparing the two frameworks based on my experience building similar applications in both.",
      date: "Mar 2025",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2074",
      platform: "Hashnode",
      content: "After building similar applications with both ASP.NET and Laravel, I wanted to share my insights on how these frameworks compare in real-world scenarios. This article provides a detailed breakdown of their strengths and limitations based on practical experience.\n\nI analyze aspects like development speed, performance characteristics, ecosystem maturity, hosting requirements, and developer experience. The article includes code examples showing how the same functionality is implemented in both frameworks, highlighting the differences in syntax and approach.\n\nA particular focus is given to how each framework handles authentication, ORM capabilities, API development, and frontend integration. I also discuss deployment considerations and how each framework fits into modern development workflows involving containerization and CI/CD pipelines.\n\nWhile not declaring a definitive winner, I provide guidance on which framework might be more suitable for different types of projects and team compositions.",
      comingSoon: true
    },
    {
      title: "Inside a Full Stack Dev's Workflow (React + SQL)",
      excerpt: "My approach to designing, building, and deploying modern web applications with React and SQL.",
      date: "Feb 2025",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      platform: "Medium",
      content: "In this article, I break down my step-by-step workflow for building full-stack applications using React on the frontend and SQL databases on the backend. I cover everything from initial project setup to deployment and maintenance.\n\nThe article begins with project planning, including requirements gathering, database schema design, and API planning. I demonstrate how I structure React applications for scalability, with examples of folder organization and component architecture.\n\nOn the backend side, I discuss SQL database optimization, query performance, and how to design effective APIs that connect the frontend to your data. Security considerations are addressed throughout, with practical examples of preventing common vulnerabilities.\n\nThe final sections cover testing strategies, CI/CD setup, and monitoring in production. I share the actual tools I use daily and how they fit together to create an efficient development experience.",
      comingSoon: true
    }
  ];

  return (
    <section id="blogs" className={`
      py-12 md:py-16 relative
      ${theme === 'light' ? 'bg-gray-50' : ''}
    `}>
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold mb-12 text-center",
          theme === 'light' ? 'text-gray-900' : 'text-white'
        )}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Latest Blog Posts
          </span>
        </h2>
        
        <div className="relative group">
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scrollTo('left')}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scrollTo('right')}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* Scrollable Blog List */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto styled-scrollbar pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            {blogPosts.map((post, index) => (
              <div key={index} className="snap-start flex-shrink-0">
                <BlogCard 
                  post={post} 
                  onClick={() => !post.comingSoon && setSelectedBlog(post)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog 
        open={!!selectedBlog} 
        onOpenChange={(open) => !open && setSelectedBlog(null)}
      >
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
            <BlogDialog post={selectedBlog} onClose={() => setSelectedBlog(null)} />
          </div>
        )}
      </Dialog>
    </section>
  );
};

export default BlogsSection;
