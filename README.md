# Universal VAT

A web-based Vulnerability Assessment Tool (VAT) that guides assessors through a structured series of questions to evaluate client vulnerability across key domains. Upon completion, the tool generates either a **DESC Mini VAT** (extended scoring) or a **CCS Simple VAT** (compact score) for submission to service providers.

## Features

- **Client identification** via HMIS UID with assessment date tracking
- **Four assessment domains**: Housing History, Risks, Socialization & Daily Functioning, and Wellness
- **Multiple question types**: multiple choice, yes/no, and narrative responses
- **Follow-up questions** triggered by specific answers
- **Two output formats**:
  - **DESC Mini VAT** — extended scoring with domain-by-domain breakdown, individual question scores, risk levels per domain, and all narrative responses
  - **CCS Simple VAT** — compact composite score with visual indicators, domain summary bars, and key findings
- **Print-ready** output pages for PDF generation or physical printing

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
