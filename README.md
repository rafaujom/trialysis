# Trialysis

> A clinical trial data explorer powered by Next.js, React Server Components, and AI-generated summaries.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-181717?style=flat-square&logo=github)

---

## Overview

Trialysis is a portfolio project built to explore the core stack used in modern health-tech platforms. It lets you upload a CSV of clinical trial records, filter results interactively, and generate an AI-powered summary of the data — all using Next.js App Router, React Server Components, and the Anthropic API.

Built as a learning project targeting the following skills:

- Next.js App Router and React Server Components
- TypeScript-first data modeling
- Client/Server Component boundaries
- REST API routes in Next.js
- Tailwind CSS for UI
- Dockerized deployment
- GitHub Actions CI pipeline

---

## Features

- **CSV Upload** — drag and drop or select a CSV file of trial records
- **Interactive Filtering** — filter by drug, outcome, and date range with instant results
- **AI Summary** — click to generate a plain-language summary of the visible data via the Anthropic API
- **Server-first rendering** — data is fetched and rendered on the server; no client waterfalls
- **Fully containerized** — runs anywhere with a single `docker compose up`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| CSV Parsing | PapaParse |
| AI | Anthropic API (Claude) |
| Containerization | Docker + Docker Compose |
| CI | GitHub Actions |

---

## Project Structure

```
trialysis/
├── app/
│   ├── layout.tsx          # Root layout with sidebar navigation
│   ├── page.tsx            # Home / redirect
│   ├── explore/
│   │   └── page.tsx        # Server Component — renders trial table
│   ├── upload/
│   │   └── page.tsx        # CSV upload page
│   └── api/
│       └── summarize/
│           └── route.ts    # POST — calls Anthropic API, returns summary
├── components/
│   ├── CsvUploader.tsx     # Client Component — file input + PapaParse
│   ├── TrialTable.tsx      # Client Component — filterable data table
│   └── SummaryCard.tsx     # Client Component — AI summary with loading state
├── lib/
│   └── mock-trials.ts      # Static mock data for development
├── types/
│   └── trial.ts            # TrialRow, Outcome, Patient types
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- An [Anthropic API key](https://console.anthropic.com/)

### 1. Clone and install

```bash
git clone https://github.com/your-username/trialysis.git
cd trialysis
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

> **Never commit `.env.local`** — it is already in `.gitignore`.

### 3. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running with Docker

### Build and run

```bash
docker build -t trialysis .
docker run -p 3000:3000 --env-file .env.local trialysis
```

### Using Docker Compose

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000).

---

## CSV Format

Upload a `.csv` file with the following columns:

```
trial_id, drug_name, patient_age, patient_sex, dosage_mg, outcome, start_date, end_date
T001, DrugA, 45, F, 100, improved, 2023-01-10, 2023-04-10
T002, DrugB, 52, M, 200, no_change, 2023-02-01, 2023-05-01
```

A sample file is available at `public/sample-trials.csv`.

---

## API Reference

### `POST /api/summarize`

Accepts a JSON body with trial rows and returns an AI-generated plain-language summary.

**Request**

```json
{
  "trials": [
    { "trial_id": "T001", "drug_name": "DrugA", "outcome": "improved", ... }
  ]
}
```

**Response**

```json
{
  "summary": "Out of 12 trials analyzed, 8 showed improvement..."
}
```

---

## CI Pipeline

On every push and pull request, GitHub Actions runs:

```yaml
- tsc --noEmit      # TypeScript type check
- eslint .          # Linting
```

See `.github/workflows/ci.yml` for the full configuration.

---

## Roadmap

- [x] Project scaffold with Next.js App Router
- [x] CSV upload and parsing
- [x] Client-side filtering
- [x] React Server Component data rendering
- [x] AI summary via Anthropic API
- [x] Docker + Docker Compose
- [x] GitHub Actions CI
- [ ] Argo Workflows integration (batch analysis pipeline)
- [ ] Authentication with NextAuth.js
- [ ] Export filtered results as CSV
- [ ] Chart visualizations (Chart.js)

---

## License

MIT