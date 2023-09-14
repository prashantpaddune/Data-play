# 🚀 Data Play: SQL Query Builder

> Data Play is your sandbox for mastering SQL queries in an interactive environment.

## 🌐 Overview

Data Play allows users to craft, test, and master your SQL skills with Data Play. By harnessing the capabilities of modern technologies and focusing on user experience, this platform is suited for both SQL novices and experts.

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Performance](#-performance)
- [Getting Started](#-getting-started)
- [Contributions](#-contributions)
- [License](#-license)

## 🧰 Tech Stack

Here's a list of the primary tools, libraries, and frameworks that power Data Play:

- **[Next.js](https://nextjs.org/)**: Our Frontend framework, offering blazing-fast load times with server-side rendering.
- **[ace-builds](https://www.npmjs.com/package/ace-builds)** & **[react-ace](https://github.com/securingsincity/react-ace)**: The backbone of our SQL editor, providing syntax highlighting, error checking, and auto-completion.
- **[Express.js](https://expressjs.com/)**: Our server-side champion, facilitating API requests, and more.
- **[PostgreSQL](https://www.npmjs.com/package/pg/)**: Our database choice for live SQL executions.
- **[Styled-components](https://styled-components.com/)**: For crafting a sleek UI with a component-first approach.
- **[@tanstack/react-table](https://react-table.tanstack.com/)**: Powers the tables displaying query results.
- **[axios-hooks](https://github.com/simoneb/axios-hooks)** & **[axios](https://github.com/axios/axios)**: Our go-to for promise-based HTTP requests.
- **[react-virtual](https://github.com/tannerlinsley/react-virtual)**: Ensures smooth table virtualization for extensive datasets.
- **[express-rate-limit](https://github.com/nfriedly/express-rate-limit)**: Protects our backend from malicious request flooding.
- **[csv-parser](https://github.com/mafintosh/csv-parser)**: Utilized for parsing CSV data when needed.
- **[pnpm](https://pnpm.io/)**: Efficient and fast package management using a shared store.
- **[pm2](https://pm2.keymetrics.io/)**: Production process manager for Node.js applications.

## ⚡ Performance

**Average Page Load Time:** 1.1 s - This benchmark was established using Google Chrome's DevTools.

## 📁 Project Structure

This project uses `pnpm` workspaces to manage multiple packages in the repository:

- `client`: Contains the frontend Next.js application.
- `server`: Houses the Express.js backend server.

## 🚀 Getting Started


1. Clone this repository:

```bash
git clone https://github.com/prashantpaddune/Data-play && cd Data-play
```

2. Install the dependencies:

```bash
pnpm install
```

3. Env Setup with your credentials:

```bash
cp .env.sample .env
```

4. Start backend server:

```bash
cd packages/server && pm2 start npm --name 'data-play-server' -- start
```

5. Start frontend server:

```bash
cd packages/client && pm2 start npm --name 'data-play-client' -- start
```

## 📜 License
MIT