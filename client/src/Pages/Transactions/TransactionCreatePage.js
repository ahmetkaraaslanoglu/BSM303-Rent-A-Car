import Layout from "../../Layouts/Layout";
import {Input} from "../../Components/Input";
import axios from "axios";
import {useState} from "react";

export function TransactionCreatePage() {
    const [employeeEmail, setEmployeeEmail] = useState();
    const [custumerIdentityNum, setCustumerIdentityNum] = useState();
    const [vehiclePlate, setVehiclePlate] = useState();
    const [rentDate, setRentDate] = useState();
    const [deliverDate, setDeliverDate] = useState();
    const [totalCost, setTotalCost] = useState();
    const [paymentType, setPaymentType] = useState();
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8080/transaction/add', {
            personelKimlik: employeeEmail,
            musteriKimlik: custumerIdentityNum,
            aracPlaka: vehiclePlate,
            kiralamaTarih: rentDate,
            teslimTarih: deliverDate,
            toplamFiyat: totalCost,
            odeme_tur: paymentType
        }).then((response) => {
            if (response.data.success) {
                alert(response.data.message);
                window.location.href = '/transactions';
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
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Kiralama İşlemi Ekle</h2>
                        <a
                            href="/customer/create"
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Müşteri Oluştur
                        </a>
                    </div>
                </div>

                <div className="h-full bg-white flex justify-center mt-8 overflow-auto mb-10">
                    <div className="w-[54%] rounded-lg border border-gray-400 p-4">
                        <form onSubmit={submit} className="p-2 space-y-8">
                            <div className="text-lg leading-6 font-medium text-gray-900">Yeni Kiralama İşlemi Oluştur</div>

                            <Input label="Çalışan Kimlik Numarası" value={employeeEmail} setValue={(e) => setEmployeeEmail(e.target.value)}/>
                            <Input label="Müşteri Kimlik Numarası" value={custumerIdentityNum} setValue={(e) => setCustumerIdentityNum(e.target.value)}/>
                            <Input label="Araç Plakası" value={vehiclePlate} setValue={(e) => setVehiclePlate(e.target.value)}/>
                            <div className="flex flex-row space-x-4 justify-between">
                                <Input label="Kiralanma Tarihi" value={rentDate} setValue={(e) => setRentDate(e.target.value)}/>
                                <Input label="Teslim Tarihi" value={deliverDate} setValue={(e) => setDeliverDate(e.target.value)}/>
                            </div>
                            <div className="flex flex-row space-x-4 justify-between">
                                <Input label="Toplam Fiyat" value={totalCost} setValue={(e) => setTotalCost(e.target.value)}/>
                                <Input label="Ödeme Türü" value={paymentType} setValue={(e) => setPaymentType(e.target.value)}/>
                            </div>


                            <div className="flex w-full justify-end items-center">
                                <button
                                    type="submit"
                                    className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                                    Kayıt Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
