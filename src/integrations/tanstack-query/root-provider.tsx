import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Provider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
