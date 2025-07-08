import MarkdownReader from '@/components/MarkdownReader';
import { usePageProps } from '@/hooks/use-page-props';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const Dokumentasi = () => {
  const [markdown, setMarkdown] = useState('');
  const { settings } = usePageProps();

  useEffect(() => {
    fetch('README.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
    },
    {
      title: 'Dokumentasi',
      href: route('dokumentasi'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <pre>{JSON.stringify(settings, null, 4)}</pre>
      <MarkdownReader value={markdown} />
    </AppLayout>
  );
};

export default Dokumentasi;
