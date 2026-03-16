import { useState } from 'react'
import useWeather from '../hooks/useWeather'
import CropSelector from '../components/CropSelector'
import LocationSearch from '../components/LocationSearch'
import { crops, getPlantingAdvice } from '../utils/plantingLogic'


function Home() {
  const [city, setCity] = useState('Abeokuta')
  const { weather, loading, error } = useWeather(city)
  const [selectedCrop, setSelectedCrop] = useState(crops[0])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-green-700 text-xl font-bold">Loading weather... 🌱</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  const advice = getPlantingAdvice(
    selectedCrop,
    weather.main.temp,
    weather.main.humidity
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Location Bar */}
      {/* Location Search */}
      <LocationSearch onSearch={setCity} />
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Your location</p>
          <h2 className="text-lg font-bold text-gray-800">
            {weather.name}, Nigeria
          </h2>
        </div>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Weather Card */}
      <div className="bg-green-700 text-white rounded-xl shadow p-6 mb-4">
        <p className="text-sm opacity-80">Current Weather</p>
        <h2 className="text-5xl font-bold mt-1">
          {Math.round(weather.main.temp)}°C
        </h2>
        <p className="text-lg mt-1 capitalize">
          {weather.weather[0].description}
        </p>
        <div className="flex gap-6 mt-4 text-sm opacity-90">
          <div>
            <p>Humidity</p>
            <p className="font-bold">{weather.main.humidity}%</p>
          </div>
          <div>
            <p>Wind</p>
            <p className="font-bold">{Math.round(weather.wind.speed)} km/h</p>
          </div>
          <div>
            <p>Feels Like</p>
            <p className="font-bold">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
      </div>

      {/* Crop Selector */}
      <CropSelector
        selectedCrop={selectedCrop}
        onCropChange={setSelectedCrop}
      />

      {/* Planting Recommendation */}
      <div className={`rounded-xl p-4 mb-4 border ${
        advice.status === 'good'
          ? 'bg-green-50 border-green-300'
          : advice.status === 'warning'
          ? 'bg-yellow-50 border-yellow-300'
          : 'bg-red-50 border-red-300'
      }`}>
        <p className={`text-xs font-medium mb-1 ${
          advice.status === 'good'
            ? 'text-green-600'
            : advice.status === 'warning'
            ? 'text-yellow-600'
            : 'text-red-600'
        }`}>
          {selectedCrop.name} Recommendation
        </p>
        <p className={`font-bold text-lg ${
          advice.status === 'good'
            ? 'text-green-800'
            : advice.status === 'warning'
            ? 'text-yellow-800'
            : 'text-red-800'
        }`}>
          {advice.message}
        </p>
        <p className={`text-sm mt-1 ${
          advice.status === 'good'
            ? 'text-green-700'
            : advice.status === 'warning'
            ? 'text-yellow-700'
            : 'text-red-700'
        }`}>
          {advice.advice}
        </p>
      </div>

      {/* Wind Alert */}
      {weather.wind.speed > 10 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-4">
          <p className="text-xs text-yellow-600 font-medium">Weather Alert ⚠️</p>
          <p className="text-yellow-800 font-bold mt-1">Strong winds detected</p>
          <p className="text-yellow-700 text-sm mt-1">
            Protect seedlings from strong winds today
          </p>
        </div>
      )}

    </div>
  )
}

export default Home