"use client";
import Navbar from "../components/Navbar";
import contoh from "./contoh.json";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { RSA } from "../utils/RSA";
import { RC4 } from "../utils/RC4";
import { keccak256 } from "js-sha3";
import { Base64 } from "js-base64";
import GeneratePdfForm from "../decrypt/GeneratePdfForm";
import type { Transcript, RecordType, Key } from "./transcript.type";
import { handleValidate } from "../utils/validateSignature";

// type Key =

export default function Transcript() {
  // const [transcript, setTranscript] = useState<RecordType[]>();

  // const transcript: RecordType[] = contoh.map(d => ({
  //     config: "origin",
  //     ...d,
  // }));
  const [transcript, setTranscript] = useState([]);
  const [plainTranscript, setPlainTranscript] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState("View"); // view buat liat data, add buat nambah data
  const [totalPages, setTotalPages] = useState<number>(1);
  const [viewEncrypted, setViewEncrypted] = useState<boolean>(true);
  const [pagination, setPagination] = useState<number>(1);

  const columns: string[] = [
    "Nama",
    "NIM",
    "Kode MK 1",
    "Nama MK 1",
    "Nilai 1",
    "SKS 1",
    "Kode MK 2",
    "Nama MK 2",
    "Nilai 2",
    "SKS 2",
    "Kode MK 3",
    "Nama MK 3",
    "Nilai 3",
    "SKS 3",
    "Kode MK 4",
    "Nama MK 4",
    "Nilai 4",
    "SKS 4",
    "Kode MK 5",
    "Nama MK 5",
    "Nilai 5",
    "SKS 5",
    "Kode MK 6",
    "Nama MK 6",
    "Nilai 6",
    "SKS 6",
    "Kode MK 7",
    "Nama MK 7",
    "Nilai 7",
    "SKS 7",
    "Kode MK 8",
    "Nama MK 8",
    "Nilai 8",
    "SKS 8",
    "Kode MK 9",
    "Nama MK 9",
    "Nilai 9",
    "SKS 9",
    "Kode MK 10",
    "Nama MK 10",
    "Nilai 10",
    "SKS 10",
    "IPK",
    "Public Key",
    "Modulus Key",
    "Signature",
    "Encrypt Key",
    "Unduh",
    "Verifikasi",
  ];
  const filledColumns: string[] = [
    "nama",
    "nim",
    "kodeMk1",
    "namaMk1",
    "nilai1",
    "sks1",
    "kodeMk2",
    "namaMk2",
    "nilai2",
    "sks2",
    "kodeMk3",
    "namaMk3",
    "nilai3",
    "sks3",
    "kodeMk4",
    "namaMk4",
    "nilai4",
    "sks4",
    "kodeMk5",
    "namaMk5",
    "nilai5",
    "sks5",
    "kodeMk6",
    "namaMk6",
    "nilai6",
    "sks6",
    "kodeMk7",
    "namaMk7",
    "nilai7",
    "sks7",
    "kodeMk8",
    "namaMk8",
    "nilai8",
    "sks8",
    "kodeMk9",
    "namaMk9",
    "nilai9",
    "sks9",
    "kodeMk10",
    "namaMk10",
    "nilai10",
    "sks10",
    "ipk",
    "publicKeyE",
    "publicKeyN",
    "signature",
    "encryptKey",
  ];

    // const handleValidate = (idx: number) => {
        // VALIDASI DIGITAL SIGNATURE
        // 1. Decrypt Signature with publicKey => message digest
        // 2. Decrypt database with encryptedKey + Hash => message digest
        // 3. Compare message digest. If same (validated = "valid") else (validate = "invalid")

        // Langkah 1. Decrypt signature with publicKey
        // const signatureDigest = RSA.decryptText(transcript.signature, transcript.publicKeyE, transcript.publicKeyN);

        // Langkah 2. Hash database
        // const messageDigest = keccak256(String(transcript));

        // Langkah 3. Compare message digest
    //     if (signatureDigest === messageDigest) {
    //         transcript.validated = 'valid';
    //     } else {
    //         transcript.validated = 'invalid';
    //     }
        // console.log("tes", idx);
        // console.log("tis", plainTranscript[idx]);
    // }

  const handleDownload = () => {};

  const decryptTranscript = (transcript: RecordType[]): RecordType[] => {
    return transcript.map((item) => {
      const decryptedItem: RecordType = { ...item };
      Object.keys(decryptedItem).forEach((key) => {
        if (key !== "signature" && key !== "encryptKey" && key !== "keyId") {
          const decryptedKey = key as Key;
          const decryptedValue = RC4.decrypt(
            Base64.decode(decryptedItem[decryptedKey] as string),
            decryptedItem["encryptKey"]
          ) as string;
          decryptedItem[decryptedKey] = decryptedValue as never;
        }
      });
      return decryptedItem;
    });
  };

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await axios.get("/api/transcript");
        const data = response.data;
        if (data.status === 200) {
          const updatedData = data.data.map((item: any) => ({
            ...item,
            validated: "unchecked",
          }));

          // const decryptedTranscript = decryptTranscript(updatedData);
          // setPlainTranscript(decryptedTranscript);
          // console.log(data);
          setTranscript(updatedData);
          setTotalPages(Math.ceil(transcript.length));

          const tempDecryptedTranscript = decryptTranscript(updatedData);
          setPlainTranscript(tempDecryptedTranscript);
        } else {
          console.error("Failed to fetch transcript:", data.message);
        }
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    };

    fetchTranscript();
  }, []);

  return (
    <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2">
      <Navbar currPage="Transcript" />
      <div className="z-10 w-full items-center font- text-sm py-24 px-16">
        <div className="text-center py-4">
          <h1 className="text-purple1 text-lg font-bold">
            Academic Transcript
          </h1>
        </div>
        <div>
          <div className="flex justify-center">
            <div
              className={
                (viewEncrypted === true
                  ? "bg-purple1 font-bold "
                  : "pink1 hover:bg-pink2  ") +
                "py-4 w-full text-center text-white rounded-t-2xl bg-pink1 "
              }
              onClick={() => setViewEncrypted(true)}
            >
              <p>Encrypted Record</p>
            </div>
            <div
              className={
                (viewEncrypted === false
                  ? "bg-purple1 font-bold "
                  : "pink1 hover:bg-pink2  ") +
                "py-4 w-full text-center text-white rounded-t-2xl bg-pink1 "
              }
              onClick={() => setViewEncrypted(false)}
            >
              <p>Decrypted Record</p>
            </div>
          </div>
          <div className="overflow-x-auto border-4 border-purple1 scrollbar scrollbar-thumb-blue2 scrollbar-track-purple1">
            <table className="overflow-x-auto text-center text-sm font-normal table-auto whitespace-nowrap text-white1">
              <thead className="font-bold bg-purple1 text-white1">
                <tr>
                  {columns.map((col, idx) => (
                    <th key={idx} className="border-2 border-purple1 px-4 py-2">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              {viewEncrypted ? (
                <tbody>
                  {transcript.map((item: any, idx) => {
                    return (
                      <tr
                        key={`row-${idx}`}
                        className="text-purple1 hover:bg-[#9CB3DA]"
                      >
                        {filledColumns.map((col, idx2) => (
                          <th
                            key={idx2}
                            className="border-2 border-purple1 px-4 py-1 w-24 font-normal"
                          >
                            {item[col]}
                          </th>
                        ))}
                        <th className="border-2 border-purple1 px-4 py-1 w-24 font-normal">
                          <GeneratePdfForm transcriptData={plainTranscript[idx]} />
                        </th>
                        <th className="border-2 border-purple1 px-6 py-1 w-24 font-normal ">
                          <div className="flex justify-center gap-x-2">
                            <img
                              src={
                                item.validated === "unchecked"
                                  ? "/unchecked.png"
                                  : item.validated === "valid"
                                  ? "/valid.png"
                                  : "/invalid.png"
                              }
                              alt="download file"
                              className="w-8 h-6 "
                            ></img>
                            <button
                              className="bg-pink1 border-2 border-white1 text-white1 text-sm rounded-lg block px-2 drop-shadow-lg hover:drop-shadow-md hover:bg-pink2 pr-1"
                              onClick={handleValidate}
                            >
                              Verify Data
                            </button>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  {plainTranscript.map((item: any, idx) => {
                    return (
                      <tr
                        key={`row-${idx}`}
                        className="text-purple1 hover:bg-[#9CB3DA]"
                      >
                        {filledColumns.map((col, idx2) => (
                          <th
                            key={idx2}
                            className="border-2 border-purple1 px-4 py-1 w-24 font-normal"
                          >
                            {item[col]}
                          </th>
                        ))}
                        <th className="border-2 border-purple1 px-4 py-1 w-24 font-normal">
                          <GeneratePdfForm transcriptData={item} />
                        </th>
                        <th className="border-2 border-purple1 px-6 py-1 w-24 font-normal ">
                          <div className="flex justify-center gap-x-2">
                            <img
                              src={
                                item.validated === "unchecked"
                                  ? "/unchecked.png"
                                  : item.validated === "valid"
                                  ? "/valid.png"
                                  : "/invalid.png"
                              }
                              alt="download file"
                              className="w-8 h-6 "
                            ></img>
                            <button
                              className="bg-pink1 border-2 border-white1 text-white1 text-sm rounded-lg block px-2 drop-shadow-lg hover:drop-shadow-md hover:bg-pink2 pr-1"
                              onClick={handleValidate}
                            >
                              Verify Data
                            </button>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          <div className="bg-purple1 flex justify-end py-2">
            <Pagination
              totalPages={totalPages}
              page={pagination}
              setPage={setPagination}
            />
          </div>
        </div>

        <div className="buttons flex gap-x-2 py-6 justify-center">
          <button
            className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
            onClick={() => (window.location.href = "/input")}
          >
            Add Data
          </button>
        </div>
      </div>
    </main>
  );
}
