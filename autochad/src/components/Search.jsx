import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auto from '../SVGs/auto.svg';
import taxi from '../SVGs/taxi.svg';

function Search() {
  const [areaName, setAreaName] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!areaName.trim()) {
      setResults([]);
      setLoading(false);
      toast.error('Please enter an area name.', {
        className: 'custom-toast-error',
        bodyClassName: 'custom-toast-error-body',
        progressClassName: 'custom-toast-error-progress'
      });
      return;
    }

    setLoading(true);
    fetch(`https://autoapi.rajvikash-r2022cse.workers.dev/autoStand/${areaName}`)
      .then(response => response.json())
      .then(data => {
        setResults(data.results);
        setLoading(false);
        if (data.results.length === 0) {
          toast.error('No matches found for the search', {
            className: 'custom-toast-error',
            bodyClassName: 'custom-toast-error-body',
            progressClassName: 'custom-toast-error-progress'
          });
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        setLoading(false);
      });
  };

  const handleDetails = (result) => {
    navigate('/details', { state: result });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-yellow-400 items-center justify-center">
      <ToastContainer theme="colored" />
      <div className="w-2/3 h-max max-w-xl mx-auto p-8 bg-slate-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Search your Cab</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            id="search"
            placeholder="Enter your search here"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            className="w-full rounded-md border border-yellow-500 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-black"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-2 p-2 text-yellow-500 hover:text-white bg-white hover:bg-yellow-300 rounded-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="items-center justify-center w-full flex">

            <div className='loader'></div>
            
                    </div>
          ) : (
            results.length > 0 ? (
              <div>
                {results.map((result, index) => (
                  <div key={index} className="bg-yellow-100 rounded-lg mb-4 p-4 hover:bg-yellow-200 flex flex-col">
                    <p><strong>Driver Name:</strong> {result.FirstName} {result.LastName}</p>
                    <p><strong>Phone Number:</strong> {result.PhoneNumber}</p>
                    <button
                      type="button"
                      onClick={() => handleDetails(result)}
                      className="mt-2 mx-auto p-2 w-28 text-yellow-500 font-bold bg-white hover:bg-black hover:font-bold hover:text-white rounded-md"
                    >
                      Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-500 mr-2 mb-5">Use your location to get your cabs</p>
                <div className="mr-5 flex justify-center items-center">
                  <img src={auto} alt="Auto" className="w-54 h-60" />
                  <img src={taxi} alt="Taxi" className="w-54 h-54" />
                </div>
                <p className="text-gray-500 mr-2 mt-5">Get your Taxis And Autos Near Your Community </p>
              </div>
            )
          )}
        </div>
        <button
          className="mt-4 p-2 text-black font-bold hover:text-white bg-yellow-500 hover:bg-black hover:font-bold rounded-md w-full"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Search;
