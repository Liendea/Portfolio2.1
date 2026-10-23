import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

// Länkar sparade utan protokoll ("www.linkedin.com/…") tolkas annars som
// relativa sökvägar på sajten. Gäller data sparad innan valideringen fanns.
function normalizeHref(href?: string): string {
  if (!href) return "#";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/.test(href)) return href;
  return `https://${href.replace(/^\/+/, "")}`;
}

// Renderar Portable Text från richTextBlock-schemat.
// Styling sätts av föräldern via className.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => {
      const href = normalizeHref(value?.href);
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          // Ligger inuti klickbara element (t.ex. CaseItem) - länken ska
          // inte också toggla föräldern.
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </a>
      );
    },
  },
};

type RichTextProps = {
  value?: PortableTextBlock[];
  className?: string;
};

export default function RichText({ value, className }: RichTextProps) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
