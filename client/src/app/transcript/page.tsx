'use client';
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import contoh from "./contoh.json";
import { RecordType } from './record.d';
import { ChangeEvent, useState } from "react";

export default function Transcript() {
    // const [transcript, setTranscript] = useState<RecordType[]>();

    const transcript: RecordType[] = contoh.map(d => ({
        config: "origin",
        ...d,
    }));

    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState("View"); // view buat liat data, add buat nambah data
    const [viewEncrypted, setViewEncrypted] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>();
    const [pagination, setPagination] = useState<number>();

    const columns: string[] = ["Nama", "NIM", "Kode MK 1", "Nama MK 1", "Nilai MK 1", "SKS MK 1", "Kode MK 2", "Nama MK 2", "Nilai MK 2", "SKS MK 2", "Kode MK 3", "Nama MK 3", "Nilai MK 3", "SKS MK 3", "Kode MK 4", "Nama MK 4", "Nilai MK 4", "SKS MK 4", "Kode MK 5", "Nama MK 5", "Nilai MK 5", "SKS MK 5", "Kode MK 6", "Nama MK 6", "Nilai MK 6", "SKS MK 6", "Kode MK 7", "Nama MK 7", "Nilai MK 7", "SKS MK 7", "Kode MK 8", "Nama MK 8", "Nilai MK 8", "SKS MK 8", "Kode MK 9", "Nama MK 9", "Nilai MK 9", "SKS MK 9", "Kode MK 10", "Nama MK 10", "Nilai MK 10", "SKS MK 10", "IPK", "Public Key", "Tanda Tangan Digital", "Unduh", "Verifikasi"];
    const filledColumns: string[] = ["Nama", "NIM", "Kode MK 1", "Nama MK 1", "Nilai MK 1", "SKS MK 1", "Kode MK 2", "Nama MK 2", "Nilai MK 2", "SKS MK 2", "Kode MK 3", "Nama MK 3", "Nilai MK 3", "SKS MK 3", "Kode MK 4", "Nama MK 4", "Nilai MK 4", "SKS MK 4", "Kode MK 5", "Nama MK 5", "Nilai MK 5", "SKS MK 5", "Kode MK 6", "Nama MK 6", "Nilai MK 6", "SKS MK 6", "Kode MK 7", "Nama MK 7", "Nilai MK 7", "SKS MK 7", "Kode MK 8", "Nama MK 8", "Nilai MK 8", "SKS MK 8", "Kode MK 9", "Nama MK 9", "Nilai MK 9", "SKS MK 9", "Kode MK 10", "Nama MK 10", "Nilai MK 10", "SKS MK 10", "IPK", "Public Key", "Tanda Tangan Digital"];

    //knp gbs yak
    // setTotalPages(Math.ceil(transcript.length / 2));
    console.log(Math.ceil(transcript.length / 2));

    // const handleKeyChange = (
    //     event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    //   ) => {
    //     const { name, value } = event.target;
    //     setKey(value);
    //   };

    return (
        <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2">
            <Navbar currPage="Transcript" />
            <div className="z-10 w-full items-center font- text-sm py-24 px-16">
                <div className="text-center py-4">
                    <h1 className="text-purple1 text-lg font-bold">Academic Transcript</h1>
                </div>
                <div>
                    <div className="flex justify-center">
                        <div className={(viewEncrypted === true ? "bg-purple1 font-bold " : "pink1 hover:bg-pink2  ") + "py-4 w-full text-center text-white rounded-t-2xl bg-pink1 "}
                            onClick={() => setViewEncrypted(true)}>
                            <p>Encrypted Record</p>
                        </div>
                        <div className={(viewEncrypted === false ? "bg-purple1 font-bold " : "pink1 hover:bg-pink2  ") + "py-4 w-full text-center text-white rounded-t-2xl bg-pink1 "}
                            onClick={() => setViewEncrypted(false)}>
                            <p>Decrypted Record</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto border-4 border-purple1 scrollbar scrollbar-thumb-blue2 scrollbar-track-purple1" >
                        <table className="overflow-x-auto text-center text-sm font-normal table-auto whitespace-nowrap text-white1" >
                            <thead className="font-bold bg-purple1 text-white1">
                                <tr>
                                    {columns.map((col, idx) =>
                                        <th key={idx} className="border-2 border-purple1 px-4 py-2">{col}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {transcript.map((item, idx) => {
                                    return <tr key={`row-${idx}`} className="text-purple1 hover:bg-[#9CB3DA]">
                                        {filledColumns.map((col, idx2) =>
                                            <th key={idx2} className="border-2 border-purple1 px-4 py-1 w-24 font-normal">{item[col]}</th>
                                        )}
                                        <th className="border-2 border-purple1 px-4 py-1 w-24 font-normal">
                                            <button className=""
                                            // onClick={() => } 
                                            >
                                                <img src="/download.png" alt="download file" className="w-6 inline-flex"></img>
                                            </button>
                                        </th>
                                        <th className="border-2 border-purple1 px-6 py-1 w-24 font-normal ">
                                            <div className="flex justify-center gap-x-2">
                                            <img src={item.Verifikasi === "unchecked" ? "/unchecked.png" : item.Verifikasi === "valid" ? "/valid.png" : "/invalid.png"} alt="download file" className="w-8 h-6 "></img>
                                            <button className="bg-pink1 border-2 border-white1 text-white1 text-sm rounded-lg block px-2 drop-shadow-lg hover:drop-shadow-md hover:bg-pink2 pr-1"
                                            // onClick={() => } 
                                            >
                                                Verify Data
                                            </button>
                                            </div>
                                            
                                        </th>
                                    </tr>
                                }

                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-purple1 flex justify-end">
                            <Pagination
                            totalPages={totalPages}
                            page={pagination}
                            setPage={setPagination}
                            />
                    </div>
                </div>

                <div className="buttons flex gap-x-2 py-6 justify-center">
                    <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
                    // onClick={() => } 
                    >
                        Add Data
                    </button>
                </div>
            </div>
        </main>
    );
}
