# GitHub Apps Framework

A robust and scalable framework designed to accelerate the development of GitHub Apps. Built with a focus on clean architecture, modern tooling, and best practices, it provides a solid foundation so you can focus on building features, not boilerplate.

## Core Technologies

This framework is built upon a modern, efficient, and type-safe stack:

- **[TypeScript](https://www.typescriptlang.org/)**: For robust, type-safe code.
- **[pnpm](https://pnpm.io/)**: For fast and efficient package management.
- **[@octokit/rest](https://github.com/octokit/rest.js)**: As the primary client for interacting with the GitHub API.
- **[SWC](https://swc.rs/)**: For high-speed TypeScript and JavaScript compilation.
- **[Vitest](https://vitest.dev/)**: For fast and modern unit testing.
- **[Dotenv](https://github.com/motdotla/dotenv)**: For managing environment variables.

## Features

- **Clean Architecture**: A clear separation of concerns with a modular structure (`services`, `config`, `types`).
- **Pre-configured Tooling**: TypeScript, SWC, and Vitest are set up out-of-the-box with sensible defaults.
- **Path Aliasing**: Use `@/` to import modules from the `src` directory, keeping imports clean.
- **Ready-to-Use GitHub Service**: Includes an example `GitHubService` with dependency injection for easy testing and extension.
- **Scalable by Design**: The object-oriented approach makes it easy to add new services, handlers, and logic.

---

## Getting Started

Follow these steps to get your local development environment up and running.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation)

### 2. Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/github-apps-framework.git
    cd github-apps-framework
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### 3. Environment Configuration

1.  **Create a `.env` file** by copying the example file:

    ```bash
    cp .env.example .env
    ```

2.  **Set your GitHub Token:**
    Open the `.env` file and add your GitHub Personal Access Token. The token requires at least the `repo` scope to read repository data.
    ```env
    # .env
    GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

---

## Usage

### Running the Application

To run the example application, first configure the target organization in `src/app.ts`, then run:

```bash
pnpm start
```

This command will first compile the TypeScript code using SWC into the `dist` directory and then execute it with Node.js.

### Building for Production

To compile the TypeScript source code without running the application, use:

```bash
pnpm build
```

The compiled JavaScript output will be placed in the `dist/` directory.

### Running Tests

To run the unit tests with Vitest, execute:

```bash
pnpm test
```

---

## Project Structure

The framework follows a clean and intuitive folder structure:

```
.
├── src/
│   ├── app.ts            # Main application entry point
│   ├── config/           # Configuration files (e.g., Octokit client)
│   ├── services/         # Business logic (e.g., GitHubService)
│   └── types/            # TypeScript type definitions and interfaces
├── tests/
│   └── services/         # Unit tests for services
├── .env.example          # Example environment variables
├── .gitignore            # Files to be ignored by Git
├── .swcrc                # SWC compiler configuration
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # pnpm lockfile
├── tsconfig.json         # TypeScript compiler configuration
└── vitest.config.ts      # Vitest configuration
```

## How to Extend the Framework

This framework is designed to be extended. Here are some common ways to build upon it:

### Adding a New Service

1.  Create a new class in the `src/services/` directory (e.g., `PullRequestService.ts`).
2.  Define methods within the class to handle specific logic (e.g., creating, labeling, or closing pull requests).
3.  Inject dependencies like the `Octokit` client through the constructor for better testability.

### Handling Webhooks

(Future-proofing for a full GitHub App)

While not yet implemented, the intended architecture for a full GitHub App would involve:

1.  Creating an `events/` directory.
2.  Using a library like `@octokit/webhooks` to create a webhook handler.
3.  Creating `Handler` classes (e.g., `IssueHandler.ts`, `PullRequestHandler.ts`) that use your services to act on webhook events.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
