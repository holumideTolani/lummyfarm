import { useState } from 'react'

const calendarData = [
  {
    crop: 'Maize 🌽',
    zone: 'Southwest',
    plantingMonths: [3, 4, 5, 6],
    harvestMonths: [7, 8, 9],
    advice: 'Best planted April to June in Southwest Nigeria'
  },
  {
    crop: 'Cassava 🥔',
    zone: 'All Zones',
    plantingMonths: [3, 4, 5, 10, 11],
    harvestMonths: [15, 16, 17, 18],
    advice: 'Can be planted almost any time — harvest after 12-18 months'
  },
  {
    crop: 'Yam 🍠',
    zone: 'Middle Belt',
    plantingMonths: [1, 2, 3, 4],
    harvestMonths: [8, 9, 10],
    advice: 'Plant February to April in Middle Belt and Southeast'
  },
  {
    crop: 'Rice 🌾',
    zone: 'All Zones',
    plantingMonths: [4, 5, 6, 7],
    harvestMonths: [9, 10, 11],
    advice: 'Plant when rains are consistent — May to July ideal'
  },
  {
    crop: 'Tomato 🍅',
    zone: 'North',
    plantingMonths: [9, 10, 11, 12],
    harvestMonths: [1, 2, 3],
    advice: 'Best in dry season — October to February in Northern Nigeria'
  },
  {
    crop: 'Vegetables 🥬',
    zone: 'All Zones',
    plantingMonths: [9, 10, 11, 12],
    harvestMonths: [1, 2, 3],
    advice: 'Grow best in cool dry season — October to March'
  },
]

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const currentMonth = new Date().getMonth() + 1

function Calendar() {
  const [selectedCrop, setSelectedCrop] = useState(calendarData[0])

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="text-sm text-gray-500">Planting Calendar</p>
        <h2 className="text-lg font-bold text-gray-800">
          Best planting months for Nigerian farmers
        </h2>
      </div>

      {/* Crop Selector */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="text-sm text-gray-500 mb-3">Select crop</p>
        <div className="grid grid-cols-3 gap-2">
          {calendarData.map((item) => (
            <button
              key={item.crop}
              onClick={() => setSelectedCrop(item)}
              className={`p-3 rounded-xl text-sm font-medium transition border
                ${selectedCrop.crop === item.crop
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'
                }`}
            >
              {item.crop}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Crop Info */}
      <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-4">
        <p className="text-xs text-green-600 font-medium mb-1">
          {selectedCrop.crop} — {selectedCrop.zone}
        </p>
        <p className="text-green-800 text-sm">{selectedCrop.advice}</p>
      </div>

      {/* Monthly Calendar */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="text-sm text-gray-500 mb-3">Monthly planting guide</p>
        <div className="grid grid-cols-4 gap-2">
          {months.map((month, index) => {
            const monthNum = index + 1
            const isPlanting = selectedCrop.plantingMonths.includes(monthNum)
            const isHarvest = selectedCrop.harvestMonths.includes(monthNum)
            const isCurrent = monthNum === currentMonth

            return (
              <div
                key={month}
                className={`rounded-xl p-3 text-center border-2 ${
                  isCurrent
                    ? 'border-green-700'
                    : 'border-transparent'
                } ${
                  isPlanting
                    ? 'bg-green-100'
                    : isHarvest
                    ? 'bg-yellow-100'
                    : 'bg-gray-50'
                }`}
              >
                <p className={`text-sm font-bold ${
                  isCurrent ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {month}
                </p>
                <p className="text-xs mt-1">
                  {isPlanting ? '🌱' : isHarvest ? '🌾' : '—'}
                </p>
                <p className={`text-xs mt-1 ${
                  isPlanting
                    ? 'text-green-600'
                    : isHarvest
                    ? 'text-yellow-600'
                    : 'text-gray-400'
                }`}>
                  {isPlanting ? 'Plant' : isHarvest ? 'Harvest' : ''}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500 mb-3">Legend</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded"></div>
            <p className="text-sm text-gray-700">🌱 Planting season</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-100 rounded"></div>
            <p className="text-sm text-gray-700">🌾 Harvest season</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-green-700 rounded"></div>
            <p className="text-sm text-gray-700">Current month</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Calendar