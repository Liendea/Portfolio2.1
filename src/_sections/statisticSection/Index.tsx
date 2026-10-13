import GithubStatsRenderer from "./statRenderers/GithubStatsRenderer";
import styles from "./Stats.module.scss";

type statsBlockType = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
};

type statsProps = {
  statsBlock: statsBlockType;
};

export default function StatisticSection({ statsBlock }: statsProps) {
  return (
    <section className={styles.statsSection}>
      <GithubStatsRenderer statsBlock={statsBlock} />
    </section>
  );
}
