import Layout from "../../Layouts/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
export function ShowPage() {
    const {vehiclesId} = useParams();
    const [vehicle, setVehicle] = useState([]);
    const [flag, setFlag] = useState(false);

    const load = useCallback(() => {
        axios.get(`http://127.0.0.1:8080/vehicle/${vehiclesId}`).then((response) => {
            setVehicle(response.data[0]);
            setFlag(true);
        });
    }, [vehiclesId]);

    useEffect(() => {
        if (vehiclesId) {
            load();
        }
    }, [vehiclesId, load]);

    const updateVechileState = () => {
        axios.put(`http://127.0.0.1:8080/vehicle/update/${vehiclesId}`, {})
            .then((response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    load();
                }
            })
    }

    const updateVehiclePlate = (newPlate) => {
        axios.put(`http://127.0.0.1:8080/vehicle/updatePlate`, {
            aracId : vehicle.id,
            aracPlaka : newPlate
        }).then((response) => {
            if (response.data.success) {
                alert(response.data.message);
                load();
            }
        })
    }

    const updateVehiclePrice = (newPrice) => {
        axios.put(`http://127.0.0.1:8080/vehicle/updateCost`, {
            aracId : vehicle.id,
            aracFiyat : newPrice
        }).then((response) => {
            if (response.data.success) {
                alert(response.data.message);
                load();
            }
        })
    }

    const handleButtonClick = () => {
        const newPlate = prompt('Yeni araç plakasını girin:');
        if (newPlate !== null) {
            updateVehiclePlate(newPlate);
        }
    }

    const handleButtonClick2 = () => {
        const newPrice = prompt('Yeni araç fiyatı girin:');
        if (newPrice !== null) {
            updateVehiclePrice(newPrice);
        }
    }


    if (!flag) {
        return (
            <Layout>
                <div>Yükleniyor...</div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="h-20 px-10">
                <div className="h-full border-b border-gray-500 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Araçlar</h2>
                    <div className="flex space-x-4 items-center">
                        <button
                            onClick={handleButtonClick}
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Araç Plaka Güncelle
                        </button>
                        <button
                            onClick={handleButtonClick2}
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Araç Fiyat Güncelle
                        </button>
                        <button
                            onClick={() => {updateVechileState()}}
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Araç Durumu Güncelle
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-screen items-center justify-center flex p-6">
                <div className="h-full w-2/5 mt-52">
                    <img src={vehicle.image_url} className="object-cover"/>
                </div>
                <div className="h-full w-3/5 flex flex-col space-y-2 p-4">

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Fiyat</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.fiyat}₺</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Marka</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.marka}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Model</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.model}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Yıl</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.yil}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Yakıt</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.yakit}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Vites</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.vites}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">KM</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.kilometre}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Renk</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.renk}</div>
                    </div>

                    <div className="w-full  flex mt-20 border-b border-[#e2e4eb]">
                        <div className="w-1/5 text-lg font-semibold">Durum</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.durum ? 'Kiralanmış' : 'Müsait'}</div>
                    </div>

                    <div className="w-full  flex mt-20">
                        <div className="w-1/5 text-lg font-semibold">Plaka</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.plaka}</div>
                    </div>

                </div>
            </div>

        </Layout>
    );
}
