import React from 'react';

const DeviceOverlay = ({ devices, onCloseOverlay }) => {
  return (
    <div className="overlay fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Devices on Local Network</h2>
        <ul>
          {devices.length > 0 ? (
            devices.map((device, index) => (
              <li key={index} className="border-b py-2">
                {device}
              </li>
            ))
          ) : (
            <li>No devices found.</li>
          )}
        </ul>
        <div className="mt-4 text-right">
          <button
            onClick={onCloseOverlay}
            className="bg-red-500 text-white rounded-md px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceOverlay;
