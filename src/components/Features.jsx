import React from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { BsCreditCard, BsGift, BsHeadset } from "react-icons/bs"
// import { TbDiscount2 } from "react-icons/tb"

function Features() {


    const items = [
        {
            id: 1,
            iconName: FaShippingFast,
            title: "Free shipping",
            desc: "from all order over 100 EGP"
        }, {
            id: 2,
            iconName: BsGift,
            title: "Daily suprise offers",
            desc: "save up 25% off"
        }, {
            id: 3,
            iconName: BsHeadset,
            title: "Support 24/7",
            desc: "shop with an expert"
        }, {
            id: 4,
            iconName: BsCreditCard,
            title: "Secure payments",
            desc: "100% Protected Payments"
        }
    ]


    return (
        <div className='features'>
            <div className='container'>
                <div className="features_items flex items-center py-16 flex-wrap xl:justify-center max-lg:justify-start gap-8">
                    {items.map(item => {
                        return (
                            <div className='features-item flex items-center gap-3 p-3 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full ' key={item.id}>
                                <item.iconName className='text-2xl text-neutral-900' />
                                <div>
                                    <h6 className='max-md:text-sm text-base font-semibold capitalize text-indigo-500'>{item.title}</h6>
                                    <p className='max-md:text-xs text-sm text-neutral-500'>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Features