import React from 'react';
import { FiX, FiMaximize2 } from 'react-icons/fi'; // Import icons for close and maximize
import { useQueue } from '@/hooks/useQueue'; // Import custom hook for media queue

// FloatingBox component for displaying media content in a floating box
const FloatingBox: React.FC<{ onClose: () => void; onExpand: () => void; children: React.ReactNode }> = ({ onClose, onExpand, children }) => {
  const { clearQueueAndStack } = useQueue(); // Custom hook to clear media queue and stack

  // Function to handle closing the floating box
  const handleClose = () => {
    clearQueueAndStack(); // Clear media queue and stack
    onClose(); // Call onClose function from parent component
  };

  return (
    <div className="floating-box"> {/* Container for the floating box */}
      <div className="media-wrapper">
        {children} {/* Render children components inside the floating box */}
      </div>
      <div className="bg-black controls flex p-2"> {/* Controls section */}
        <button onClick={onExpand}><FiMaximize2 /></button> {/* Button to expand the box */}
        <button onClick={handleClose}><FiX /></button> {/* Button to close the box */}
      </div>
    </div>
  );
};

export default FloatingBox; // Export the FloatingBox component
