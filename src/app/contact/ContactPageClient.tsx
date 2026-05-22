"use client";

import { useState } from "react";
import Link from "next/link";

interface ContactPageClientProps {
  // Let the parent gate pass the initial skeleton view if needed, but we keep rendering here
}

export default function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Infrastructure Scaling");
  const [message, setMessage] = useState("");
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = "Name identification is required.";
    }
    if (!email.trim()) {
      errors.email = "Electronic mail address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please specify a valid email format.";
    }
    if (!message.trim()) {
      errors.message = "Communications detail payload is required.";
    } else if (message.trim().length < 15) {
      errors.message = "Message must be at least 15 characters long.";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request processing
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText("hello@anaskhan.studio");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.warn("[Clipboard] Copy failed:", err);
    }
  };

  const projectTypes = ["Infrastructure Scaling", "Model Training", "Edge SDK Integration"];

  return (
    <div className="mx-auto max-w-xl px-6 md:px-8 py-16 md:py-24 animate-[fadeIn_0.6s_ease-out]">
      {/* Back Button */}
      <Link
        href="/"
        className="group text-xs font-mono text-muted-foreground hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 mb-12"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> 
        BACK TO PORTFOLIO
      </Link>

      {isSuccess ? (
        <div className="text-center py-12 animate-[fadeIn_0.5s_ease-out]">
          <span className="text-xs font-mono text-green-500 uppercase font-bold tracking-[0.25em] block mb-4">
            [TRANSMISSION SUCCESS]
          </span>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground mb-4">
            Inquiry Logged
          </h1>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 max-w-md mx-auto">
            Your project payload has been successfully dispatched to our studio queue. An AI systems engineer will review your parameters and contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setName("");
              setEmail("");
              setProjectType("Infrastructure Scaling");
              setMessage("");
            }}
            className="text-xs font-mono tracking-widest border border-border px-6 py-3 text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 uppercase cursor-pointer"
          >
            Send Another Transmission
          </button>
        </div>
      ) : (
        <div>
          <header className="mb-12">
            <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4 animate-[fadeIn_0.5s_ease-out]">
              05 // INITIATE COMMUNICATIONS
            </span>
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-foreground mb-4">
              Partner with Us
            </h1>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Optimize model inference scales and distributed cloud systems. Fill out the infrastructure metrics below to request a slot in our queue.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-2">
                Name / Studio Identifier
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                }}
                className={`w-full px-4 py-3 rounded-none bg-muted/20 border ${
                  formErrors.name ? "border-accent focus:border-accent" : "border-border focus:border-foreground"
                } text-foreground text-sm font-light transition-all duration-300 outline-none`}
                placeholder="e.g. John Doe"
              />
              {formErrors.name && (
                <span className="text-[10px] font-mono text-accent block mt-1.5 font-bold uppercase tracking-wider">
                  {formErrors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-2">
                Electronic Mail Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                }}
                className={`w-full px-4 py-3 rounded-none bg-muted/20 border ${
                  formErrors.email ? "border-accent focus:border-accent" : "border-border focus:border-foreground"
                } text-foreground text-sm font-light transition-all duration-300 outline-none`}
                placeholder="e.g. email@studio.com"
              />
              {formErrors.email && (
                <span className="text-[10px] font-mono text-accent block mt-1.5 font-bold uppercase tracking-wider">
                  {formErrors.email}
                </span>
              )}
            </div>

            {/* Project Type Grid */}
            <div>
              <label className="block text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3">
                Scope of Partnership
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-3 border font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      projectType === type
                        ? "border-accent bg-accent-muted text-accent font-bold"
                        : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-2">
                Inquiry Specifications
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessage(e.target.value);
                    }
                    if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                  }}
                  rows={6}
                  maxLength={500}
                  className={`w-full px-4 py-3 rounded-none bg-muted/20 border ${
                    formErrors.message ? "border-accent focus:border-accent" : "border-border focus:border-foreground"
                  } text-foreground text-sm font-light transition-all duration-300 outline-none resize-none`}
                  placeholder="Tell us about the model parameters, cluster specs, compute budget, and performance targets..."
                />
                <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground mt-1.5 tracking-widest">
                  <span className="text-[8px] text-accent/80">* REQUIRED (MIN 15 CHARS)</span>
                  <span>{message.length} / 500 CHARACTERS</span>
                </div>
              </div>
              {formErrors.message && (
                <span className="text-[10px] font-mono text-accent block mt-1.5 font-bold uppercase tracking-wider">
                  {formErrors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs font-mono tracking-widest bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-300 uppercase font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "TRANSMITTING TELEMETRY..." : "DISPATCH INQUIRY &rarr;"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Named fallback component that includes copy capabilities
export function ContactOfflineFallback() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText("hello@anaskhan.studio");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.warn("[Clipboard] Copy failed:", err);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center animate-[fadeIn_0.5s_ease-out]">
      <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
        [TERMINAL INACTIVE]
      </span>
      <h1 className="text-3xl font-extralight tracking-tight text-foreground mb-4">
        Direct Channels Open
      </h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
        The automated contact terminal is currently offline. 
        For inquiries, proposal reviews, or emergency consulting, please copy our address directly:
      </p>
      <div className="mb-10 p-6 border border-border bg-muted/10">
        <button
          onClick={handleCopyEmail}
          className="text-lg md:text-xl font-mono text-foreground hover:text-accent transition-colors duration-300 font-bold block mx-auto cursor-pointer focus:outline-none"
        >
          {emailCopied ? "EMAIL COPIED ✓" : "hello@anaskhan.studio"}
        </button>
        <span className="block text-[10px] font-mono text-muted-foreground uppercase mt-2">
          EST. RESPONSE TIME &mdash; 4 HOURS // CLICK TO COPY
        </span>
      </div>
      <Link
        href="/"
        className="text-xs font-mono tracking-widest border border-foreground px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase font-semibold"
      >
        &larr; Return to Studio Home
      </Link>
    </div>
  );
}
