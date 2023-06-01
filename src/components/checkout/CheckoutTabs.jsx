import React from 'react'
import { FaAddressCard, FaPaypal, FaShippingFast } from 'react-icons/fa';

function CheckoutTabs({ setOpenTab, openTab }) {
    return (
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row gap-1" role="tablist">
            <li className="-mb-px flex-auto text-center">
                <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal " + (openTab === 1 ? "text-white bg-main-color" : "text-main-color bg-white")}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                    }} data-toggle="tab" href="#link1" role="tablist"
                >
                    <FaAddressCard className="text-2xl mr-1" /> Shipping Address
                </a>
            </li>
            <li className="-mb-px flex-auto text-center">
                <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal " + (openTab === 2 ? "text-white bg-main-color" : "text-main-color bg-white")}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                    }} data-toggle="tab" href="#link2" role="tablist">
                    <FaShippingFast className="text-2xl mr-1" />  Shipping Methods
                </a>
            </li>
            <li className="-mb-px flex-auto text-center">
                <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal " + (openTab === 3 ? "text-white bg-main-color" : "text-main-color bg-white")}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                    }} data-toggle="tab" href="#link3" role="tablist">
                    <FaPaypal className="text-2xl mr-1" />  Payment Method
                </a>
            </li>
        </ul>
    )
}

export default CheckoutTabs