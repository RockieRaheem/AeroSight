'use client';

import { Suspense } from 'react';
import SearchResults from '@/components/dashboard/search-results';

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}
