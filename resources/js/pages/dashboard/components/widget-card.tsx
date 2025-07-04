import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type WidgetCardProps = {
  value: number | string;
  title?: string;
  badge?: string;
  description?: string;
  href?: string;
};
const WidgetCard: FC<WidgetCardProps> = ({ value, title = 'title', description = 'description', badge, href }) => {
  const handleClick = () => {
    if (href) {
      router.visit(href);
    }
  };
  return (
    <Card onClick={handleClick} className="cursor-pointer">
      <CardHeader className="flex flex-row items-start">
        <CardTitle className="text-4xl font-bold text-primary capitalize">{value}</CardTitle>
        {badge && <Badge variant={'outline'}>{badge}</Badge>}
      </CardHeader>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WidgetCard;
