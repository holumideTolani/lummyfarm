import { useState, useEffect } from 'react'

const useWeather = (city) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        ])

        const weatherData = await weatherRes.json()
        const forecastData = await forecastRes.json()

        setWeather(weatherData)
        setForecast(forecastData)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, forecast, loading, error }
}

export default useWeather
