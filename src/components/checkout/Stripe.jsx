import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51MFPI0H4TbWdf7isKtPCpwDYVbz4OntdrLuHTxd5Ix67NQFwViQXKeUPkCWl9ojngAwDBt6F8R9ndxsA7FkxLKjw00PpvYlCyl');

export default function Stripe({ clientSecret }) {

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
        </Elements>
    );
};