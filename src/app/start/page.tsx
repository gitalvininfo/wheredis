'use client';

import MiniMap from '@/components/MiniMap';
import StreetView from '@/components/StreetView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

function StartPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <StreetView />
        <MiniMap />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default StartPage;
