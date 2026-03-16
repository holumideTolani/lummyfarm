import { useState } from 'react'
import useWeather from '../hooks/useWeather'
import LocationSearch from '../components/LocationSearch'

function Forecast() {
  const [city, setCity] = useState('Abeokuta')
  const { forecast, loading, error } = useWeather(city)

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-green-700 text-xl font-bold">Loading forecast... 🌱</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  const getDayName = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-NG', { weekday: 'short' })
  }

  const getWeatherEmoji = (condition) => {
    if (condition.includes('rain')) return '🌧️'
    if (condition.includes('cloud')) return '☁️'
    if (condition.includes('clear')) return '☀️'
    if (condition.includes('thunder')) return '⛈️'
    return '🌤️'
  }

  const dailyForecast = forecast.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">5 Day Forecast</p>
          <h2 className="text-lg font-bold text-gray-800">{forecast.city.name}, Nigeria</h2>
        </div>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Location Search */}
      <LocationSearch onSearch={setCity} />

      {/* Forecast Cards */}
      <div className="flex flex-col gap-3">
        {dailyForecast.map((item) => (
          <div key={item.dt} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">{getDayName(item.dt_txt)}</p>
              <p className="text-sm text-gray-500 capitalize">{item.weather[0].description}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">{getWeatherEmoji(item.weather[0].description)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-700">{Math.round(item.main.temp)}°C</p>
              <p className="text-xs text-gray-500">Humidity: {item.main.humidity}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Farming Tip */}
      <div className="bg-green-50 border border-green-300 rounded-xl p-4 mt-4">
        <p className="text-xs text-green-600 font-medium">Farming Tip 🌱</p>
        <p className="text-green-800 text-sm mt-1">
          Plan your planting and harvesting activities based on the forecast above.
          Avoid planting on heavy rain days.
        </p>
      </div>

    </div>
  )
}

export default Forecast