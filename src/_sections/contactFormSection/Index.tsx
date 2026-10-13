"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.scss";

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

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("Kontaktformulär:", response.status, data);
        throw new Error(data.detail ?? data.error ?? "Request failed");
      }
      setStatus("success");
    } catch (error) {
      console.error(error);
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
      <section className={styles.contactForm}>
        <p className={styles.contactFormSuccess}>
          Thanks — your message has been sent.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.contactForm}>
      <form onSubmit={handleSubmit}>
        {step.id === "needs" && (
          <>
            <div className="form__heading">
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>{needsLabel}</h4>
            </div>

            <div className={styles.contactFormCheckboxGroup}>
              {needsOptions.map((option, i) => (
                <label key={i} className={styles.contactFormCheckbox}>
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>
                {businessNameLabel}
              </h4>
            </div>

            <input
              className={styles.contactFormInput}
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>{budgetLabel}</h4>
            </div>
            <input
              className={styles.contactFormInput}
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>
                {locationLabel}
              </h4>{" "}
            </div>
            <input
              className={styles.contactFormInput}
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>{messageLabel}</h4>
            </div>
            <textarea
              className={`${styles.contactFormInput} ${styles.contactFormInputTextarea}`}
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>{nameLabel}</h4>
            </div>
            <input
              className={styles.contactFormInput}
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
            <h4 className={styles.contactFormQuestion}>{emailLabel}</h4>
            <input
              className={styles.contactFormInput}
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
              <p className={styles.contactFormKicker}>
                {String(stepIndex + 1).padStart(3, "0")}
              </p>{" "}
              <h4 className={styles.contactFormQuestion}>
                Review your answers
              </h4>
            </div>
            <dl className={styles.contactFormReview}>
              <div className={styles.contactFormReviewRow}>
                <dt>Needs</dt>
                <dd>{needs.length > 0 ? needs.join(", ") : "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Business name</dt>
                <dd>{businessName || "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Budget</dt>
                <dd>{budget || "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Location</dt>
                <dd>{location || "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Message</dt>
                <dd>{message || "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Name</dt>
                <dd>{name || "-"}</dd>
              </div>
              <div className={styles.contactFormReviewRow}>
                <dt>Email</dt>
                <dd>{email || "-"}</dd>
              </div>
            </dl>
          </>
        )}

        {status === "error" && (
          <p className={styles.contactFormError}>
            Something went wrong — please try again or email me directly.
          </p>
        )}

        <div className={styles.contactFormNav}>
          <button
            type="button"
            className={styles.contactFormBack}
            onClick={goBack}
            disabled={isFirstStep}
          >
            Back
          </button>

          <button
            type="submit"
            className={styles.contactFormSubmit}
            disabled={!isStepValid() || status === "sending"}
          >
            {isLastStep
              ? status === "sending"
                ? "Sending..."
                : submitButtonText
              : "Next"}
          </button>
        </div>

        <div className={styles.contactFormSteps}>
          {steps.map((s, i) => (
            <button
              type="button"
              key={s.id}
              className={`${styles.contactFormStep}${
                i === stepIndex ? ` ${styles.contactFormStepActive}` : ""
              }`}
              onClick={() => setStepIndex(i)}
            >
              {i + 1}
              {i === stepIndex && (
                <span className={styles.contactFormStepLabel}>
                  {" "}
                  {s.navLabel}
                </span>
              )}
            </button>
          ))}
        </div>
      </form>
    </section>
  );
}
