import Layout from "../../Layouts/Layout";
import {Input} from "../../Components/Input";
import axios from "axios";
import {useState} from "react";

export function CreatePage() {
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [yil, setYil] = useState('');
    const [plakaNumarasi, setPlakaNumarasi] = useState('');
    const [gunlukUcret, setGunlukUcret] = useState('');
    const [yakitTipi, setYakitTipi] = useState('');
    const [vitesTipi, setVitesTipi] = useState('');
    const [renk, setRenk] = useState('');
    const [kilometre, setKilometre] = useState('');
    const [durum, setDurum] = useState('');
    const submit = (e) => {
        if (durum === 'Kiralanmış') { setDurum(true); }
        else { setDurum(false); }
        axios.post('http://127.0.0.1:8080/vehicle/add', {
            aracMarka: marka,
            aracModel: model,
            aracYil: yil,
            aracRenk: renk,
            aracPlaka: plakaNumarasi,
            aracFiyat: gunlukUcret,
            aracYakit: yakitTipi,
            aracVites: vitesTipi,
            aracKilometre: kilometre,
            aracDurum: durum
        }).then((response) => {
            if (response.data.success) {
                window.location.href = '/vehicles';
                alert(response.data.message)
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
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Araç Ekle</h2>
                    </div>
                </div>

                <div className="h-full bg-white flex justify-center mt-8 overflow-auto mb-10">
                    <div className="w-[54%] rounded-lg border border-gray-400 p-4">
                        <form onSubmit={submit} className="p-2 space-y-8">
                            <div className="text-lg leading-6 font-medium text-gray-900">Yeni Araç Ekle</div>

                            <div className="flex flex-row space-x-4 justify-between">
                                <Input label="Araç Markası" value={marka} setValue={(e) => setMarka(e.target.value)}/>
                                <Input label="Araç Modeli" value={model} setValue={(e) => setModel(e.target.value)}/>
                                <Input label="Araç Plakası" value={plakaNumarasi} setValue={(e) => setPlakaNumarasi(e.target.value)}/>
                            </div>

                            <div className="flex flex-row space-x-4 justify-between">
                                <Input label="Araç Yakıt Tipi" value={yakitTipi} setValue={(e) => setYakitTipi(e.target.value)}/>
                                <Input label="Araç Vites Tipi" value={vitesTipi} setValue={(e) => setVitesTipi(e.target.value)}/>
                                <Input label="Araç Rengi" value={renk} setValue={(e) => setRenk(e.target.value)}/>
                            </div>

                            <div className="flex flex-row space-x-4 justify-between">
                                <Input label="Araç Kilometre" value={kilometre} setValue={(e) => setKilometre(e.target.value)}/>
                                <Input label="Araç Yılı" value={yil} setValue={(e) => setYil(e.target.value)}/>
                            </div>

                            <Input label="Araç Ücreti (Günlük)" value={gunlukUcret} setValue={(e) => setGunlukUcret(e.target.value)}/>
                            <Input label="Araç Durumu" value={durum} setValue={(e) => setDurum(e.target.value)}/>

                            <div className="flex w-full justify-end items-center">
                                <button
                                    type="submit"
                                    className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                                    Araç Ekle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
