# RentWise 🏠

A modern, mobile-responsive rental listing web application for apartment, bedspace, and dorm rentals in the Philippines.

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Property Listings**: CRUD operations for landlords
- **Smart Search**: Location and budget-based filtering
- **Advanced Filters**: Furnished, near MRT, pet-friendly, Wi-Fi included
- **Map Integration**: Interactive map view using Leaflet + OpenStreetMap
- **Rent Insights**: Average rent prices and cost per square meter
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Toggle between light and dark themes

## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Maps**: Leaflet + OpenStreetMap
- **File Uploads**: Multer + Cloudinary

## 📁 Project Structure

```
rentwise/
├── client/          # React frontend
├── server/          # Node.js backend
├── shared/          # Shared utilities
└── docs/           # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd rentwise
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In server directory
cp .env.example .env
# Update .env with your configuration
```

4. Start the development servers
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm start
```

## 📱 Deployment

- **Frontend**: Vercel or Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
