import { getGithubStats, GithubStats } from "../../../lib/github-api";
import LanguageBar from "../topLanguage/LanguageBar";
// import Image from "next/image"; // För att visa ikoner senare

// Detta är konfigurationsdatan som kommer direkt från Sanity via GROQ
type statsBlockType = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
  wakatimeUsername?: string; // Valfri
};

type StatsRendererProps = {
  statsBlock: statsBlockType;
};

export default async function GithubStatsRenderer({
  statsBlock,
}: StatsRendererProps) {
  // 1. Hämta konfigurationsdata från Sanity
  const { githubUsername, sectionTitle } = statsBlock;
  console.log(sectionTitle);
  // 2. Anropa den server-side funktionen
  // Detta anrop använder din hemliga GITHUB_TOKEN säkert på servern.
  const githubStats: GithubStats | null = await getGithubStats(githubUsername);

  // 3. Hantera fel vid datahämtning
  if (!githubStats) {
    return (
      <>
        <h4>{sectionTitle}</h4>
        <p className="error-message">Coming soon</p>
      </>
    );
  }

  // 4. Rendera det dynamiska innehållet
  return (
    <>
      <h4 className="section-title">{sectionTitle}</h4>

      <div className="github-stats-container">
        {/* --- A. Commits --- */}
        <div className="stat-card commit-stat">
          <h3>{githubStats.totalCommits.toLocaleString()}</h3>
          <p>Commits this year</p>
        </div>

        {/* --- B. Toppspråk --- */}
        <div className="stat-card language-stat">
          <p className="card-title">Most used language</p>
          <LanguageBar topLanguages={githubStats.topLanguages} />
        </div>
      </div>
    </>
  );
}
