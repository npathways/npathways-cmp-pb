import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    category: "",
    grade: "",
    passoutYear: "",
    examType: "",
    examStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers in the phone field
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".pathway-item, .pathway-list")
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = (programId) => {
    setSelectedProgram(programId);
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          <div className="logo">NPATHWAYS</div>
          <nav className="nav-links">
            <button className="btn-book" onClick={() => scrollToBooking("")}>
              Register Now
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero animate-fade">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">Transforming Careers</span>
            <h1>
              ELEVATE YOUR <br />
              FUTURE PATH
            </h1>
            <p>
              Personalized career guidance and strategic planning designed to
              transform you into a world-class professional.
            </p>
            <div className="hero-actions">
              <button
                className="btn-book"
                onClick={() =>
                  document
                    .getElementById("programs")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Services
              </button>
              <button
                className="btn-book btn-outline"
                onClick={() => scrollToBooking("")}
              >
                Book Discovery
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
            <p>
              Architecting your journey to global academic and professional
              leadership.
            </p>
          </div>

          <div className="pathway-list">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`pathway-item ${index % 2 === 1 ? "reverse" : ""}`}
              >
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
                    <button
                      className="btn-book"
                      onClick={() => scrollToBooking(program.id)}
                    >
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
            <p>
              Select a service and register to begin your personalized career
              transformation.
            </p>
          </div>

          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="phone-input-group">
                  <select 
                    name="countryCode"
                    className="form-control themed-select country-code-select" 
                    value={formData.countryCode}
                    onChange={handleInputChange}
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+65">+65 (SG)</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Choose a Service</label>
                <select
                  className="form-control themed-select"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  <option value="">Select an option...</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>I am a...</label>
                <select
                  name="category"
                  className="form-control themed-select"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category...</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                  <option value="working-prof">Working Professional</option>
                </select>
              </div>

              {(formData.category === "student" ||
                formData.category === "parent") && (
                <div className="form-group animate-fade">
                  <label>Current Grade / College Year</label>
                  <input
                    type="text"
                    name="grade"
                    className="form-control"
                    placeholder="e.g. Grade 10, 2nd Year B.Tech"
                    value={formData.grade}
                    onChange={handleInputChange}
                    maxLength={50}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Year of Passout</label>
                <input
                  type="text"
                  name="passoutYear"
                  className="form-control"
                  placeholder="e.g. 2024"
                  value={formData.passoutYear}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </div>
              <div className="form-group">
                <label>Target Entrance Exam</label>
                <select
                  name="examType"
                  className="form-control themed-select"
                  value={formData.examType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Exam...</option>
                  <option value="cat">CAT</option>
                  <option value="gmat">GMAT</option>
                  <option value="gre">GRE</option>
                  <option value="xat">XAT</option>
                  <option value="nmat">NMAT</option>
                  <option value="snap">SNAP</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Application Status</label>
                <select
                  name="examStatus"
                  className="form-control themed-select"
                  value={formData.examStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status...</option>
                  <option value="applied">Applied</option>
                  <option value="yet-to-apply">Yet to Apply</option>
                  <option value="planning">Planning to Apply</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Register Now
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">NPATHWAYS</div>
          <p style={{ color: "var(--text-muted)", fontWeight: "500" }}>
            © 2026 npathways. All rights reserved.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <a
              href="#"
              className="nav-link"
              style={{ fontSize: "0.75rem", fontWeight: "700" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="nav-link"
              style={{ fontSize: "0.75rem", fontWeight: "700" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
