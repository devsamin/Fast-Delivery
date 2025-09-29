import { Link } from 'react-router-dom';
import logo from '../../assets/banner/logo.png'

const FastDeliveryLogo = () => {
    return (
        <Link to={'/'}>
            <div className='flex items-end '>
            <img src={logo} alt="" />
            <p className='text-2xl font-semibold -ml-3'>Fast Delivery</p>
        </div>
        </Link>
    );
};

export default FastDeliveryLogo;