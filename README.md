# 🏥 Phermo - Modern Pharmacy Management System

![Phermo Dashboard](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2+-764ABC?style=for-the-badge&logo=redux&logoColor=white)

A modern, responsive pharmacy management system built with React and cutting-edge web technologies. Phermo provides a comprehensive solution for managing medicines, tracking inventory, processing sales, and monitoring pharmacy operations with a beautiful, intuitive interface.

## ✨ Features

### 🔐 Authentication & Security

-   **Secure Login System**: Modern authentication with JWT token management
-   **User Registration**: Complete signup flow with form validation
-   **Protected Routes**: Route-level security ensuring authenticated access
-   **Session Management**: Persistent login sessions with automatic token refresh
-   **Profile Management**: User profile editing with avatar customization

### 📊 Comprehensive Dashboard

-   **Real-time Analytics**: Live statistics for revenue, orders, customers, and products
-   **Interactive Charts**: Professional data visualization using Recharts
    -   Revenue overview with area charts
    -   Daily sales and profit tracking with bar charts
    -   Category performance with pie charts
-   **Performance Metrics**: Key business indicators and conversion rates
-   **Quick Actions**: Fast access to common pharmacy operations
-   **Recent Activity**: Real-time monitoring of orders and transactions

### 💊 Medicine Management (Core Module)

-   **Complete CRUD Operations**: Add, view, edit, and delete medicines
-   **Advanced Search & Filtering**: Search by name, category, manufacturer, or batch
-   **Inventory Tracking**: Real-time stock levels with low-stock alerts
-   **Expiry Management**: Track and alert for medicines nearing expiration
-   **Batch Management**: Monitor batch numbers and manufacturing details
-   **Category Organization**: Organize medicines by therapeutic categories
-   **Supplier Integration**: Link medicines to their respective suppliers
-   **Export Functionality**: Export medicine data to CSV for external use

### 🛒 Sales & Purchase Management

-   **Order Processing**: Complete order management system
-   **Customer Management**: Track customer information and purchase history
-   **Supplier Management**: Maintain supplier relationships and contact details
-   **Invoice Generation**: Professional invoice creation and management
-   **Payment Processing**: Multiple payment method support
-   **Stock Alerts**: Automated notifications for low inventory levels

### 📈 Advanced Analytics & Reporting

-   **Revenue Tracking**: Detailed financial analytics and reporting
-   **Sales Performance**: Top-performing products and category analysis
-   **Customer Insights**: Customer behavior and purchase patterns
-   **Inventory Reports**: Stock level analysis and turnover rates
-   **Growth Metrics**: Month-over-month and year-over-year comparisons
-   **Export Reports**: Generate and export comprehensive business reports

### 🎨 Modern UI/UX Design

-   **Glass Morphism Effects**: Stunning visual effects with backdrop blur
-   **Smooth Animations**: Fluid transitions using Framer Motion
-   **Responsive Design**: Perfect display across all device sizes
-   **Professional Color Scheme**: Carefully crafted blue and purple gradient palette
-   **Interactive Elements**: Hover effects, loading states, and micro-interactions
-   **Accessibility**: WCAG compliant design with proper contrast and focus states

### 📱 Responsive & Mobile-First

-   **Desktop Experience**: Full sidebar navigation with expanded content
-   **Tablet Optimization**: Collapsible sidebar with touch-friendly controls
-   **Mobile Support**: Hamburger menu with optimized navigation
-   **Adaptive Layouts**: Flexible grid systems that work on any screen size
-   **Touch Interactions**: Optimized for mobile and tablet touch interfaces

## 🛠️ Technical Architecture

### Frontend Stack

-   **React 19.1.0**: Latest React with concurrent features and improved performance
-   **Vite 6.3.5**: Lightning-fast build tool with HMR (Hot Module Replacement)
-   **Tailwind CSS 3.4.17**: Utility-first CSS framework for rapid UI development
-   **Framer Motion 12.16.0**: Production-ready motion library for React animations
-   **Lucide React 0.513.0**: Beautiful, customizable SVG icons

### State Management

-   **Redux Toolkit 2.8.2**: Modern Redux for predictable state management
-   **React Redux 9.2.0**: Official React bindings for Redux
-   **Async Thunks**: Handling asynchronous operations and API calls
-   **Slice Pattern**: Organized state management with createSlice

### Form Handling & Validation

-   **React Hook Form 7.57.0**: Performant forms with easy validation
-   **Hookform Resolvers 5.1.0**: Schema validation resolvers
-   **Yup 1.6.1**: JavaScript schema builder for value parsing and validation

