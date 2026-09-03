# High-Level Design (HLD)

## 1. System Overview
Layali Food Delivery uses separate customer frontend, admin frontend, and backend services. The backend communicates with MongoDB for persistent data and Stripe for payment processing.

## 2. Architecture

```text
Customer
   |
   v
React Customer Frontend (Netlify)
   |
   | REST API / HTTP
   v
Node.js + Express Backend (Render)
   |                    |
   v                    v
MongoDB                Stripe
Database               Payments

Administrator
   |
   v
React Admin Frontend (Netlify)
   |
   | REST API / HTTP
   v
Express Backend
```

## 3. Major Components

### Customer Frontend
Provides:
- Home page
- Food catalogue
- Categories
- Cart
- Authentication
- Checkout
- Payment verification
- Order history

### Admin Frontend
Provides:
- Food list
- Food management
- Order list
- Order status management
- Order deletion

### Backend
Provides REST APIs for food, users, cart, orders, and payments.

### Database
MongoDB stores users, food items, cart data, and orders.

### Payment Service
Stripe Checkout handles online payment processing.

## 4. Deployment
- Customer frontend: Netlify
- Admin frontend: Netlify
- Backend: Render
- Database: MongoDB
- Payment provider: Stripe

## 5. Configuration
The frontend backend URL is configured with `VITE_API_URL`. Local development points to `http://localhost:4000`; production points to the deployed Render API.

Sensitive database and Stripe credentials are stored in environment variables and must not be committed to Git.

## 6. Main Data Flows

### Food Browsing
```text
User -> React -> GET /api/food -> Express -> MongoDB
     <- Food response <- Express
```

### Order and Payment
```text
User -> Checkout -> Express -> MongoDB
                         |
                         v
                       Stripe
                         |
                         v
                    Verification
                         |
                         v
                    Order status
```

## 7. Scalability
Frontend and backend services are independently deployable. The backend can be scaled independently as request volume grows.
