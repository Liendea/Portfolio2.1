"use client";

type AccordionItemProps = {
  title: string;
  text?: string;
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordionItem({
  title,
  text,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      className={`accordion-item${isOpen ? " accordion-item--open" : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="accordion-item__row">
        <h3 className="accordion-item__title">{title}</h3>
        <span className="accordion-item__icon" aria-hidden="true">
          <span className="accordion-item__icon-line accordion-item__icon-line--vertical" />
          <span className="accordion-item__icon-line accordion-item__icon-line--horizontal" />
        </span>
      </div>

      <div className="accordion-item__content">
        {text?.split("\n").map((line, index) => (
          <p key={index} className="accordion-item__text">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
