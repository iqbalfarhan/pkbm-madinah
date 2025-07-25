import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Update profile',
    href: '/settings/appearance',
  },
  {
    title: 'Appearance settings',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <SettingsLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
        <AppearanceTabs />
      </div>
    </SettingsLayout>
  );
}
