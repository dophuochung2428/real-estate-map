import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={`container-custom ${className || ""}`}>{children}</div>
  );
}
