// ImagePopup.tsx
import React, { useState } from 'react';

interface ImagePopupProps {
  visible: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ visible, onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>
        <input
          type="text"
          className="border p-2 w-full rounded mb-4"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(imageUrl);
              setImageUrl('');
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
