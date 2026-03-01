# How to Run MarketAI on Your Machine 🚀

Follow these steps to get the project running. This app uses a centralized **Neon DB**, so all users and data are shared in the cloud!

---

### 1. Prerequisites
Make sure you have **Node.js** installed on your laptop. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Setup the Project
1. Open the project folder in **VS Code**.
2. **IMPORTANT**: Check if you have the `.env` file in the `server/` folder. If it's missing, you will need to get the `DATABASE_URL` and `JWT_SECRET` from the owner.

### 3. Install Dependencies
You need to install packages for both the frontend and the backend.
1. Open a terminal in VS Code (`Ctrl + ` `).
2. Install **Backend** dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install **Frontend** dependencies:
   ```bash
   cd ..
   npm install
   ```

### 4. Run the Project
To see the app working, you need to start **two** terminals.

#### Terminal 1: Run the Backend Server
1. In the first terminal, go to the server folder:
   ```bash
   cd server
   npm run dev
   ```
   *You should see: "Server running on port 3001"*

#### Terminal 2: Run the Frontend (MarketAI)
1. Open a **New Terminal** (+ button in VS Code).
2. Run the following:
   ```bash
   npm run dev
   ```
   *You should see a link like: http://localhost:5173/*

### 5. Access the App
Open your browser and go to: **http://localhost:5173/**

---

### 💡 Note on Shared Data:
Because we are using a central **Neon DB**, any user you create or activity you perform will be visible to everyone else using this database!
