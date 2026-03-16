import { useState } from 'react'

function LocationSearch({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city)
      setCity('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <p className="text-sm text-gray-500 mb-2">Search your city</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city e.g Ibadan, Lagos, Kano..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default LocationSearch