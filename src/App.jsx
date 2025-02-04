import React, { useRef, useState } from 'react';
import fileFlyLogo from './assets/filefly_logo.png';
import quitIcon from './assets/quit-icon.png';
import FileInfo from './components/FileInfo';

const App = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

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

      {/* Pass the selected files to FileInfo and enable deletion */}
      <FileInfo files={files} onDeleteFile = {handleDeleteFile}/>
    </div>
  );
};

export default App;
