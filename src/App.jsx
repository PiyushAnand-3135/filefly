import React, { useRef, useState, useEffect } from 'react';
import fileFlyLogo from './assets/filefly_logo.png';
import quitIcon from './assets/quit-icon.png';
import FileInfo from './components/FileInfo';
import DeviceOverlay from './components/DeviceOverlay';

const App = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [devices, setDevices] = useState([]); // Stores discovered devices

  // Simulate device discovery (this is just a placeholder for actual WebRTC discovery)
  useEffect(() => {
    if (showOverlay) {
      // Simulate device discovery (this would be done with WebRTC signaling)
      setDevices(['Device 1', 'Device 2', 'Device 3']);
    }
  }, [showOverlay]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    // Prevent duplicates
    setFiles((prevFiles) => {
      const existingFileNames = prevFiles.map((file) => file.name);
      const filteredNewFiles = newFiles.filter((file) => !existingFileNames.includes(file.name));
      return [...prevFiles, ...filteredNewFiles];
    });
  };

  const handleAddFilesClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleShareClick = () => {
    setShowOverlay(true); // Show overlay when "Share" button is clicked
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Close overlay
  };

  return (
    <div className="flex flex-col gap-7 m-3 p-3">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <button className="focus:outline-none">
          <img src={fileFlyLogo} alt="FileFly Logo" className="h-10 w-auto" />
        </button>

        <button className="focus:outline-none">
          <img src={quitIcon} alt="Quit" className="h-8 w-auto" />
        </button>
      </div>

      {/* Add Files Button */}
      <div>
        <button
          onClick={handleAddFilesClick}
          className="bg-blue-400 rounded-md p-2 shadow-lg hover:bg-blue-500 cursor-pointer focus:outline-none"
        >
          + Add Files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
      </div>

      {/* Share Button */}
      <div>
        <button
          onClick={handleShareClick}
          className="bg-green-400 rounded-md p-2 shadow-lg hover:bg-green-500 cursor-pointer focus:outline-none"
        >
          Share
        </button>
      </div>

      {/* File Info Section */}
      <FileInfo files={files} onDeleteFile={handleDeleteFile} />

      {/* Device Discovery Overlay */}
      {showOverlay && (
        <DeviceOverlay
          devices={devices}
          onCloseOverlay={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default App;
