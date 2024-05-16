'use client';
import { SetStateAction, useState } from 'react';
import Navbar from '../components/Navbar';
import curriculum from './courses';

const grades = ["A", "B", "C", "D", "E", "T"];

export default function Input() {
    const [namaMahasiswa, setNamaMahasiswa] = useState('');
    const [NIM, setNIM] = useState('');
    const [kodeMK, setKodeMK] = useState(Array(10).fill(''));
    const [nilai, setNilai] = useState(Array(10).fill(''));
    const [kaprodi, setSelectedKaprodi] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const daftarKaprodi = ['Basuki', 'Prabowo'];
    const courses = curriculum;

    const handleKaprodiChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedKaprodi(event.target.value);
    };

    const handleCourseChange = (index: number, value: string) => {
        const newKodeMK = [...kodeMK];
        newKodeMK[index] = value;
        setKodeMK(newKodeMK);
    };

    const handleNilaiChange = (index: number, value: string) => {
        const newNilai = [...nilai];
        newNilai[index] = value;
        setNilai(newNilai);
    };

    const handleSubmit = () => {
        if (!namaMahasiswa || !NIM || !kaprodi || !privateKey ||
            kodeMK.includes('') || kodeMK.includes('')) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        const namaMataKuliah = kodeMK.map(code => {
            const course = courses.find(c => c.kode === code);
            return course
        });

        console.log('Submitted Data:', {
            namaMahasiswa,
            NIM,
            kodeMK,
            namaMataKuliah,
            nilai,
            kaprodi,
            privateKey
        });
        alert('Data Submitted Successfully!');
    };

    const getAvailableCourses = (index: number) => {
        const mataKuliahSet = new Set(kodeMK);
        return courses.filter(course => !mataKuliahSet.has(course.kode) || kodeMK[index] === course.kode);
    };

    return (
        <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2 ">
            <Navbar currPage="Input" />
            <div className="container mx-auto w-1/2 pt-24 text-purple1">
                <h1 className="text-center text-3xl font-extrabold">Portal Input Nilai Jurusan</h1>
                <h1 className="text-center text-2xl font-extrabold mb-4">Sistem dan Teknologi Informasi ITB</h1>
                <h2 className="text-xl font-bold">Data Kaprodi</h2>
                <div>
                    <label className="block text-gray-700">Pilih Kaprodi:</label>
                    <select
                        id="kaprodi-dropdown"
                        value={kaprodi}
                        onChange={handleKaprodiChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select Kaprodi</option>
                        {daftarKaprodi.map((kaprodiOption, index) => (
                            <option key={index} value={kaprodiOption}>{kaprodiOption}</option>
                        ))}
                    </select>
                    <label className="block">Private Key:</label>
                    <input type="text" value={privateKey} onChange={e => setPrivateKey(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                </div>
                <h2 className="text-xl font-bold mt-2">Data Mahasiswa</h2>
                <div className="mb-2">
                    <label className="block">Nama Mahasiswa:</label>
                    <input type="text" value={namaMahasiswa} onChange={e => setNamaMahasiswa(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                </div>
                <div className="mb-2">
                    <label className="block">NIM Mahasiswa:</label>
                    <input type="text" value={NIM} onChange={e => setNIM(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-bold mt-2">{`Mata kuliah ${index + 1}`}</h2>
                        <label>{`Pilih Mata Kuliah ${index + 1}:`}</label>
                        <select
                            value={kodeMK[index]}
                            onChange={e => handleCourseChange(index, e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select Course</option>
                            {getAvailableCourses(index).map(course => (
                                <option key={course.kode} value={course.kode}>{`${course.kode} - ${course.mataKuliah} - SKS: ${course.SKS}`}</option>
                            ))}
                        </select>
                        <label className='mt-2'>{`Nilai Mata Kuliah ${index + 1}:`}</label>
                        <select
                            value={nilai[index]}
                            onChange={e => handleNilaiChange(index, e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Pilih Nilai</option>
                            {grades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded content-center">
                    Submit Nilai
                </button>
            </div>
        </main>
    );
}
