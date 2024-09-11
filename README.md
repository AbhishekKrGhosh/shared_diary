# Shared Diary - MERN Stack Project

## Project Overview

 <img width="1438" alt="Screenshot 2024-09-08 at 11 21 54 PM" src="https://github.com/user-attachments/assets/8d14e6a0-62ec-4f3f-b427-115241c41bc1">
<img width="1420" alt="Screenshot 2024-09-08 at 11 22 04 PM" src="https://github.com/user-attachments/assets/842f553b-a9be-4bd7-a824-eb8c4ad961e0">
**Shared Diary** is a collaborative web application designed to facilitate shared diary creation and joint account management among multiple participants. This platform emphasizes security and provides a seamless user experience with various authentication methods, real-time collaboration, and advanced customization options.

## Features

### 1. **User Authentication**
- **Email/Password Login**: Traditional login with email and password.
- **Google OAuth**: Secure, one-click login using Google accounts.
- **Encrypted Passwords**: User passwords are encrypted using JWT and bcrypt to ensure high-level security.

### 2. **Diary Management**
- **Create, Edit, and Manage Entries**: Users can easily create, edit, and manage diary entries within shared accounts.
- **Real-time Collaboration**: Multiple participants can collaborate on diary entries in real time, enhancing the shared journaling experience.

### 3. **Backend Architecture**
- **Scalable APIs**: Built to handle increasing user loads without compromising performance.
- **Robust User Management**: Efficient management of user data and account information.
- **Secure Session Handling**: Ensures that user sessions are protected, maintaining the integrity and privacy of user interactions.

### 4. **Frontend Interface**
- **Responsive Design**: A user interface that adapts seamlessly across devices, ensuring a consistent experience whether on a desktop, tablet, or smartphone.
- **Client-side Routing**: Smooth navigation throughout the application, with private routes protecting sensitive content.
- **Advanced State Management**: Ensures data consistency across the application, allowing users to pick up where they left off without interruptions.

### 5. **Customization**
- **Theme Changes**: Users can customize the appearance of their accounts with account-wide theme changes, providing a personalized experience for all members.

## Technology Stack

### Frontend
- **React.js**: For building the responsive user interface.
- **React Router**: For seamless client-side routing.
- **Redux**: For advanced state management.

### Backend
- **Node.js**: For building the backend server.
- **Express.js**: For creating scalable and robust APIs.
- **MongoDB**: As the database for storing user and diary data.
- **Mongoose**: For object data modeling and managing database connections.

### Authentication & Security
- **JWT (JSON Web Tokens)**: For secure token-based authentication.
- **bcrypt**: For hashing and encrypting user passwords.
- **Google OAuth**: For secure and convenient user authentication.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** set up either locally or using a cloud-based service like MongoDB Atlas.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AbhishekKrGhosh/shared_diary.git
    cd shared_diary
    ```

2. **Install dependencies**:
    ```bash
    cd server
    npm install
    cd ..
    cd client
    npm install
    cd ..
    ```

3. **Environment Variables**: Create a `.env` file in the root directory with the following:
    ```env
    CONNECTION_URL=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    npm run dev 
    ```

    This will start both the backend server and the React frontend.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For significant changes, please open an issue first to discuss what you would like to change.

Enjoy using **Shared Diary**! If you encounter any issues, feel free to open an issue on GitHub.
