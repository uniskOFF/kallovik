import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Benefits } from '@/components/benefits'
import { About } from '@/components/about'
import { Portfolio } from '@/components/portfolio'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}