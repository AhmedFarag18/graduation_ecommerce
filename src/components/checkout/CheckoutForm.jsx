import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik/dist';
import { API_URL } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import ShippingAddress from './ShippingAddress';
import ShippingMethods from './ShippingMethods';
import PaymentMethod from './PaymentMethod';
import { extraCreateOrderAction, extraCreatePaymentIntent } from '../../redux/slices/basket-slice';
import { changeshipTOAddress } from '../../redux/slices/order-slice';
import CheckoutTabs from './CheckoutTabs';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const CheckoutForm = () => {

    const [openTab, setOpenTab] = useState(1);

    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const authUser = useSelector(state => state.auth.user);
    const newOrder = useSelector(state => state.order);
    const dispatch = useDispatch();
    // start initializing validation
    const InitialValues = { firstName: "", lastName: "", country: "", city: "", street: "" };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("firsName is Required."),
        lastName: Yup.string().required("lastName is Required."),
        country: Yup.string().required("country is Required."),
        city: Yup.string().required("city is Required."),
        street: Yup.string().required("street is Required."),
    });

    useEffect(() => {
        fetch(`${API_URL}/Orders/deliveryMethods`, {
            headers: {
                'Authorization': `Bearer ${authUser.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setDeliveryMethods(data);
            })
    }, [])

    const handleSubmit = async (values, { setSubmitting }) => {
        setTimeout(() => {
            dispatch(extraCreateOrderAction(newOrder))
            setSubmitting(false);
        }, 500);
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <CheckoutTabs setOpenTab={setOpenTab} openTab={openTab} />

                <Formik initialValues={InitialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {props => {
                        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="tab-content tab-space">
                                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                                <ShippingAddress setOpenTab={setOpenTab} values={values} touched={touched} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                <ShippingMethods deliveryMethods={deliveryMethods} />
                                                <div className='buttons_step flex justify-between items-center my-5'>
                                                    <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            setOpenTab(1);
                                                        }} data-toggle="tab" href="#link3" role="tablist">
                                                        <FaArrowAltCircleLeft className="text-2xl mr-1" /> Back
                                                    </a>
                                                    <button className={"text-base uppercase p-4 shadow hover:shadow-lg transition duration-200 rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                                                        type="submit" disabled={isSubmitting}
                                                        onClick={() => {
                                                            setOpenTab(3);
                                                            dispatch(extraCreatePaymentIntent())
                                                            dispatch(changeshipTOAddress(values))
                                                        }}
                                                        data-toggle="tab" href="#link3" role="tablist">
                                                        Go To Payment <FaArrowAltCircleRight className="text-2xl mr-1" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                                <PaymentMethod setOpenTab={setOpenTab} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default CheckoutForm