# Employee Management System

A modern, full-stack department management application built with Next.js 16, TypeScript, and Tailwind CSS. This application provides department management capabilities with secure authentication and a responsive user interface.

## 🚀 Features

- **🔐 Authentication System**
  - User registration and login
  - Secure token-based authentication
  - Protected routes with middleware
  - Beautiful loading states during auth flows

- **📊 Department Management**
  - Create, view, and delete departments
  - Detailed department information pages
  - Real-time data updates with server actions
  - Responsive card-based layout

- **🎨 Modern UI/UX**
  - Built with Tailwind CSS for styling
  - Custom UI components (Button, Card, Input, Modal)
  - Smooth animations and transitions
  - Mobile-responsive design
  - Loading indicators and success states

- **⚡ Performance**
  - Next.js 16 with App Router
  - Server Actions for data mutations
  - TypeScript for type safety
  - Optimized build process

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.3.0
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: React Icons 5.5.0
- **State Management**: React Server Actions
- **Authentication**: Token-based with HTTP-only cookies

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── layout.tsx     # Auth layout
│   ├── actions/           # Server Actions
│   │   ├── auth.ts        # Authentication actions
│   │   └── departments.ts # Department actions
│   ├── departments/       # Department management
│   │   ├── page.tsx       # Departments list
│   │   ├── add/           # Add department
│   │   └── [id]/          # Department details
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── ui/               # Base UI components
│   └── ...               # Other components
├── lib/                  # Utility libraries
│   ├── api.ts            # API client
│   ├── auth.ts           # Authentication utilities
│   └── utils.ts          # General utilities
├── types/                # TypeScript type definitions
│   └── index.ts          # Main types
└── middleware.ts         # Next.js middleware for auth
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.dev .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. **Registration**: Users can create an account with name, email, and password
2. **Login**: Existing users authenticate with email and password
3. **Token Storage**: Authentication tokens are stored in HTTP-only cookies
4. **Protected Routes**: Middleware protects authenticated routes
5. **Auto-redirect**: Users are redirected to departments after successful login

## 📊 Department Management

- **View Departments**: Browse all departments in a card layout
- **Add Department**: Create new departments with name and description
- **Department Details**: View detailed information about each department
- **Delete Department**: Remove departments with confirmation
- **Real-time Updates**: Changes reflect immediately using server actions

## 🎨 UI Features

- **Loading States**: Beautiful spinners and animations during data fetching
- **Success States**: Animated success messages with redirect indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Transitions**: Hover effects and micro-interactions

## 🔧 Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Component-based architecture

### Server Actions

The application uses Next.js Server Actions for:
- Form submissions
- Data mutations
- Authentication flows
- Database operations

### Authentication

- Token-based authentication
- HTTP-only cookies for security
- Middleware for route protection
- Automatic token refresh

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- UI patterns inspired by [shadcn/ui](https://ui.shadcn.com/)

---

**Note**: This is a learning project demonstrating modern web development practices with Next.js 16, TypeScript, and contemporary UI/UX patterns.
