import AppLayout from '@/layouts/app-layout';
import { FC } from 'react';

type BlankPageProps = {
  data: string;
};

const BlankPage: FC<BlankPageProps> = () => {
  return (
    <AppLayout>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, laboriosam quos debitis maiores nemo reiciendis repellendus alias incidunt
      aspernatur nostrum ipsa eos quaerat sequi aliquam amet qui quibusdam sapiente consequatur.
    </AppLayout>
  );
};

export default BlankPage;
