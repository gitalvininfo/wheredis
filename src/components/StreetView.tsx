import React from 'react';

function StreetView() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <div>
      <iframe
        width="100%"
        height="500"
        style={{ border: '0' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/streetview?location=10.2926,123.9022&key=${API_KEY}`}
      ></iframe>
    </div>
  );
}

export default StreetView;
