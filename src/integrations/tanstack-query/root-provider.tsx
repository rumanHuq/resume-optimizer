import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export const Provider = (props: { children: React.ReactNode; queryClient: QueryClient }) => {
  const { children, queryClient } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
