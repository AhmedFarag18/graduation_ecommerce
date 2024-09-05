import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function TeamMember(props) {
    return (
        <div className='team_memeber pb-10 p-5 flex flex-col border border-gray-200 rounded'>
            <div className='about flex gap-4 mb-5 items-center'>
                <LazyLoadImage src={props.img} alt={props.name} width="100" className='rounded-full p-1 border-2 border-main-color' />
                <div className='flex flex-col'>
                    <span className='name block text-indigo-600 capitalize font-medium'>{props.name}</span>
                    <span className='job block text-sm text-neutral-600'>{props.role}</span>
                </div>
            </div>
            <p className='text-sm text-neutral-500 mb-8 leading-6'>{props.description}</p>
            <div className='team_social flex gap-3'>
                <a href={props.links[0]} className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-main-color hover:text-white transition duration-300'><FaGithub /></a>
                <a href={props.links[1]} className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-main-color hover:text-white transition duration-300'><FaFacebook /></a>
                <a href={props.links[2]} className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-main-color hover:text-white transition duration-300'><FaInstagram /></a>
                <a href={props.links[3]} className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-main-color hover:text-white transition duration-300'><FaLinkedinIn /></a>
            </div>
        </div>
    )
}

export default TeamMember