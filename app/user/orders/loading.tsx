import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">
              <Skeleton className="w-24 h-6" />
            </th>
            <th className="px-4 py-2 border">
              <Skeleton className="w-24 h-6" />
            </th>
            <th className="px-4 py-2 border">
              <Skeleton className="w-24 h-6" />
            </th>
            <th className="px-4 py-2 border">
              <Skeleton className="w-24 h-6" />
            </th>
            <th className="px-4 py-2 border">
              <Skeleton className="w-24 h-6" />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Simulating multiple skeleton rows */}
          {[...Array(3)].map((_, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 border">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-md" />
                  <Skeleton className="w-32 h-6" />
                </div>
              </td>
              <td className="px-4 py-2 border">
                <Skeleton className="w-24 h-6" />
              </td>
              <td className="px-4 py-2 border">
                <Skeleton className="w-20 h-6" />
              </td>
              <td className="px-4 py-2 border">
                <Skeleton className="w-20 h-6" />
              </td>
              <td className="px-4 py-2 border">
                <Skeleton className="w-24 h-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loading;
