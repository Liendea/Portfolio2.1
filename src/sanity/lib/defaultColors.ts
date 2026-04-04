const colors = [
  { title: "Primary", value: "#12302d" },
  { title: "Secondary", value: "#d7ffc6" },
  { title: "Third", value: "#0a201e" },
  { title: "White", value: "#ffffff" },
  { title: "Black", value: "#000" },
];

// Formatera färgerna för @sanity/color-input
const colorSwatches = colors.map((c) => ({
  hex: c.value,
  title: c.title,
}));

export { colors, colorSwatches };
