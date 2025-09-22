import logo from '../../assets/banner/logo.png'

const FastDeliveryLogo = () => {
    return (
        <div className='flex items-end '>
            <img src={logo} alt="" />
            <p className='text-2xl font-semibold -ml-3'>Fast Delivery</p>
        </div>
    );
};

export default FastDeliveryLogo;