### Data Visualization

-   **Recharts 2.15.3**: Composable charting library built on React components
-   **Area Charts**: Revenue and growth trend visualization
-   **Bar Charts**: Daily sales and profit analysis
-   **Pie Charts**: Category distribution and performance metrics
-   **Responsive Charts**: Automatically adapt to container sizes

### Routing & Navigation

-   **React Router DOM 7.6.2**: Declarative routing for React applications
-   **Protected Routes**: Authentication-based route protection
-   **Dynamic Navigation**: Context-aware sidebar and breadcrumb navigation
-   **Route Transitions**: Smooth page transitions with loading states

### API Integration

-   **Axios 1.9.0**: Promise-based HTTP client for API requests
-   **DummyJSON API**: Mock data source for development and testing
-   **Error Handling**: Comprehensive error boundary and API error management
-   **Loading States**: User-friendly loading indicators and skeleton screens

### Development Tools

-   **ESLint 9.25.0**: Code linting with React-specific rules
-   **PostCSS 8.5.4**: CSS processing with autoprefixer
-   **Date-fns 4.1.0**: Modern JavaScript date utility library
-   **Tailwind Scrollbar 3.1.0**: Custom scrollbar styling

## 📁 Project Structure

```
Phermo/
├── public/                     # Static assets
│   └── vite.svg               # Vite logo
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ErrorBoundary.jsx  # Error handling component
│   │   ├── Layout.jsx         # Main layout with sidebar/header
│   │   ├── LoadingSpinner.jsx # Loading state component
│   │   └── NotificationProvider.jsx # Toast notifications
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx      # Main dashboard with analytics
│   │   ├── Login.jsx         # Authentication page
│   │   ├── Medicine.jsx      # Medicine management (core module)
│   │   ├── Profile.jsx       # User profile management
│   │   ├── Customer.jsx      # Customer management
│   │   ├── Suppliers.jsx     # Supplier management
│   │   ├── Purchase.jsx      # Purchase order management
│   │   ├── Sale.jsx          # Sales transaction management
│   │   └── UnderConstruction.jsx # Placeholder for future features
│   ├── services/             # API service functions
│   ├── store/                # Redux store configuration
│   │   ├── index.js          # Store setup and middleware
│   │   └── slices/           # Redux slices
│   │       ├── authSlice.js  # Authentication state management
│   │       ├── dashboardSlice.js # Dashboard data management
│   │       └── productSlice.js # Product/medicine state management
│   ├── types/                # TypeScript type definitions (future)
│   ├── utils/                # Utility functions
│   │   └── exportUtils.js    # Data export functionality
│   ├── App.jsx               # Main application component
│   ├── App.css               # Global application styles
│   ├── index.css             # Base styles and Tailwind imports
│   └── main.jsx              # Application entry point
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite build configuration
```

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+ (Latest LTS recommended)
-   npm 9+ or yarn 1.22+
-   Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Phermo
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application

### Demo Credentials

For testing purposes, you can use these demo credentials:

-   **Username**: `emilys`
-   **Password**: `emilyspass`

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code analysis
```

## 🔧 Configuration

### Environment Setup

The application uses environment-specific configurations:

```javascript
// Development API endpoint
const API_URL = "https://dummyjson.com";

