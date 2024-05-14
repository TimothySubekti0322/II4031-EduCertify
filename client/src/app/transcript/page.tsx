'use client';
import Navbar from "../components/Navbar";
import contoh from "./contoh.json";
import { RecordType } from './record.d';

export default function Transcript() {
    const students: RecordType[] = contoh;

    return (
        <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2">
            <Navbar currPage="Transcript" />
            <div className="z-10 w-full items-center font- text-sm py-24 px-16">
                <div className="text-center pt-4">
                    <h1 className="text-black text-lg font-bold">Academic Transcript</h1>
                </div>
                <div className="buttons flex flex-col gap-x-2 ">
                    <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
                    // onClick={() => } 
                    >
                        Verify Data
                    </button>
                </div>
            </div>
        </main>
    );
}
