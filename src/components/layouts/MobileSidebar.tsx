import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "../../hooks/useSession";
import { useLogout } from "../../hooks/useLogout";
import {
  CloseIcon,
  DarkModeIcon,
  HomeIcon,
  LightModeIcon,
  LogoutIcon,
  MenuIcon,
  NotificationIcon,
  PersonIcon,
} from "../../assets/icons";

type MobileSidebarProps = {
  theme: string;
  toggleTheme: () => void;
};

function MobileSidebar({ theme, toggleTheme }: MobileSidebarProps) {
  const drawerRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        toast.success("Logged out successfully", {
          className:
            "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
        });
        closeDrawer();
        navigate("/login");
      },
    });
  };

  function closeDrawer() {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  }

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <header className="border-base-300/50 bg-base-100/50 fixed top-0 right-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-xl">
        <Link
          to="/"
          className="font-mono text-[20px] leading-[28px] font-bold tracking-[1px]"
        >
          Socially
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="border-base-300 bg-base-100/10 hover:bg-base-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[6px] border transition duration-300 ease-in-out"
            aria-label="Toggle theme"
          >
            {theme === "sociallydark" ? (
              <DarkModeIcon className="text-base-content h-4 w-4" />
            ) : (
              <LightModeIcon className="text-base-content h-4 w-4" />
            )}
          </button>

          <label
            htmlFor="mobile-sidebar"
            className="bg-neutral text-neutral-content hover:bg-neutral/80 hover:text-neutral-content/80 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[6px] transition duration-300 ease-in-out"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </label>
        </div>
      </header>

      <div className="h-16" />

      <div className="drawer drawer-end">
        <input
          ref={drawerRef}
          id="mobile-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content" />

        <div className="drawer-side z-[60]">
          <label
            htmlFor="mobile-sidebar"
            aria-label="Close sidebar"
            className="drawer-overlay cursor-default"
          />

          <aside className="bg-base-100 text-base-content flex min-h-full w-72 flex-col p-4">
            <div className="flex items-center justify-between">
              <span className="text-[16px] leading-6 font-medium">Menu</span>

              <label
                htmlFor="mobile-sidebar"
                className="flex h-9 w-9 cursor-pointer items-center justify-center"
                aria-label="Close menu"
              >
                <CloseIcon className="text-base-content h-5 w-5" />
              </label>
            </div>

            <nav className="mt-6 flex w-full flex-col gap-2">
              <Link
                to="/"
                onClick={closeDrawer}
                className="hover:bg-base-300 flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-[6px] px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
              >
                <HomeIcon className="text-base-content h-4 w-4" />
                <span>Home</span>
              </Link>

              {isLoggedIn && (
                <>
                  <Link
                    to="/notification"
                    onClick={closeDrawer}
                    className="hover:bg-base-300 flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-[6px] px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
                  >
                    <NotificationIcon className="text-base-content h-4 w-4" />
                    <span>Notifications</span>
                  </Link>

                  <Link
                    to={`/profile/${session?.data?.user?.id}`}
                    onClick={closeDrawer}
                    className="hover:bg-base-300 flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-[6px] px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
                  >
                    <PersonIcon className="text-base-content h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-base-content hover:bg-base-300 flex h-10 w-full cursor-pointer items-center gap-3 rounded-[6px] px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
                    aria-label="Logout"
                  >
                    <LogoutIcon className="text-base-content h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </nav>

            {!isLoggedIn && (
              <Link
                to="/login"
                onClick={closeDrawer}
                className="bg-neutral text-neutral-content hover:bg-base-300 hover:text-base-content mt-auto flex h-9 cursor-pointer items-center justify-center rounded-[6px] px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
              >
                Sign In
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
