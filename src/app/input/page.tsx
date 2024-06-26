"use client";
import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import curriculum from "./courses";
import axios from "axios";
// import { sha3 } from 'crypto-js/sha3';
import { keccak256 } from "js-sha3";
import { RSA } from "../utils/RSA";
import { RC4 } from "../utils/RC4";
import { Base64 } from "js-base64";

const grades = ["A", "B", "C", "D", "E", "T"];
const gradeValues: { [key: string]: number } = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  E: 0,
  T: 0,
};

interface Transcript {
  nim: string;
  nama: string;
  totalSks: string;
  ipk: string;
  signature: string;
  publicKeyE: string;
  publicKeyN: string;
  encryptKey: string;
  [key: string]: any;
}

interface Kaprodi {
  id: string;
  owner: string;
  publicKeyE: string;
  publicKeyN: string;
}

export default function Input() {
  const [namaMahasiswa, setNamaMahasiswa] = useState("");
  const [NIM, setNIM] = useState("");
  const [kodeMK, setKodeMK] = useState(Array(10).fill(""));
  const [nilai, setNilai] = useState(Array(10).fill(""));
  const [kaprodi, setSelectedKaprodi] = useState("");
  const [publicKeyE, setPublicKeyE] = useState("");
  const [publicKeyN, setPublicKeyN] = useState("");
  const [keyId, setKeyId] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [daftarKaprodi, setDaftarKaprodi] = useState<Kaprodi[]>([]);
  const [encryptKey, setEncryptKey] = useState("");
  const courses = curriculum;

  useEffect(() => {
    const fetchKaprodi = async () => {
      try {
        const response = await axios.get("/api/key");
        const data = response.data;
        if (data.status === 200) {
          setDaftarKaprodi(data.data);
        } else {
          console.error("Failed to fetch kaprodi:", data.message);
        }
      } catch (error) {
        console.error("Error fetching kaprodi:", error);
      }
    };

    fetchKaprodi();
  }, []);

  const handleKaprodiChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const selectedKaprodi = event.target.value;
    setSelectedKaprodi(selectedKaprodi);
    const selectedKeyE =
      daftarKaprodi.find((item) => item.owner === selectedKaprodi)
        ?.publicKeyE || "";
    setPublicKeyE(selectedKeyE);
    const selectedKeyN =
      daftarKaprodi.find((item) => item.owner === selectedKaprodi)
        ?.publicKeyN || "";
    setPublicKeyN(selectedKeyN);
    const selectedKeyID =
      daftarKaprodi.find((item) => item.owner === selectedKaprodi)?.id || "";
    setKeyId(selectedKeyID);
    console.log(publicKeyN, keyId);
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
    setNamaMahasiswa("Prikitiw");
    setNIM("202121072");
    setKodeMK([
      "MA1101",
      "FI1101",
      "KU1001",
      "KU1102",
      "KU1011",
      "KU1024",
      "MA1201",
      "FI1201",
      "IF1210",
      "KU1202",
    ]);
    setNilai(["A", "B", "C", "D", "A", "A", "B", "C", "T", "A"]);
    // setSelectedKaprodi('Basuki');
    setPrivateKey("15248004353");
    setEncryptKey("encryptKey123");
  };

  const handleSubmit = async () => {
    if (
      !namaMahasiswa ||
      !NIM ||
      !kaprodi ||
      !privateKey ||
      kodeMK.includes("") ||
      nilai.includes("")
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const mataKuliah = kodeMK
      .map((code) => {
        const course = courses.find((c) => c.kode === code);
        return course
          ? {
              kode: course.kode,
              mataKuliah: course.mataKuliah,
              SKS: course.SKS,
            }
          : null;
      })
      .filter((course) => course !== null);

    const sksMataKuliah = kodeMK.map((code) => {
      const course = courses.find((c) => c.kode === code);
      return course?.SKS || 0;
    });

    const temp_totalSKS = sksMataKuliah.reduce((total, sks) => total + sks, 0);
    const totalSKS = String(temp_totalSKS);

    const totalWeightedScores = mataKuliah.reduce((total, course, index) => {
      const gradeValue = gradeValues[nilai[index]];
      return total + gradeValue * (course?.SKS || 0);
    }, 0);

    const temp_ipk = totalWeightedScores / temp_totalSKS;
    const ipk = String(temp_ipk.toFixed(2));

    // const transcript: Transcript = {
    //     nim: NIM,
    //     nama: namaMahasiswa,
    //     totalSks: totalSKS,
    //     ipk,
    //     signature: privateKey,
    //     publicKey,
    //     encryptKey,
    // };

    // for (let i = 0; i < 10; i++) {
    //     transcript[`kodeMk${i + 1}`] = kodeMK[i];
    //     transcript[`namaMk${i + 1}`] = mataKuliah[i]?.mataKuliah || '';
    //     transcript[`nilai${i + 1}`] = nilai[i];
    //     transcript[`sks${i + 1}`] = mataKuliah[i]?.SKS || 0;
    // }

    const transcript: Transcript = {
      nim: NIM,
      nama: namaMahasiswa,
      kodeMk1: kodeMK[0],
      namaMk1: mataKuliah[0]?.mataKuliah || "",
      nilai1: nilai[0],
      sks1: mataKuliah[0]?.SKS || "",
      kodeMk2: kodeMK[1],
      namaMk2: mataKuliah[1]?.mataKuliah || "",
      nilai2: nilai[1],
      sks2: mataKuliah[1]?.SKS || "",
      kodeMk3: kodeMK[2],
      namaMk3: mataKuliah[2]?.mataKuliah || "",
      nilai3: nilai[2],
      sks3: mataKuliah[2]?.SKS || "",
      kodeMk4: kodeMK[3],
      namaMk4: mataKuliah[3]?.mataKuliah || "",
      nilai4: nilai[3],
      sks4: mataKuliah[3]?.SKS || "",
      kodeMk5: kodeMK[4],
      namaMk5: mataKuliah[4]?.mataKuliah || "",
      nilai5: nilai[4],
      sks5: mataKuliah[4]?.SKS || "",
      kodeMk6: kodeMK[5],
      namaMk6: mataKuliah[5]?.mataKuliah || "",
      nilai6: nilai[5],
      sks6: mataKuliah[5]?.SKS || "",
      kodeMk7: kodeMK[6],
      namaMk7: mataKuliah[6]?.mataKuliah || "",
      nilai7: nilai[6],
      sks7: mataKuliah[6]?.SKS || "",
      kodeMk8: kodeMK[7],
      namaMk8: mataKuliah[7]?.mataKuliah || "",
      nilai8: nilai[7],
      sks8: mataKuliah[7]?.SKS || "",
      kodeMk9: kodeMK[8],
      namaMk9: mataKuliah[8]?.mataKuliah || "",
      nilai9: nilai[8],
      sks9: mataKuliah[8]?.SKS || "",
      kodeMk10: kodeMK[9],
      namaMk10: mataKuliah[9]?.mataKuliah || "",
      nilai10: nilai[9],
      sks10: mataKuliah[9]?.SKS || "",
      totalSks: totalSKS,
      ipk,
      keyId: keyId,
      publicKeyE,
      publicKeyN,
      signature: "temp",
      encryptKey,
    };

    const transcriptForHashing = {
      nim: transcript.nim,
      nama: transcript.nama,
      kodeMk1: transcript.kodeMk1,
      namaMk1: transcript.namaMk1,
      nilai1: transcript.nilai1,
      sks1: String(transcript.sks1),
      kodeMk2: transcript.kodeMk2,
      namaMk2: transcript.namaMk2,
      nilai2: transcript.nilai2,
      sks2: String(transcript.sks2),
      kodeMk3: transcript.kodeMk3,
      namaMk3: transcript.namaMk3,
      nilai3: transcript.nilai3,
      sks3: String(transcript.sks3),
      kodeMk4: transcript.kodeMk4,
      namaMk4: transcript.namaMk4,
      nilai4: transcript.nilai4,
      sks4: String(transcript.sks4),
      kodeMk5: transcript.kodeMk5,
      namaMk5: transcript.namaMk5,
      nilai5: transcript.nilai5,
      sks5: String(transcript.sks5),
      kodeMk6: transcript.kodeMk6,
      namaMk6: transcript.namaMk6,
      nilai6: transcript.nilai6,
      sks6: String(transcript.sks6),
      kodeMk7: transcript.kodeMk7,
      namaMk7: transcript.namaMk7,
      nilai7: transcript.nilai7,
      sks7: String(transcript.sks7),
      kodeMk8: transcript.kodeMk8,
      namaMk8: transcript.namaMk8,
      nilai8: transcript.nilai8,
      sks8: String(transcript.sks8),
      kodeMk9: transcript.kodeMk9,
      namaMk9: transcript.namaMk9,
      nilai9: transcript.nilai9,
      sks9: String(transcript.sks9),
      kodeMk10: transcript.kodeMk10,
      namaMk10: transcript.namaMk10,
      nilai10: transcript.nilai10,
      sks10: String(transcript.sks10),
      totalSks: transcript.totalSks,
      ipk: transcript.ipk,
      keyId: transcript.keyId,
      publicKeyE: transcript.publicKeyE,
      publicKeyN: transcript.publicKeyN,
    };

    // CREATING DIGITAL SIGNATURE
    // 1. message --> hash --> message Digest
    // 2. message digest --> encrypt (private key) --> signature
    console.log(JSON.stringify(transcriptForHashing));
    const digest = keccak256(JSON.stringify(transcriptForHashing));
    console.log(digest);
    transcript.signature = RSA.encryptText(digest, privateKey, publicKeyN); // transcript.signature = digest;
    // console.log(signature);

    // ENCRYPTING EVERY FIELD WITH RC4 ENCRYPTION
    const encryptKeyUse = transcript.encryptKey;

    // Encrypting each field except signature and encryptKey
    Object.keys(transcript).forEach((key) => {
      if (key !== "encryptKey" && key !== "keyId") {
        transcript[key] = Base64.encode(
          RC4.encrypt(String(transcript[key]), encryptKeyUse)
        );
      }
    });

    // Object.keys(transcript).forEach((key) => {
    //     if (key !== 'signature' && key !== 'encryptKey') {
    //         transcript[key] = RC4.decrypt(Base64.decode(transcript[key]), encryptKeyUse);
    //     }
    // });

    // POST TO DATABASE
    try {
      const response = await axios.post("/api/transcript", transcript);
      const data = response.data;
      if (data.status === 200) {
        console.log("Submitted Data:", transcript);
        alert(
          `Data Submitted Successfully! Total SKS: ${totalSKS}, IPK: ${ipk}`
        );
      } else {
        console.error("Failed to submit transcript:", data.message);
        alert("Failed to submit transcript");
      }
    } catch (error) {
      console.error("Error submitting transcript:", error);
      alert("Failed to submit transcript");
    }

    // alert(`Data Submitted Successfully! Total SKS: ${totalSKS}, IPK: ${ipk}`);
    console.log("with JSON", JSON.stringify(transcript));
  };

  const getAvailableCourses = (index: number) => {
    const mataKuliahSet = new Set(kodeMK);
    return courses.filter(
      (course) =>
        !mataKuliahSet.has(course.kode) || kodeMK[index] === course.kode
    );
  };

  return (
    <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2 ">
      <Navbar currPage="Input" />
      <div className="container mx-auto w-1/2 pt-24 text-purple1">
        <h1 className="text-center text-3xl font-extrabold">
          Input Nilai Jurusan
        </h1>
        <h1 className="text-center text-2xl font-extrabold mb-4">
          Sistem dan Teknologi Informasi ITB
        </h1>
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
              <option key={index} value={kaprodiOption.owner}>
                {kaprodiOption.owner}
              </option>
            ))}
          </select>
          <label className="block">Private Key:</label>
          <input
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          <label className="block">Encryption Key:</label>
          <input
            type="text"
            value={encryptKey}
            onChange={(e) => setEncryptKey(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <h2 className="text-xl font-bold mt-2">Data Mahasiswa</h2>
        <div className="mb-2">
          <label className="block">Nama Mahasiswa:</label>
          <input
            type="text"
            value={namaMahasiswa}
            onChange={(e) => setNamaMahasiswa(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block">NIM Mahasiswa:</label>
          <input
            type="text"
            value={NIM}
            onChange={(e) => setNIM(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold mt-2">{`Mata kuliah ${
              index + 1
            }`}</h2>
            <label>{`Pilih Mata Kuliah ${index + 1}:`}</label>
            <select
              value={kodeMK[index]}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select Course</option>
              {getAvailableCourses(index).map((course) => (
                <option
                  key={course.kode}
                  value={course.kode}
                >{`${course.kode} - ${course.mataKuliah} - SKS: ${course.SKS}`}</option>
              ))}
            </select>
            <label className="mt-2">{`Nilai Mata Kuliah ${index + 1}:`}</label>
            <select
              value={nilai[index]}
              onChange={(e) => handleNilaiChange(index, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Pilih Nilai</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded content-center"
        >
          Submit Nilai
        </button>
        <button
          onClick={setDefaultValues}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-10 rounded content-center"
        >
          Set Default Values
        </button>
      </div>
    </main>
  );
}
