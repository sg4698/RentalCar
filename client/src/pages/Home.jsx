import { useSelector } from 'react-redux';
import CarDetailsOverlay from '../components/CarDetailsOverlay';
import Hero from '../components/Hero';
import CarList from './Car/CarList';
import Footer from '../components/Footer';


export default function Home() {
  const { cars } = useSelector((state) => state.car);

  const featuredCar = cars[0];
  return (
 <>
      <div className="relative">
        <Hero/>
            {featuredCar && <CarDetailsOverlay car={featuredCar} />}
      </div>

      <div className="mt-10 px-6">
        {/* <h2 className="text-3xl font-bold mb-4 text-center">Browse Available Cars</h2> */}
        <CarList />
      </div>

      <Footer/>
    </>
  );
}
