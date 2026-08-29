# To-Do Application (GitOps on Red Hat OpenShift)

A cloud-native 3-tier To-Do web application deployed using GitOps principles on Red Hat OpenShift (Developer Sandbox) with Argo CD.

## Architecture & Monorepo Structure

```text
todo-app-gitops/
├── apps/
│   ├── ui/                 # Angular 18 Web App + Nginx
│   ├── api-gateway/        # Spring Cloud Gateway
│   └── backend/            # Spring Boot REST API + H2 DB
├── charts/
│   └── todo-app-chart/     # Reusable Helm Chart (Deployments, Services, Route)
├── gitops/
│   ├── argocd-apps/        # Argo CD Application manifests
│   └── environments/       # Environment-specific values (dev / prod)
└── argo-app.yaml           # Root Argo CD Application definition

## Getting Started

### Prerequisites

* Java 17+ & Maven 3.8+
* Node.js 18+ & Angular CLI
* `oc` (OpenShift CLI) logged into your Red Hat Developer Sandbox.
* Red Hat OpenShift GitOps Operator (Argo CD) installed.

### Local Development

1. **Start Backend**:
   ```bash
   cd backend
   mvn spring-boot:run


2. API Gateway
   cd apps/api-gateway
   mvn spring-boot:run

3. ui
   cd apps/ui
   npm install
   ng serve


## Architectural Decision: Monorepo vs. Multi-Repo

This showcase project uses a **Monorepo** design for simplification and to be able to test locally:

* **Simplified Onboarding:** Readers can clone a single repository and immediately run or deploy the full 3-tier stack without managing multiple Git remote access tokens or links.
* **Atomic Versioning:** Code changes in microservices and corresponding Helm chart updates stay synchronized in a single Git commit.

> **Enterprise Production Note:** In enterprise environments, a **Multi-Repo** strategy is recommended. Decoupling application source code (`ui`, `api-gateway`, `backend`), shared Helm charts (`charts`), and environment manifests (`gitops`) into separate repositories enforces strict RBAC permissions, limits deployment blast radius, and supports organizational team boundaries (e.g., Application Developers vs. Platform Security Teams).


## OpenShift Developer Sandboxed cluster
https://developers.redhat.com/developer-sandbox
Or https://sandbox.redhat.com/
