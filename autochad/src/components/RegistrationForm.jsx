import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    LicenseNumber: '', 
    VehicleType: '',
    VehicleModel: '',      
    VehicleNumber: '',
    AreaName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.FirstName) formErrors.FirstName = 'First Name is required';
    if (!formData.LastName) formErrors.LastName = 'Last Name is required';
    if (!formData.PhoneNumber) {
      formErrors.PhoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.PhoneNumber)) {
      formErrors.PhoneNumber = 'Phone Number must be exactly 10 digits';
    }
    if (!formData.LicenseNumber) formErrors.LicenseNumber = 'License Number is required';
    if (!formData.VehicleType) formErrors.VehicleType = 'Vehicle Type is required';
    if (!formData.VehicleModel) formErrors.VehicleModel = 'Vehicle Model is required';
    if (!formData.VehicleNumber) formErrors.VehicleNumber = 'Vehicle Number is required';
    if (!formData.AreaName) formErrors.AreaName = 'Area Name is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('https://autoapi.rajvikash-r2022cse.workers.dev/autoStand/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        LicenseNumber: '', 
        VehicleType: '',
        VehicleModel: '',      
        VehicleNumber: '',
        AreaName: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(`Registration failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-yellow-400 flex items-center justify-center min-h-screen">
      <ToastContainer 
      theme="colored"
      style={{ top: '10px', right:'20px' }} 
      />
      <div className="w-full max-w-4xl mx-auto px-8 pt-6 pb-8 bg-white rounded-xl shadow-md relative">
        <div className="absolute mt-3 top-4 right-4">
          <Link to="/" className="text-white font-bold bg-red-500 hover:bg-red-700 rounded-md px-4 py-2">
            Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="First Name" name="FirstName" value={formData.FirstName} onChange={handleChange} required error={errors.FirstName} />
            <FormField label="Last Name" name="LastName" value={formData.LastName} onChange={handleChange} required error={errors.LastName} />
            <FormField label="Phone Number" name="PhoneNumber" type="tel" value={formData.PhoneNumber} onChange={handleChange} required error={errors.PhoneNumber} />
            <FormField label="License Number" name="LicenseNumber" type="text" value={formData.LicenseNumber} onChange={handleChange} required error={errors.LicenseNumber} />
            <FormField label="Vehicle Type" name="VehicleType" type="text" value={formData.VehicleType} onChange={handleChange} required error={errors.VehicleType} />
            <FormField label="Vehicle Model" name="VehicleModel" type="text" value={formData.VehicleModel} onChange={handleChange} required error={errors.VehicleModel} />
            <FormField label="Vehicle Number" name="VehicleNumber" type="text" value={formData.VehicleNumber} onChange={handleChange} required error={errors.VehicleNumber} />
            <FormField label="Area Name" name="AreaName" type="text" value={formData.AreaName} onChange={handleChange} required error={errors.AreaName} />
          </div>
          <button type="submit" className="mt-4 p-2 text-white font-bold bg-yellow-500 hover:bg-black rounded-md w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const FormField = ({ label, name, type, value, onChange, required, error }) => (
  <div className="flex flex-col">
    <label className="font-semibold">{label}</label>
    <input
      type={type || 'text'}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-yellow-500"
      required={required}
    />
    {error && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{error}</p>}
  </div>
);

export default RegistrationForm;