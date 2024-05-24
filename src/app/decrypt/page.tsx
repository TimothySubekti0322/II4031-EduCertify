'use client';
import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import GeneratePdfForm from "./GeneratePdfForm";
import { handleAnyFileChange } from "../utils/decryptFile";

export default function Decrypt() {
  const [key, setKey] = useState("Decrypt key can't be empty!");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [fileBaseString, setFileBaseString] = useState<ArrayBuffer>();
  const [fileData, setFileData] = useState("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setKey(value);
  };
  // const handleFileRead = async (e: ProgressEvent<FileReader>) => {
  //   const content = e.target?.result;
  //   const text = (content as string)
  //     .split(/["\n"" "]/)
  //     .join("")
  //     .split(" ")
  //     .join("");
  //   setFileData(text);
  //   console.log(text);
  // };

  // const downloadAnyFile = () => {
  //   console.log(fileBaseString);
  //   const file = new Blob([fileBaseString as ArrayBuffer], {
  //     type: "pdf",
  //   });
  //   saveAs(file, fileName);
  // };

  return (
    <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2">
      <Navbar currPage="Decrypt" />
      <div className="z-10 w-full items-center text-sm pt-24 pb-12">
        <div className="text-center pt-4">
          <h1 className="text-purple1 text-lg font-bold">Decrypt Academic Transcript</h1>

        </div>
      </div>
      <div className="buttons justify-center w-60 mx-auto">
        <div className="items-center w-full pb-6">
          <label
            htmlFor="key"
            className="block  text-sm font-medium whitesspace-nowrap"
          >
            Decrypt Key:
          </label>
          <div className="w-full border border-2 border-purple1 rounded-lg h-8">
            <input
              id="key"
              name="key"
              className="w-full rounded-lg h-full mb-1 px-2"
              onChange={handleInputChange}
            ></input>
            <i className="text-red-500">{error}</i>
          </div>
        </div>
        <div className="mx-auto justify-center bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
        // onClick={() => } 
        >
          <div className="mt-4">
            <input
              type="file"
              className={`bg-[#fcf6e0] border-2 "border-[#cabc7d]  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
              onChange={(event) =>
                handleAnyFileChange(event, key)
              }
            />
          </div>
        </div>
        {/* <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
        // onClick={() => } 
        >
          Download Decrypted File
        </button> */}
      </div>

    </main>
  );
}
