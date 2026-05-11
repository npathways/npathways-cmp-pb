import { useState, useEffect } from "react";
import "./App.css";
import NotFound from "./NotFound";
import LoadingScreen from "./LoadingScreen";
import LeadForm from "./components/LeadForm";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Basic routing logic for 404
    const path = window.location.pathname;
    if (path !== "/" && path !== "/index.html") {
      setIsNotFound(true);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const programs = [
    {
      id: "portfolio-building",
      title: "Portfolio Building",
      tag: "Accelerator",
      description:
        "Intensive programs where students work on real-world projects and build distinctive portfolios under the guidance of industry experts to stand out on global applications.",
      price: "Premium",
      duration: "Project Based",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "financials",
      title: "Financial Roadmap",
      tag: "Strategic Planning",
      description:
        "Comprehensive financial planning providing clear visibility into the total cost of education abroad, including expert guidance on forex and budgeting.",
      price: "Free Discovery",
      duration: "Ongoing Support",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "career-guidance",
      title: "Career Guidance",
      tag: "Mentorship",
      description:
        "Personalized 1-on-1 discovery sessions and academic planning from Grade 8 onwards, focusing on high school success and effective college readiness.",
      price: "1-on-1 Session",
      duration: "Grade 8+",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "psychometric-assessment",
      title: "Psychometric Assessment",
      tag: "AI Powered",
      description:
        "Scientific AI-powered testing that analyzes personality traits and cognitive strengths to provide a personalized success roadmap for career clarity.",
      price: "Scientific Path",
      duration: "Self-Paced",
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    },
  ];

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const items = document.querySelectorAll(".pathway-item, .pathway-list");
      
      if (!('IntersectionObserver' in window)) {
        items.forEach(i => i.classList.add("visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' },
      );

      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const scrollToBooking = (programId) => {
    setSelectedProgram(programId);
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) return <LoadingScreen />;
  if (isNotFound) return <NotFound />;

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          <div className="logo" aria-label="npathways home">NPATHWAYS</div>
          <nav className="nav-links">
            <button className="btn-book" onClick={() => scrollToBooking("")} aria-label="Register for guidance">
              Register Now
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero animate-fade">
          <div className="hero-overlay"></div>
          <div className="container hero-container">
            <div className="hero-content">
              <span className="hero-tag">Transforming Careers</span>
              <h1>ELEVATE YOUR <br /> FUTURE PATH</h1>
              <p>Personalized career guidance and strategic planning designed to transform you into a world-class professional.</p>
              <div className="hero-actions">
                <button className="btn-book" onClick={() => document.getElementById("programs").scrollIntoView({ behavior: "smooth" })}>
                  Get Expert Guidance
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways Section */}
        <section id="programs" className="pathways-section">
          <div className="container">
            <div className="section-title">
              <span className="subtitle">Curated Excellence</span>
              <h2>STRATEGIC PATHWAYS</h2>
              <p>Architecting your journey to global academic and professional leadership.</p>
            </div>

            <div className="pathway-list">
              {programs.map((program, index) => (
                <div key={program.id} className={`pathway-item ${index % 2 === 1 ? "reverse" : ""}`}>
                  <div className="pathway-visual">
                    <img src={program.image} alt={program.title} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="pathway-content">
                    <span className="program-tag">{program.tag}</span>
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <div className="pathway-footer">
                      <div className="meta">
                        <span className="price">{program.price}</span>
                        <span className="duration">{program.duration}</span>
                      </div>
                      <button className="btn-book" onClick={() => scrollToBooking(program.id)}>
                        Select Pathway
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="booking-section">
          <div className="container">
            <div className="section-title">
              <h2>START YOUR JOURNEY</h2>
              <p>Select a service and register to begin your personalized career transformation.</p>
            </div>
            
            {/* NEW UNIFIED LEAD FORM */}
            <div className="form-card-container">
               <LeadForm source="Campaign: Portfolio Building" variant="light" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">NPATHWAYS</div>
          <p style={{ color: "var(--text-muted)", fontWeight: "500" }}>© 2026 npathways. All rights reserved.</p>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
            <a href="#" className="nav-link" style={{ fontSize: "0.75rem", fontWeight: "700" }}>Privacy Policy</a>
            <a href="#" className="nav-link" style={{ fontSize: "0.75rem", fontWeight: "700" }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
