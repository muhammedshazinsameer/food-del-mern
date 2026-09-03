# Product Requirements Document (PRD)

## 1. Product Overview
**Product Name:** Layali Food Delivery

Layali Food Delivery is a web-based food ordering platform that allows customers to browse food items, manage a cart, place orders, make online payments, and view previous orders. Administrators manage food items and customer orders through a separate admin application.

## 2. Goals
- Provide a simple food ordering experience.
- Support customer registration and login.
- Display food items by category.
- Add, remove, and update cart quantities.
- Place and track orders.
- Support Stripe online payments.
- Provide administration of food items and orders.

## 3. Users
### Customer
Browses food, manages the cart, places orders, pays online, and views order history.

### Administrator
Manages food items and monitors, updates, and deletes orders.

## 4. Functional Requirements
### Authentication
- User registration and login.
- JWT-based authentication for protected operations.

### Food Catalogue
- Display food items with name, description, price, image, and category.
- Allow administrators to add and remove food items.

### Cart
- Add food items.
- Increase or decrease quantities.
- Remove items when quantity reaches zero.
- Calculate cart totals.

### Orders
- Collect delivery details.
- Create and store orders.
- Display customer orders.
- Process payments through Stripe.
- Verify payment status.

### Administration
- Separate admin interface.
- Food management.
- Order listing.
- Order status updates.
- Order deletion.

## 5. Non-Functional Requirements
- Responsive user interface.
- REST API architecture.
- MongoDB persistence.
- Environment variables for secrets and configuration.
- Independent frontend, admin, and backend deployment.

## 6. Technology Stack
- React and Vite
- React Router
- Node.js and Express
- MongoDB
- JWT
- Stripe
- Netlify
- Render

## 7. Success Criteria
A customer can browse food, authenticate, add items to a cart, modify quantities, enter delivery details, place an order, complete payment, and view the order. An administrator can manage food items and orders.
