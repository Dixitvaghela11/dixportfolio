import React, { useState, useRef } from 'react';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name.replace('user_', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_mobile: formData.mobile,
        message: formData.message
      };

      const result = await emailjs.send(
        'service_n3ymwvf',
        'template_lqbil0w',
        templateParams,
        'UsowQvt0pV2Q6R3Ic'
      );

      if (result.text === 'OK') {
        toast({
          title: "✅ Message sent successfully!",
          variant: "default",
          className: "top-right-toast",
        });
        setFormData({ name: '', email: '', mobile: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "❌ Error sending message",
        variant: "destructive",
        className: "top-right-toast",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "vagheladixit078@gmail.com",
      href: "mailto:vagheladixit078@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 97249 01801",
      href: "tel:+919724901801"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Website",
      value: "dixitvaghela.netlify.app",
      href: "https://dixitvaghela.netlify.app"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "dixitvaghela11",
      href: "https://github.com/dixitvaghela11"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "dixit vaghela",
      href: "https://www.linkedin.com/in/dixneek-vaghela-611588274/"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`
        py-12 md:py-16 relative
        ${theme === 'light' ? 'bg-gray-50' : ''}
      `}>
      <div className="container mx-auto px-4">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Contact
          </span>
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div 
              variants={itemVariants}
              className={`${
                theme === 'light' 
                  ? 'bg-white shadow-lg border border-gray-100' 
                  : 'glass'
                } p-8 rounded-xl`}
            >
              <h3 className={`text-xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Get In Touch</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className={
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  }>Name</Label>
                  <motion.div
                    whileTap={{ scale: 0.995 }}
                  >
                    <Input
                      id="name"
                      name="user_name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={`${
                        theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                          : 'bg-gray-900/50 border-gray-800 text-white'
                      } placeholder-gray-400`}
                    />
                  </motion.div>
                </motion.div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  }>Email</Label>
                  <Input
                    id="email"
                    name="user_email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                        : 'bg-gray-900/50 border-gray-800 text-white'
                    } placeholder-gray-400`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className={
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  }>Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="user_mobile"
                    type="tel"
                    placeholder="Your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                    disabled={isSubmitting}
                    className={`${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                        : 'bg-gray-900/50 border-gray-800 text-white'
                    } placeholder-gray-400`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className={
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  }>Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full rounded-md px-3 py-2 text-base md:text-sm resize-none ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
                        : 'bg-gray-900/50 border-gray-800 text-white'
                    } placeholder-gray-400 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:from-purple-700 hover:to-blue-600'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <div className="flex flex-col justify-between">
              <motion.div 
                variants={itemVariants}
                className={`${
                  theme === 'light' 
                    ? 'bg-white shadow-lg border border-gray-100' 
                    : 'glass'
                  } p-8 rounded-xl mb-6`}
              >
                <h3 className={`text-xl font-bold mb-6 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Contact Information</h3>
                <div className="space-y-4">
                  {contactLinks.map((contact, index) => (
                    <motion.a 
                      key={index}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        visible: {
                          x: 0,
                          opacity: 1,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5
                          }
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group ${
                        theme === 'light' ? 'hover:shadow-sm' : ''
                      }`}
                    >
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                          theme === 'light' 
                            ? 'bg-purple-100 text-purple-600' 
                            : 'bg-purple-600/20 text-purple-400'
                        }`}
                      >
                        {contact.icon}
                      </motion.div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                        }`}>{contact.label}</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className={`${
                  theme === 'light' 
                    ? 'bg-white shadow-lg border border-gray-100' 
                    : 'glass'
                  } p-4 rounded-xl text-center`}
              >
                <p className={
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }>
                  Open to collaboration and new opportunities!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;