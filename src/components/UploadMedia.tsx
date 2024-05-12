import { useState } from 'react';
import { useQueue } from '@/hooks/useQueue';

type UploadMediaProps = {
  setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFileType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>; 
};

// Component for uploading media files
export function UploadMedia({ setSelectedFile, setFileType, setThumbnail }: UploadMediaProps) {
  // Custom hook from useQueue for managing media queue
  const { addToTop } = useQueue();

  // Function to handle file upload event
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files are selected
    if (event.target.files && event.target.files.length > 0) {
      // Set selected file URL
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
      // Set file type
      setFileType(event.target.files[0].type);
      // Set thumbnail (assuming a default thumbnail for audio files)
      setThumbnail("/thumbnails/audioThumbnail.jpeg");

      // Create a new media object
      const newMedia = {
        url: URL.createObjectURL(event.target.files[0]),
        type: event.target.files[0].type,
        thumbnail: "/thumbnails/audioThumbnail.jpeg"
      };

      // Add new media to the top of the queue
      addToTop(newMedia);
    }
  }

  return (
    <div className="flex justify-center my-4">
      {/* Input for file upload */}
      <input 
        type="file" 
        accept="audio/*,video/*" 
        onChange={handleFileUpload} 
        className="bg-pocket-red p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
 