"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import downloadTranscript from "../utils/downloadTranscript";

// const transcriptData = {
//   nim: "18221063",
//   nama: "timothy",
//   kodeMk1: "II3123",
//   namaMk1: "Algoritma dan Pemrograman",
//   nilai1: "A",
//   sks1: 4,
//   kodeMk2: "II3456",
//   namaMk2: "Struktur Data",
//   nilai2: "B",
//   sks2: 3,
//   kodeMk3: "II3789",
//   namaMk3: "Basis Data",
//   nilai3: "AB",
//   sks3: 3,
//   kodeMk4: "II3012",
//   namaMk4: "Jaringan Komputer",
//   nilai4: "C",
//   sks4: 2,
//   kodeMk5: "II3567",
//   namaMk5: "Sistem Operasi",
//   nilai5: "A",
//   sks5: 4,
//   kodeMk6: "II3245",
//   namaMk6: "Teori Komputasi",
//   nilai6: "BC",
//   sks6: 3,
//   kodeMk7: "II3901",
//   namaMk7: "Pemrograman Web",
//   nilai7: "B",
//   sks7: 2,
//   kodeMk8: "II3122",
//   namaMk8: "Kecerdasan Buatan",
//   nilai8: "AB",
//   sks8: 3,
//   kodeMk9: "II3780",
//   namaMk9: "Grafika Komputer",
//   nilai9: "D",
//   sks9: 4,
//   kodeMk10: "II3459",
//   namaMk10: "Keamanan Siber",
//   nilai10: "A",
//   sks10: 2,
//   totalSks: 36,
//   ipk: 3.16,
//   signature: "YcPv5zBwSDFL8Zq1",
//   publicKey: "ABC123",
//   encryptKey: "Pq4fD3Rc6vUj9nW2",
//   owner: "Timothy",
// };

const GeneratePdfForm = (transcriptData: any) => {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    downloadTranscript({ data: transcriptData, setLoading });
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        {/* <label>
          Name:
          <input
            type="text"
            value={name}
            className="text-black ml-2"
            onChange={(e) => setName(e.target.value)}
          />
        </label> */}
        <button
          type="submit"
          className="bg-white rounded-2xl px-8 py-3 text-black hover:bg-[#cccccc]"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Generate PDF"
          )}
        </button>
      </form>
    </>
  );
};

export default GeneratePdfForm;
