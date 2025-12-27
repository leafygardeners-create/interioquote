# Backend Architecture

This backend is designed as a modular, stateless service suitable for serverless deployment (e.g., AWS Lambda) or a containerized Node.js app.

## Folder Structure

```
src/
├── api/             # API Controllers and Route Definitions
│   └── routes.ts    # Endpoint definitions
├── data/            # Static Data & Seed Files
│   ├── rate_card.json
│   └── scope_definitions.json
├── engine/          # Core Domain Logic
│   └── PricingEngine.ts # The deterministic pricing calculator
├── models/          # TypeScript Interfaces / Data Models
│   └── types.ts     # Shared types
└── services/        # Business Logic Services
    └── QuoteService.ts # Orchestrates data retrieval and engine calls
```

## Key Components

### 1. Pricing Engine (`src/engine/PricingEngine.ts`)
The heart of the system. It takes `UserRooms` + `UserSelections` + `ScopeDefinitions` + `RateCard` and outputs a `BOQ`.
It is **deterministic**: The same input always yields the same output.

### 2. Data Models (`src/models/types.ts`)
Strict typing ensures that formulas and rate lookups rely on consistent properties.

### 3. API Layer (`src/api/routes.ts`)
Thin layer responsible for request validation and invoking the `QuoteService`.
