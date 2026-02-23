import { useState } from "react";
import axios from "./api/axios";    

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const url = `/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const weatherMain = data.weather?.[0]?.main;
  const isHot = data.main?.temp > 33;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch {
        alert("Kota tidak ditemukan!");
      }
      setLocation("");
    }
  };

  const getBackground = () => {
    if (weatherMain === "Rain")
      return "bg-gradient-to-br from-gray-900 via-blue-900 to-black";
    if (weatherMain === "Clear")
      return "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500";
    if (weatherMain === "Clouds")
      return "bg-gradient-to-br from-gray-600 via-gray-800 to-black";
    if (weatherMain === "Thunderstorm")
      return "bg-gradient-to-br from-gray-900 via-purple-900 to-black";
    if (weatherMain === "Snow")
      return "bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700";
    if (weatherMain === "Mist" || weatherMain === "Fog")
      return "bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900";
    return "bg-slate-900";
  };

  return (
    <div
      className={`min-h-screen ${getBackground()} text-white flex flex-col items-center pt-20 px-4 relative overflow-hidden transition-all duration-500`}
    >
      {/* 🌧 Rain Effect */}
      {weatherMain === "Rain" &&
        [...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[20px] bg-white/40 animate-[fall_0.7s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-20px",
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          />
        ))}

      {/* ❄ Snow Effect */}
      {weatherMain === "Snow" &&
        [...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-sm animate-[fallSnow_4s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            ❄
          </div>
        ))}

      {/* ⚡ Thunder Flash */}
      {weatherMain === "Thunderstorm" && (
        <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
      )}

      {/* 🌫 Fog */}
      {(weatherMain === "Mist" || weatherMain === "Fog") && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md animate-pulse pointer-events-none" />
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-wide relative z-10">
        🌍 Weather in the world
      </h1>

      {/* Search */}
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={searchLocation}
        placeholder="Masukkan Nama Kota..."
        className="w-full max-w-md p-4 rounded-2xl bg-white/10 border border-white/20 
        focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md transition-all relative z-10"
      />

      {/* Card */}
      {data.name && (
        <div className="mt-12 w-full max-w-md bg-white/10 backdrop-blur-xl 
        border border-white/20 rounded-3xl p-8 shadow-2xl text-center relative z-10">

          {/* Icon */}
          <div className="text-7xl mb-6">
            {weatherMain === "Rain" && "🌧"}
            {weatherMain === "Clear" && (
              <span className="animate-spin [animation-duration:20s]">☀</span>
            )}
            {weatherMain === "Clouds" && (
              <span className="animate-bounce">☁</span>
            )}
            {weatherMain === "Thunderstorm" && "⛈"}
            {weatherMain === "Snow" && "❄"}
            {(weatherMain === "Mist" || weatherMain === "Fog") && "🌫"}
            {isHot && (
              <span className="block animate-bounce text-red-500 mt-2">
                🔥
              </span>
            )}
          </div>

          <h2 className="text-2xl font-light tracking-widest">
            {data.name}
          </h2>

          <p className="text-6xl font-bold mt-4">
            {data.main?.temp.toFixed()}°C
          </p>

          <p className="mt-2 text-blue-200 uppercase tracking-widest">
            {weatherMain}
          </p>

          {/* Detail */}
          <div className="flex justify-between mt-8 pt-4 border-t border-white/20">
            <div>
              <p className="text-sm text-gray-300">Kelembapan</p>
              <p className="font-bold">{data.main?.humidity}%</p>
            </div>

            <div>
              <p className="text-sm text-gray-300">Angin</p>
              <p className="font-bold">{data.wind?.speed} MPH</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;