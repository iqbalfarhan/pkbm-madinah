import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { FC } from 'react';

type UserDetailProps = {
  user: User;
};

const UserDetail: FC<UserDetailProps> = ({ user }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengaturan user', href: route('user.index') },
    { title: user.name, href: route('user.show', user.id) },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs} title="Detail user">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus omnis suscipit nobis. Saepe, neque cupiditate earum illum optio aliquid
      incidunt dolore accusamus, officiis et nostrum, enim veritatis aliquam aut dicta!
    </AppLayout>
  );
};

export default UserDetail;
