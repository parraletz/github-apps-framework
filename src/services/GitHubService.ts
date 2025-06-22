import { SearchResult } from "@/types"
import { Octokit } from "@octokit/rest"

export class GitHubService {
  constructor(private octokit: Octokit) {}

  async findFileInOrg(
    org: string,
    filename: string,
    topics: string[] = []
  ): Promise<SearchResult[]> {
    const qualifiers = [
      `org:${org}`,
      `filename:${filename}`,
      ...topics.map((topic) => `topic:${topic}`),
    ]
    const query = qualifiers.join(" ")

    try {
      const response = await this.octokit.search.code({
        q: query,
        per_page: 100, // Adjust as needed
      })

      return response.data.items.map((item) => ({
        repository: item.repository.full_name,
        path: item.path,
        url: item.html_url,
      }))
    } catch (error) {
      console.error("Error searching for file in organization:", error)
      throw error
    }
  }
}
