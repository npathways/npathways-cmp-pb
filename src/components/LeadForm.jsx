import React, { useState } from "react";

const LeadForm = ({ source = "Campaign Page", selectedProgram = "", onSuccess }) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const exams = ["CAT", "GMAT", "GRE", "XAT", "NMAT", "SNAP", "Other"];
  const statuses = ["Applied", "Yet to Apply", "Planning to Apply"];
  const categories = ["Parent", "Student", "Working Professional"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && (value === "Working Professional" || value === "working-prof") ? { grade: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      const response = await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, selectedProgram, source }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Registration successful! We'll contact you shortly." });
        setFormData({
          name: "", email: "", countryCode: "+91", phone: "",
          category: "", grade: "", passoutYear: "", examType: "", examStatus: "",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-wrapper">
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              placeholder="Enter your name"
              value={formData.name} 
              onChange={handleChange} 
              required 
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
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="phone-input-group">
              <select 
                name="countryCode" 
                className="form-control themed-select country-code-select"
                value={formData.countryCode} 
                onChange={handleChange}
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
              </select>
              <input 
                type="tel" 
                name="phone" 
                className="form-control" 
                placeholder="Enter phone number"
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>I am a...</label>
            <select 
              name="category" 
              className="form-control themed-select"
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select category...</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {(formData.category === "Student" || formData.category === "Parent" || formData.category === "student" || formData.category === "parent") && (
            <div className="form-group animate-fade">
              <label>Current Grade / College Year</label>
              <input 
                type="text" 
                name="grade" 
                className="form-control" 
                placeholder="e.g. Grade 10"
                value={formData.grade} 
                onChange={handleChange} 
                required 
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
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Target Entrance Exam</label>
            <select 
              name="examType" 
              className="form-control themed-select"
              value={formData.examType} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Exam...</option>
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Application Status</label>
            <select 
              name="examStatus" 
              className="form-control themed-select"
              value={formData.examStatus} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Status...</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`btn-submit ${isSubmitting ? 'loading' : ''}`}
        >
          {isSubmitting ? "Processing..." : "Register Now"}
        </button>

        {message.text && (
          <div className={`form-feedback ${message.type} animate-fade`}>
            <p>{message.text}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LeadForm;
