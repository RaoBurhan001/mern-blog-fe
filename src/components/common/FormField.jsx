import React from 'react';

const FormField = ({ label, error, children }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium">{label}</label>}
    {children}
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);

export default FormField;
