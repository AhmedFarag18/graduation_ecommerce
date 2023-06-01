import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa';

function PaymentMethod({ setOpenTab }) {
    return (
        <>
            <div>
                <p>Integer at mauris diam. Nunc nisl nisl, molestie quis mauris quis, dictum finibus arcu. Donec nisl mauris, porta at ullamcorper faucibus, semper at nunc.</p>
            </div>
            <div className='buttons_step flex justify-between items-center my-5'>
                <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal  bg-white text-main-color"}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                    }} data-toggle="tab" href="#link3" role="tablist">
                    <FaArrowAltCircleLeft className="text-2xl mr-1" /> Back
                </a>
            </div>
        </>
    )
}

export default PaymentMethod