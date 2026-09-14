import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
    setServerError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.details) {
          setErrors(responseData.details);
        }
        setServerError(
          responseData.error || responseData.message || "Failed to submit message to server."
        );
        return;
      }

      // Success (HTTP 201)
      setSuccessMessage(
        responseData.message || "Thank you! Your message has been submitted successfully."
      );
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Network error: Could not reach backend server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="form-alert success">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="form-alert error">
          {serverError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          disabled={isSubmitting}
        />

        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={isSubmitting}
        />

        {errors.email && (
          <p className="form-error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>

        <textarea
          id="message"
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message"
          disabled={isSubmitting}
        />

        {errors.message && (
          <p className="form-error">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;