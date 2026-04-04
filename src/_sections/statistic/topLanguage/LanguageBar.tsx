type TopLanguage = {
  name: string;
  size: number;
  percentage: number;
};

type LanguageBarProps = {
  topLanguages: TopLanguage[];
};

const getColor = (index: number): string => {
  const colors = [
    "#F7DF1E", // Gul (t.ex. JavaScript)
    "#007ACC", // Blå (t.ex. Typescript)
    "#4497dbff", // Annan blå (t.ex. Python)
    "#DE4B35", // Röd (t.ex. HTML/CSS)
    "#ea29e7ff", // Lila (t.ex. Vue/Sass)
  ];
  return colors[index % colors.length];
};

export default function LanguageBar({ topLanguages }: LanguageBarProps) {
  if (!topLanguages || topLanguages.length === 0) {
    return null;
  }

  return (
    <>
      {/* 1. SJÄLVA STACKADE STAPELN */}
      <div className="stacked-bar-chart">
        {topLanguages.map((language, index) => (
          <div
            key={language.name}
            className="bar-segment"
            style={{
              // Bredden sätts av procenten
              width: `${language.percentage}%`,
              // Färgen sätts av vår getColor funktion
              backgroundColor: getColor(index),
            }}
            // Accessibility: kan visa info vid hover
            title={`${language.name}: ${language.percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* 2. Visar legenden (språk & procent) ovanför stapeln */}
      <div className="language-legend">
        {topLanguages.map((language, index) => (
          <div key={language.name} className="legend-item">
            <span
              className="color-dot"
              style={{
                backgroundColor: getColor(index),
              }}
            />
            {language.name} ({language.percentage.toFixed(1)}%)
          </div>
        ))}
      </div>
    </>
  );
}
