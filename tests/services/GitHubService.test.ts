import { GitHubService } from "@/services/GitHubService"
import { Octokit } from "@octokit/rest"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mockOctokit = {
  search: {
    code: vi.fn(),
  },
}

describe("GitHubService", () => {
  const service = new GitHubService(mockOctokit as unknown as Octokit)

  beforeEach(() => {
    vi.mocked(mockOctokit.search.code).mockReset()
  })

  it("should find files in an organization without topics", async () => {
    const mockResponse = {
      data: {
        items: [
          {
            path: "package.json",
            repository: { full_name: "test-org/repo1" },
            html_url:
              "https://github.com/test-org/repo1/blob/main/package.json",
          },
        ],
      },
    }
    mockOctokit.search.code.mockResolvedValue(mockResponse)

    const results = await service.findFileInOrg("test-org", "package.json")

    expect(results).toHaveLength(1)
    expect(results[0].repository).toBe("test-org/repo1")
    expect(mockOctokit.search.code).toHaveBeenCalledWith({
      q: "org:test-org filename:package.json",
      per_page: 100,
    })
  })

  it("should find files in an organization with topics", async () => {
    const mockResponse = {
      data: {
        items: [
          {
            path: "package.json",
            repository: { full_name: "test-org/repo2" },
            html_url:
              "https://github.com/test-org/repo2/blob/main/package.json",
          },
        ],
      },
    }
    mockOctokit.search.code.mockResolvedValue(mockResponse)

    const results = await service.findFileInOrg("test-org", "package.json", [
      "nodejs",
    ])

    expect(results).toHaveLength(1)
    expect(results[0].repository).toBe("test-org/repo2")
    expect(mockOctokit.search.code).toHaveBeenCalledWith({
      q: "org:test-org filename:package.json topic:nodejs",
      per_page: 100,
    })
  })

  it("should return an empty array when no files are found", async () => {
    const mockResponse = {
      data: {
        items: [] as Array<{
          path: string
          repository: { full_name: string }
          html_url: string
        }>,
      },
    }
    mockOctokit.search.code.mockResolvedValue(mockResponse)

    const results = await service.findFileInOrg("test-org", "nonexistent.file")

    expect(results).toHaveLength(0)
  })

  it("should throw an error when the GitHub API fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    const apiError = new Error("GitHub API Error")
    mockOctokit.search.code.mockRejectedValue(apiError)

    await expect(
      service.findFileInOrg("test-org", "package.json")
    ).rejects.toThrow(apiError)

    consoleErrorSpy.mockRestore()
  })
})
