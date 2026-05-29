import { useEffect, useState } from "react";

const apiKey = "e946fdade2f54e889e935916262905";
const url = `http://api.weatherapi.com/v1/current.json?key=e946fdade2f54e889e935916262905&q=Yogyakarta`;

export default function Weather() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeather() {
      try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("Gagal mengambil data cuaca");

        const data = await response.json();

        console.log("Semua data cuaca", data);
        
        setWeather(data)
      } catch(error) {
        console.error("Terjadi kesalahan!", error.message);
      }
    }

    getWeather();
  }, [])

  return(
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-indigo-900 to-slate-900 flex flex-col justify-center items-center p-6 font-sans text-white">
    
    {/* Judul Utama */}
    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider text-center mb-8 drop-shadow-md text-blue-200">
      CUACA DAERAH ISTIMEWA YOGYAKARTA
    </h1>

    {weather && (
      // 2. WEATHER CARD: Efek glassmorphism (semi-transparan blur)
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl transform transition duration-500 hover:scale-105">
        
        {/* Nama Kota */}
        <h2 className="text-xl font-medium text-blue-100 tracking-wide">
          Cuaca di <span className="font-bold text-white">{weather.location.name}</span>
        </h2>
        
        {/* Kontainer Ikon dan Suhu */}
        <div className="flex flex-col items-center my-6">
          {/* Ikon Cuaca */}
          <img 
            src={`https:${weather.current.condition.icon}`} 
            alt={weather.current.condition.text} 
            className="w-24 h-24 drop-shadow-[0_8px_8px_rgba(255,255,255,0.15)] animate-bounce-slow"
          />
          
          {/* Angka Suhu */}
          <div className="flex items-start mt-2">
            <span className="text-6xl font-black tracking-tighter drop-shadow-sm">
              {weather.current.temp_c}
            </span>
            <span className="text-2xl font-bold text-blue-400 mt-1">°C</span>
          </div>
        </div>

        {/* Pembatas Garis Tipis */}
        <div className="w-full h-px bg-white/10 my-4"></div>

        {/* Kondisi Cuaca */}
        <div className="text-sm tracking-wide text-slate-300">
          Kondisi: <span className="font-semibold text-emerald-400 text-base block mt-1">{weather.current.condition.text}</span>
        </div>
        
      </div>
    )}
  </div>
  )
}