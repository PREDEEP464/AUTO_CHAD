import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-black to-yellow-400">
        <div className="bg-slate-200 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Welcome to <span className="text-slate-600">Auto</span><span className="text-orange-400">Chad</span>
          </h1>
          <p className="text-gray-600 text-center mb-8">
            With AutoChad, you can easily search for taxis and autos near your community or area. Get started now and experience the convenience!
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="location" className="text-gray-700">
                Choose your location and we choose the cab for you!
              </label>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-700 text-center mb-4">Available modes of transportation</h2>
              <div className="flex justify-around">
                <h3 className="text-center w-1/2 py-3 bg-slate-600 text-white rounded-lg hover:bg-green-600 hover:font-semibold transition duration-300 mr-2">
                  Taxi 🚕
                </h3>
                <h3 className="text-center w-1/2 py-3 bg-slate-600 text-white rounded-lg hover:bg-green-600 hover:font-semibold transition duration-300 ml-2">
                  Auto 🛺
                </h3>
              </div>
            </div>

            <Link to="/search">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 hover:font-bold transition duration-300 mt-8">
                📍 GET STARTED ✨
              </button>
            </Link>
            <Link to="/register">
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-700 hover:font-bold transition duration-300 mt-8">
                🚕 BE A PARTNER 🛺
              </button>
            </Link>
          </form>
        </div>
      </div>
      <footer className=" bg-gradient-to-r from-black to-yellow-400 text-sm text-white text-center py-3">
        &copy; {new Date().getFullYear()} AutoChad. All rights reserved
      </footer>
    </div>
  )
}

export default GetStarted
