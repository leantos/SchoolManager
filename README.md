# 🎓 Student Management System

A fullstack web application to manage student records, built with:

* 🌐 React.js (Frontend)
* 🛠️ ASP.NET Core Web API (Backend)
* 🗓️ PostgreSQL (Database)

This app allows users to:

* View all students with pagination
* Search students by name and percentage
* Add, edit, and delete student records
* Get search results with server-side pagination
* See loading indicators for smoother UX

---

## 🚀 Features

* 🔍 **Search by multiple fields** — name, percentage, and more
* 📄 **Paginated results** — both for full list and filtered search
* ✅ **Inline editing and deletion**
* ⚡ **Responsive UI** with Bootstrap
* 🔁 **Backend pagination with limit/offset**
* 🎯 **Custom search mode pagination logic**
* 🔔 **Toast Notifications** (via `react-toastify`)
* ✨ **Loading indicator integration** (via `react-loading-indicators`)

---

## 🧰 Tech Stack

| Layer         | Tech                          |
| ------------- | ----------------------------- |
| Frontend      | React, Bootstrap              |
| Backend       | ASP.NET Core Web API (.NET 8) |
| Database      | PostgreSQL                    |
| Styling       | Bootstrap 5                   |
| Notifications | `react-toastify`              |
| UX            | `react-loading-indicators`    |

---

## 🛠️ Installation & Running

### 📟 Prerequisites

* Node.js & npm
* .NET 8 SDK
* PostgreSQL running locally

---

### 📦 Backend Setup

```bash
cd Sample
dotnet restore
dotnet build
dotnet run
```

Ensure your appsettings.json contains a valid PostgreSQL connection string:

```json
"ConnectionStrings": {
  "Default": "Host=localhost;Port=5432;Username=postgres;Password=yourpassword;Database=studentdb;"
}
```

Backend will run on: `http://localhost:5017`

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

Ensure backend is running before launching the frontend.

---

## 📁 Folder Structure (High-level)

```bash
/Sample     -> ASP.NET backend (controllers, services)
/frontend   -> React frontend (components, styling)
```

---

## 💡 Highlights

* Seamless toggling between **full list** and **search mode**
* Fully working **Next/Previous** logic even in search mode
* Clean separation of frontend/backend concerns
* Fast fetch performance and intuitive feedback

---

## 🚪 Environment Variables

No `.env` required for frontend. Backend uses `appsettings.json`.
If needed:

```env
REACT_APP_API_URL=http://localhost:5017
```

## 🔄 Improvements Planned

* Add form validation with feedback
* Column header sorting
* Login authentication & roles
* Unit tests for pagination logic

---

## 👤 Author

**Emmanuel Tom Jose**

---

## 📄 License

MIT License
