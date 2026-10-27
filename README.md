# Webshop Frontend - Group 2

Frontend client for the agile webshop microservices architecture. Built with React, TypeScript, Vite, and Tailwind CSS.

---
## 1. Responsibility

The frontend is the user inerface of the webshop.
It handles:

- Regristation, login and logout
- Product list and product details
- Shopping cart
- Checkout: creates an order, creates a payment and redirects the user to Stripe Checkout
- Pages fro completed (`/payment/success`) and cancelled (`/payment/cancel`) payments
- Admin pages (role `ADMIN` required): product overview (`/admin`) and a from for adding products (`/admin/add`)
- Protected routed that send logged out users to the login page

Frontend contains no business logic. Authorization is always enforces by the backend.

---

## 2. Technologies 

| Area | Technology |
| :--- | :--- |
| Language | TypeScript |
| UI library | React |
| Build tool and dev server | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Tests | Vitest, Testing Library, jsdom |
| API mocking | MSW (Mock Service Worker) |

---

## 3. Database

The Webshop frontend has no database. All data comes fron the backend through the gateway. 

---

## 4. Port

The development server runs on **http://localhost:5173**. The gateway's CORS configuration only allows this orgin.

---

## 5. Environment variables
Create a file named `.env.local` in the project root. 

| Variable | Description | Example |
| :--- | :--- | :--- |
| VITE_API_BASE_URL | Auth: login and registration | `https://gateway-server-latest.onrender.com/gateway` |
| VITE_PRODUCT_API_URL | Products | `https://gateway-server-latest.onrender.com/gateway/products` |
| VITE_API_ORDER_SERVICE_URL | Orders | `https://gateway-server-latest.onrender.com/gateway` |
| VITE_PAYMENT_API_URL | Payments | `https://gateway-server-latest.onrender.com/gateway/payment` |
| VITE_USE_MOCKS | true enables MSW in development | `false` |

All URL point to gateway and every request i prefixed iwth `/gateway`

---

## 6. Prerequisites

- **Node.js**: v22.x (or LTS)
- **npm**: v10+
- **Backend services**: Gateway 

---

## 7. Getting Started

### Clone the repository
Clone the repository and navigate into the project directory:
```bash
cd webshop-frontend-group-2
```

### Install dependencies
```bash
npm install
```

### Configure environment variables
create `.env.local` as in section 5


### Start development server
```bash
npm run dev
```
The application runs locally on `http://localhost:5173`.

---

## 8. Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite local development server with HMR |
| `npm run build` | Compiles TypeScript and packages production output in `dist/` |
| `npm run preview` | Serves the production build locally for verification |
| `npm test` | Runs the tests with Vitest in watch mode |
| `npm vitest run` | Runs the tests once |


---

## 9. Run without backend (MSW)

Set `VITE_USE_MOCKS=true` in `env.local` and restart. The handlers in `src/mocks/handlers.ts` then answer `GET /products`, `GET /product/id` and `GET auth/me.`, And no backend i needed. 
`GET /auth/me` is mocked to return the user `admin@example.com` with the role `ADMIN`. Only three request are mocked. 

The same handlers are used by the tests. `src/mocks/server.ts` runs them in node and `src/test/setup.ts` starts and stops the server around the tests.

---

## 10. How the system fits 

The system consists of fivs Spring Boot services plus a gateway. Tee front end only talks to the gateway.

```text
Frontend (React)
     |
     v
Gateway  --->  Auth-service
         --->  Product-service
         --->  Order-service   --->  RabbitMQ  --->  Email-service
         --->  Payment-service <-->  Stripe (checkout and webhook)
                      |
                      +--->  RabbitMQ
```

| Component | Responsibility |
| :--- | :--- |
| Gateway | Single entry point for the frontend. Forwards requests under `/gateway/...` to the right service. |
| Auth-service | Registration and login. Issues JWTs and publishes its public key (JWKS). |
| Product-service | Products, categories, image URL and stock. |
| Order-service | Creates orders. Fetches product data from product-service. |
| Payment-service | Creates Stripe Checkout sessions and receives Stripe's webhook. |
| Email-service | Listens to RabbitMQ and sends order confirmations. |

### Testing payments
 
Use Stripe's test card `4242 4242 4242 4242` with any expiry date and any CVC. 

### Admin
 
The admin pages require a user with the role `ADMIN`. Registration gives new users the role `USER`.

---

## 11. Project Structure

```text
src/
├── assets/        # Static assets (images, icons)
├── components/    # Reusable presentation components
├── mocks/         # MSW handlers for browser and tests
├── pages/         # Page-level routed views (Home, Products, Login, etc.)
├── service/       # API clients and HTTP communication (Auth, Products)
├── test/          # Unit and component tests
├── types/         # TypeScript interfaces and data models (DTOs)
├── App.tsx        # Application root and route definitions
├── index.css      # Tailwind CSS entrypoint
└── main.tsx       # React DOM entrypoint
```
