type DividerProps = {
  layout: "full" | "centered";
  padding: "none" | "small" | "large";
};

export default function Divider({ layout, padding }: DividerProps) {
  const paddingMap = {
    none: "0",
    small: "2rem",
    large: "6rem",
  };

  const dividerStyle = {
    width: layout === "centered" ? "150px" : "100%",
    margin: layout === "centered" ? "0 auto" : "0",
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Justera efter din design
    border: "none",
  };

  return (
    <div style={{ padding: `${paddingMap[padding]} 0`, width: "100%" }}>
      <hr style={dividerStyle} />
    </div>
  );
}
