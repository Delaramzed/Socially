import type { ButtonProps } from "../../types/ui.types";
import Spinner from "./Spinner";

const ButtonVariants = {
  variant: {
    primary:
      "bg-base-content text-base-200 hover:bg-base-content/90 hover:text-base-200 disabled:bg-base-content/50 disabled:text-base-content ",
    secondary:
      "bg-base-100 text-base-content border border-base-300 hover:bg-base-200/50 hover:text-base-content disabled:bg-base-200/50 disabled:text-base-content",
    pure: "bg-base-300/0 text-base-content hover:bg-base-300 hover:text-base-content disabled:bg-base-300/25 disabled:text-base-content",
    teritiary:
      "bg-base-300 text-base-content hover:bg-base-300/80 hover:text-base-200 disabled:bg-base-300/25 disabled:text-base-200",
  },
  size: {
    sm: "rounded-[var(--radius-field)] py-2 px-3 items-center text-sm   ",
    md: "px-4 py-2 rounded-[var(--radius-field)] items-center text-base   ",
  },
};

function Button({
  size = "md",
  loading = false,
  variant = "primary",
  disabled = false,
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "flex flex-row justify-center gap-2 rounded-[var(--radius-field)] text-base font-family";
  const variantStyles = ButtonVariants.variant[variant];
  const sizeStyles = ButtonVariants.size[size];
  const cursorStyle = disabled ? "" : "cursor-pointer";
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${cursorStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <span>
          Loading...
          <Spinner />
        </span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
}

export default Button;
