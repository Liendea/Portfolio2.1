import { getGithubStats, GithubStats } from "../../../lib/github-api";
import LanguageBar from "../topLanguage/LanguageBar";
import CommitCounter from "./CommitCounter";
import styles from "../Stats.module.scss";

// Detta är konfigurationsdatan som kommer direkt från Sanity via GROQ
type statsBlockType = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
};

type StatsRendererProps = {
  statsBlock: statsBlockType;
};

export default async function GithubStatsRenderer({
  statsBlock,
}: StatsRendererProps) {
  // 1. Hämta konfigurationsdata från Sanity
  const { githubUsername, sectionTitle } = statsBlock;

  // 2. Anropa den server-side funktionen
  // Detta anrop använder GITHUB_TOKEN säkert på servern.
  const githubStats: GithubStats | null = await getGithubStats(githubUsername);

  // 3. Hantera fel vid datahämtning
  if (!githubStats) {
    return (
      <>
        <p>{sectionTitle}</p>
        <p className="error-message">Could not fetch data</p>
      </>
    );
  }

  // 4. Rendera det dynamiska innehållet
  return (
    <>
      <div className={styles.githubStatsContainer}>
        {/* --- B. Toppspråk --- */}
        <div className={`${styles.statCard} ${styles.languageStat}`}>
          <p className={styles.cardTitle}>Most used languages</p>
          <LanguageBar topLanguages={githubStats.topLanguages} />
        </div>
        {/* --- A. Commits --- */}
        <div className={`${styles.statCard} ${styles.commitStat}`}>
          <p className={styles.cardTitle}>Total Commits this year</p>
          <CommitCounter totalCommits={githubStats.totalCommits} />
        </div>
      </div>
    </>
  );
}
