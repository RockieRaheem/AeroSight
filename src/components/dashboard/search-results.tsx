'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Map,
  Wrench,
  Droplets,
  Loader2,
  SearchX,
  Bot,
  AlertTriangle,
} from 'lucide-react';
import { searchAeroSight } from '@/ai/flows/search-aero-sight';
import type { SearchAeroSightOutput } from '@/ai/flows/search-aero-sight';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const iconMap: { [key: string]: React.ElementType } = {
  'Flight Route': Map,
  'Maintenance Task': Wrench,
  'Fuel Cost Record': Droplets,
  'Flight Delay': AlertTriangle,
  Summary: Bot,
  default: FileText,
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { toast } = useToast();

  const [results, setResults] = useState<SearchAeroSightOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    async function performSearch() {
      setIsLoading(true);
      setResults(null);
      try {
        const searchResult = await searchAeroSight({ query: query! });
        setResults(searchResult);
      } catch (error) {
        console.error('Search failed:', error);
        toast({
          title: 'Search Failed',
          description: 'Could not perform the search. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [query, toast]);

  if (!query) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search AeroSight</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please enter a search term in the search bar above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Search Results for &quot;{query}&quot;
      </h1>

      {isLoading && (
        <div className="space-y-4">
          <Alert>
            <Bot className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Supporting Data</h2>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      )}

      {!isLoading && results && (
        <>
           <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>AI Summary</AlertTitle>
              <AlertDescription>
                {results.summary}
              </AlertDescription>
            </Alert>

          {results.results && results.results.length > 0 && (
            <div className="space-y-4">
               <h2 className="text-xl font-semibold tracking-tight">Supporting Data</h2>
              {results.results.map((item, index) => {
                const Icon = iconMap[item.type] || iconMap.default;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Icon className="h-6 w-6 text-muted-foreground" />
                          <div className="space-y-1">
                            <CardTitle className="text-lg">
                              <Link href={item.link || '#'} className="hover:underline">
                                {item.title}
                              </Link>
                            </CardTitle>
                            <CardDescription>{item.summary}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
      
      {!isLoading && (!results || results.results.length === 0) && (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <SearchX className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No Results Found</h2>
            <p className="mt-2 text-muted-foreground">
                We couldn&apos;t find anything matching your search. Try using different keywords.
            </p>
        </div>
      )}
    </div>
  );
}
