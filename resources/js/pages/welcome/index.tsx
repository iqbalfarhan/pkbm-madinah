import WelcomeLayout from './layouts/welcome-layout';
import BeritaSection from './sections/berita.section';
import HeroSection from './sections/hero-section';
import InformationSection from './sections/information-section';
import RegistrationSection from './sections/registration-section';

export default function Welcome() {
  return (
    <WelcomeLayout>
      <HeroSection />
      <RegistrationSection />
      <BeritaSection />
      <InformationSection />
    </WelcomeLayout>
  );
}
