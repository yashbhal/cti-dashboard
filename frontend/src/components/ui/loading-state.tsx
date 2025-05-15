import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
}

export function ChartLoadingSkeleton({ className }: LoadingStateProps) {
  return (
    <Card className={cn("overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5", className)}>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 bg-gray-800" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-[250px]">
          <Skeleton className="h-[200px] w-[200px] rounded-full bg-gray-800" />
        </div>
      </CardContent>
    </Card>
  );
}

export function TableLoadingSkeleton({ className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Filter Card Skeleton */}
      <Card className="overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-40 bg-gray-800" />
          <Skeleton className="h-4 w-60 bg-gray-800 mt-2" />
        </CardHeader>
        <CardContent className="p-4 space-y-0 flex items-center gap-4">
          <Skeleton className="h-10 flex-1 bg-gray-800" />
          <Skeleton className="h-10 w-[180px] bg-gray-800" />
        </CardContent>
      </Card>
      
      {/* Table Card Skeleton */}
      <Card className="overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5">
        <CardHeader className="space-y-2">
          <Skeleton className="h-7 w-48 bg-gray-800" />
          <Skeleton className="h-4 w-72 bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4 py-3 px-4 bg-gray-800/50 rounded-t-md">
              <Skeleton className="h-4 w-1/4 bg-gray-800" />
              <Skeleton className="h-4 w-1/6 bg-gray-800" />
              <Skeleton className="h-4 w-1/6 bg-gray-800" />
              <Skeleton className="h-4 w-1/4 bg-gray-800" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-center gap-4 py-4 px-4 rounded-sm", 
                  i % 2 === 0 ? "bg-transparent" : "bg-gray-800/30"
                )}
              >
                <Skeleton className="h-4 w-1/4 bg-gray-800" />
                <Skeleton className="h-4 w-1/6 bg-gray-800" />
                <Skeleton className="h-4 w-1/6 bg-gray-800" />
                <Skeleton className="h-4 w-1/4 bg-gray-800" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardLoadingState() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-3">
        <Skeleton className="h-10 w-64 bg-gray-800" />
        <Skeleton className="h-5 w-96 bg-gray-800" />
      </div>
      
      <div className="grid gap-6 md:gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartLoadingSkeleton />
          <ChartLoadingSkeleton />
        </div>
        <TableLoadingSkeleton />
      </div>
    </div>
  );
}
