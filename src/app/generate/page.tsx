'use client';

import { ChangeEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { generateKey } from "../utils/generateRSA";
import { checkNumberPositivePrime } from "../utils/function";


interface InputType {
  name: string;
  num1: string;
  num2: string;
}
interface KeyType {
  publicKey: BigInt | undefined;
  privateKey: BigInt | undefined;
  modulus: BigInt | undefined;
}

export default function Generate() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorNum, setErrorNum] = useState("");
  const [usedKeys, setUsedKeys] = useState([]);
  const [errorName, setErrorName] = useState("");
  const [generated, setGenerated] = useState<boolean>(false);
  const [input, setInput] = useState<InputType>({
    name: "",
    num1: "",
    num2: ""
  });
  const [key, setKey] = useState<KeyType>({
    publicKeyE: undefined,
    publicKeyN: undefined,
    owner: undefined
  });

  const validateSubmit = () => {
    if (input.name === '') {
      setErrorName("Name can't be empty.")
    // } else if (input.name in usedKeys) {
    //   setErrorName("Name is taken. Choose another name!")
    } else {
      setErrorName('');
    }

    if (input.num1 == '' || input.num2 == '') {
      setErrorNum("Numbers can't be empty.");
      console.log("1");
    } else if (input.num1 === input.num2) {
      setErrorNum("Numbers must be different.");
      console.log("2");
    } else {
      const prime1 = parseInt(input.num1);
      const checkPrime1 = checkNumberPositivePrime(prime1);
      console.log("3");
      if (checkPrime1 !== "Number is prime") {
        setErrorNum('Number 1 must be prime!');
      } else {
        const prime2 = parseInt(input.num2);
        const checkPrime2 = checkNumberPositivePrime(prime2);
        if (checkPrime2 !== "Number is prime") {
          setErrorNum('Number 2 must be prime!');
        } else {
          setErrorNum('');
        }
      }
    }
    console.log(errorName, errorNum);

  }

  const handleSubmit = async () => {
    validateSubmit();
    console.log(errorName, errorNum);
    if (errorName==='' && errorNum===''){
      console.log(errorName, errorNum);
      const newKey = generateKey(input.num1, input.num2);
      console.log("newKey", newKey);
        key = ({
          publicKeyE: newKey.publicKey.toString(),
          publicKeyN: newKey.modulus.toString(),
          owner: input.name
        })

        console.log(form);

        try {
          const response = await axios.post('/api/key', form);
          const data = response.data;
          if (data.status === 200) {
              console.log('Submitted Data:', form);
              setGenerated(true);
          } else {
              console.error('Failed to submit key:', data.message);
              alert('Failed to submit key');
          }
      } catch (error) {
          console.error('Error submitting key:', error);
          alert('Failed to submit key');
          setGenerated(false);
      }

    } else {
      setGenerated(false);
    }
  }

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await axios.get('/api/key');
        const data = response.data;
        if (data.status === 200) {
          setUsedKeys(data.data);
          console.log(data)
        } else {
          console.error('Failed to fetch keys:', data.message);
        }
      } catch (error) {
        console.error('Error fetching keys:', error);
      }
    };

    fetchKey();
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    console.log(input);
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
            htmlFor="name"
            className="block  text-sm font-medium whitesspace-nowrap"
          >
            Input Name:
          </label>
          <div className="w-full border border-2 border-purple1 rounded-lg h-8">
            <input
              id="name"
              name="name"
              className="w-full rounded-lg h-full mb-1 px-2"
              onChange={handleInputChange}
            ></input>
            <i className="text-red-500">{errorName}</i>
          </div>
        </div>
        <div className="flex justify-center gap-x-8 mt-8">
          <div className="items-center w-full">
            <label
              htmlFor="num1"
              className="block text-sm font-medium whitesspace-nowrap"
            >
              Input 1:
            </label>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8">
              <input
                id="num1"
                name="num1"
                className="w-full rounded-lg h-full mb-1 px-2"
                onChange={handleInputChange}
              ></input>
              <i className="text-red-500">{errorNum}</i>
            </div>
          </div>
          <div className="items-center w-full">
            <label
              htmlFor="num2"
              className="block  text-sm font-medium whitesspace-nowrap"
            >
              Input 2:
            </label>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8">
              <input
                id="num2"
                name="num2"
                className="w-full rounded-lg h-full px-2"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="py-8 flex justify-center">
          <button className="bg-pink1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
            onClick={handleSubmit}
          >
            Generate Key
          </button>
        </div>

        <div className={(generated === true ? " " : "invisible ") + "flex justify-center gap-x-8 mt-2"}>
          <div className="items-center w-full">
            <p className="block  text-sm font-medium whitesspace-nowrap">
              Public Key
            </p>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8 bg-white1">
              {key.publicKey?.toString()}
            </div>
          </div>
          <div className="items-center w-full">
            <p className="block  text-sm font-medium whitesspace-nowrap">
              Private Key
            </p>
            <div className="w-full border border-2 border-purple1 rounded-lg h-8 bg-white1">
              {key.privateKey?.toString()}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
