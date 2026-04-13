type TopLanguage = {
  name: string;
  size: number;
  percentage: number;
};

type LanguageBarProps = {
  topLanguages: TopLanguage[];
};

const getColorGradient = (index: number) => {
  const gradients = [
    { start: "#6fc0f2", end: "#00b5f1" }, // Blå (Ljus till mörk)
    { start: "#f6eeb1", end: "#d4bf13" }, // Gul (Ljus till mörk)
    { start: "#60b5ff", end: "#0e4068" }, // Ljusblå (Ljus till mörk)
    { start: "#f49f94", end: "#f46812" }, // Röd/Orange (Ljus till mörk)
    { start: "#f0bbf1", end: "#e328ea" }, // Lila (Ljus till mörk)
  ];
  return gradients[index % gradients.length];
};

export default function LanguageBar({ topLanguages }: LanguageBarProps) {
  if (!topLanguages || topLanguages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="stacked-bar-chart">
        {topLanguages.map((language, index) => {
          const { start, end } = getColorGradient(index);
          return (
            <div
              key={language.name}
              className="bar-segment"
              style={{
                width: `${language.percentage}%`,
                backgroundImage: `linear-gradient(90deg, ${start} 0%, ${end} 100%)`,
              }}
              title={`${language.name}: ${language.percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>

      <div className="language-legend">
        {topLanguages.map((language, index) => {
          const { start } = getColorGradient(index);
          return (
            <div key={language.name} className="legend-item">
              <span className="color-dot" style={{ backgroundColor: start }} />
              {language.name} ({language.percentage.toFixed(1)}%)
            </div>
          );
        })}
      </div>
    </>
  );
}
