import Heading from '@/components/heading';
import MarkdownReader from '@/components/MarkdownReader';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import WelcomeLayout from './layouts/welcome-layout';

const AlurPendaftaran = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('ALUR.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <WelcomeLayout>
      <Heading title="Syarat Pendaftaran" description="Syarat Pendaftaran Peserta Didik Baru" />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <h1>Syarat Pendaftaran</h1>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h1>Syarat Pendaftaran</h1>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h1>Syarat Pendaftaran</h1>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h1>Syarat Pendaftaran</h1>
          </CardContent>
        </Card>
      </div>
      <MarkdownReader value={markdown} />
    </WelcomeLayout>
  );
};

export default AlurPendaftaran;
