import { useSearchParams } from 'react-router-dom';

export function useUrl() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  return [id];
}
