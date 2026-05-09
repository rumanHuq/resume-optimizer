import { ResumeBuilderPage } from '@/containers/ResumeBuilderPage/ResumeBuilderPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume-builder')({ component: ResumeBuilderPage });
