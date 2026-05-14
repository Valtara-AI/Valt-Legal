
## 🧩 Project Setup: Personal Injury CRM

### 📁 Structure Overview
```
personal-injury-crm/
├── docs/                     # Documentation and reference files
├── backend/                  # Node.js API and server logic
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── package-lock.json
├── frontend/                 # React (or similar) client-side application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
└── Standalone Previews/      # Static HTML previews for case/client/report management
```

---

### ⚙️ Installation & Dependencies
#### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Common dependencies (based on structure):
   - Express.js for routing  
   - Mongoose or Sequelize for models  
   - dotenv for environment variables  
   - cors and body-parser for middleware  

#### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Typical dependencies:
   - React or Next.js  
   - Axios for API calls  
   - TailwindCSS or Bootstrap for styling  

---

### 🚀 Deployment on Vercel
1. Push both **frontend** and **backend** folders to GitHub.  
2. In Vercel:
   - Create a new project and connect your GitHub repo.  
   - For the **frontend**, set the root directory to `/frontend`.  
   - For the **backend**, set the root directory to `/backend`.  
3. Configure environment variables under **Project Settings → Environment Variables**.  
4. Vercel automatically detects the framework and builds using:
   ```bash
   npm run build
   npm start
   ```
5. After deployment, verify endpoints and frontend routing.

---

### 🧾 Notes
- Exclude `node_modules` and `.env` using `.gitignore`.  
- Include this `README.md` and optionally a `DEPLOYMENT.md` for collaborators.  
- Keep previews (`Standalone Previews/`) for static demos or documentation.

---
