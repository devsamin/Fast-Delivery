
import marchantLogo from "../../../assets/location-merchant.png";
const Merchant = () => {
  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-12">Our First Priority</h2>
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={marchantLogo}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-3xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn bg-[#CAEB66] rounded-full">Become a Merchant</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Merchant;
