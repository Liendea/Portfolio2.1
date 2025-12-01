// --- Typer för den utgående datan ---
export type GithubStats = {
  totalCommits: number;
  topLanguages: { name: string; size: number; percentage: number }[];
};

// --- Typer för GitHub GraphQL Svaret ---
interface GraphQLLocation {
  line: number;
  column: number;
}

export interface GraphQLError {
  message: string;
  locations?: GraphQLLocation[]; // Kan vara valfri
  path?: (string | number)[]; // Kan peka ut var i datat felet skedde
}

interface LanguageEdge {
  size: number;
  node: {
    name: string;
  };
}

interface RepositoryNode {
  languages: {
    edges: LanguageEdge[];
  };
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
      repositories: {
        nodes: RepositoryNode[];
      };
    };
  };
  errors?: GraphQLError[]; // Fel från GraphQL kan finnas
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const USER_STATS_QUERY = `
  query getUserStats($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
      repositories(first: 100, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
        nodes {
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Hämtar statistik från GitHub med GraphQL.
 */
export async function getGithubStats(
  username: string
): Promise<GithubStats | null> {
  if (!process.env.GITHUB_TOKEN) {
    console.error(
      "GITHUB_TOKEN saknas i .env-filen. Kan inte hämta GitHub-data."
    );
    return null;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: USER_STATS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`GitHub API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    // Använder den strikta typen här:
    const { data, errors } = (await res.json()) as GraphQLResponse;

    if (errors) {
      // VIKTIGT: Skriver ut vad som faktiskt är fel!
      console.error(
        "GraphQL Errors:",
        errors.map((e) => e.message)
      );
      return null;
    }

    // Förkortad till data.user för enkelhet
    const userData = data.user;

    // --- Processera den hämtade datan ---
    const totalContributions =
      userData.contributionsCollection.contributionCalendar.totalContributions;

    const languageCounts: { [key: string]: number } = {};

    // Använder de strikta typerna för loopen
    userData.repositories.nodes.forEach((repo: RepositoryNode) => {
      repo.languages.edges.forEach((edge: LanguageEdge) => {
        const langName = edge.node.name;
        const langSize = edge.size;
        languageCounts[langName] = (languageCounts[langName] || 0) + langSize;
      });
    });

    const topLanguages = Object.keys(languageCounts)
      .map((name) => ({ name, size: languageCounts[name] }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);

    // Räkna ut procent

    const allLanguagesForTotal = Object.keys(languageCounts).map((name) => ({
      name,
      size: languageCounts[name],
    }));

    const totoalLanguageSize = allLanguagesForTotal.reduce(
      (sum, lang) => sum + lang.size,
      0
    );

    const topLanguagesWithPercentage = topLanguages.map((lang) => ({
      ...lang,
      percentage: Math.round(((lang.size / totoalLanguageSize) * 1000) / 10),
    }));
    console.log(topLanguagesWithPercentage);
    return {
      totalCommits: totalContributions,
      topLanguages: topLanguagesWithPercentage,
    };
  } catch (error) {
    console.error("Fel vid hämtning av GitHub-statistik:", error);
    return null;
  }
}
