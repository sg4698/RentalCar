import React from 'react';

export const RenderInput = ({ name, value, onChange, type = "text", label }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
      {label || name}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
  </div>
);

export const RenderSelect = ({ name, value, onChange, options, label }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
      {label || name}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 px-4 py-2 rounded-md"
      required
    >
      <option value="">Select {label || name}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
