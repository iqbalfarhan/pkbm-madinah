import Heading from '@/components/heading';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, type ReactNode } from 'react';

type AppLayoutProps = PropsWithChildren & {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  description?: string;
  actions?: ReactNode;
  withHeading?: boolean;
};

export default ({
  children,
  breadcrumbs = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
    },
  ],
  title = 'Page title',
  description = 'Page title description',
  actions,
  withHeading = true,
  ...props
}: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    <Head title={title} />
    <div className="space-y-6 p-6">
      {withHeading && (
        <div className="flex flex-col items-start justify-between md:flex-row">
          <Heading title={title} description={description} />
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
    <Toaster position="top-center" />
  </AppLayoutTemplate>
);
