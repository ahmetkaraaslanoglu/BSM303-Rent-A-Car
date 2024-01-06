import { Fragment } from 'react'
import {FaUsers, FaUserTie} from "react-icons/fa";
import {FaCarOn} from "react-icons/fa6";
import {LuShoppingCart} from "react-icons/lu";
import {GrHostMaintenance} from "react-icons/gr";

export default function Layout({children}) {
    return (
        <>
            <div>
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <nav className="mt-5 flex-1 px-2 space-y-2">
                                <a key="vechiles" href="/vehicles" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                    <div className="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 text-xl">
                                        <FaCarOn />
                                    </div>
                                    Araçlar
                                </a>
                                <a key="employees" href="/employess" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                    <div className="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 text-xl">
                                        <FaUserTie />
                                    </div>
                                    Personeller
                                </a>
                                <a key="customers" href="/customers" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                    <div className="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 text-xl">
                                        <FaUsers />
                                    </div>
                                    Müşteriler
                                </a>
                                <a key="transactions" href="/transactions" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                    <div className="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 text-xl">
                                        <LuShoppingCart />
                                    </div>
                                    Kiralama İşlemleri
                                </a>
                                <a key="maintenance" href="/maintenance" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                    <div className="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 text-xl">
                                        <GrHostMaintenance />
                                    </div>
                                    Bakım İşlemleri
                                </a>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex bg-gray-700 p-4">
                            <a href="#" className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white">Ahmet Karaaslanoğlu</p>
                                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64">
                    <main className="">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
