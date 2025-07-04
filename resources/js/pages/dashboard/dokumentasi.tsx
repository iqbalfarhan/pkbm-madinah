import MarkdownReader from '@/components/MarkdownReader';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const Dokumentasi = () => {
  const [markdown, setMarkdown] = useState('');

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
      <MarkdownReader value={markdown} />
    </AppLayout>
  );
};

export default Dokumentasi;
