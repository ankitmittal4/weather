// App.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '00921acb35a81fd95408ca719c00ca9c';
  // const API_KEY = '5ecfa200731b325caf84f2776816d999'; 

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      console.log(err);
      setError('City not found or network issue');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-500 flex items-center justify-center px-4 py-8 mx-auto">
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6">🌤️ City Weather Forecast</h1>

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-5 py-3 mb-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {error && (
          <p className="text-red-500 mt-4 font-medium">{error}</p>
        )}

        {weather && (
          <div className="mt-6 text-left bg-blue-50 rounded-xl p-5 shadow-md">
            <h2 className="text-2xl font-bold text-blue-700">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-gray-700 mt-2">🌡️ Temperature: <span className="font-semibold">{weather.main.temp}°C</span></p>
            <p className="text-gray-700">🌥️ Condition: <span className="capitalize">{weather.weather[0].description}</span></p>
            <p className="text-gray-700">💧 Humidity: {weather.main.humidity}%</p>
            <p className="text-gray-700">🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>

  );
}