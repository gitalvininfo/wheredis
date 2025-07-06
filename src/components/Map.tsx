'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          center: { lat: 10.685972772962963, lng: 122.96863457824658 },
          zoom: 10,
          mapId: 'DEMO_MAP_ID',
        });

        // Listen for clicks on the map
        map.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            console.log(e.latLng.toJSON());
            new AdvancedMarkerElement({
              position: e.latLng,
              map: map,
            });
          }
        });
      }
    });
  }, []);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default Map;
