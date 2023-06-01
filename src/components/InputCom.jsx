import React from 'react'

function InputCom({ id, type, label, placeholder, handler }) {
    return (
        <>
            <div className='my-2 flex flex-col gap-1'>
                <label className="font-medium text-base text-neutral-800 after:content-['*'] after:ml-0.5 after:text-red-500">{label}</label>
                <input type={type} id={id} className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border' placeholder={placeholder}
                    onChange={handler}
                />
            </div>
        </>
    )
}

export default InputCom