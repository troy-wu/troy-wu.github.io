import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "Basketbot - ProduHacks 2024 Winner",
      tech: "Python, OpenCV, PyAudio, VOSK Speech Recognition",
      date: "March 2024",
      award: "Winner of ProduHacks (30 teams, $400)",
      points: [
        "Developed object detection automatic basketball scorekeeper",
        "Integrated basketball detection through contour shape and colour detection with OpenCV image processing",
        "Implemented speech recognition with PyAudio and VOSK library for scoreboard and clock voice controls"
      ]
    },
    {
      title: "Mindful Motion - HelloHacks 2023 Winner",
      tech: "Python, OpenCV, Pandas, Flask, HTML/CSS",
      date: "September 2023",
      award: "Winner of HelloHacks (18 teams, $500)",
      points: [
        "Developed motion detection rep counter and pose corrector with 91% accuracy",
        "Utilized OpenCV Image Processing Functions for motion detection",
        "Implemented Pandas library for writing data of motion events by recording timestamps and threshold values",
        "Created user-friendly web application using HTML, CSS, Python, Flask and Figma"
      ]
    },
    {
      title: "Among Us Database",
      tech: "SQL, OracleDB, Node.js, Express.js, JavaScript",
      date: "November 2024",
      points: [
        "Implemented web application tracking multiplayer game events using OracleDB, Node.js, and Express.js",
        "Designed 20-table SQL relational database schema modeling complex game interactions",
        "Implemented advanced SQL queries including nested aggregation, division queries, and dynamic data retrieval",
        "Developed RESTful API endpoints supporting comprehensive CRUD operations for game data management"
      ]
    },
    {
      title: "Blackjack Game",
      tech: "Java, JUnit, JSON, Java Swing",
      date: "January 2023 – April 2023",
      points: [
        "Designed and developed functional blackjack game using Java and object-oriented programming principles",
        "Created user-friendly interface using Java Swing allowing smooth user interaction",
        "Utilized JSON file format to establish Save/Load functionalities to store player data",
        "Developed comprehensive unit testing suite using JUnit framework, achieving 100% code coverage"
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200 p-8 flex flex-col z-50">
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800">Troy Wu</h2>
          <p className="text-sm text-slate-600 mt-1">Software Developer</p>
        </div>
        
        <ul className="space-y-2 flex-1">
          {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-8">
          <a href="https://github.com/troy-wu" target="_blank" rel="noopener noreferrer" 
             className="text-slate-600 hover:text-blue-600 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/troy-wu" target="_blank" rel="noopener noreferrer"
             className="text-slate-600 hover:text-blue-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:troywu5@gmail.com"
             className="text-slate-600 hover:text-blue-600 transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl w-full flex items-center gap-16">
            <img 
                  src="/images/headshot.JPG" 
                  alt="Troy Wu" 
                  className="w-64 h-64 rounded-full object-cover"
                />
            <div>
              <h1 className="text-5xl font-bold text-slate-800 mb-4">Troy Wu</h1>
              <h2 className="text-2xl text-blue-600 mb-6">Software Developer</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Computer Science and Business student at the University of British Columbia with a passion for building cool stuff. 
                Experienced in full-stack development. 
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  View Projects <ChevronRight size={20} />
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Download size={20} /> Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center px-16 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-slate-800 mb-8">About Me</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p className="text-lg">
                I'm a Computer Science and Business student at the University of British Columbia, ranked 6th out of 791 students in UBC Sauder with a GPA of 4.10/4.33. I'm passionate about software development and building innovative solutions that solve real-world problems.
              </p>
              <p className="text-lg">
                Most recently, I went on exchange at Tsinghua University's School of Economics and Management, where I expanded my global perspective and cross-cultural understanding. Previously, I worked as a Software Developer Intern at Absolute Security, where I designed full-stack Chromebook security services and automated log exports for over 1 million devices.
              </p>
              <p className="text-lg">
                I'm a two-time hackathon winner, having won ProduHacks 2024 and HelloHacks 2023, where I developed innovative projects using computer vision and machine learning. I'm always excited to take on new challenges and collaborate on meaningful projects.
              </p>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Education</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="text-xl font-semibold text-slate-800">University of British Columbia</h4>
                    <p className="text-blue-600 font-medium mt-1">Bachelor of Computer Science and Business Co-op</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span>GPA: 4.10/4.33</span>
                      <span>•</span>
                      <span>Expected Graduation: May 2027</span>
                    </div>
                    <div className="mt-3 space-y-1 text-slate-600">
                      <p>• Dean's Honour Roll, Trek Excellence Scholarship (Top 5%)</p>
                      <p>• Ranked 6/791 in UBC Sauder</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="text-xl font-semibold text-slate-800">Tsinghua University</h4>
                    <p className="text-blue-600 font-medium mt-1">School of Economics and Management - Exchange Term</p>
                    <p className="text-sm text-slate-600 mt-2">February 2025 - June 2025</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Languages</h4>
                    <p className="text-slate-600">Python, Java, TypeScript, JavaScript, C++, SQL, React.js</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Frameworks & Libraries</h4>
                    <p className="text-slate-600">MongoDB, Chai, Mocha, Sinon, OpenCV, Flask, JUnit, JSON, OracleDB</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Developer Tools</h4>
                    <p className="text-slate-600">Git, GitLab, Jira, Studio3T, Docker, GitHub, WebStorm, VS Code, IntelliJ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center px-16 py-20 bg-slate-50">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-slate-800 mb-12">Experience</h2>
            
            <div className="relative border-l-2 border-blue-600 pl-8 pb-12">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0"></div>
              
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-slate-800">Software Developer Intern</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-blue-600 font-medium">Absolute Security</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">Vancouver, BC</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">May 2024 - December 2024</span>
                </div>
              </div>
              
              <ul className="mt-6 space-y-3">
                <li className="text-slate-600 leading-relaxed">
                  Designed and implemented full-stack Chromebook security services using JavaScript/Java and Manifest V3, enabling real-time monitoring of enterprise endpoint devices.
                </li>
                <li className="text-slate-600 leading-relaxed">
                  Automated log exports for 1M+ devices by building a continuous log retrieval tool in Java/JavaScript, boosting QA efficiency and error detection speed by 30%.
                </li>
                <li className="text-slate-600 leading-relaxed">
                  Redesigned and optimized log export interface using HTML/CSS/JavaScript, accelerating QA log download workflows by 50% and enhancing usability for non-technical teams.
                </li>
                <li className="text-slate-600 leading-relaxed">
                  Collaborated with 10+ engineers and QA staff to integrate and maintain software modules, improving release cycle speed by 15% and reducing integration bugs on GitLab by 20% through clear communication.
                </li>
                <li className="text-slate-600 leading-relaxed">
                  Developed comprehensive JUnit/Mocha unit test suites with 100% code coverage, ensuring reliability and maintainability of critical Chromebook services.
                </li>
                <li className="text-slate-600 leading-relaxed">
                  Applied agile development practices using Jira, and contributed to deployment pipelines utilizing Argo, Docker, and Kubernetes to support scalable enterprise solutions.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center px-16 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-slate-800 mb-12">Projects</h2>
            
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 hover:border-blue-700 transition-colors">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-blue-600 font-medium">{project.tech}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-600">{project.date}</span>
                    </div>
                    {project.award && (
                      <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {project.award}
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {project.points.map((point, idx) => (
                      <li key={idx} className="text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-16 py-20 bg-slate-50">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-slate-800 mb-8">Get In Touch</h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              I'm currently seeking full-time Software Engineering opportunities for Summer 2027. Feel free to reach out if you'd like to connect or discuss potential opportunities!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="mailto:troywu5@gmail.com" 
                 className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Mail size={32} className="text-blue-600 mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Email</h3>
                <p className="text-slate-600 text-sm text-center">troywu5@gmail.com</p>
              </a>
              
              <a href="https://linkedin.com/in/troy-wu" target="_blank" rel="noopener noreferrer"
                 className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Linkedin size={32} className="text-blue-600 mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">LinkedIn</h3>
                <p className="text-slate-600 text-sm text-center">linkedin.com/in/troy-wu</p>
              </a>
              
              <a href="https://github.com/troy-wu" target="_blank" rel="noopener noreferrer"
                 className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Github size={32} className="text-blue-600 mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">GitHub</h3>
                <p className="text-slate-600 text-sm text-center">github.com/troy-wu</p>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}