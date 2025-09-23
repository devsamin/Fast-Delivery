import Banner from "../Banner/Banner";
import Benefits from "../Benefits/Benefits";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Merchant from "../Merchant/Merchant";
import Services from "../Services/Services";
const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <ClientLogosMarquee></ClientLogosMarquee>
      <Benefits></Benefits>
      <Merchant></Merchant>
    </div>
  );
};

export default Home;
