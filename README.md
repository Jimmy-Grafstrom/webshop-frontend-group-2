# Webshop Frontend - Group 2

Frontend client for the agile webshop microservices architecture. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## 1. Prerequisites

- **Node.js**: v22.x (or LTS)
- **npm**: v10+
- **Backend services**: Running locally

---

## 2. Getting Started

### Clone the repository
Clone the repository and navigate into the project directory:
```zsh
cd webshop-frontend-group-2
```

### Install dependencies
```zsh
npm install
```

### Start development server
```zsh
npm run dev
```
The application runs locally on `http://localhost:5173`.

---

## 3. Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite local development server with HMR |
| `npm run build` | Compiles TypeScript and packages production output in `dist/` |
| `npm run preview` | Serves the production build locally for verification |

---

## 4. Project Structure

```text
src/
├── assets/        # Static assets (images, icons)
├── components/    # Reusable presentation components
├── pages/         # Page-level routed views (Home, Products, Login, etc.)
├── service/       # API clients and HTTP communication (Auth, Products)
├── test/          # Unit and component tests
├── types/         # TypeScript interfaces and data models (DTOs)
├── App.tsx        # Application root and route definitions
├── index.css      # Tailwind CSS entrypoint
└── main.tsx       # React DOM entrypoint
```
