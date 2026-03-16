import { useState } from 'react'
import { crops, getPlantingAdvice } from '../utils/plantingLogic'
import useWeather from '../hooks/useWeather'
import LocationSearch from '../components/LocationSearch'

function MyCrops() {
  const [city, setCity] = useState('Abeokuta')
  const [myCrops, setMyCrops] = useState([])
  const { weather, loading, error } = useWeather(city)

  const addCrop = (crop) => {
    if (!myCrops.find((c) => c.id === crop.id)) {
      setMyCrops([...myCrops, crop])
    }
  }

  const removeCrop = (cropId) => {
    setMyCrops(myCrops.filter((c) => c.id !== cropId))
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-green-700 text-xl font-bold">Loading... 🌱</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">My Crops</p>
          <h2 className="text-lg font-bold text-gray-800">{weather.name}, Nigeria</h2>
        </div>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Location Search */}
      <LocationSearch onSearch={setCity} />

      {/* All Available Crops */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="text-sm text-gray-500 mb-3">Select your crops</p>
        <div className="grid grid-cols-3 gap-2">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => addCrop(crop)}
              disabled={myCrops.find((c) => c.id === crop.id)}
              className={`p-3 rounded-xl text-sm font-medium transition border
                ${myCrops.find((c) => c.id === crop.id)
                  ? 'bg-green-700 text-white border-green-700 opacity-50'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'
                }`}
            >
              {crop.name}
            </button>
          ))}
        </div>
      </div>

      {/* My Selected Crops */}
      {myCrops.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-4xl mb-2">🌱</p>
          <p className="text-gray-500 text-sm">
            No crops selected yet — tap a crop above to add it
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-500 font-medium">
            Your crops — {weather.name}
          </p>
          {myCrops.map((crop) => {
            const advice = getPlantingAdvice(
              crop,
              weather.main.temp,
              weather.main.humidity
            )
            return (
              <div key={crop.id} className={`rounded-xl p-4 border ${
                advice.status === 'good'
                  ? 'bg-green-50 border-green-300'
                  : advice.status === 'warning'
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{crop.name}</p>
                    <p className={`text-sm font-medium mt-1 ${
                      advice.status === 'good'
                        ? 'text-green-700'
                        : advice.status === 'warning'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }`}>
                      {advice.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{advice.advice}</p>
                  </div>
                  <button
                    onClick={() => removeCrop(crop.id)}
                    className="text-gray-400 hover:text-red-500 text-lg transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default MyCrops