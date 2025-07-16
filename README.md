# 🎓 Student Management System

A fullstack web application to manage student records, built with:

- 🌐 React.js (Frontend)
- 🛠️ ASP.NET Core Web API (Backend)
- 🗃️ PostgreSQL (Database)

This app allows users to:
- View all students with pagination
- Search students by name and percentage
- Add, edit, and delete student records
- Get search results with server-side pagination
- See loading indicators for smoother UX

---

## 🚀 Features

- 🔍 **Search by multiple fields** — name, percentage, and more  
- 📄 **Paginated results** — both for full list and filtered search  
- ✅ **Inline editing and deletion**  
- ⚡ **Responsive UI** with Bootstrap  
- 🔁 **Backend pagination with limit/offset**  
- 🎯 **Custom search mode pagination logic**
- 🔔 **Toasts using Toastify**
- ✨ **Loading indicator integration** (via `react-loading-indicators`)  

---

## 🧰 Tech Stack

| Layer      | Tech                         |
|------------|------------------------------|
| Frontend   | React, Bootstrap             |
| Backend    | ASP.NET Core Web API (.NET 8)|
| Database   | PostgreSQL                   |
| Styling    | Bootstrap 5                  |
| Notifications |  `react-toastify` |
| UX         | `react-loading-indicators`   |

---

## 🛠️ Installation & Running

### 🧾 Prerequisites

- Node.js & npm  
- .NET 8 SDK  
- PostgreSQL running locally  

---

### 📦 Backend Setup

```bash
cd Sample
dotnet restore
dotnet build
dotnet run
