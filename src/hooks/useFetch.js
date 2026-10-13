import { useEffect, useState } from 'react';

// Custom hook: API integration with loading + error state
export default function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error('Request failed'); return r.json(); })
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((e) => active && setState({ data: null, loading: false, error: e.message }));
    return () => { active = false; };
  }, [url]);
  return state;
}
