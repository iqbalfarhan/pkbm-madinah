import LearingSvg from '@/components/svgs/learning-svg';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

const RegistrationSection = () => {
  return (
    <div className="bg-card">
      <CardContent>
        <LearingSvg className="mt-24 h-32" />
        <Button variant={'default'} size={'lg'} asChild>
          <Link href={route('pendaftaran.create')}>
            <PlusCircle />
            Pendaftaran baru
          </Link>
        </Button>
      </CardContent>
    </div>
  );
};

export default RegistrationSection;
