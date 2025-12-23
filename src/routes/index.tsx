/* eslint-disable react-refresh/only-export-components */

import { HomePage } from '@/containers/HomePage/HomePage';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { ErrorComponent, createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

const PostError = ({ error }: ErrorComponentProps) => {
  return <ErrorComponent error={error} />;
};

// eslint-disable-next-line react/no-multi-comp
const HomePageWithInitialData = () => {
  useEffect(() => {
    void fetch('/api/mock-error');
  });

  return <HomePage />;
};

export const Route = createFileRoute('/')({ component: HomePageWithInitialData, errorComponent: PostError });
