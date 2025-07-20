'use client';

import { useMinimap } from '@/hooks/useMinimap';

const MiniMap = () => {
  const { mapRef } = useMinimap();

  return (
    <div
      ref={mapRef}
      className="absolute right-0 bottom-0 h-[300px] w-[20%]"
    ></div>
  );
};

export default MiniMap;
