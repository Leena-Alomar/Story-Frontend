# 📚 Tales Frontend

*A sleek and user-friendly frontend interface for managing and exploring creative stories, fully integrated with a Django backend.*

---

## 📋 Table of Contents

- [Commits](#commits)  
- [Project Description](#project-description)  
- [Tech Stack](#tech-stack)  
- [Backend Repository](#backend-repository)  
- [Deployed Site](#deployed-site)  
- [Installation](#installation)  
- [Icebox Features](#icebox-features)  
- [API Endpoints](#api-endpoints)

---

## ✅ Commits

- ✅ **22 meaningful commits** covering:
  - UI development  
  - Routing logic  
  - API integration with Django backend  

---

## 📖 Project Description

The **Tales Frontend** is a Single Page Application (SPA) that enables users to:

- 🧾 Browse and read stories by category  
- ✍️ Submit and edit their own stories  
- ⭐ Post, update, and delete reviews  
- 🔁 Seamlessly navigate through views using a clean, responsive design  

Built with React and connected to a Django backend, this project demonstrates full-stack development practices including routing, API communication, and dynamic UI rendering.

---

## 🛠 Tech Stack

| Category           | Tech Used                              |
|--------------------|-----------------------------------------|
| Framework          | React.js                                |
| Routing            | React Router                            |
| State Management   | Context API  |
| API Communication  | Axios / Fetch                           |
| Styling            | CSS Modules              |
| Build Tool         | Vite  |

---

## 🔗 Backend Repository

> 📡 [Tales Backend Repo](https://github.com/Leena-Alomar/Story-Backend)

Includes:
- User authentication (JWT)
- Story, Category, Review models
- CRUD API endpoints

---

## 🌐 Link to Deployed Site

> 🚀 [Deployed App](//)  
*_(Add your actual URL once deployed)_*

---
## 🧳 Icebox Features

These features are in the planning stage and will be added in future updates:

- **User Profile Management**: Users will be able to view and edit their profile, including their personal details and story submissions.
- **Story Categorization**: Allow stories to be categorized by genres, tags, or user-created categories for better navigation and filtering.
- **Admin Panel**: A dashboard for admins to manage user data, stories, categories, and reviews.
- **Advanced Search Filters**: Implement a more sophisticated search system that allows users to search by various parameters, such as author name, story tags, or ratings.
- **Story Likes**: Users can like stories, and the app will display the most liked stories in a separate section.
- **Notifications**: Push notifications or in-app notifications for when new stories are posted, or a user’s review has been responded to or liked.
- **Dark Mode**: A theme toggle that allows users to switch between light and dark modes for a better user experience.
- **Story Sharing**: Users can share their favorite stories on social media or directly via email.

---

## 📡 API Endpoints

Below are the API endpoints that connect the frontend to the backend services:

### Authentication
- **POST /api/token/**: Obtain JWT access & refresh tokens for authentication.
- **POST /api/token/refresh/**: Refresh JWT access token when the old token expires.
- **POST /signup/**: Register a new user and receive JWT credentials.

### Stories
- **GET /stories/**: Get a list of all stories available on the platform.
- **GET /stories/{id}/**: Get a single story's details by its ID.
- **POST /stories/**: Create a new story. Requires authentication.
- **PUT /stories/{id}/**: Update an existing story. Requires authentication.
- **DELETE /stories/{id}/**: Delete an existing story. Requires authentication.

### Categories
- **GET /categories/**: Retrieve a list of all story categories.
- **POST /categories/**: Add a new story category. Requires admin privileges.

### Reviews
- **GET /reviews/**: Retrieve a list of reviews for a specific story.
- **POST /reviews/**: Post a new review for a story. Requires authentication.
- **PUT /reviews/{id}/**: Update a review that the user has submitted.
- **DELETE /reviews/{id}/**: Delete a review that the user has posted.

### Additional Features
- **POST /stories/{id}/like/**: Like a story (Future feature).
- **GET /notifications/**: Retrieve a list of user notifications (Future feature).

## ⚙️ Installation

To run the frontend locally:

```bash
# Clone the repository
git clone https://github.com/Leena-Alomar/tales-frontend.git
cd tales-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
