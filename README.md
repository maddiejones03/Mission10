# Mission10 — frontend & backend

This workspace contains two folders:

- `backend` — a .NET 10 Web API project (scaffolded with `dotnet new webapi`).
- `frontend` — a minimal Vite + React + TypeScript app with Prettier configured.

How to run:

1. Backend:

   dotnet build backend
   dotnet run --project backend

2. Frontend (from workspace root):

   cd frontend
   npm install
   npm run dev

Formatting:

- In `frontend`, run `npm run format` to run Prettier across `src`.
