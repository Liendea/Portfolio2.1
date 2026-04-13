import GithubStatsRenderer from "./statRenderers/GithubStatsRenderer";

type statsBlockType = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
  wakatimeUsername?: string; // Valfri
};

type statsProps = {
  statsBlock: statsBlockType;
};

export default function StatisticSection({ statsBlock }: statsProps) {
  return (
    <section className="stats-section">
      <GithubStatsRenderer statsBlock={statsBlock} />
    </section>
  );
}
