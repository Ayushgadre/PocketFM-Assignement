
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
  { url: '/samples/sample1.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample1.jpg' },
  { url: '/samples/sample2.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample2.jpg' },
  { url: '/samples/sample3.mp4', type: 'video/mp4', thumbnail: '/thumbnails/sample3.jpg' },
  { url: '/samples/sample4.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
  { url: '/samples/sample5.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
  { url: '/samples/sample6.mp3', type: 'audio/mpeg', thumbnail: '/thumbnails/audioThumbnail.png' },
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
      <h2 className='text-2xl text-center text-pocket-red mb-4'>Choose Sample Media</h2>
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
