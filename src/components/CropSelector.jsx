import { crops } from '../utils/plantingLogic'

function CropSelector({ selectedCrop, onCropChange }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <p className="text-sm text-gray-500 mb-3">Select your crop</p>
      <div className="grid grid-cols-3 gap-2">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onCropChange(crop)}
            className={`p-3 rounded-xl text-sm font-medium transition border
              ${selectedCrop?.id === crop.id
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'
              }`}
          >
            {crop.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CropSelector