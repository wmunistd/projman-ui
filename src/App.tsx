import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import UsersPage from "./pages/UsersPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import BoardPage from "./pages/BoardPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-semibold text-lg">Projman</Link>
            <nav className="flex gap-4">
              <NavLink to="/users" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Users</NavLink>
              <NavLink to="/teams" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Teams</NavLink>
              <NavLink to="/projects" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Projects</NavLink>
              <NavLink to="/board" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}>Board</NavLink>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
