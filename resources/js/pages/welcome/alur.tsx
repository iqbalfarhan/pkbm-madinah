import Heading from '@/components/heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { dataAlurPendaftaran } from '@/lib/enums';
import SectionContainer from './components/section-container';
import WelcomeLayout from './layouts/welcome-layout';

const AlurPendaftaran = () => {
  return (
    <WelcomeLayout>
      <SectionContainer className="py-16 md:py-24">
        <Heading title="Alur pendaftaran" description="4 langkah pendaftaran peserta didik baru" />

        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {dataAlurPendaftaran.map((alur) => (
            <AccordionItem value={`item-${alur.index}`} key={alur.index}>
              <AccordionTrigger>
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <h1 className="text-3xl font-bold">{alur.index}.</h1>
                  <h3 className="text-base font-semibold">{alur.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-muted-foreground">
                {alur.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default AlurPendaftaran;
