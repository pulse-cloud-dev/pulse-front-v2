import type { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props extends PropsWithChildren {}

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, 
        retry: 1,
      },
    },
  });

export const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
