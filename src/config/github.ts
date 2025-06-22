import { Octokit } from "@octokit/rest"
import "dotenv/config"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  throw new Error(
    "GitHub token not found. Please set GITHUB_TOKEN in your .env file"
  )
}

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})
