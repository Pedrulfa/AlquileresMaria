import { useEffect } from "react";
import RealizarReserva from '../RealizarReserva/Home/Home.js';

function Home() {
  useEffect(() => {
    localStorage.clear();
  }, []); 

  return <RealizarReserva />;
}

export default Home;