import { calculateScore } from '@/utils/game-utils';
import { useCallback, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useGameStore } from '@/store/gameStore';

const NEXT_ROUND_DELAY = 1000;

export const useMinimap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const score = useGameStore((state) => state.score);

  const updateScoreInStore = useCallback((distanceInMeters: number): void => {
    console.log(`Distance: ${distanceInMeters} meters`);

    const score = calculateScore(distanceInMeters);
    useGameStore.getState().setScore(score);
  }, []);

  const attachMapClickHandler = useCallback(
    (
      map: google.maps.Map,
      spherical: google.maps.GeometryLibrary['spherical'],
      AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
    ) => {
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        const userClickLocation = new google.maps.LatLng(event.latLng);

        new AdvancedMarkerElement({
          position: userClickLocation,
          map,
        });

        const userGuessLatLng = new google.maps.LatLng(userClickLocation);
        const correctLocation = new google.maps.LatLng(10.2926, 123.9022);

        const distanceInMeters = spherical.computeDistanceBetween(
          userGuessLatLng,
          correctLocation
        );

        updateScoreInStore(distanceInMeters);

        const guessPath = new google.maps.Polyline({
          path: [userGuessLatLng, correctLocation],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        guessPath.setMap(map);
      });
    },
    [updateScoreInStore]
  );

  const initMap = useCallback(
    (
      mapRef: React.RefObject<HTMLDivElement | null>,
      spherical: google.maps.GeometryLibrary['spherical'],
      AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
      Map: typeof google.maps.Map
    ) => {
      if (!mapRef.current) return;

      const map = new Map(mapRef.current, {
        center: { lat: 10.685972772962963, lng: 122.96863457824658 },
        zoom: 10,
        mapId: 'DEMO_MAP_ID',
      });

      attachMapClickHandler(map, spherical, AdvancedMarkerElement);
    },
    [attachMapClickHandler]
  );

  const showNextLocation = useCallback(() => {
    console.log('start next round');
  }, []);

  useEffect(() => {
    if (score === 0) return;
    console.log('score changed', score);
    const timeoutId = setTimeout(() => showNextLocation(), NEXT_ROUND_DELAY);

    return () => clearTimeout(timeoutId);
  }, [score, showNextLocation]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    });

    loader.load().then(async () => {
      // maps
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;

      // markers
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

      // geometry
      const { spherical } = (await google.maps.importLibrary(
        'geometry'
      )) as google.maps.GeometryLibrary;

      // initialize map
      initMap(mapRef, spherical, AdvancedMarkerElement, Map);
    });
  }, [initMap]);

  return { mapRef };
};
