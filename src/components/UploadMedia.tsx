import { useState } from 'react';
import { useQueue } from '@/hooks/useQueue';

type UploadMediaProps = {
  setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFileType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>; 
};

export function UploadMedia({ setSelectedFile, setFileType, setThumbnail }: UploadMediaProps) {
  const { addToTop } = useQueue();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
      setFileType(event.target.files[0].type);
      setThumbnail("/thumbnails/audioThumbnail.png");

      const newMedia = {
        url: URL.createObjectURL(event.target.files[0]),
        type: event.target.files[0].type,
        thumbnail: "/thumbnails/audioThumbnail.png"
      };
       
      addToTop(newMedia);
    }
  }

  return (
    <div className="flex justify-center mb-4">
      <input 
        type="file" 
        accept="audio/*,video/*" 
        onChange={handleFileUpload} 
        className="bg-pocket-red p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}



// import { useState } from 'react';
// import { useQueue } from '@/hooks/useQueue';

// type UploadMediaProps = {
//   setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
//   setFileType: React.Dispatch<React.SetStateAction<string | undefined>>;
//   setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
// };

// export function UploadMedia({ setSelectedFile, setFileType, setThumbnail }: UploadMediaProps) {
//   const { addToTop } = useQueue();

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { files } = event.target;
//     if (files && files[0]) {
//       const fileUrl = URL.createObjectURL(files[0]);
//       const fileType = files[0].type;
//       const thumbnail = fileType.startsWith('audio') ? "/thumbnails/audioThumbnail.png" : "/thumbnails/videoThumbnail.png";

//       setSelectedFile(fileUrl);
//       setFileType(fileType);
//       setThumbnail(thumbnail);

//       addToTop({ url: fileUrl, type: fileType, thumbnail });

//       event.target.value = ''; // Reset the input to allow re-uploads
//     }
//   }

// //   return (
// //     <div className="upload-container flex justify-center items-center h-screen"> {/* Full screen height */}
// //       <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center"> {/* Centered box */}
// //         <label className="block text-lg font-medium text-gray-700 mb-2">
// //           Upload Media
// //         </label>
// //         <input 
// //           type="file" 
// //           accept="audio/*,video/*" 
// //           onChange={handleFileUpload} 
// //           className="file-input bg-pocket-red p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pocket-blue cursor-pointer"
// //         />
// //       </div>
// //     </div>
// //   );
// // }


//   return (
//     <div className="flex justify-center mb-4">
//       <input 
//         type="file" 
//         accept="audio/*,video/*" 
//         onChange={handleFileUpload} 
//         className="bg-pocket-red p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }