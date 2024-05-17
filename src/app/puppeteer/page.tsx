"use client";
import GeneratePdfForm from "./GeneratePdfForm";
import { handleAnyFileChange } from "../utils/decryptFile";

const HomePage = () => {
  const key = "abcdefghijklmnopqrstuvwxyz123456";
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-2xl">Generate PDF</h1>
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
    </div>
  );
};

export default HomePage;
