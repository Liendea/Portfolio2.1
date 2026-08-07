type SpacerProps = {
  size: "small" | "medium" | "large" | "xlarge";
};

export default function Spacer({ size }: SpacerProps) {
  // Här mappar vi dina Sanity-värden till CSS-klasser eller pixlar
  const spacingMap = {
    small: "2rem", // 32px
    medium: "4rem", // 64px
    large: "8rem", // 128px
    xlarge: "12rem", // ~200px
  };

  return (
    <div style={{ height: spacingMap[size] || "4rem" }} aria-hidden="true" />
  );
}
