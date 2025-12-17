# 🎓 Campus Hub - Role-Based College Portal API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.16.3-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44.4-orange.svg)](https://orm.drizzle.team/)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-red.svg)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A comprehensive REST API for a college portal system with role-based access control. Built with modern JavaScript technologies to manage users, courses, announcements, results, and course materials efficiently.

## ✨ Features

- **🔐 Role-Based Authentication**: Secure JWT-based authentication with three user roles:

  - **Student**: Access personal results, enrolled courses, and announcements
  - **Faculty**: Manage courses, materials, and student results
  - **Admin**: Full system administration including user management

- **📚 Course Management**: Create, update, and manage courses with associated materials
- **📢 Announcements**: System-wide and course-specific announcements
- **📊 Results Management**: Track and update student academic results
- **📁 Material Sharing**: Upload and organize course materials
- **🛡️ Secure API**: Input validation with Zod, password hashing, and cookie-based sessions

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod schema validation
- **Password Security**: Salted hashing
- **Development**: ES modules, hot reload with `--watch`
- **Containerization**: Docker Compose for database

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Docker and Docker Compose

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AniketDey06/Role-Based-College-Portal-API.git
   cd Role-Based-College-Portal-API
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start PostgreSQL database**

   ```bash
   docker-compose up -d
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   PORT=8000
   DATABASE_URL=postgresql://postgres:admin@localhost:5432/postgres
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. **Database Migration**

   ```bash
   pnpm run db:push
   ```

6. **Start the development server**
   ```bash
   pnpm run dev
   ```

The API will be running at `http://localhost:8000`

## 📖 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Announcements

- `GET /announcement` - Get all announcements
- `POST /announcement` - Create announcement (Faculty/Admin)
- `PUT /announcement/:id` - Update announcement
- `DELETE /announcement/:id` - Delete announcement

### Courses

- `GET /courses` - Get all courses
- `POST /courses` - Create course (Faculty/Admin)
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `GET /courses/:id/materials` - Get course materials

### Results

- `GET /result` - Get user results
- `POST /result` - Add/update results (Faculty/Admin)
- `PUT /result/:id` - Update specific result
- `DELETE /result/:id` - Delete result

### Admin

- `GET /admin/users` - Get all users (Admin only)
- `PUT /admin/users/:id` - Update user role
- `DELETE /admin/users/:id` - Delete user

## 🗂️ Project Structure

```
src/
├── controllers/          # Request handlers
├── db/                   # Database connection
├── middlewares/          # Authentication middleware
├── models/               # Database schemas
├── routers/              # API routes
├── services/             # Business logic
├── utils/                # Utilities (hashing, tokens, constants)
└── validations/          # Input validation schemas
```

## 🧪 Development

### Database Management

- **View Database**: `pnpm run db:studio` (opens Drizzle Studio)
- **Push Schema Changes**: `pnpm run db:push`

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open database management UI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aniket Dey**

- Website: [aniketdey.in](https://aniketdey.in)
- GitHub: [@AniketDey06](https://github.com/AniketDey06)

---

⭐ If you find this project helpful, please give it a star!
