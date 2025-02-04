import React from 'react';
import imageIcon from '../assets/image-icon.png';
import videoIcon from '../assets/video-icon.png';
import documentIcon from '../assets/document-icon.png';
import zipIcon from '../assets/zip-icon.png'
import deleteIcon from '../assets/delete-icon.png';
const fileTypes = [
  { id: 1, type: 'image', icon: imageIcon },
  { id: 2, type: 'video', icon: videoIcon },
  {id: 3, type: 'application', icon: zipIcon},
  {id:4, type: 'document', icon: documentIcon}
];

const FileInfo = ({ files, onDeleteFile }) => {
  console.log(files);


  const getIconForFile = (file) => {
    const fileType = file.type.split('/')[0];
    const fileTypeData = fileTypes.find((ft) => ft.type === fileType);
    return fileTypeData ? fileTypeData.icon : null;
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <div className="p-4">
      <div className="font-semibold text-2xl mb-4">Added Files</div>
      {files.length > 0 ? (
        <div className="flex flex-col gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              {/* File Icon */}
              <div className="flex justify-center">
                <img
                  src={getIconForFile(file)}
                  alt={file.type}
                  className="size-16 object-contain"
                />
              </div>
              {/* File Name */}
              <div className="text-center break-words text-gray-700">
                {file.name}
              </div>
              {/* File Size */}
              <div className="text-center text-gray-600">
                {formatFileSize(file.size)}
              </div>
              {/* Delete Button */}
              <div className="flex justify-center">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => onDeleteFile(file.name)}>
                  <img src={deleteIcon} alt="Delete" className="size-6" />
                </button>
              </div>
            </div>
          ))}
          <button
          className="bg-green-400 rounded-md p-2 shadow-lg hover:bg-green-500 cursor-pointer focus:outline-none "
        >
          Share
        </button>
        </div>
      ) : (
        <p className="text-gray-500">No files added yet.</p>
      )}
    </div>
  );
};

export default FileInfo;