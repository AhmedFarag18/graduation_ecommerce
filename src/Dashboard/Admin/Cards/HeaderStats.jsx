import React, { useEffect, useState } from "react";
import CardStats from "./CardStats";
import { FiUsers } from "react-icons/fi";
import { BsCart3, BsFillBookmarkStarFill } from "react-icons/bs";
import { API_URL } from "../../../App";
import { getAllProducts } from "../../../redux/slices/products-slice";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderStats() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const authUser = useSelector(state => state.auth.user);

    useEffect(() => {
        fetch(`${API_URL}/DashboardUser`, {
            headers: {
                'Authorization': `Bearer ${authUser.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
        dispatch(getAllProducts(""))
    }, [])

    return (
        <>
            {/* Header */}
            <div className="relative w-full md:pt-24 pb-32 pt-16">
                <div className="px-4 max-sm:p-2 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 max-sm:p-2">
                                <CardStats
                                    statSubtitle="total Products"
                                    statTitle={products.count}
                                    statIconName={<BsFillBookmarkStarFill />}
                                    statIconColor="bg-red-500"
                                    statDescripiron="Since last month"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 max-sm:p-2">
                                <CardStats
                                    statSubtitle="All USERS"
                                    statTitle={users.length}
                                    statIconName={<FiUsers />}
                                    statIconColor="bg-indigo-500"
                                    statDescripiron="Since last month"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4 max-sm:p-2">
                                <CardStats
                                    statSubtitle="Total Orders"
                                    statTitle="924"
                                    statIconName={<BsCart3 />}
                                    statIconColor="bg-pink-500"
                                    statDescripiron="Since last month"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
