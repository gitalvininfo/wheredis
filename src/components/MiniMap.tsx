'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useGameStore } from '@/store/gameStore';

const MiniMap = () => {
  const coordinates = useGameStore((s) => s.coordinates);

  useEffect(() => {
    console.log('coordinates', coordinates);
  }, [coordinates]);

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

      const { spherical } = (await google.maps.importLibrary(
        'geometry'
      )) as google.maps.GeometryLibrary;

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          center: { lat: 10.685972772962963, lng: 122.96863457824658 },
          zoom: 10,
          mapId: 'DEMO_MAP_ID',
        });

        // Listen for clicks on the map
        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const userClickLocation = new google.maps.LatLng(event.latLng);

            new AdvancedMarkerElement({
              position: userClickLocation,
              map: map,
            });

            const userGuessLatLng = new google.maps.LatLng(userClickLocation);
            const correctLocation = new google.maps.LatLng(10.2926, 123.9022);

            const distanceInMeters = spherical.computeDistanceBetween(
              userGuessLatLng,
              correctLocation
            );

            console.log(`Distance: ${distanceInMeters} meters`);

            const guessLineCoordinates = [userGuessLatLng, correctLocation];
            const guessPath = new google.maps.Polyline({
              path: guessLineCoordinates,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });

            guessPath.setMap(map);
          }
        });
      }
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="absolute right-0 bottom-0 h-[300px] w-[20%]"
    ></div>
  );
};

export default MiniMap;
