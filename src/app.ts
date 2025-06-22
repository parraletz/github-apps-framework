import { octokit } from "@/config/github"
import { GitHubService } from "@/services/GitHubService"

const main = async () => {
  // --- Configuration ---
  const organization = "your-github-organization" // <-- TODO: Change this to your organization
  const filenameToSearch = "package.json"
  const topicsToFilterBy = ["javascript", "typescript"] // Optional: leave empty for no topic filter

  if (organization === "your-github-organization") {
    console.warn(
      "Please change the 'organization' variable in src/app.ts before running."
    )
    return
  }

  console.log(
    `Searching for '${filenameToSearch}' in organization '${organization}'...`
  )
  if (topicsToFilterBy.length > 0) {
    console.log(`Filtering by topics: ${topicsToFilterBy.join(", ")}`)
  }

  // --- Service Execution ---
  const githubService = new GitHubService(octokit)

  try {
    const results = await githubService.findFileInOrg(
      organization,
      filenameToSearch,
      topicsToFilterBy
    )

    // --- Display Results ---
    if (results.length === 0) {
      console.log("No files found matching the criteria.")
    } else {
      console.log(`Found ${results.length} file(s):`)
      results.forEach((file) => {
        console.log(
          `- Repo: ${file.repository}, Path: ${file.path}, URL: ${file.url}`
        )
      })
    }
  } catch (error) {
    console.error("An error occurred during the search:", error)
  }
}

main()
