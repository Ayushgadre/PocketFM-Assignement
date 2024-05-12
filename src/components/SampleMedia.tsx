// import React from 'react';
// import { useEffect } from 'react';
// import Image from 'next/image';
// import { useQueue } from '@/hooks/useQueue';
// import { FaPlay } from 'react-icons/fa';

// type SampleMediaProps = {
//   setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
//   setFileType: React.Dispatch<React.SetStateAction<string | undefined>>;
//   setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
// };

// export function SampleMedia({ setSelectedFile, setFileType, setThumbnail }: SampleMediaProps) {
//   const { addToQueue, queue, removeFromQueue } = useQueue(); 

//   useEffect(() => {
//     console.log("Queue:", queue); 
//   }, [queue]);

//   const handleFileSelect = (fileUrl: string, fileType: string, thumbnailUrl: string) => {
//     setSelectedFile(fileUrl);
//     setFileType(fileType);
//     setThumbnail(thumbnailUrl);
  
//     queue.forEach((media) => {
//       removeFromQueue(media);
//     });
  
//     const startIndex = sampleFiles.findIndex((file) => file.url === fileUrl);
//     if (startIndex !== -1) {
//       const filesToAdd = sampleFiles.slice(startIndex);
//       filesToAdd.forEach((nextFile) => {
//         addToQueue({ url: nextFile.url, type: nextFile.type, thumbnail: nextFile.thumbnail });
//       });
//     }
//   };

//   const sampleFiles = [
//     { url: '/samples/sample1.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample1.png' },
//     { url: '/samples/sample2.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample2.png' },
//     { url: '/samples/sample3.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample3.png' },
//     { url: '/samples/sample4.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
//     { url: '/samples/sample5.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
//     { url: '/samples/sample6.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample6.png' },
//   ];

//   return (
//     <div className='flex flex-col w-full md:border-l-2 border-pocket-red p-2'>
//       <p className='md:text-2xl text-lg flex justify-center text-pocket-red'> Sample Media</p>
//       <div className='mx-auto my-2'>
//         {sampleFiles.map((file, index) => (
//           <div key={index} className='my-4 relative border-2 border-gray-200' 
//           onClick={() => handleFileSelect(file.url, file.type, file.thumbnail)}
//           >
//             <Image
//               src={file.thumbnail}
//               alt={`Thumbnail ${index}`}
//               width={400}
//               height={400}
//               className='cursor-pointer'
//             />
//             <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
//               <FaPlay size={50} color="white" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { useQueue } from '@/hooks/useQueue';

type SampleMediaProps = {
  setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFileType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const sampleFiles = [
  { url: '/samples/sample1.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample1.png' },
  { url: '/samples/sample2.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample2.png' },
  { url: '/samples/sample3.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample3.png' },
  { url: '/samples/sample4.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
  { url: '/samples/sample5.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
  { url: '/samples/sample6.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample6.png' },
];

export function SampleMedia({ setSelectedFile, setFileType, setThumbnail }: SampleMediaProps) {
  const { addToQueue, queue, removeFromQueue } = useQueue(); 

  // Effect to log the queue for debugging; remove in production
  React.useEffect(() => {
    console.log("Queue updated:", queue); 
  }, [queue]);

  const handleFileSelect = (file: typeof sampleFiles[number]) => {
    setSelectedFile(file.url);
    setFileType(file.type);
    setThumbnail(file.thumbnail);

    // Clear the existing queue and add selected files to the queue
    queue.forEach((media) => removeFromQueue(media));
    sampleFiles.slice(sampleFiles.findIndex(f => f.url === file.url))
               .forEach(addToQueue);
  };

  return (
    <div className='flex flex-col w-full md:border-l-2 border-pocket-red p-4'>
      <h2 className='text-2xl text-center text-pocket-red mb-4'>Sample Media</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {sampleFiles.map((file, index) => (
          <div key={index} className='relative border border-gray-200 cursor-pointer group'
               onClick={() => handleFileSelect(file)}>
            <Image
              src={file.thumbnail}
              alt={`Thumbnail for ${file.type.split('/')[0]}`}
              width={400}
              height={225} // Adjusting for typical video aspect ratio
              layout='responsive'
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
              <FaPlay size={50} color="white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
