import { useEffect } from 'react';
export default function useDocumentTitle(title) {
  useEffect(() => { document.title = `${title} | Apex Motors`; }, [title]);
}
