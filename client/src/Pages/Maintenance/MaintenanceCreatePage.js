import {useState} from "react";
import axios from "axios";
import Layout from "../../Layouts/Layout";
import {Input} from "../../Components/Input";

export function MaintenanceCreatePage() {
    const [plakaNumarasi, setPlakaNumarasi] = useState('');
    const [bakimTarihi, setBakimTarihi] = useState('');
    const [bakimAciklamasi, setBakimAciklamasi] = useState('');
    const [bakimTutari, setBakimTutari] = useState('');
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8800/maintenance/add', {
            plakaNumarasi: plakaNumarasi,
            bakimTarihi: bakimTarihi,
            bakimAciklamasi: bakimAciklamasi,
            bakimTutari: bakimTutari
        }).then((response) => {
            if (response.data.success) {
                window.location.href = '/maintenance';
                alert(response.data.message);
            }
            else {
                alert(response.data.message);
            }

        });
    }

    return (
        <Layout>
            <div className="bg-white  flex flex-col">

                <div className="h-16 px-10">
                    <div className="h-full border-b border-gray-500 flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Bakım Bilgisi Ekle</h2>
                    </div>
                </div>

                <div className="h-full bg-white flex justify-center mt-8 overflow-auto mb-10">
                    <div className="w-[54%] rounded-lg border border-gray-400 p-4">
                        <form onSubmit={submit} className="p-2 space-y-8">
                            <div className="text-lg leading-6 font-medium text-gray-900">Yeni Bakım Bilgisi Oluştur</div>

                            <Input label="Araç Plakası" value={plakaNumarasi} setValue={(e) => setPlakaNumarasi(e.target.value)}/>
                            <Input label="Bakım Tarihi" value={bakimTarihi} setValue={(e) => setBakimTarihi(e.target.value)}/>
                            <Input label="Bakım Açıklaması" value={bakimAciklamasi} setValue={(e) => setBakimAciklamasi(e.target.value)}/>
                            <Input label="Bakım Ücreti" value={bakimTutari} setValue={(e) => setBakimTutari(e.target.value)}/>

                            <div className="flex w-full justify-end items-center">
                                <button
                                    type="submit"
                                    className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                                    Bakım Bilgisi Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
