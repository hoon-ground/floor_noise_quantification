import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분 동안 fresh
      gcTime: 1000 * 60 * 10, // 10분 캐시 유지
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
