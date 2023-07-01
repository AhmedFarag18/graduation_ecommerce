import { FaOpencart } from "react-icons/fa"
import { Link } from "react-router-dom";
import { AiOutlineSetting, AiOutlineBranches, AiOutlineLineChart, AiFillSetting } from "react-icons/ai";
import { BiCategory, BiMessageSquareAdd, BiUser } from "react-icons/bi";
import { IoBagHandle } from "react-icons/io5";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { FiUnlock, FiUsers } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
const SideNav = ({ open, setOpen }) => {
    const Menus = [
        { title: "Dashboard", src: <BiUser className="text-2xl" />, link: "/dashboard" },
        { title: "All Users", src: <FiUsers className="text-2xl" />, gap: true, link: "/dashboard/users" },
        { title: "Get products", src: <AiOutlineLineChart className="text-2xl" />, link: "/dashboard/getproducts" },
        { title: "All Brands", src: <IoBagHandle className="text-2xl" />, link: "/dashboard/allbrands" },
        { title: "All Types", src: <VscTypeHierarchySub className="text-2xl" />, link: "/dashboard/alltypes" },
        { title: "Add Product", src: <BiMessageSquareAdd className="text-2xl" />, gap: true, link: "/dashboard/addproduct" },
        { title: "Add Brand", src: <AiOutlineBranches className="text-2xl" />, link: "/dashboard/addbrand" },
        { title: "Add Type", src: <BiCategory className="text-2xl" />, link: "/dashboard/addtype" },
        { title: "Add Role", src: <RiAdminFill className="text-2xl" />, link: "/dashboard/addrole" },
        { title: "AddRole To User", src: <RiAdminFill className="text-2xl" />, link: "/dashboard/addroletouser" },
        { title: "Change Password", src: <FiUnlock className="text-2xl" />, gap: true, link: "/dashboard/changepassword" },
        { title: "Setting", src: <AiOutlineSetting className="text-2xl" />, link: "/dashboard/setting" },
    ];

    return (
        <div className={`fixed z-20 h-screen ${!open ? "w-1/5 max-md:w-1/2 max-sm:w-3/4" : "w-6 bg-main-color"}`}>
            <div
                className={`side_navbar_icon flex justify-center items-center text-white bg-main-color ${!open ? "opend" : "closed"}`}
                onClick={() => {
                    setOpen(!open)
                    const target = document.querySelector(".side_navbar")
                    open ? target.classList.add("show") : target.classList.remove("show")
                }}>
                <AiFillSetting className="animate-rotate text-2xl" />
            </div>
            <div className={`w-full bg-main-color h-screen p-5  pt-8 absolute left-0  side_navbar`}>

                <div className="side_navbar_details">
                    <Link to={"/dashboard/"} className="flex gap-x-4 items-center">
                        <div className=" bg-white p-1.5 rounded">
                            <FaOpencart className={`text-2xl text-main-color cursor-pointer  `} />
                        </div>
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 `}
                        >
                            Nova
                        </h1>
                    </Link>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                        ${Menu.gap ? "mt-9" : "mt-2"}
                                } `}
                            >
                                <Link to={Menu.link} className="flex gap-2 items-center">
                                    {Menu.src}
                                    <span className={`origin-left duration-200`}>{Menu.title}  </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};
export default SideNav;
