# Low-Level Design (LLD)

## 1. Project Structure

```text
food-del-mern/
├── admin/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── pages/
        ├── App.jsx
        └── main.jsx
```

## 2. Frontend Design
`StoreContext` manages shared state and operations including food retrieval, cart management, authentication token handling, and API communication.

The API base URL is read using:

```js
const url = import.meta.env.VITE_API_URL;
```

Main React routes include:

```text
/          Home
/cart      Cart
/Order     Place Order
/verify    Payment Verification
/myorders  User Orders
```

## 3. Backend Design
The Express backend follows a route-controller-model structure.

### API Groups
```text
/api/food
/api/user
/api/cart
/api/order
```

### Main Responsibilities
- Food controllers manage food items.
- User controllers manage registration and login.
- Cart controllers manage cart operations.
- Order controllers create and retrieve orders.
- Stripe integration creates and verifies payment sessions.

## 4. Data Models

### User
```text
_id
name
email
password
cartData
```

### Food
```text
_id
name
description
price
image
category
```

### Order
```text
_id
userId
items
amount
address
status
payment
date
```

## 5. API Endpoints

### Food
```text
GET  /api/food/list
POST /api/food/add
POST /api/food/remove
```

### User
```text
POST /api/user/register
POST /api/user/login
```

### Cart
```text
POST /api/cart/add
POST /api/cart/remove
POST /api/cart/get
```

### Order
```text
POST /api/order/place
POST /api/order/userorders
POST /api/order/verify
GET  /api/order/list
POST /api/order/status
POST /api/order/delete
```

## 6. Authentication Flow

```text
Login -> Validate credentials -> Generate JWT -> Return token
      -> Frontend stores token -> Token sent with protected requests
```

## 7. Payment Flow

```text
Place Order
    |
    v
Create Order
    |
    v
Create Stripe Checkout Session
    |
    v
Customer Payment
    |
    v
Verify Payment
   / \
Success Failure
  |      |
  v      v
Paid   Cancel/Delete
```

## 8. Environment Configuration

Local frontend:
```env
VITE_API_URL=http://localhost:4000
```

Production frontend:
```env
VITE_API_URL=https://food-del-mern-r8jg.onrender.com
```

Backend secrets such as MongoDB and Stripe credentials remain in backend environment variables.

## 9. Error Handling
The application handles invalid credentials, missing authentication tokens, empty carts, invalid IDs, failed API requests, database errors, and failed payment verification.

## 10. Security
- Keep Stripe secret keys out of frontend code.
- Do not commit `.env` or `.env.local`.
- Use JWT authentication for protected operations.
- Validate request data.
- Keep database credentials in environment variables.
- Restrict administrative operations to authorized administrators.
