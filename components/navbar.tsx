import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

const Card = ({
  title,
  subtitle,
  iconClass,
}: {
  title: string;
  subtitle: string;
  iconClass: string;
}) => (
  <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border transition-transform duration-300 hover:shadow-primary/30 hover:-translate-y-1">
    <div className={`h-48 flex items-center justify-center p-6 ${iconClass}`}>
      <span className="text-6xl text-card-foreground/50 font-bold">VISUAL</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4 text-xs font-semibold text-primary"></div>
    </div>
  </div>
);

const NavBar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  // Effect to apply the dark class to the document element (Client-side code)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Icon for the theme button
  const ThemeIcon = () => (
    <svg
      className="w-5 h-5 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isDark ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      )}
    </svg>
  );

  return (
    <nav className="select-none  fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl backdrop-blur-lg rounded-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-3 md:py-4 z-50  border border-border bg-card/80 dark:bg-card/80 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-5xl font-extrabold text-primary">
          Vplace
        </a>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground hover:bg-muted transition duration-200"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <ThemeIcon />
          </button>
          <a href="/login"
            className="cursor-pointer px-4 py-2 text-xl font-semibold text-gray-900 dark:text-white hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition duration-300"
            onClick={() => console.log("Login clicked")}
          >
            Login
          </a>

          <a  href="/register"
            className="cursor-pointer px-4 py-2 text-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            onClick={() => console.log("Register clicked")}
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
