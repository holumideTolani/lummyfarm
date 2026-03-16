


export const crops = [
  { id: 'maize', name: 'Maize 🌽', minTemp: 20, maxTemp: 30, minHumidity: 60 },
  { id: 'cassava', name: 'Cassava 🥔', minTemp: 25, maxTemp: 29, minHumidity: 50 },
  { id: 'yam', name: 'Yam 🍠', minTemp: 25, maxTemp: 30, minHumidity: 65 },
  { id: 'rice', name: 'Rice 🌾', minTemp: 20, maxTemp: 37, minHumidity: 70 },
  { id: 'tomato', name: 'Tomato 🍅', minTemp: 18, maxTemp: 27, minHumidity: 60 },
  { id: 'vegetables', name: 'Vegetables 🥬', minTemp: 15, maxTemp: 25, minHumidity: 55 },
]

export const getPlantingAdvice = (crop, temp, humidity) => {
  const tempOk = temp >= crop.minTemp && temp <= crop.maxTemp
  const humidityOk = humidity >= crop.minHumidity

  if (tempOk && humidityOk) {
    return {
      status: 'good',
      message: `Good time to plant ${crop.name} ✅`,
      advice: `Temperature and moisture levels are ideal for ${crop.name}`
    }
  } else if (tempOk && !humidityOk) {
    return {
      status: 'warning',
      message: `Humidity too low for ${crop.name} ⚠️`,
      advice: `Consider irrigation — humidity is below ${crop.minHumidity}%`
    }
  } else if (!tempOk && humidityOk) {
    return {
      status: 'warning',
      message: `Temperature not ideal for ${crop.name} ⚠️`,
      advice: `${crop.name} grows best between ${crop.minTemp}°C and ${crop.maxTemp}°C`
    }
  } else {
    return {
      status: 'bad',
      message: `Not a good time to plant ${crop.name} ❌`,
      advice: `Both temperature and humidity are outside ideal range`
    }
  }
}