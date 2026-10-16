import Navbar from './Navbar'
import Hero from './Hero'
import Ticker from './Ticker'
import Studio from './Studio'
import Menu from './Menu'
import Kitchen from './Kitchen'
import Market from './Market'
import Spirit from './Spirit'
import Visit from './Visit'
import Footer from './Footer'

export default function BroadsheetSite() {
  return (
    <div className="bs-root min-h-screen bg-paper font-sans text-ink">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Studio />
        <Menu />
        <Kitchen />
        <Market />
        <Spirit />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
