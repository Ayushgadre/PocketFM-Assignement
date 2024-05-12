"use client"
import { useState, useContext, createContext, ReactNode } from 'react';

// Define the structure of media items in the queue
interface Media {
  url: string;
  type: string;
  thumbnail: string;
}

// Create a context for managing the media queue
export const QueueContext = createContext<{
  queue: Media[];
  prevMediaStack: Media[];
  addToQueue: (media: Media) => void;
  addToTop: (media: Media) => void;
  removeFromQueue: (media: Media) => void;
  nextInQueue: () => Media | undefined;
  prevInQueue: () => Media | undefined;
  clearQueueAndStack: () => void;
}>({
  queue: [],
  prevMediaStack: [],
  addToQueue: () => {},
  removeFromQueue: () => {},
  nextInQueue: () => undefined,
  prevInQueue: () => undefined,
  addToTop: () => {},
  clearQueueAndStack: () => {},
});

// Provider component to wrap the application and provide the queue context
export function QueueProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Media[]>([]);
  const [prevMediaStack, setPrevMediaStack] = useState<Media[]>([]);

  // Function to add a media item to the queue
  const addToQueue = (media: Media) => {
    setQueue((prevQueue) => [...prevQueue, media]);
  };

  // Function to add a media item to the top of the queue
  const addToTop = (media: Media) => {
    setQueue((prevQueue) => [media, ...prevQueue]);
  };

  // Function to clear the queue and stack
  const clearQueueAndStack = () => {
    setQueue([]);
    setPrevMediaStack([]);
  };

  // Function to remove a media item from the queue
  const removeFromQueue = (media: Media) => {
    setPrevMediaStack((prevStack) => [media, ...prevStack]);
    setQueue((prevQueue) => prevQueue.filter((m) => m.url !== media.url));
  };

  // Function to get the next media item in the queue
  const nextInQueue = (): Media | undefined => {
    if (queue.length > 0) {
      const [nextMedia, ...rest] = queue;
      setPrevMediaStack((prevStack) => [nextMedia, ...prevStack]);
      setQueue(rest);
      return nextMedia;
    }
    return undefined;
  };

  // Function to get the previous media item in the queue
  const prevInQueue = (): Media | undefined => {
    if (prevMediaStack.length > 0) {
      const [prevMedia, ...rest] = prevMediaStack;
      setPrevMediaStack(rest);
      addToTop(prevMedia);

      return prevMedia;
    }
    return undefined;
  };

  // Value to be provided by the context
  const value = { queue, prevMediaStack, addToQueue, removeFromQueue, nextInQueue, prevInQueue, clearQueueAndStack, addToTop };

  // Provide the queue context to the children
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

// Custom hook to access the queue context
export function useQueue() {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
