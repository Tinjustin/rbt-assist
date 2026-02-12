RBT Assist

RBT Assist is a secure full-stack web application built using React, Vite, and Supabase.
The purpose of this project is to demonstrate authentication, protected routing, and backend integration in a production-style React application.

🚀 Project Overview

RBT Assist simulates a secure tool designed for Registered Behavior Technicians (RBTs).

The application allows users to:

Create an account (Sign Up)

Confirm email

Log in securely

Access a protected Dashboard

Maintain session state

Log out securely

Prevent unauthorized access to protected routes

🛠 Tech Stack

React

Vite

Supabase (Authentication + Backend)

React Router DOM

Git + GitHub

🔐 Authentication & Security

This application uses Supabase Authentication with:

Email/password signup

Email confirmation flow

Secure login

Session persistence

ProtectedRoute component for route protection

Secure logout

📂 Project Structure

src/

pages/

Login.jsx

Signup.jsx

Dashboard.jsx

components/

ProtectedRoute.jsx

lib/

supabaseClient.js

⚙️ Environment Variables

Create a .env.local file:

VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_publishable_key

🧪 Running the Project

Install dependencies
npm install

Start development server
npm run dev

Open
http://localhost:5173

🎯 Purpose of This Project

This project demonstrates:

Full-stack authentication

Backend integration with Supabase

Protected routing in React

Environment variable configuration

Git workflow and GitHub deployment
