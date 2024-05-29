import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import phone from '../SVGs/phone.svg';

function Details() {
  const location = useLocation();
  const {
    FirstName,
    LastName,
    PhoneNumber,
    LicenseNumber,
    VehicleType,
    VehicleModel,
    VehicleNumber,
    AreaName
  } = location.state;

  const licenseNumberInt = parseInt(LicenseNumber);

  const callCab = () => {
    window.location.href = `tel:${PhoneNumber}`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-yellow-400 items-center justify-center">
      <div className="w-2/3 h-max max-w-md mx-auto p-8 bg-slate-200 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cab Details</h1>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Name" value={FirstName} />
          <FormField label="Last Name" value={LastName} />
          <FormField label="Phone Number" value={PhoneNumber} />
          <FormField label="License Number" value={licenseNumberInt} />
          <FormField label="Vehicle Type" value={VehicleType} />
          <FormField label="Vehicle Model" value={VehicleModel} />
          <FormField label="Vehicle Number" value={VehicleNumber} />
          <FormField label="Area Name" value={AreaName} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link to="/search" className="mt-3 ml-4 inline-block text-black font-bold hover:text-white bg-yellow-500 hover:bg-black hover:font-bold rounded-md p-2">
            Back to Search
          </Link>
          <button onClick={callCab} className="mr-8 mt-2 inline-block bg-slate-200 rounded-full p-2 animate-pulse hover:animate-none">
            <img src={phone} alt="Call" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

const FormField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="font-semibold">{label}</label>
    <input type="text" value={value} readOnly className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-yellow-500" />
  </div>
);

export default Details;
