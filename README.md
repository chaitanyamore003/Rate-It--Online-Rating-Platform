
<img width="1380" height="752" alt="full logo" src="https://github.com/user-attachments/assets/820c0fdd-e10b-448e-a1cb-34f38226c218" />

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/Supabase-Hosting-3FCF8E?style=for-the-badge&logo=supabase"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens"/>
</p>

# Rate It — Online Rating Platform

A full-stack rating platform where users can discover stores and submit ratings, store owners can manage their store and monitor customer feedback, and administrators can manage the entire platform.

Built with **React, Node.js, Express.js, PostgreSQL, and Supabase**.

---

## 📸 Screenshots

### 🔐 Authentication

**Login**

<img width="1440" height="786" alt="Screenshot 2026-09-20 203503" src="https://github.com/user-attachments/assets/e6c1f1ab-f949-4a9f-903b-8dbfe6945138"/>


**Change Password**

<img width="1440" height="786" alt="Screenshot 2026-09-20 202209" src="https://github.com/user-attachments/assets/174e5534-c9b7-4ef5-98c8-3aeab6bd26e3" />


---

### 👤 User Experience

**User Dashboard**

<img width="1440" height="786" alt="Screenshot 2026-09-20 202159" src="https://github.com/user-attachments/assets/1eb1fe67-5af7-4bd1-9101-15b2f2f109c6" />


---

### 🏪 Store Owner

**Owner Dashboard**

<img width="1440" height="784" alt="Screenshot 2026-09-20 202254" src="https://github.com/user-attachments/assets/3b66e35f-d310-48f9-a5a2-74cb3787bef1" />


**Store Setup**

<img width="1440" height="786" alt="Screenshot 2026-09-20 204237" src="https://github.com/user-attachments/assets/13cf93c6-f7be-4323-a992-c6961078090f" />

---

### 🛡️ Administrator

**Platform Overview**

<img width="1440" height="788" alt="Screenshot 2026-09-20 195653" src="https://github.com/user-attachments/assets/3568aee5-c88b-4c1d-919b-464c2aaa477f" />

**User Management**

<img width="1440" height="786" alt="Screenshot 2026-09-20 195646" src="https://github.com/user-attachments/assets/a06e0227-4972-46e6-bb5c-9c823b92bec0" />

**Store Management**

<img width="1440" height="784" alt="Screenshot 2026-09-20 195704" src="https://github.com/user-attachments/assets/fd18ef56-2e04-4854-95fc-20d3da8bb024" />

---

## 🔐 Demo Accounts

You can use the following demo accounts to explore the different roles and features of **Rate It**.

> **Note:** These credentials are for demonstration purposes only. Do not use them for real or sensitive data.

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 👑 Admin | `admin@example.com` | `Hello@123` | Admin Dashboard, Users & Stores |
| 👤 User | `rahul@example.com` | `Hello@123` | Browse Stores & Manage Ratings |
| 👤 User | `priya@example.com` | `Hello@123` | Browse Stores & Manage Ratings |
| 🏪 Owner | `amit@example.com` | `Hello@123` | Store Dashboard & Ratings |
| 🏪 Owner | `neha@example.com` | `Hello@123` | Store Dashboard & Ratings |
| 🏪 Owner | `rohan@example.com` | `Hello@123` | Store Dashboard & Ratings |

### Suggested Demo Flow

**User**
- Browse available stores
- Search stores
- View overall ratings
- Submit, update, and remove ratings

**Store Owner**
- View owned store
- View customer ratings
- View store rating statistics

**Admin**
- View platform statistics
- Manage users
- Manage stores
- Filter and search platform data

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Persistent authentication across page refreshes
- Current-user lookup
- Password change
- Protected routes
- Automatic handling of invalid or expired tokens
- Secure password hashing using bcrypt

### 👥 Role-Based Authorization

The application supports three roles:

| Role | Capabilities |
|---|---|
| `NORMAL_USER` | Browse stores and manage personal ratings |
| `STORE_OWNER` | Create and manage a store, view customer ratings |
| `ADMIN` | Manage users, stores, and platform statistics |

Authorization is enforced on the backend using authentication and role-based middleware.

---

## 👤 User Features

Users can:

