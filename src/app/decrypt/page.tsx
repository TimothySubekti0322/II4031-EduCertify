'use client';
import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import GeneratePdfForm from "../puppeteer/GeneratePdfForm";
import { handleAnyFileChange } from "../utils/decryptFile";

export default function Decrypt() {
  const [key, setKey] = useState("");
  const [fileName, setFileName] = useState("");
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
      <div className="z-10 w-full items-center text-sm p-24">
        <div className="text-center py-4">
          <h1 className="text-purple1 text-lg font-bold">Decrypt Academic Transcript</h1>
          <div className="pt-24">File: {fileName}</div>
        </div>
        <div className="buttons flex gap-x-6 py-4 justify-center">
                    <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
                    // onClick={() => } 
                    >
                        <GeneratePdfForm />
      <div className="mt-4">
        <input
          type="file"
          className={`bg-[#fcf6e0] border-2 "border-[#cabc7d]  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
          onChange={(event) =>
            handleAnyFileChange(event, key)
          }
        />
      </div>
                    </button>
                    <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
                    // onClick={() => } 
                    >
                        Download Decrypted File
                    </button>
                </div>
      </div>
    </main>
  );
}
