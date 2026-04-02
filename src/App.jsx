import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("ecomzy-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ecomzy-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-main)] transition-colors duration-500">
      <div className="sticky top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/cart" element={<Cart theme={theme} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
