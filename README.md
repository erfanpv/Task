# Employee Management System

A modern Next.js application for managing employees and departments with secure authentication.

## Features

- ✅ **Next.js 14** with App Router and Server Actions
- ✅ **TypeScript** for type safety
- ✅ **Secure Authentication** with JWT tokens stored in HTTP-only cookies
- ✅ **Server Actions** for API calls (no client-side API calls)
- ✅ **Modern UI** with Tailwind CSS and custom components
- ✅ **Department Management** (Create, Read, Delete)
- ✅ **Responsive Design** for all screen sizes
- ✅ **Error Handling** and loading states
- ✅ **Protected Routes** with middleware

## API Integration

The application integrates with the Employee API at `https://employee-react.onrender.com/emp`

### Authentication
- **Register**: `POST /register` (name, email, password)
- **Login**: `POST /login` (email, password)

### Departments
- **List**: `GET /departments` (requires token)
- **Get One**: `GET /department/{deptId}` (requires token)
- **Create**: `POST /add-department` (dept_name, description, requires token)
- **Delete**: `DELETE /delete-department/{deptId}` (requires token)

### Authorization Header
⚠️ **Important**: The API requires the token to be passed directly in the Authorization header, not as a Bearer token:
```
Authorization: <token>
```
NOT:
```
Authorization: Bearer <token>
```

## Project Structure

```
├── app/
│   ├── actions/          # Server Actions
│   │   ├── auth.ts       # Authentication actions
│   │   └── departments.ts # Department actions
│   ├── dashboard/        # Dashboard page
│   ├── departments/      # Department management
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page (redirects)
├── components/
│   └── ui/              # Reusable UI components
├── lib/
│   ├── api.ts           # API client
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # Utility functions
├── types/
│   └── index.ts         # TypeScript type definitions
└── README.md
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Register** a new account or **login** with existing credentials
2. **View departments** on the dashboard
3. **Create new departments** using the "Add Department" button
4. **View department details** by clicking on a department card
5. **Logout** when finished

## Security Features

- **HTTP-only cookies** for token storage (prevents XSS attacks)
- **Secure token transmission** with proper Authorization header
- **Protected routes** with middleware
- **Server-side validation** and error handling
- **CSRF protection** with SameSite cookie policy

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Server Actions** - Server-side data mutations
- **HTTP-only Cookies** - Secure token storage

## Best Practices Implemented

- ✅ **Server Actions** for all API calls
- ✅ **Centralized API logic** in `/lib/api.ts`
- ✅ **TypeScript** throughout the application
- ✅ **Proper folder structure** following Next.js conventions
- ✅ **Secure token storage** in HTTP-only cookies
- ✅ **Error handling** with user-friendly messages
- ✅ **Loading states** for better UX
- ✅ **Responsive design** for mobile compatibility
- ✅ **Component reusability** with proper abstraction
- ✅ **Environment-based configuration** for security

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is for educational purposes.
