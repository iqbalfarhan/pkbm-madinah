import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { usePageProps } from '@/hooks/use-page-props';
import { Globe, Mail, Phone } from 'lucide-react';
const LandingFooter = () => {
  const { settings } = usePageProps();

  const { SEKOLAH_NAME, SEKOLAH_ADDRESS, SEKOLAH_PHONE, SEKOLAH_WEBSITE, SEKOLAH_EMAIL } = settings;
  return (
    <Card className="rounded-none border-0 bg-transparent">
      <CardFooter className="py-6 text-center">
        <div className="mx-auto max-w-lg space-y-4 text-sm">
          <div>
            <p className="font-bold">{SEKOLAH_NAME}</p>
            <p className="font-bold">{SEKOLAH_ADDRESS}</p>
          </div>

          <div>
            <Button variant={'ghost'} size={'xs'}>
              <Phone />
              {SEKOLAH_PHONE}
            </Button>
            <Button variant={'ghost'} size={'xs'}>
              <Globe />
              {SEKOLAH_WEBSITE}
            </Button>
            <Button variant={'ghost'} size={'xs'}>
              <Mail />
              {SEKOLAH_EMAIL}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LandingFooter;
