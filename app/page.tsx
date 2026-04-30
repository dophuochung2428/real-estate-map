import { supabase } from '../lib/supabase';
import MapWrapper from '../components/MapWrapper';

export default async function Home() {
  const { data } = await supabase
    .from('properties')
    .select('*');

  return (
    <div>
      <h1>Map bất động sản</h1>
      <MapWrapper data={data || []} />
    </div>
  );
}