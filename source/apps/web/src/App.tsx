import { Button } from "@repo/ui/components/button";

import "@repo/ui/styles/globals.css";
import { NavLink, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Trash from "./pages/trash";
import Files from "./pages/files";

function App() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Layout</h1>
      <div className="space-x-4">
        <Button variant='link'>
          <NavLink className={({ isActive }) => { return isActive ? 'text-teal-500' : '' }} to='/'>Dashboard</NavLink>
        </Button>
        <Button variant='link'>
          <NavLink className={({ isActive }) => { return isActive ? 'text-teal-500' : '' }} to='/trash'>Trash</NavLink>
        </Button>
        <Button variant='link'>
          <NavLink className={({ isActive }) => { return isActive ? 'text-teal-500' : '' }} to='/files'>Files</NavLink>
        </Button>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </section>
  );
}

export default App;
