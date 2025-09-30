# AeroSight ✈️

**Intelligent Aviation Operations Dashboard for Entebbe Airport**

AeroSight is a modern, AI-powered aviation management platform designed to optimize flight operations, predict delays, manage fuel costs, and streamline maintenance scheduling for airlines and airport authorities.

![AeroSight Dashboard](https://images.unsplash.com/photo-1529322365446-6efd62aed02e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhaXJwbGFuZSUyMHdpbmd8ZW58MHx8fHwxNzU5MDc1NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080)

## 🚀 Core Features

### ✅ **Flight Delay Prediction**

- Predict flight delays at Entebbe Airport using real-time weather, flight data, and traffic patterns
- Display predictions with percentage probability and estimated delay time
- AI-powered analysis using Google Gemini for accurate forecasting

### 📊 **Data Visualization**

- Interactive charts and graphs displaying weather, flight data, and traffic patterns
- Real-time dashboard with flight activity and delay trends
- Customizable metrics and KPIs for different user roles

### 🛣️ **Route Optimization**

- Provide airlines with optimized flight routes based on predicted weather conditions and traffic
- Calculate fuel costs and savings for different route options
- AI-powered recommendations for most efficient flight paths

### ⛽ **Fuel Cost Management**

- Estimate fuel burn in US gallons and corresponding monetary cost in USD
- Factor in live fuel prices and current/forecast atmospheric conditions
- Optimize fuel consumption with AI-driven recommendations

### 🔧 **Maintenance Scheduling**

- Predictive maintenance schedules based on aircraft systems and sensor data
- AI-powered analysis incorporating airline maintenance preferences
- Automated alerts for upcoming maintenance requirements

### 🔐 **User Authentication**

- Secure user accounts for airlines and airport personnel
- Role-based access control for different user types
- Firebase-powered authentication system

### 📱 **Responsive Dashboard**

- Modern, clean UI with aviation-themed design
- Dark/light theme support
- Mobile-responsive design for on-the-go access

## 🎨 Design System

- **Primary Color**: Sky Blue (#468FFF) - evoking open skies and technology
- **Background**: Light Gray (#F0F4F7) - clean and professional
- **Accent**: Electric Indigo (#6F00ED) - for interactive elements
- **Typography**: Inter font family for modern readability
- **Icons**: Lucide React icons with aviation and data visualization themes

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization library
- **Lucide React** - Icon library

### AI & Backend

- **Google Genkit** - AI application framework
- **Google Gemini 2.5 Flash** - Large language model
- **Firebase** - Authentication and hosting
- **Zod** - Schema validation

### Development Tools

- **Firebase Studio** - AI flow development
- **ESLint & TypeScript** - Code quality
- **PostCSS** - CSS processing

## 📋 Prerequisites

Before running AeroSight, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Google Gemini API key** (provided in setup)
- **Firebase project** (optional, for full functionality)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/RockieRaheem/AeroSight.git
cd AeroSight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment variables file and configure:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Google Gemini AI API Key (Required)
GOOGLE_GENAI_API_KEY=AIzaSyAiVmE1peIpvW687V5610UDgqsjfstsFMg

# Development Configuration
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:9002
PORT=9002

# Optional: Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Optional: Enable debug mode
GENKIT_DEBUG=true
```

### 4. Start Development Servers

```bash
# Start both Next.js and Genkit development servers
npm run dev:all

# Or start them separately:
npm run dev          # Next.js development server
npm run genkit:watch # Genkit AI flows with hot reload
```

### 5. Access the Application

- **Main Application**: http://localhost:9002
- **Genkit Developer UI**: http://localhost:4000 (when genkit is running)

## 📜 Available Scripts

| Script                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start Next.js development server on port 9002 |
| `npm run genkit:dev`   | Start Genkit development server               |
| `npm run genkit:watch` | Start Genkit with hot reload                  |
| `npm run dev:all`      | Start both Next.js and Genkit servers         |
| `npm run build`        | Build production application                  |
| `npm run start`        | Start production server                       |
| `npm run lint`         | Run ESLint                                    |
| `npm run typecheck`    | Run TypeScript type checking                  |

## 🏗️ Project Structure

```
AeroSight/
├── src/
│   ├── ai/                     # AI flows and Genkit configuration
│   │   ├── genkit.ts          # Genkit setup
│   │   ├── dev.ts             # Development server entry
│   │   └── flows/             # AI flow definitions
│   │       ├── assess-damage.ts
│   │       ├── calculate-fuel-cost.ts
│   │       ├── generate-flight-debrief.ts
│   │       ├── optimize-flight-routes.ts
│   │       ├── predict-flight-delays.ts
│   │       ├── provide-maintenance-schedules.ts
│   │       └── search-aero-sight.ts
│   ├── app/                   # Next.js App Router
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/            # Authentication
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   └── dashboard/       # Dashboard-specific components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── docs/                    # Documentation
│   └── blueprint.md        # Project specifications
├── .env.local              # Environment variables
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
└── apphosting.yaml       # Firebase App Hosting config
```

## 🔧 Configuration

### Environment Variables

| Variable                 | Description                               | Required              |
| ------------------------ | ----------------------------------------- | --------------------- |
| `GOOGLE_GENAI_API_KEY`   | Google Gemini API key for AI features     | ✅ Yes                |
| `NODE_ENV`               | Environment mode (development/production) | ✅ Yes                |
| `NEXT_PUBLIC_BASE_URL`   | Base URL for the application              | ✅ Yes                |
| `PORT`                   | Development server port                   | ❌ No (default: 9002) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase configuration                    | ❌ No (for auth)      |
| `GENKIT_DEBUG`           | Enable Genkit debug mode                  | ❌ No                 |

### Firebase Setup (Optional)

For full authentication functionality:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password
3. Get your config values from Project Settings
4. Update `.env.local` with your Firebase configuration

## 🎯 Key Features Deep Dive

### AI-Powered Flight Delay Prediction

The system uses Google Gemini to analyze:

- Historical flight data
- Real-time weather conditions
- Airport traffic patterns
- Seasonal trends

### Fuel Cost Optimization

Advanced algorithms consider:

- Aircraft type and specifications
- Route distance and waypoints
- Current fuel prices
- Atmospheric conditions (wind, temperature)
- Altitude optimization

### Predictive Maintenance

Smart scheduling based on:

- Aircraft sensor data
- Flight hours and cycles
- Maintenance history
- Airline-specific preferences
- Regulatory requirements

## 🚀 Deployment

### Firebase App Hosting

The project is configured for Firebase App Hosting:

```bash
npm run build
firebase deploy
```

### Vercel Deployment

```bash
npm run build
vercel deploy
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 API Reference

### AI Flows

#### Predict Flight Delay

```typescript
import { predictFlightDelay } from "@/ai/flows/predict-flight-delays";

const result = await predictFlightDelay({
  flightNumber: "UG522",
  airportCode: "EBB",
  currentDateTime: new Date().toISOString(),
});
```

#### Calculate Fuel Cost

```typescript
import { calculateFuelCost } from "@/ai/flows/calculate-fuel-cost";

const result = await calculateFuelCost({
  route: "EBB to JFK",
  aircraftType: "Boeing 787",
  currentFuelPrice: 3.45,
  atmosphericConditions: "Clear skies, 15kt headwind",
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:

- 📧 Email: kamwangaraheem2050@gmail.com
- 📖 Documentation: [docs.aerosight.app](https://docs.aerosight.app)
- 🐛 Issues: [GitHub Issues](https://github.com/RockieRaheem/AeroSight/issues)

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Firebase** for hosting and authentication
- **Radix UI** for accessible components
- **Vercel** for Next.js development
- **Tailwind CSS** for styling system

---

**Built with ❤️ for the aviation industry**

_AeroSight - Intelligent Aviation Operations Dashboard_
