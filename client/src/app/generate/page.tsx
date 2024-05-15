'use client';

import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";


interface InputType {
  name: string;
  num1: string;
  num2: string;
}
interface KeyType {
  publicKey: string;
  privateKey: string;
}

export default function Generate() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState<boolean>(false);
  const [input, setInput] = useState<InputType>({
    name: "",
    num1: "",
    num2: ""
  });
  const [key, setKey] = useState<KeyType>({
    publicKey: "",
    privateKey: "",
  });

  const generateKey = () => {
    setGenerated(true);
    // const n1 = parseInt(input.num1);
    // const n2 = parseInt(input.num2);
    // if (input.num1.isNu){
    //   setError("Number can't be empty");
    // } else if () {
    //   setError("Numbers must be ")
    // }
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2 ">
      <Navbar currPage="Generate" />
      <div className="z-10 px-44 items-center font- text-sm py-24 px-16">
        <div className="text-center py-4">
          <h1 className="text-purple1 text-lg font-bold">Input 2 random numbers</h1>
        </div>
        <div className="items-center w-full">
          <label
            htmlFor="key"
            className="block  text-sm font-medium whitesspace-nowrap"
          >
            Input Name:
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
        <div className="flex justify-center gap-x-8 mt-8">
          <div className="items-center w-full">
            <label
              htmlFor="key"
              className="block  text-sm font-medium whitesspace-nowrap"
            >
              Input 1:
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
          <div className="items-center w-full">
            <label
              htmlFor="key"
              className="block  text-sm font-medium whitesspace-nowrap"
            >
              Input 2:
            </label>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8">
              <input
                id="key"
                name="key"
                className="w-full rounded-lg h-full px-2"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="py-8 flex justify-center">
          <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
          onClick={generateKey} 
          >
            Generate Key
          </button>
        </div>

        <div className= {(generated ===true ? " " : "invisible ")  + "flex justify-center gap-x-8 mt-2"}>
          <div className="items-center w-full">
            <p className="block  text-sm font-medium whitesspace-nowrap">
              Public Key:
            </p>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8 bg-white1">
              {key.publicKey}
            </div>
          </div>
          <div className="items-center w-full">
            <p className="block  text-sm font-medium whitesspace-nowrap">
              Private Key:
            </p>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8 bg-white1">
              {key.privateKey}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
