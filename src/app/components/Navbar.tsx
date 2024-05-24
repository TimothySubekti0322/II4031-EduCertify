'use client';
import React from "react";

interface NavProps {
  currPage: string;
}

const Navbar: React.FC<NavProps> = ({currPage}) => {
  return (
    <div className= "fixed w-full bg-purple1 h-[4.5rem] p-4 flex items-center z-50">
      <button onClick={() => (window.location.href = "/")} className= {(currPage ==="Home" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 ml-4  py-3 px-6 rounded-sm"}>EduCertify</button>
      <button onClick={() => (window.location.href = "/input")} className= {(currPage ==="Input" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 py-3 px-6 rounded-sm"}>Input</button>
      <button onClick={() => (window.location.href = "/transcript")} className= {(currPage ==="Transcript" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 py-3 px-6 rounded-sm"}>Transcript</button>
      <button onClick={() => (window.location.href = "/generate")} className= {(currPage ==="Generate" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 py-3 px-6 rounded-sm"}>Generate New Key Pair</button>
      <button onClick={() => (window.location.href = "/decrypt")} className= {(currPage ==="Decrypt" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 py-3 px-6 rounded-sm"}>Decrypt File</button>
    </div>
  );
};

export default Navbar;