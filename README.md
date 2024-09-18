# Infodev

A dynamic tech news blog for developers, featuring user authentication, article management, and interactive discussions.

## Features

### 1. Authentication
- User registration
- User login
- User logout

### 2. Article Management
- Create new articles (title, content, creation date)
- Display a list of all articles
- Display detailed view of an article
- Edit articles (author only)
- Delete articles (author only)

### 3. Comments
- Add comments to articles
- Display comments under articles
- Delete own comments

### 4. User Profile
- Display and edit profile information (name, email, photo, etc.)
- List articles created by the user

### 5. User Interface
- Server-side rendering using EJS template engine
- Responsive design for mobile and desktop use

## Technical Specifications

### Backend
- Node.js with Express.js framework
- MySQL database with Sequelize ORM
- RESTful API routes for all functionalities (GET, POST, PUT, DELETE)
- Amazon RDS for MySQL database hosting
- Amazon S3 for file storage (e.g., user profile pictures, article images)

### Frontend
- EJS template engine
- CSS for styling with Bootstrap framework

### Security
- Protection against SQL injections
- Password hashing using bcryptjs
- Input validation and sanitization to prevent XSS attacks

## Setup and Installation

1. Clone the repository
   ```
   git clone https://github.com/Echaftech23/Infodev
   ```

2. Install dependencies
   ```
   cd Infodev
   npm install
   ```

3. Configuration
   You need to configure some environment variables:
   
   a. Extract the `.env` file from the `.env.example` file:
   ```
   cp .env.example .env
   ```
   
   b. Update the environment variables in the `.env` file, including:
      - Database configuration (for RDS)
      - S3 bucket configuration
      - Other application-specific settings

4. Database Setup
   Ensure your RDS instance is set up and the connection details are correctly specified in your `.env` file.

5. Run database migrations
   ```
   npx sequelize-cli db:migrate
   ```

6. Seed the database
   ```
   npm run db:seed
   ```

7. Start the server
   ```
   npm run dev
   ```

8. Access the application at `http://localhost:3000`

## AWS Services Integration

### Amazon RDS (Relational Database Service)
- This project uses Amazon RDS for MySQL as the database backend.
- Ensure that your RDS instance is properly configured and accessible from your application.
- Update the database connection details in your `.env` file to point to your RDS instance.

### Amazon S3 (Storage Service)
- S3 is used for storing and serving user-uploaded files (e.g., profile pictures, article images).
- Set up an S3 bucket for your project and configure the necessary permissions.
- Update your `.env` file with the S3 bucket name, region, and access credentials.
