import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { clientSecret } from '../../redux/slices/basket-slice';
import Loader from '../Loader';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51MFPI0H4TbWdf7isKtPCpwDYVbz4OntdrLuHTxd5Ix67NQFwViQXKeUPkCWl9ojngAwDBt6F8R9ndxsA7FkxLKjw00PpvYlCyl');

function PaymentMethod({ setOpenTab }) {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    return (
        <>
            {
                clientSecret ? <Elements stripe={stripePromise} options={options}>
                    <PaymentForm setOpenTab={setOpenTab} />
                </Elements>
                    : <Loader />
            }
        </>
    );
}

export default PaymentMethod