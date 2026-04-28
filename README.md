<img width="959" height="413" alt="image" src="https://github.com/user-attachments/assets/85a52ea7-a2ef-4edc-9953-1abb9770fded" />



# Ecommerce Full Stack Project

Tech Stack:
- React (Frontend)
- Spring Boot (Backend)
- MySQL Database

## Run Frontend
cd frontend
npm install
npm start

## Run Backend
cd backend
mvn spring-boot:run

## Detailed Information

# 🛒 shop.admin — E-Commerce Application

A Spring Boot monolithic e-commerce admin panel with a dark-themed UI for managing users, products, orders, payments, and shipments.

**Stack:** Java 17 · Spring Boot 4.0.4 · MySQL 8.0 · Apache Tomcat (embedded)  
**Base URL:** `http://localhost:8080` · **Author:** Ankit Singh · March 2026

---

## 🚀 Quick Start

**Prerequisites:** Java 17, MySQL 8.0+, Maven 3.9+

```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE ecommerce_db;"

# 2. Set your DB password in src/main/resources/application.properties
spring.datasource.password=YOUR_PASSWORD

# 3. Run
mvn spring-boot:run
```

App starts at `http://localhost:8080`

---

## 🖥️ UI Screens

The admin panel has 7 screens accessible from the left sidebar:

| Screen | What you can do |
|---|---|
| **Dashboard** | Overview stats (users, products, orders, active modules) + Quick Start Guide |
| **Users** | Register new users (name, email, password) · View all users |
| **Products** | Add products (name, price, stock, description) · View & delete products |
| **Cart** | Add items to a user's cart · View cart by User ID |
| **Orders** | Place orders · View all orders · Update order status via dropdown |
| **Payments** | Process payment for an order (amount + method) |
| **Shipments** | Create shipment with delivery address · Track shipment by ID |

---

## 📦 Modules & APIs

Base URL: `http://localhost:8080` · No authentication required

### Users `/api/users`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| GET | `/api/users` | List all users |
| GET | `/api/users/{id}` | Get user by ID |

### Products `/api/products`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Add a product |
| GET | `/api/products` | List all products |
| DELETE | `/api/products/{id}` | Delete a product |

### Cart `/api/cart`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart/user/{userId}` | View user's cart |
| DELETE | `/api/cart/{id}` | Remove cart item |

### Orders `/api/orders`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | List all orders |
| PUT | `/api/orders/{id}/status?status=SHIPPED` | Update status |

> Valid statuses: `PENDING` → `CONFIRMED` → `SHIPPED` → `DELIVERED`

### Payments `/api/payments`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payments` | Process a payment |
| GET | `/api/payments/order/{orderId}` | Get payments for an order |

> Supported methods: `UPI`, `CARD`, `CASH`, `NET_BANKING`

### Shipments `/api/shipments`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/shipments` | Create a shipment |
| GET | `/api/shipments/{id}` | Track a shipment |

---

## 🔄 End-to-End Flow

```
Register User → Add Product → Add to Cart → Place Order → Make Payment → Create Shipment → Update Order Status
```

---

## ⚠️ Known Limitations

- No authentication — all endpoints are public
- Passwords stored as plain text (use BCrypt in production)
- Payment always returns `SUCCESS` — no real gateway integrated
- No stock deduction on order placement

---

## 🔮 Planned Improvements

- Spring Security + JWT auth
- Razorpay/Stripe payment integration
- Input validation with `@Valid`
- Swagger UI (`springdoc-openapi`)
- Docker support
