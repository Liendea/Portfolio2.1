"use client";

import { useState, type FormEvent } from "react";

type ContactFormSectionProps = {
  needsLabel?: string;
  needsOptions?: string[];
  businessNameLabel?: string;
  businessNamePlaceholder?: string;
  budgetLabel?: string;
  budgetPlaceholder?: string;
  locationLabel?: string;
  locationPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitButtonText?: string;
};

type Status = "idle" | "sending" | "success" | "error";

type StepId =
  | "needs"
  | "businessName"
  | "budget"
  | "location"
  | "message"
  | "name"
  | "email"
  | "review";

export default function ContactFormSection({
  needsLabel = "1. Needs",
  needsOptions = [],
  businessNameLabel = "2. What is your business or organisation's name?",
  businessNamePlaceholder = "Business name",
  budgetLabel = "3. What is your Budget?",
  budgetPlaceholder = "Budget",
  locationLabel = "4. Location",
  locationPlaceholder = "Location",
  messageLabel = "5. Message",
  messagePlaceholder = "Message",
  nameLabel = "6. Name",
  namePlaceholder = "Name",
  emailLabel = "7. Email",
  emailPlaceholder = "Email",
  submitButtonText = "Send",
}: ContactFormSectionProps) {
  const [needs, setNeeds] = useState<string[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [stepIndex, setStepIndex] = useState(0);

  // Ett steg per fråga. navLabel är den korta etiketten i stegraden
  // längst ner (bara den aktiva visas, som i referensbilden).
  const steps: { id: StepId; navLabel: string }[] = [
    { id: "needs", navLabel: "-Needs" },
    { id: "businessName", navLabel: "-Business" },
    { id: "budget", navLabel: "-Budget" },
    { id: "location", navLabel: "-Location" },
    { id: "message", navLabel: "-Message" },
    { id: "name", navLabel: "-Name" },
    { id: "email", navLabel: "-Email" },
    { id: "review", navLabel: "-Review" },
  ];

  const step = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const toggleNeed = (option: string) => {
    setNeeds((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  // Bara Namn och Email är obligatoriska - resten går att hoppa vidare
  // förbi tomma.
  const isStepValid = () => {
    if (step.id === "name") return name.trim().length > 0;
    if (step.id === "email") return email.trim().length > 0;
    return true;
  };

  const submitForm = async () => {
    setStatus("sending");

    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          needs,
          businessName,
          budget,
          location,
          message,
          name,
          email,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Formuläret är en enda <form> så Enter i ett fält går vidare till
  // nästa steg av sig själv
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isStepValid()) return;

    if (isLastStep) {
      submitForm();
    } else {
      setStepIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    setStatus("idle");
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  if (status === "success") {
    return (
      <section className="contact-form">
        <p className="contact-form__success">
          Thanks — your message has been sent.
        </p>
      </section>
    );
  }

  return (
    <section className="contact-form">
      <form onSubmit={handleSubmit}>
        {step.id === "needs" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{needsLabel}</p>
            </div>

            <div className="contact-form__checkbox-group">
              {needsOptions.map((option, i) => (
                <label key={i} className="contact-form__checkbox">
                  <input
                    type="checkbox"
                    checked={needs.includes(option)}
                    onChange={() => toggleNeed(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </>
        )}

        {step.id === "businessName" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{businessNameLabel}</p>
            </div>

            <input
              className="contact-form__input"
              type="text"
              placeholder={businessNamePlaceholder}
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              autoFocus
            />
          </>
        )}

        {step.id === "budget" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{budgetLabel}</p>
            </div>
            <input
              className="contact-form__input"
              type="text"
              placeholder={budgetPlaceholder}
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              autoFocus
            />
          </>
        )}

        {step.id === "location" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{locationLabel}</p>{" "}
            </div>
            <input
              className="contact-form__input"
              type="text"
              placeholder={locationPlaceholder}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              autoFocus
            />
          </>
        )}

        {step.id === "message" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{messageLabel}</p>
            </div>
            <textarea
              className="contact-form__input contact-form__input--textarea"
              placeholder={messagePlaceholder}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              autoFocus
            />
          </>
        )}

        {step.id === "name" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">{nameLabel}</p>
            </div>
            <input
              className="contact-form__input"
              type="text"
              placeholder={namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
              required
            />
          </>
        )}

        {step.id === "email" && (
          <>
            <p className="contact-form__question">{emailLabel}</p>
            <input
              className="contact-form__input"
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
              required
            />
          </>
        )}

        {step.id === "review" && (
          <>
            <div className="form__heading">
              <p className="contact-form__kicker">
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <p className="contact-form__question">Review your answers</p>
            </div>
            <dl className="contact-form__review">
              <div className="contact-form__review-row">
                <dt>Needs</dt>
                <dd>{needs.length > 0 ? needs.join(", ") : "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Business name</dt>
                <dd>{businessName || "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Budget</dt>
                <dd>{budget || "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Location</dt>
                <dd>{location || "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Message</dt>
                <dd>{message || "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Name</dt>
                <dd>{name || "-"}</dd>
              </div>
              <div className="contact-form__review-row">
                <dt>Email</dt>
                <dd>{email || "-"}</dd>
              </div>
            </dl>
          </>
        )}

        {status === "error" && (
          <p className="contact-form__error">
            Something went wrong — please try again or email us directly.
          </p>
        )}

        <div className="contact-form__nav">
          <button
            type="button"
            className="contact-form__back"
            onClick={goBack}
            disabled={isFirstStep}
          >
            Back
          </button>

          <button
            type="submit"
            className="contact-form__submit"
            disabled={!isStepValid() || status === "sending"}
          >
            {isLastStep
              ? status === "sending"
                ? "Sending..."
                : submitButtonText
              : "Next"}
          </button>
        </div>

        <div className="contact-form__steps">
          {steps.map((s, i) => (
            <button
              type="button"
              key={s.id}
              className={`contact-form__step${
                i === stepIndex ? " contact-form__step--active" : ""
              }`}
              onClick={() => setStepIndex(i)}
            >
              {i + 1}
              {i === stepIndex && (
                <span className="contact-form__step-label"> {s.navLabel}</span>
              )}
            </button>
          ))}
        </div>
      </form>
    </section>
  );
}
