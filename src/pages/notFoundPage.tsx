import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white dark:bg-black">
      <h1 className="text-[48px] font-bold dark:text-white">404</h1>
      <p className="text-[16px] text-black/70 dark:text-white/70">
        Page not found
      </p>
      <Link
        to="/"
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/80 dark:bg-white/90 dark:text-black dark:hover:bg-white/70"
      >
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
