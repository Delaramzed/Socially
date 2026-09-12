import type React from "react";

export type ButtonProps = {
  size?: "sm" | "md";
  loading?: boolean;
  variant?: "primary" | "secondary" | "pure" | "teritiary";
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};
