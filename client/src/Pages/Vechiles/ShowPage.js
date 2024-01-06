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



    if (!flag) {
        return (
            <Layout>
                <div>Yükleniyor...</div>
            </Layout>
        );
    }
    return (
        <Layout>
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

                    <div className="w-full  flex mt-20">
                        <div className="w-1/5 text-lg font-semibold">Plaka</div>
                        <div className="w-4/5 text-lg font-mono">{vehicle.plaka}</div>
                    </div>

                </div>
            </div>

        </Layout>
    );
}