// Production considerations
// Replace with your actual API endpoints
// Configure authentication endpoints
// Set up proper CORS policies
```

### Tailwind CSS Customization

Custom color palette and design tokens are defined in `tailwind.config.js`:

```javascript
// Custom color scheme
colors: {
  primary: {
    50: "#f0f4ff",
    500: "#7c6ef2",
    900: "#412d82",
  },
  // Extended purple palette for pharmacy theme
}
```

### Build Configuration

Vite configuration optimized for React development:

```javascript
// vite.config.js
export default defineConfig({
	plugins: [react()],
	// Additional optimizations for production builds
});
```

## 🏗️ State Management Architecture

### Redux Store Structure

```javascript
store: {
  auth: {
    user: Object,           // Current user information
    token: String,          // JWT authentication token
    isAuthenticated: Boolean,
    isLoading: Boolean,
    error: String
  },
  products: {
    items: Array,           // Medicine/product list
    categories: Array,      // Product categories
    searchTerm: String,     // Current search query
    selectedCategory: String,
    currentPage: Number,
    isLoading: Boolean
  },
  dashboard: {
    monthlyData: Array,     // Revenue analytics
    salesData: Array,       // Daily sales data
    categoryData: Array,    // Category performance
    stats: Object,          // Key business metrics
    recentOrders: Array,    // Recent order history
    topProducts: Array      // Best-performing products
  }
}
```

### Async Operations

-   **Authentication**: Login, signup, token refresh
-   **Data Fetching**: Dashboard analytics, product lists, user management
-   **CRUD Operations**: Create, read, update, delete for all entities
-   **Export Functions**: Data export to various formats

## 🎨 Design System

### Color Palette

-   **Primary Blue**: #3B82F6 (Professional, trustworthy)
-   **Secondary Purple**: #8B5CF6 (Modern, innovative)
-   **Success Green**: #10B981 (Positive actions, success states)
-   **Warning Yellow**: #F59E0B (Alerts, attention-required items)
-   **Error Red**: #EF4444 (Errors, critical issues)
-   **Neutral Grays**: #F9FAFB to #111827 (Text, backgrounds, borders)

### Typography

-   **Font Family**: Inter (system font fallback)
-   **Font Sizes**: 12px to 48px with consistent scale
-   **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
-   **Line Heights**: Optimized for readability across all screen sizes

### Spacing & Layout

-   **Base Unit**: 4px (0.25rem)
-   **Common Spacings**: 8px, 16px, 24px, 32px, 48px
-   **Container Widths**: Responsive with max-width constraints
-   **Grid System**: CSS Grid and Flexbox for modern layouts

## 🔐 Security Features

### Authentication Security

-   **JWT Token Management**: Secure token storage and validation
-   **Protected Routes**: Route-level authentication guards
-   **Session Persistence**: Secure session management with localStorage
-   **Auto-logout**: Automatic logout on token expiration
-   **CSRF Protection**: Cross-site request forgery prevention

### Data Validation

-   **Input Sanitization**: All user inputs are validated and sanitized
-   **Schema Validation**: Yup schemas for form and data validation
-   **Type Safety**: Comprehensive type checking for data integrity
-   **Error Boundaries**: Graceful error handling and recovery

## 🚀 Performance Optimizations

### Build Optimizations

-   **Code Splitting**: Automatic route-based code splitting
-   **Tree Shaking**: Unused code elimination
-   **Asset Optimization**: Image and asset compression
-   **Bundle Analysis**: Size monitoring and optimization

### Runtime Performance

-   **Lazy Loading**: Components and routes loaded on demand
-   **Memoization**: React.memo and useMemo for expensive operations
-   **Virtual Scrolling**: Efficient rendering of large lists
-   **Debounced Search**: Optimized search with request debouncing

### Caching Strategy

-   **API Response Caching**: Intelligent caching of API responses
-   **Static Asset Caching**: Long-term caching for static resources
-   **Service Worker**: Offline-first approach (future enhancement)

## 🧪 Testing & Quality Assurance

### Code Quality

-   **ESLint Rules**: Comprehensive linting with React-specific rules
-   **Prettier Integration**: Consistent code formatting
-   **Husky Hooks**: Pre-commit hooks for quality gates
-   **Type Safety**: Gradual migration to TypeScript planned

### Browser Compatibility

-   **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
-   **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
-   **Progressive Enhancement**: Graceful degradation for older browsers

## 🔮 Future Enhancements

### Planned Features

-   **Real-time Notifications**: WebSocket integration for live updates
-   **Advanced Analytics**: Machine learning-powered insights
-   **Multi-language Support**: Internationalization (i18n)
-   **Dark Mode**: Complete dark theme implementation
-   **PWA Features**: Offline functionality and app-like experience
-   **Print System**: Professional invoice and report printing
-   **Barcode Scanner**: Mobile barcode scanning integration
-   **API Integration**: Connect with real pharmacy management APIs

### Technical Improvements

-   **TypeScript Migration**: Full TypeScript conversion for type safety
-   **Unit Testing**: Comprehensive test suite with Jest and React Testing Library
-   **E2E Testing**: End-to-end testing with Playwright or Cypress
-   **Performance Monitoring**: Real-time performance tracking
-   **SEO Optimization**: Server-side rendering with Next.js
-   **Accessibility**: Full WCAG 2.1 AA compliance

## 🙏 Acknowledgments

-   **DummyJSON**: Mock API service for development and testing
-   **Tailwind CSS**: Utility-first CSS framework
-   **Framer Motion**: Animation library for React
-   **Recharts**: Charting library for data visualization
-   **Redux Toolkit**: Modern Redux for state management
-   **React Hook Form**: Performant form handling
-   **Lucide React**: Beautiful icon library

**Made with ❤️ for modern pharmacy management**
