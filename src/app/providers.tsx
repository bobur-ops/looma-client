import { ThemeProvider } from "@/features/theme/components/theme-provider";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { indexedDbPersister } from "@/lib/query-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours,
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

persistQueryClient({
  queryClient,
  persister: indexedDbPersister,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      return query.meta?.persist === true;
    },
  },
  buster: "v1",
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Toaster />
            {children}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
