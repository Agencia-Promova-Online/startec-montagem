import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Map from '../components/Map';
import Articles from '../components/Articles';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Products />
      <Clients />
      <Articles />
      <Contact />
      <Map />
    </>
  );
}

