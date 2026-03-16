import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-4 py-4 shadow-md">

      {/* Top row — Logo */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <h1 className="text-xl font-bold">LummyFarm</h1>
        </div>
      </div>

      {/* Bottom row — Links */}
      <div className="flex justify-between text-xs font-medium">
        <Link to="/" className="hover:text-green-300 transition text-center">
          <p>🏠</p>
          <p>Home</p>
        </Link>
        <Link to="/forecast" className="hover:text-green-300 transition text-center">
          <p>📅</p>
          <p>Forecast</p>
        </Link>
        <Link to="/crops" className="hover:text-green-300 transition text-center">
          <p>🌽</p>
          <p>My Crops</p>
        </Link>
        <Link to="/calendar" className="hover:text-green-300 transition text-center">
          <p>📆</p>
          <p>Calendar</p>
        </Link>
      </div>

    </nav>
  )
}

export default Navbar