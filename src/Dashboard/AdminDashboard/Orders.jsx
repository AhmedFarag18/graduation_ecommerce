import React, { useEffect, useState } from 'react'
import SideNav from './SideNav';
import { API_URL } from '../../App';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import OrdersTable from './OrdersTable';

function Orders() {
    const [open, setOpen] = useState(true);
    const [loader, setLoader] = useState(true);

    const [searchEmail, setSearchEmail] = useState("")
    const authUser = useSelector(x => x.auth.user);
    const [orders, setOrders] = useState([]);

    const handleGetAllOrders = () => {
        setLoader(true)

        fetch(`${API_URL}/DashboardOrder`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            }
        })
            .then((res) => res.json())
            .then(data => {
                setOrders(data)
                console.log(data)
                setLoader(false)
            })
    }
    useEffect(() => {
        handleGetAllOrders()
    }, [])

    const handleGetOrdersForUser = () => {
        if (searchEmail) {
            setLoader(true)
            fetch(`${API_URL}/DashboardOrder/GetOrdersForUser?buyerEmail=${searchEmail}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authUser.token}`
                }
            })
                .then((res) => res.json())
                .then(data => {
                    setOrders(data)
                    setLoader(false)
                })
        } else {
            toast.error("Search input is Empty!")
        }
    }

    return (

        <div className='flex'>
            <SideNav open={open} setOpen={setOpen} />
            <div className='p-5 details_side'>
                <div className="w-full p-6 md:mt-0 m-auto sm:p-8">
                    <OrdersTable orders={orders} setSearchEmail={setSearchEmail} handleGetOrdersForUser={handleGetOrdersForUser} loader={loader} handleGetAllOrders={handleGetAllOrders} />
                </div>
            </div>
        </div>
    )
}


export default Orders