# 🏠 Real Estate Management System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-000000?style=for-the-badge&logo=ejs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

**A comprehensive, full-stack web application designed to streamline real estate property management, agent operations, and client interactions for real estate agencies and property managers.**

[📋 **Features**](#-features) | [🚀 **Quick Start**](#-quick-start) | [📖 **Documentation**](#-documentation) | [🖼️ **Screenshots**](#️-screenshots)

</div>

---

## ✨ Key Features

### 🔐 **Authentication & Security**
- **Secure JWT-based authentication**
- **Role-based access control** (Admin, Agent, User)
- **Password hashing with bcryptjs**
- **Session management**
- **Input validation and sanitization**

### 🏘️ **Property Management**
- **Complete property lifecycle tracking**
- **Property assignment and status management**
- **Image upload with drag-and-drop functionality**
- **Property categorization by type and location**
- **Advanced search and filtering**

### 👥 **User Management**
- **Multi-role user system** (Admin, Agent, Buyer/Seller)
- **User profile management**
- **Agent-specific dashboards**
- **Client interaction tracking**
- **Role-based permissions**

### 📊 **Admin Dashboard**
- **Comprehensive user management**
- **System monitoring and analytics**
- **Content management**
- **Role assignment and modification**
- **User activity tracking**

### 📱 **Responsive Design**
- **Mobile-friendly interface**
- **Cross-browser compatibility**
- **Modern UI/UX design**
- **Intuitive navigation**
- **Fast loading times**

### 📄 **Document Management**
- **Property image management**
- **File upload system**
- **Document organization**
- **Secure file storage**

---

## 🛠️ Technology Stack

| **Backend** | **Frontend** | **Database** | **Tools & Libraries** |
|-------------|--------------|--------------|----------------------|
| Node.js | EJS Templates | MySQL 8.0 | JWT Authentication |
| Express.js | HTML5/CSS3 | WAMP/XAMPP | bcryptjs |
| Body Parser | JavaScript | Connection Pool | Multer |
| Express Session | Bootstrap | Transactions | File Upload |
| CORS | Responsive Design | Data Validation | Session Management |

---

## 🖼️ Screenshots

<div align="center">

| **Home Page** | **Property Listings** |
|---------------|----------------------|
| ![Home Page](screenshots/home%20page%201.png) | ![Property Listings](screenshots/listings%20page.png) |

| **Property Details** | **Agents Page** |
|---------------------|----------------|
| ![Property Details](screenshots/single%20listing.png) | ![Agents Page](screenshots/agents%20page.png) |

| **Agent Dashboard** | **Admin Portal** |
|-------------------|-----------------|
| ![Agent Dashboard](screenshots/agent%20Listings.png) | ![Admin Portal](screenshots/admin%20Portal.png) |

| **Login Page** | **Agent Profile** |
|---------------|------------------|
| ![Login Page](screenshots/login%20page.png) | ![Agent Profile](screenshots/agent%20profile.png) |

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **WAMP/XAMPP** (for local development)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/real-estate-app.git
   cd real-estate-app
   ```

2. **Database Setup**
   ```bash
   # Start your MySQL server (WAMP/XAMPP)
   # Create a database named 'realestate_db'
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file
   echo "DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=realestate_db
   SECRET_KEY=your-super-secret-key-change-this-in-production
   PORT=3000" > .env
   ```

5. **Start the Application**
   ```bash
   npm start
   ```

6. **Access the Application**
   - Application: http://localhost:3000
   - Admin Portal: http://localhost:3000/admin

---

## 📖 Documentation

### API Endpoints

| **Endpoint** | **Method** | **Description** |
|--------------|------------|-----------------|
| `/register` | POST | User registration |
| `/login` | POST | User authentication |
| `/admin` | GET | Admin dashboard |
| `/admin/action-user` | POST | User management actions |
| `/properties` | GET | Property listings |
| `/agents` | GET | Agent listings |

### Database Schema

The system uses the following main tables:
- `users` - User accounts and authentication
- `properties` - Property information and details
- `agents` - Agent profiles and information
- `property_images` - Property image storage
- `user_roles` - Role-based access control

### Project Structure

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

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=realestate_db

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production

# Server Configuration
PORT=3000
```

### Database Setup

The application uses MySQL as the primary database. Make sure to:

1. Create a database named `realestate_db`
2. Set up the required tables for users, properties, and other entities
3. Configure the database connection in `config/db.js`

### File Upload Configuration

Property images are stored in the `uploads/` directory. The application uses Multer for handling file uploads with secure validation.

---

## 🚀 Deployment

This application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for deployment.

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the deployment prompts**

### Production Considerations

- Update environment variables for production
- Configure secure database connections
- Set up proper SSL certificates
- Implement rate limiting
- Configure backup strategies

---

## 🔐 Security Features

- **Password hashing** using bcryptjs
- **Session-based authentication**
- **Input validation and sanitization**
- **Secure file upload handling**
- **Role-based access control**
- **CORS protection**
- **SQL injection prevention**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add appropriate comments
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/yourprofile/)
- Email: [your.email@example.com]

---

## 🙏 Acknowledgments

- **Express.js** community for the excellent framework
- **MySQL** team for the robust database system
- **Bootstrap** for the responsive design components
- **EJS** for the templating engine
- All contributors who helped improve this application

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/real-estate-app?style=social)](https://github.com/yourusername/real-estate-app/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/real-estate-app?style=social)](https://github.com/yourusername/real-estate-app/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/real-estate-app)](https://github.com/yourusername/real-estate-app/issues)

</div> 