import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

function CategorySideItem(props) {
    const [toggle, setToggle] = useState(true);
    return (
        <>
            <ul className='w-full'>
                <li>
                    <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded group hover:bg-gray-100"
                        onClick={() => { toggle ? setToggle(false) : setToggle(true) }}>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">{props.name}</span>
                        <RiArrowDownSLine className='text-2xl' />
                    </button>
                    <ul id="dropdown-example" className={`${toggle ? "opacity-0 scale-0 invisible h-0" : "opacity-100 scale-100 visible h-auto origin-top"} duration-200 transition-all py-2 space-y-2`}>
                        {props.brands.map((item, idx) => {
                            return (
                                <li key={idx}>
                                    <a href="#" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded pl-11 group hover:bg-gray-100">
                                        {item}
                                    </a>
                                </li>)
                        })}
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default CategorySideItem