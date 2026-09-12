import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../schemas/form.schemas";
import type { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate("/");
    } catch {}
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <div className="flex min-h-110 w-100 flex-col gap-2 rounded-2xl border border-black/40 bg-black/10 backdrop-blur-3xl md:min-h-120 md:w-120 lg:min-h-120 lg:w-140 dark:border-white/20 dark:bg-white/10">
        <h3 className="pt-8 text-center text-[24px] font-bold md:text-[28px] lg:text-[32px] dark:text-white">
          Welcome back
        </h3>
        <span className="text-center text-[14px] text-black/60 dark:text-white/70">
          Login to your Socially account
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="pt-4 pl-4 text-[14px] md:pl-6 lg:text-[16px] dark:text-white">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="m@example.com"
            className="ml-4 h-10 w-90 rounded-lg border border-black/20 bg-white/40 pl-4 text-[12px] placeholder:text-black/50 transition-all duration-200 outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 md:ml-5 md:h-12 md:w-110 md:text-[14px] lg:w-130 lg:rounded-xl dark:border-white/20 dark:bg-white/7 dark:placeholder:text-white/50 dark:focus:border-white/40 dark:focus:ring-white/10"
          />
          {errors.email && (
            <span className="pl-4 text-[12px] text-red-500 md:pl-5">
              {errors.email.message}
            </span>
          )}

          <label className="pt-4 pl-4 text-[14px] md:pl-6 lg:text-[16px] dark:text-white">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder=""
            className="ml-4 h-10 w-90 rounded-lg border border-black/20 bg-white/40 pl-4 placeholder:text-black/50 transition-all duration-200 outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 md:ml-5 md:h-12 md:w-110 lg:w-130 lg:rounded-xl dark:border-white/20 dark:bg-white/7 dark:placeholder:text-white/50 dark:focus:border-white/40 dark:focus:ring-white/10"
          />
          {errors.password && (
            <span className="pl-4 text-[12px] text-red-500 md:pl-5">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 ml-4 h-10 w-90 cursor-pointer rounded-lg border bg-black text-[14px] font-semibold text-white transition-transform duration-200 hover:bg-black/80 active:translate-y-1 md:ml-5 md:h-12 md:w-110 lg:w-130 lg:rounded-xl lg:text-[16px] dark:bg-white/90 dark:text-black dark:hover:bg-white/70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="border-gray h-4 w-4 animate-spin rounded-full border-2 border-t-gray-500"></span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1 pt-4 pb-4">
          <span className="text-[12px] text-black/70 md:text-[14px] dark:text-white/70">
            Don't have an account?
          </span>
          <Link
            to="/register"
            className="text-[12px] text-black/70 underline hover:text-black md:text-[14px] dark:text-white/70 dark:hover:text-white"
          >
            Sign up
          </Link>
        </div>
      </div>
      <span className="w-80 pt-4 text-center text-[14px] text-black/70 dark:text-white/70">
        By clicking continue, you agree to our{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          Privacy Policy
        </span>
        .
      </span>
    </div>
  );
}

export default Login;
