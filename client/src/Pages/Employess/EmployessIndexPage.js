import Layout from "../../Layouts/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export function EmployessIndexPage() {
    const [employess, setEmployess] = useState([]);

    const load = () => {
        axios.get('http://127.0.0.1:8080/employees').then((response) => {
            setEmployess(response.data);
        });
    }

    useEffect(() => {
        load();
    },[]);

    const deleteEmployee = (id) => {
        axios.delete(`http://127.0.0.1:8080/employee/delete/${id}`).then((response) => {
            alert(response.data.message);
            load();
        });
    }

    return (
        <Layout>
            <div className="bg-white h-screen flex flex-col justify-between">
                <div className="h-20 px-10">
                    <div className="h-full border-b border-gray-500 flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Personeller</h2>
                        <a
                            href="/employess/create"
                            className="bg-gray-900 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-1 focus:outline-offset-1">
                            Personel Ekle
                        </a>
                    </div>
                </div>
                <div className="h-full bg-white overflow-auto">
                    <div className="max-w-2xl mx-auto px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Adı
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Soy Adı
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Kimlik Numarası
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Telefon Numarası
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Eposta
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    Çalışan Pozisyonu
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {employess.map((employee,personIdx) => (
                                                <tr key={employess.id} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.ad}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.soyad}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.kimlik}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.telefon}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.pozisyon}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button onClick={() => deleteEmployee(employee.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            Sil
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    );
}
