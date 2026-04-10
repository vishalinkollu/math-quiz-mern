# ⚡ Competitive Math Quiz (MERN + Socket.io)

A real-time multiplayer math quiz application where multiple users compete to solve math problems. The **first user to submit the correct answer wins**, and the question updates instantly for everyone.

---

 ## 🚀 Live Demo
🌐 Frontend: https://math-quiz-mern.vercel.app/
⚙️ Backend API: https://math-quiz-mern.onrender.com
---

## 📦 Tech Stack

### Frontend

* React (Create React App)
* Socket.io Client
* React Toastify (notifications)
* CSS (responsive UI)

### Backend

* Node.js + Express
* Socket.io (real-time communication)
* MongoDB Atlas(leaderboard storage)
* Mongoose

---

## 🧠 Core Features

### ⚡ Real-Time Multiplayer

* All users see the same question
* Updates instantly via WebSockets

### 🏆 First Answer Wins (Concurrency Handling)

* Backend controls winner using a lock (`isAnswered`)
* Ensures only the **first correct submission** is accepted

### 🔄 Dynamic Question Generation

* Random math problems (+, -, *)
* No negative results

### 📊 Leaderboard

* Tracks user scores
* Updates in real-time
* Scrollable UI with ranking cards

### ❌ Validations

* No empty inputs
* No negative answers
* Wrong answer:

  * Shows toast error
  * Reduces score by 1 (if > 0)

### 📡 Network Handling

* Socket reconnection support
* Server is the single source of truth

---

## 🏗️ Project Structure

```
math-quiz-mern/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/User.js
│   │   ├── services/questionGenerator.js
│   │   ├── sockets/quizSocket.js
│   │   ├── app.js
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Quiz.jsx
│   │   │   ├── AnswerBox.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── services/socket.js
│   │   ├── styles/main.css
│   │   ├── App.js
│   │   └── index.js
```

---

## ⚙️ How It Works

### 🧠 Flow

1. Client connects via Socket.io
2. Client requests current question (`get_question`)
3. Server responds with:
   * current question
   * leaderboard
4. Users submit answers
5. Server:
   * validates answer
   * checks lock (`isAnswered`)
   * determines winner
6. Emits:
   * `winner`
   * updated leaderboard
   * new question

---

## 🔥 Concurrency Design 

* Uses a simple **in-memory lock (`isAnswered`)**
* First correct answer sets lock → prevents others from winning



### 🧠 Production Note

In real-world systems:

* Use **Redis distributed locks**
* Avoid single-instance memory dependency

---

## 📡 Socket Events

### Client → Server

* `get_question`
* `submit_answer`

### Server → Client

* `new_question`
* `winner`
* `wrong_answer`
* `leaderboard`

---

## 🖥️ Setup Instructions

### 1. Clone Repo

```
git clone https://github.com/vishalinkollu/math-quiz-mern.git
cd math-quiz-mern
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/mathquiz
PORT=5000
```

Run:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install

````
 in socket.js change the socket.on url to "http://localhost:5000"
````

npm start
```

---

## 🧪 How to Test

* Open app in **2+ browser tabs**
* Enter different usernames
* Submit answers
* Verify:

  * First correct wins
  * Leaderboard updates
  * Wrong answer reduces score

---

## 🎯 Design Decisions

### Why Socket.io?

* Real-time updates
* Low latency communication

### Why Server Controls Winner?

* Prevent cheating
* Handle network delays fairly

### Why No Timer?

* Simplified version
* Focus on concurrency logic

---

## ⚠️ Limitations (Intentional)

* Uses in-memory state (not scalable)
* No authentication
* No pagination for leaderboard

---

## 🚀 Future Improvements

* Add Redis for distributed locking
* Add authentication (JWT)
* Add difficulty levels
* Add animations & better UX
* Deploy with Docker

---

📌 Deployment
Frontend → Vercel
Backend → Render
DB → MongoDB Atlas

---


## 👨‍💻 Author

**Vishal Inkollu**

---

## ⭐ Final Note

This project demonstrates:

* Full-stack development
* Real-time systems
* Concurrency handling
* Clean UI/UX

---