- Browse all registered stores
- Search stores by name
- View store addresses
- View overall store ratings
- View their own rating for each store
- Submit a rating from 1 to 5
- Update an existing rating
- Remove their rating
- Change their password

Each user can have only **one rating per store**.

If a user rates the same store again, the existing rating is updated rather than creating a duplicate record.

---

## 🏪 Store Owner Features

Store owners have a dedicated dashboard. An owner can:

- Create a store if they don't already have one
- View store information
- View average store rating
- View total number of ratings
- View customer ratings and rating dates
- Monitor customer feedback

### One Store Per Owner

Each owner can have **zero or one store**.

When an owner first logs in:

```text
Does the owner have a store?
          │
     ┌────┴────┐
     │         │
    NO        YES
     │         │
     ▼         ▼
Setup Store   Store Dashboard
     │
     ▼
Create Store
     │
     ▼
Store Dashboard
```

The one-store restriction is enforced by the backend and the database rather than relying on the frontend alone.

---

## 🛡️ Admin Features

Administrators can:

- View platform statistics
- View, search, and filter users
- View individual user information
- Add users
- View, search, filter, and sort stores
- Add stores
- View store rating statistics

---

## ⭐ Rating System

Ratings are stored on a scale of:

```text
1 ★ → 5 ★
```

A rating belongs to:

```text
User + Store
```

The database prevents duplicate ratings using a unique constraint on:

```text
(user_id, store_id)
```

### Rating Operations

```text
POST   /api/ratings
PUT    /api/ratings/:storeId
DELETE /api/ratings/:storeId
```

Users can therefore:

```text
Create Rating
     ↓
Update Rating
     ↓
Remove Rating
```

The store's overall rating is calculated dynamically from all ratings associated with that store.

For example:

```text
5
4
3
5
────
4.25  Average
```

---

## 🧱 Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Express Validator
- Morgan
- CORS

### Database

- PostgreSQL
- Supabase

### Development Tools

- Nodemon
- ESLint

---

## 🏗️ Architecture

The project follows a layered backend architecture.

```text
                    React + Vite
                         │
                         │ REST API
                         ▼
                    Express.js
                         │
              ┌──────────┴──────────┐
              │                     │
           Routes                Middleware
              │                     │
              │          ┌──────────┴──────────┐
              │          │                     │
              │   Authentication        Authorization
              │          │                     │
              └──────────┴──────────┬──────────┘
                                    │
                                    ▼
                              Controllers
                                    │
                                    ▼
                              Repositories
                                    │
                                    ▼
                           PostgreSQL / Supabase
```

### Backend Request Flow

```text
Client Request
      ↓
Route
      ↓
Authentication Middleware
      ↓
Authorization Middleware
      ↓
Validation Middleware
      ↓
Controller
      ↓
Repository
      ↓
PostgreSQL
      ↓
Response
```

This separation keeps routing, authentication, authorization, business logic, and database access cleanly organized.

---

## 📁 Project Structure

```text
Rate It - Online Rating Platform/
│
├── frontend/
│   ├── public/
│   │   └── logo.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StarRating.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminStores.jsx
│   │   │   │   └── AdminUsers.jsx
│   │   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── ChangePassword.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   │
│   │   │   ├── DashBoard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── OwnerDashboard.jsx
│   │   │   │   └── UserDashboard.jsx
│   │   │   │
│   │   │   ├── error/
│   │   │   │   └── NotFound.jsx
│   │   │   │
│   │   │   └── StoresList.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── owner.controller.js
│   │   │   ├── ratings.controller.js
│   │   │   └── store.controller.js
│   │   │
│   │   ├── db/
│   │   │   ├── index.js
│   │   │   ├── ratings.repository.js
│   │   │   ├── stats.repository.js
│   │   │   ├── store.repository.js
│   │   │   └── users.repository.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── user.authentication.middleware.js
│   │   │   └── validations/
│   │   │       ├── auth.validation.middleware.js
│   │   │       └── ratings.validation.middleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── owner.routes.js
│   │   │   ├── ratings.routes.js
│   │   │   └── store.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   ├── login.png
│   ├── user-dashboard.png
│   ├── stores-list.png
│   ├── rating-store.png
│   ├── owner-dashboard.png
│   ├── store-setup.png
│   ├── admin-dashboard.png
│   ├── admin-users.png
│   ├── admin-stores.png
│   └── change-password.png
│
└── README.md
```

