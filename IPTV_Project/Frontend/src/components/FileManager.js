import React, { useState, useEffect } from 'react';
import './FileManager.css';
import Sidebar from './Sidebar';
import LoadingIndicator from './LoadingIndicator';

const FileManager = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const userToken = localStorage.getItem('userToken');

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/files', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch files');
      const result = await response.json();
      console.log('Fetched files:', result); // Debugging line
      setFiles(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await fetch('http://localhost:5000/api/files', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Upload failed: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      alert('File uploaded successfully');
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-manager">
      <Sidebar />
      <div className="upload-section">
        <h2>Upload File</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleUpload}
          className="upload-btn"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="files-list">
        <h2>Uploaded Files</h2>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <ul>
            {files.map(file => (
              <li key={file._id}>
                <img
                  src={`http://localhost:5000/${file.path}`}
                  alt={file.original_name}
                  className="file-thumbnail"
                />
                <div className="file-info">
                  <p><strong>Original Name:</strong> {file.original_name}</p>
                  <p><strong>Type:</strong> {file.type || 'N/A'}</p>
                  <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileManager;
