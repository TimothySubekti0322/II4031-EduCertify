'use client';
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";

export default function Home() {

  return (
    <main className="min-h-screen items-center bg-gradient-to-b from-[#CAD8F0] to-blue2 ">
      <Navbar currPage="Home" />
      <div className="just w-full flex flex-row items-center justify-between pl-20">

        {/* Left Section */}
        <div className="flex h-screen flex-col items-start justify-center lg:w-1/2 text-purple1">
          <h1 className=" text-7xl font-extrabold mb-2">
            <span className="text-purple1">Edu</span>
            <span className="text-pink1">Certify</span>
          </h1>
          <h2 className="text-center text-2xl mb-4">Portal input dan verifikasi nilai mahasiswa jurusan</h2>
          <button
            className="mb-3 text-lg bg-pink1 border-2 text-white1 text-md rounded-lg block w-3/4 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-pink2"
            onClick={() => (window.location.href = "/input")}
          >
            Input Nilai
          </button>
          <div className="flex flex-row gap-4 text-base w-3/4">
            <button
              className="mb-3 bg-purple1 border-2 text-white1 rounded-lg block w-1/2 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-purple2"
              onClick={() => (window.location.href = "/transcript")}
            >
              Cek Daftar Nilai
            </button>
            <button
              className="mb-3 bg-purple1 border-2 text-white1 rounded-lg block w-1/2 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:bg-purple2"
              onClick={() => (window.location.href = "/decrypt")}
            >
              Verifikasi Transkrip Akademik
            </button>
          </div>
          <p className="text-center">Created by</p>
          <div className="flex space-x-4 mt-8">
            <ProfileCard 
              imageSrc="/foto1.jpg" 
              name="Nadira" 
              studentNumber="18221070" 
              linkedin="linkedin.com/in/nadira" 
              github="nadira" 
            />
            <ProfileCard 
              imageSrc="/foto2.jpeg" 
              name="Timothy" 
              studentNumber="18221071" 
              linkedin="linkedin.com/in/timothy" 
              github="timothy" 
            />
            <ProfileCard 
              imageSrc="/foto3.jpg" 
              name="Hilmi Baskara Radanto" 
              studentNumber="18221072" 
              linkedin="linkedin.com/in/hilmiradanto" 
              github="hilmibaskara" 
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center lg:w-1/2 mt-8 lg:mt-0">
          <img src="/transcript.png" alt="Foto 3" className="w-200 h-200" />
        </div>
      </div>
    </main>
  );
}
