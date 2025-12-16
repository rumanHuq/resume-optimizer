import { HomePage } from '@/containers/HomePage/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: HomePage });
