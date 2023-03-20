import React from 'react'
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (

        <footer className="bg-gray-200">
            <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-indigo-500 uppercase dark:text-gray-400">Company</h2>
                    <ul className="text-indigo-500 dark:text-gray-400">
                        <li className="mb-4">
                            <Link to="/" className=" hover:underline">About</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Careers</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Brand Center</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Blog</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-indigo-500 uppercase dark:text-gray-400">Help center</h2>
                    <ul className="text-indigo-500 dark:text-gray-400">
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Discord Server</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Twitter</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Facebook</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-indigo-500 uppercase dark:text-gray-400">Legal</h2>
                    <ul className="text-indigo-500 dark:text-gray-400">
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Privacy Policy</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Licensing</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Terms &amp; Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-indigo-500 uppercase dark:text-gray-400">Download</h2>
                    <ul className="text-indigo-500 dark:text-gray-400">
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">iOS</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Android</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">Windows</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/" className="hover:underline">MacOS</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/">Tiangge™</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                    <Link to="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <FaFacebook />
                        <span className="sr-only">Facebook page</span>
                    </Link>
                    <Link to="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <FaInstagram />
                        <span className="sr-only">Instagram page</span>
                    </Link>
                    <Link to="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <FaTwitter />
                        <span className="sr-only">Twitter page</span>
                    </Link>
                    <Link to="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <FaGithub />
                        <span className="sr-only">GitHub account</span>
                    </Link>
                    <Link to="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <FaDribbble />
                        <span className="sr-only">Dribbble account</span>
                    </Link>
                </div>
            </div>
        </footer>

    )
}

export default Footer