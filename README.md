# 🎬 CineRegistry

CineRegistry is a modern movie management dashboard designed for film enthusiasts to track, rate, and organize their personal cinematic vault. Built with the latest React ecosystem and a focus on sleek, responsive UI.

## ✨ Features

- **Real-time Movie Management:** Add, delete, and track your movies with instant UI updates.
- **Live Search & Filtering:** Instant filtering by title, director, or genre powered by Zustand.
- **Dynamic Rating System:** Interactive star rating component with hover states and haptic-feel feedback.
- **State Management:** High-performance data fetching and caching using **TanStack Query (React Query)** and global UI state via **Zustand**.
- **Tailwind v4 UI:** A fully responsive, modern interface utilizing the latest utility-first CSS engine.
- **Notification System:** Toast notifications for success and error feedback.

---

## 🛠️ Tech Stack

| Layer              | Technology                |
| ------------------ | ------------------------- |
| **Frontend**       | React 19, Vite            |
| **State (Server)** | TanStack React Query (v5) |
| **State (Global)** | Zustand                   |
| **Styling**        | Tailwind CSS v4           |
| **Communication**  | Axios                     |
| **Linting**        | ESLint                    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

```bash
https://github.com/Eng-Nhshl/CineRegistry-Application.git
cd cineregistry/frontend

```

2. **Install dependencies**

```bash
npm install

```

3. **Configure Environment**
   Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:3001/api

```

4. **Launch Development Server**

```bash
npm run dev

```

---

## 📂 Project Structure

### Frontend

```text
src/
├── components/     # Reusable UI (Movie, StarRating, Form, etc.)
├── hooks/          # Custom hooks (useMovies, useField, useStars)
├── services/       # API communication logic via Axios (Generic BaseService, movies Service)
├── stores/         # Zustand store configuration (useFilterStore, useNotificationStore)
├── App.jsx         # Main application layout
└── index.css       # Tailwind v4 entry point

```

### Backend

```text
src/
├── controllers/    # Handles incoming HTTP requests (Generic BaseController, movies Controller)
├── models/         # Defines database schemas, data structures, and direct data access logic
├── requests/       # Contains form validation, payload validation, and request-sanitization rules
├── utils/          # Houses reusable, standalone helper functions (e.g., error handling, date formatting)
├── app.js          # Configures the Express app, mounts global middleware, and registers base routes
└── index.js        # The entry point: loads env configs, connects to the database, and boots the server

```

---

## 🧪 Architecture Notes

- **Data Fetching:** We use React Query to handle server state, ensuring that the movie list stays in sync with the backend without manual refetching logic.
- **Custom Hooks:** Business logic is abstracted into custom hooks to keep components clean and focused purely on the UI.
- **Tailwind v4:** Utilizes the new `@tailwindcss/vite` plugin for lightning-fast builds and zero-config CSS processing.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
