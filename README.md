# AIPortfolio: Full-Stack AI-Powered Developer Portfolio

A production-ready, full-stack personal portfolio system designed and engineered to showcase high-performance software engineering capability. Built with an ASP.NET Core Web API C# backend following Clean Architecture principles, and a React 19 + Tailwind CSS frontend featuring fluid Framer Motion animations and an interactive, stateful AI portfolio assistant.

---

## 🚀 Key Architectural Strengths
1. **Clean Architecture / SOLID**: Absolute segregation of concerns. Clear boundaries separating Domain Entities, Application CQRS-ready services, Infrastructure third-party proxies, and Presentation Controllers.
2. **Robust System Middlewares**: End-to-end telemetry correlation tracking, custom rolling IP rate limiter (25 req/min), request and performance logging, and central global exception interceptor.
3. **Advanced AI Integrations**: Server-side client proxy for Hugging Face Inference API and Google Gemini API, backed by self-recovering circuit-breakers and retry handlers.
4. **Pragmatic Production DevOps**: Containerized via multi-stage Dockerfiles, orchestrated with Docker Compose, and automated with GitHub Actions CI/CD.

---

## 🏗️ Architecture Design

```
                     ┌──────────────────────────────────────┐
                     │          React 19 Frontend           │
                     │  (Vercel SPA + Glassmorphism UI)     │
                     └──────────────────┬───────────────────┘
                                        │ (HTTP REST API / JSON)
                                        ▼
                     ┌──────────────────────────────────────┐
                     │       ASP.NET Core Web API (API)      │
                     │  - Controllers                       │
                     │  - Middlewares (Rate Limit, Log)     │
                     └──────────────────┬───────────────────┘
                                        │
                                        ▼
                     ┌──────────────────────────────────────┐
                     │          Application Layer           │
                     │  - IChatService, ChatService         │
                     │  - Data Transfer Objects (DTOs)      │
                     └──────────────────┬───────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
 ┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
 │         Infrastructure Layer         │ │             Domain Layer             │
 │  - HuggingFaceService                │ │  - Entities (Project, Skill)         │
 │  - ProjectRepository (Static Data)   │ │  - Interfaces (IHuggingFaceService)  │
 └──────────────────────────────────────┘ └──────────────────────────────────────┘
```

---

## 📂 Project Directory Structure

```
AIPortfolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions continuous automation pipeline
├── backend/
│   ├── src/
│   │   ├── Domain/               # Enterprise core logic, interfaces, and entities
│   │   ├── Application/          # Use cases, validation schemas, and orchestrations
│   │   ├── Infrastructure/       # Third-party proxies, local databases, and HTTP integration
│   │   └── API/                  # Controllers, settings, and pipeline configurations
│   ├── tests/
│   │   └── AIPortfolio.Tests/    # Hand-rolled unit test suites via xUnit
│   ├── AIPortfolio.sln           # Multi-project solution manifest
│   └── Dockerfile                # Multi-stage production container manifest
├── frontend/
│   ├── src/
│   │   ├── components/           # Modular visual components
│   │   ├── types.ts              # TypeScript structural definitions
│   │   └── App.tsx               # Primary single-page interface orchestrator
│   ├── index.html                # App template entrypoint
│   ├── package.json              # Client dependency manifest
│   └── vercel.json               # SPA routing configurations for Vercel
├── docker-compose.yml            # Local orchestration file
└── README.md                     # Comprehensive developer manual
```

---

## 💻 Tech Stack Specification

### Backend (C# .NET 8)
- **Framework**: ASP.NET Core Web API (.NET 8.0)
- **Design Pattern**: Domain-Driven Clean Architecture
- **Middlewares**: Custom Correlation ID Middleware, Global Exception Handlers, Custom IP-based sliding window rate limiter, Request-Response Performance Logger
- **Documentation**: Swagger UI / OpenAPI v3 Spec
- **Testing**: xUnit with hand-rolled fake dependencies to optimize execution times.

### Frontend (React 19)
- **Library**: React 19.0 (TypeScript)
- **Styling**: Tailwind CSS v4.0 with customized glassmorphism classes
- **Animations**: Framer Motion / Motion v12
- **Icons**: Lucide React
- **HTTP Client**: Axios & standard Browser Fetch API

### AI Systems
- **Primary Service**: Hugging Face Inference API (GPT-2 for general instruction set)
- **Integration Layer**: `IHuggingFaceService` with client factories, API-key authentication, auto-retry on 5xx errors, custom fallback recovery, and request timeouts.

---

## 🛠️ Local Installation & Setup

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js 20.x+](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/alexmercer-dev/AIPortfolio.git
cd AIPortfolio
```

### Step 2: Configure Secrets
Create an environment variable configuration file or set your secrets in your shell profile:
```bash
export HUGGING_FACE_API_KEY="your_hugging_face_token_here"
```

### Step 3: Run via Docker Compose
Build and launch the complete multi-container stack in one command:
```bash
docker-compose up --build
```
- Open `http://localhost:3000` to view the client-side portfolio dashboard.
- Open `http://localhost:5000/swagger` to inspect the live .NET Web API Swagger suite.

### Step 4: Run Locally for Development

#### 1. Launch Backend API
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project src/API/API.csproj
```
The backend API boots locally on `http://localhost:5000`.

#### 2. Launch Frontend Client
```bash
cd ../frontend
npm install
npm run dev
```
The development environment hot-reloads on `http://localhost:5173`.

---

## 🧪 Running Unit Tests
Unit tests are written in **xUnit** and mock complex server components to isolate test executions. Run the complete test suite via command-line:
```bash
cd backend
dotnet test AIPortfolio.sln
```

---

## 🌐 Deploying to Production

### Frontend (Vercel)
The client-side React SPA is structured to build out-of-the-box on Vercel:
1. Connect your repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Configure the Build Command to `npm run build` and Output Directory to `dist`.
4. Deploy.

### Backend (Render / Cloud Run)
The C# API is ready for Render or GCP Cloud Run deployment via the root `Dockerfile`:
1. Connect your repository to Render.
2. Select **Web Service** and use **Docker** runtime.
3. Configure Environment Variables (`ASPNETCORE_ENVIRONMENT=Production` and `HUGGING_FACE_API_KEY=xxx`).
4. Render automatically processes the multi-stage Docker file to expose port 5000.

---

## 🔮 Future Roadmap Improvements
- [ ] Implement EF Core with a PostgreSQL database on Render.
- [ ] Upgrade Hugging Face models to Meta-Llama-3-8B-Instruct for more fluent assistant chat dynamics.
- [ ] Add true OAuth2 integration for custom telemetry dashboard analytics.
