import Map from '@/components/Map';
import StreetView from '@/components/StreetView';

export default function Home() {
  return (
    <div className="relative">
      <Map />
      <StreetView />
    </div>
  );
}