---

## 🗄️ Database Design

The application uses PostgreSQL hosted through Supabase.

### Users

Stores user accounts and authentication information.

```text
id
name
email
password_hash
address
role
created_at
updated_at
```

Roles:

```text
NORMAL_USER
STORE_OWNER
ADMIN
```

### Stores

Stores information about registered stores.

```text
id
name
email
address
owner_id
created_at
updated_at
```

Each store belongs to an owner. Each owner can have at most one store.

### Ratings

Stores ratings submitted by users.

```text
id
user_id
store_id
rating
created_at
updated_at
```

The database uses:

```text
UNIQUE(user_id, store_id)
```

to prevent a user from creating multiple ratings for the same store.

---

## 🔐 Authentication

Authentication is implemented using JWT.

After login, the server generates a token containing authenticated user information. The frontend stores the token and Axios automatically attaches it to protected requests:

```text
Authorization: Bearer <token>
```

The backend then verifies the token through authentication middleware.

```text
JWT
 ↓
authenticateUser
 ↓
Verify Token
 ↓
req.user
 ↓
authorizeRoles()
```

Example:

```js
authorizeRoles("ADMIN")
```

allows only authenticated administrators to access the route.

---

## 🔄 Application Flows

### User Flow

```text
Register
   ↓
Login
   ↓
User Dashboard
   ↓
Browse Stores
   ↓
Search Stores
   ↓
Rate Store
   ↓
Update / Remove Rating
```

### Owner Flow

```text
Register as STORE_OWNER
       ↓
Login
       ↓
Owner Dashboard
       ↓
Check Store
       │
   ┌───┴────┐
   │        │
  None    Exists
   │        │
   ▼        ▼
Setup     Store
Store     Dashboard
   │
   ▼
Create Store
   │
   ▼
Store Dashboard
```

### Admin Flow

```text
Login
  ↓
Admin Dashboard
  │
  ├── Users
  │    ├── Search
  │    ├── Filter
  │    └── View User
  │
  └── Stores
       ├── Search
       ├── Filter
       ├── Sort
       └── View Store
```

---

## 🔌 API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signUp` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current authenticated user |
| PUT | `/api/auth/update-password` | Change password |

### Stores

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stores` | Browse / search stores |
| GET | `/api/stores/:id` | Get store details |
| GET | `/api/stores/my-store` | Get current owner's store |
| POST | `/api/stores/my-store` | Create owner's store |

### Ratings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ratings` | Create rating |
| PUT | `/api/ratings/:storeId` | Update rating |
| DELETE | `/api/ratings/:storeId` | Remove rating |

### Admin

Administrative APIs provide:

- Dashboard statistics
- User management
- Store management
- User search and filtering
- Store search and filtering
- Administrative sorting
- Store rating information

All administrative APIs are protected by the `ADMIN` role.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd "Rate It - Online Rating Platform"
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
DATABASE_URL=your_supabase_postgresql_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

> Never commit `.env` or database credentials to GitHub.

Recommended `.gitignore` entries:

```text
.env
node_modules/
dist/
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 🛡️ Security

The application includes:

- bcrypt password hashing
- JWT authentication
- Protected frontend routes
- Backend authentication middleware
- Role-based authorization
- Input validation
- Database constraints
- User-specific rating authorization
- One-store-per-owner enforcement
- Environment-based secrets

Sensitive credentials are kept outside the source code using environment variables.

---

## 🚀 Future Improvements

- Pagination
- Advanced store search
- Store profile pages
- Owner profile management
- Store editing
- Admin store deletion
- Rating analytics and charts
- Email notifications
- Production deployment
- Automated unit and integration tests
- Swagger / OpenAPI documentation
- Improved notification system

---

## 📚 What This Project Demonstrates

- Full-stack web development
- React application architecture
- REST API development
- Node.js and Express.js
- PostgreSQL database design
- Supabase
- JWT authentication
- Role-based authorization
- Middleware
- Repository pattern
- CRUD operations
- Relational database relationships
- Secure password hashing
- Frontend / backend API integration
- Protected routing
- Form validation
- Responsive UI
- Error handling
- State management

---

## 👨‍💻 Author

**Chaitanya More**

B.Tech — Information Technology

---

## 📄 License

This project is created for educational and portfolio purposes.
