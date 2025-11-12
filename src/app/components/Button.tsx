import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // ReactNode eftersom det kan vara text, JSX etc.
}

export default function Button({ children }: ButtonProps) {
  return <button className="button">{children}</button>;
}
