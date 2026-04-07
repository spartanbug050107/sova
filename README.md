# Sova – Real-Time Chat Application

A scalable full-stack chat application enabling seamless user communication with real-time messaging and social connectivity features.

---

## 🚀 Features

- 🔐 Secure Authentication (JWT + HTTP-only cookies)  
- 👤 User Onboarding & Profile Setup  
- 🤝 Friend Request System (Send / Accept / Reject)  
- 💬 Real-time Messaging using Stream Chat API  
- 🔎 User Discovery & Social Graph (Friends List)  
- 🛡 Protected Routes & Session Management  

---

## 🏗 Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Real-time Messaging:** Stream Chat API  

---

## ⚙️ Architecture Overview

- RESTful APIs built with Express following MVC pattern  
- MongoDB used for user data, relationships, and requests  
- Stream Chat handles real-time messaging infrastructure  
- JWT-based auth ensures secure, stateless sessions  

---

## 🔑 Core Workflows

- **Authentication:** Signup, Login, Logout with secure cookies  
- **Friend System:** Request → Accept/Reject → Persistent connections  
- **Chat:** Token-based authentication with Stream → Instant messaging  

---

## 📦 Setup

### 1. Clone repository
git clone https://github.com/spartanbug050107/sova

### 2. Install backend dependencies
cd backend
npm install

### 3. Install frontend dependencies
cd ../frontend
npm install

### 4. Run backend
npm run dev

### 5. Run frontend
npm run dev
