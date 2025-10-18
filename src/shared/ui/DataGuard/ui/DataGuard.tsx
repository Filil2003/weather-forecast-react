import type { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  fallback: ReactNode;
  isLoading: boolean;
}

export function DataGuard({ fallback, isLoading, children }: Props) {
  return isLoading ? fallback : children;
}
