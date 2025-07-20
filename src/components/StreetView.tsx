import { useGameStart } from '@/hooks/useGameStart';
import { useGameStore } from '@/store/gameStore';
import React, { useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function StreetView() {
  useGameStart();

  const currentCoordinates = useGameStore((state) => state.currentCoordinates);

  useEffect(() => {
    console.log('currentCoordinates streetview', currentCoordinates);
  }, [currentCoordinates]);

  return (
    <div className="h-screen w-full">
      {currentCoordinates && (
        <iframe
          width="100%"
          height="100%"
          style={{ border: '0' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/streetview?location=${currentCoordinates[0]},${currentCoordinates[1]}&key=${API_KEY}`}
        ></iframe>
      )}
    </div>
  );
}

export default StreetView;
