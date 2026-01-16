import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/feature';
import Faqs from '@/components/landing/faqs';
import Pricing from '@/components/landing/pricing';
import Footer from '@/components/landing/footer';

function App() {

  return (
    <section className='bg-background min-h-screen'>
      <section className='p-2 md:p-4 lg:p-14 container max-w-6xl mx-auto space-y-24'>
        <Navbar />
        <Hero />
        <Features />
        <Faqs />
        <Pricing />
        <Footer />
      </section>
    </section>
  );
}
