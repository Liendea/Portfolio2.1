import type { StatsBlock } from "@/src/sanity/types/sanity";
import GithubStatsRenderer from "./statRenderers/GithubStatsRenderer";
import styles from "./Stats.module.scss";

type statsProps = {
  statsBlock: StatsBlock;
};

export default function StatisticSection({ statsBlock }: statsProps) {
  return (
    <section className={styles.statsSection}>
      <GithubStatsRenderer statsBlock={statsBlock} />
    </section>
  );
}
