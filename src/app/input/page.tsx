'use client';
import { SetStateAction, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import curriculum from './courses';
import axios from 'axios';

const grades = ["A", "B", "C", "D", "E", "T"];
const gradeValues: { [key: string]: number } = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    E: 0,
    F: 0
};

interface Transcript {
    nim: string;
    nama: string;
    totalSks: number;
    ipk: number;
    signature: string;
    publicKey: string;
    encryptKey: string | null;
    [key: string]: any;
}

export default function Input() {
    const [namaMahasiswa, setNamaMahasiswa] = useState('');
    const [NIM, setNIM] = useState('');
    const [kodeMK, setKodeMK] = useState(Array(10).fill(''));
    const [nilai, setNilai] = useState(Array(10).fill(''));
    const [kaprodi, setSelectedKaprodi] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [daftarKaprodi, setDaftarKaprodi] = useState([]);
    const [encryptKey, setEncryptKey] = useState('');
    const courses = curriculum;

    useEffect(() => {
        const fetchKaprodi = async () => {
            try {
                const response = await axios.get('/api/key');
                const data = response.data;
                if (data.status === 200) {
                    setDaftarKaprodi(data.data);
                } else {
                    console.error('Failed to fetch kaprodi:', data.message);
                }
            } catch (error) {
                console.error('Error fetching kaprodi:', error);
            }
        };

        fetchKaprodi();
    }, []);

    const handleKaprodiChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        const selectedKaprodi = event.target.value;
        setSelectedKaprodi(selectedKaprodi);
        const selectedKey = daftarKaprodi.find(item => item.owner === selectedKaprodi)?.key || '';
        setPublicKey(selectedKey);
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

    const setDefaultValues = () => {
        setNamaMahasiswa('John Doe');
        setNIM('202121072');
        setKodeMK(["MA1101", "FI1101", "KU1001", "KU1102", "KU1011", "KU1024", "MA1201", "FI1201", "IF1210", "KU1202"]);
        setNilai(["A", "B", "C", "D", "A", "A", "B", "C", "D", "A"]);
        // setSelectedKaprodi('Basuki');
        setPrivateKey('defaultPrivateKey');
    };

    const handleSubmit = async () => {
        if (!namaMahasiswa || !NIM || !kaprodi || !privateKey ||
            kodeMK.includes('') || nilai.includes('')) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        const mataKuliah = kodeMK.map(code => {
            const course = courses.find(c => c.kode === code);
            return course ? { kode: course.kode, mataKuliah: course.mataKuliah, SKS: course.SKS } : null;
        }).filter(course => course !== null);

        const sksMataKuliah = kodeMK.map(code => {
            const course = courses.find(c => c.kode === code);
            return course?.SKS || 0;
        });

        const totalSKS = sksMataKuliah.reduce((total, sks) => total + sks, 0);

        const totalWeightedScores = mataKuliah.reduce((total, course, index) => {
            const gradeValue = gradeValues[nilai[index]];
            return total + (gradeValue * (course?.SKS || 0));
        }, 0);

        const temp_ipk = (totalWeightedScores / totalSKS);
        const ipk = parseFloat(temp_ipk.toFixed(2));

        const transcript: Transcript = {
            nim: NIM,
            nama: namaMahasiswa,
            totalSks: totalSKS,
            ipk,
            signature: privateKey,
            publicKey,
            encryptKey: "encryptedKey123",
        };

        for (let i = 0; i < 10; i++) {
            transcript[`kodeMk${i + 1}`] = kodeMK[i];
            transcript[`namaMk${i + 1}`] = mataKuliah[i]?.mataKuliah || '';
            transcript[`nilai${i + 1}`] = nilai[i];
            transcript[`sks${i + 1}`] = mataKuliah[i]?.SKS || 0;
        }

        try {
            const response = await axios.post('/api/transcript', transcript);
            const data = response.data;
            if (data.status === 200) {
                console.log('Submitted Data:', transcript);
                alert(`Data Submitted Successfully! Total SKS: ${totalSKS}, IPK: ${ipk}`);
            } else {
                console.error('Failed to submit transcript:', data.message);
                alert('Failed to submit transcript');
            }
        } catch (error) {
            console.error('Error submitting transcript:', error);
            alert('Failed to submit transcript');
        }

        console.log("not stringed", transcript);
        console.log("with JSON", JSON.stringify(transcript));

    };

    const getAvailableCourses = (index: number) => {
        const mataKuliahSet = new Set(kodeMK);
        return courses.filter(course => !mataKuliahSet.has(course.kode) || kodeMK[index] === course.kode);
    };

    return (
        <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2 ">
            <Navbar currPage="Input" />
            <div className="container mx-auto w-1/2 pt-24 text-purple1">
                <h1 className="text-center text-3xl font-extrabold">Input Nilai Jurusan</h1>
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
                            <option key={index} value={kaprodiOption.owner}>{kaprodiOption.owner}</option>
                        ))}
                    </select>
                    <label className="block">Private Key:</label>
                    <input type="text" value={privateKey} onChange={e => setPrivateKey(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                    <label className="block">Encryption Key:</label>
                    <input type="text" value={encryptKey} onChange={e => setEncryptKey(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />

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
                <button onClick={setDefaultValues} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-10 rounded content-center">
                    Set Default Values
                </button>
            </div>
        </main>
    );
}
