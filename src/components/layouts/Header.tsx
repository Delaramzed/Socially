import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../../hooks/useLogout";
import toast from "react-hot-toast";
import { HeaderSkeleton } from "../ui/Skeleton";
import {
  DarkModeIcon,
  HomeIcon,
  LightModeIcon,
  LogoutIcon,
  NotificationIcon,
  PersonIcon,
} from "../../assets/icons";
import { useSession } from "../../hooks/useSession";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useState } from "react";
import { useEffect, useRef } from "react";

type HeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

function Header({ theme, toggleTheme }: HeaderProps) {
  const { data: session, isLoading } = useSession();
  const hasSession = !!session;

  const logoutMutation = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: users, isLoading: isSearching } = useSearchUsers(search);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        toast.success("Logged out successfully", {
          className:
            "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
        });
        navigate("/login");
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="border-base-300/50 bg-base-100/10 fixed top-0 right-0 left-0 z-50 hidden h-16 border-b backdrop-blur-xl md:block">
        {isLoading ? (
          <HeaderSkeleton />
        ) : (
          <div className="mx-auto flex h-16 w-full max-w-312 items-center justify-between px-2 md:px-4 lg:px-6">
            <Link
              to="/"
              className="font-mono text-[20px] leading-7 font-bold tracking-[1px]"
            >
              Socially
            </Link>
            <div className="relative w-64" ref={searchRef}>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-base-300 bg-base-100/50 h-9 w-full rounded-md border px-3 text-sm outline-none"
              />

              {search.trim() && (
                <div className="bg-base-100 border-base-300 absolute top-11 left-0 z-50 w-full rounded-lg border shadow-lg">
                  {isSearching && <p className="p-3 text-sm">Searching...</p>}

                  {!isSearching && users?.length === 0 && (
                    <p className="text-base-content/50 p-3 text-sm">
                      No users found
                    </p>
                  )}

                  {!isSearching &&
                    users?.map((user) => (
                      <div
                        key={user.id}
                        className="hover:bg-base-200 flex cursor-pointer items-center gap-3 p-3"
                        onClick={() => navigate(`/profile/${user.id}`)}
                      >
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-base-content/50 text-xs">
                            @ {user.email}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleTheme}
                className="border-base-300 bg-base-100/10 hover:bg-base-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition duration-300 ease-in-out"
                aria-label="Toggle theme"
              >
                {theme === "sociallydark" ? (
                  <DarkModeIcon className="text-base-content h-4 w-4" />
                ) : (
                  <LightModeIcon className="text-base-content h-4 w-4" />
                )}
              </button>

              <Link
                to="/"
                className="text-base-content hover:bg-base-300 flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
              >
                <HomeIcon className="text-base-content h-4 w-4" />
                <span>Home</span>
              </Link>

              {hasSession ? (
                <>
                  <Link
                    to="/notification"
                    className="text-base-content hover:bg-base-300 flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
                  >
                    <NotificationIcon className="text-base-content h-4 w-4" />
                    <span>Notifications</span>
                  </Link>

                  <Link
                    to={`/profile/${session?.data?.user?.id}`}
                    className="text-base-content hover:bg-base-300 flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-[14px] leading-5 font-normal transition duration-300 ease-in-out"
                  >
                    <PersonIcon className="text-base-content h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-base-content hover:bg-base-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition duration-300 ease-in-out"
                    aria-label="Sign out"
                  >
                    <LogoutIcon className="text-base-content h-4 w-4" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-neutral hover:bg-neutral/80 text-neutral-content flex h-9 items-center justify-center rounded-md px-4 text-[14px] leading-5 font-normal shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] transition duration-300 ease-in-out"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <div className="hidden h-16 md:block" />
    </>
  );
}

export default Header;
