import {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../../Layouts/Layout";

export function IndexPage() {
    const [vechiles, setVechiles] = useState([]);
    const [flag, setFlag] = useState(false);
    const load = () => {
        axios.get('http://127.0.0.1:8080/vehicles').then((response) => {
            setVechiles(response.data);
            setFlag(true);
        });
    }

    useEffect(() => {
        load();
    },[])

    if (!flag) {
        return (
            <Layout>
                <div>Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-white h-screen flex flex-col justify-between">
                <div className="h-20 px-10">
                    <div className="h-full border-b border-gray-500 flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Araçlar</h2>
                        <a
                            href="/vehicles/create"
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Araç Ekle
                        </a>
                    </div>
                </div>
                <div className="h-full bg-white overflow-auto">
                    <div className="max-w-2xl mx-auto px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 ">

                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {vechiles.map((vechile) => (
                                <a key={vechile.id} href={`/vehicles/${vechile.id}`} className="group relative">
                                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                        <img
                                            src={vechile.image_url}
                                            alt="image"
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {vechile.marka}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{vechile.model}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{vechile.gunluk_ucret}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
}
