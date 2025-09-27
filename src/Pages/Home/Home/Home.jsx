import Banner from "../Banner/Banner";
import Benefits from "../Benefits/Benefits";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import HowItWorks from "../HowItWorks/HowItWorks";
import Merchant from "../Merchant/Merchant";
import QuickAnswers from "../QuickAnswers/QuickAnswers";
import Services from "../Services/Services";


const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <ClientLogosMarquee></ClientLogosMarquee>
      <Benefits></Benefits>
      <Merchant></Merchant>
      <QuickAnswers/>
    </div>
  );
};

export default Home;
