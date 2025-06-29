# Real Estate Application

A comprehensive web-based real estate management system built with Node.js, Express, MySQL, and EJS templating engine. This application provides a complete solution for real estate agents, buyers, and administrators to manage property listings, user accounts, and real estate transactions.

## 🏠 Features

### For Users
- **User Registration & Authentication**: Secure user registration and login system with password hashing
- **Property Listings**: Browse available properties with detailed information
- **Property Search**: Search properties by location, price range, and property type
- **Property Details**: View comprehensive property information including images and descriptions
- **Agent Profiles**: View and contact real estate agents
- **Responsive Design**: Mobile-friendly interface for all devices

### For Real Estate Agents
- **Property Management**: Add, edit, and manage property listings
- **Image Upload**: Upload multiple property images with drag-and-drop functionality
- **Agent Profile**: Manage personal profile and contact information
- **Listing Dashboard**: View and manage all your property listings
- **Client Management**: Track and manage client interactions

### For Administrators
- **User Management**: View, edit, and manage all user accounts
- **Role Management**: Assign and modify user roles (admin, agent, user)
- **System Monitoring**: Monitor application usage and user activities
- **Content Management**: Manage property listings and user-generated content

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Template Engine**: EJS
- **Authentication**: bcryptjs, express-session, JWT
- **File Upload**: Multer
- **Frontend**: HTML5, CSS3, JavaScript
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database named `realestate_db`
   - Import the database schema (you'll need to create this based on your models)

4. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=realestate_db
   SECRET_KEY=your_secret_key
   PORT=3000
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
real-estate-app/
├── config/          # Database configuration
├── controllers/     # Business logic controllers
├── models/          # Data models
├── routes/          # API routes
├── views/           # EJS templates
├── public/          # Static files (CSS, JS, images)
├── uploads/         # File uploads
├── admin/           # Admin-specific files
├── screenshots/     # Application screenshots
├── app.js           # Main application file
├── index.js         # Server entry point
├── package.json     # Dependencies and scripts
└── vercel.json      # Deployment configuration
```

## 🖼️ Screenshots

### Home Page
![Home Page](screenshots/home%20page%201.png)

### Property Listings
![Property Listings](screenshots/listings%20page.png)

### Property Details
![Property Details](screenshots/single%20listing.png)

### Agents Page
![Agents Page](screenshots/agents%20page.png)

### Agent Dashboard
![Agent Dashboard](screenshots/agent%20Listings.png)

### Admin Portal
![Admin Portal](screenshots/admin%20Portal.png)

### Login Page
![Login Page](screenshots/login%20page.png)

## 🔧 Configuration

### Database Setup
The application uses MySQL as the primary database. Make sure to:

1. Create a database named `realestate_db`
2. Set up the required tables for users, properties, and other entities
3. Configure the database connection in `config/db.js`

### File Upload Configuration
Property images are stored in the `uploads/` directory. The application uses Multer for handling file uploads.

## 🚀 Deployment

This application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for deployment.

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the deployment prompts

## 🔐 Security Features

- Password hashing using bcryptjs
- Session-based authentication
- Input validation and sanitization
- Secure file upload handling
- Role-based access control

## 📝 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### Properties
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get property details
- `POST /properties` - Add new property (agents only)
- `PUT /properties/:id` - Update property (agents only)
- `DELETE /properties/:id` - Delete property (agents only)

### Users
- `GET /users` - Get all users (admin only)
- `PUT /users/:id` - Update user (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MySQL team for the robust database system
- All contributors who helped improve this application

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

---

**Note**: This is a development version. For production use, ensure all security measures are properly implemented and tested. 