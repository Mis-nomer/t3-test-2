"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { Input } from "@/components/ui/input";

export default function Component() {
  const query = api.art.get.useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtworks = useMemo(() => {
    const artworks = query.data;

    if (artworks && searchTerm.length) {
      console.log(artworks);
      return artworks.filter((artwork) => {
        return (
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artwork.artist_title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          artwork.medium.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    return query.data;
  }, [query.data, searchTerm]);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary px-4 py-12 text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4">
          <h1 className="place-self-center self-center text-center text-4xl font-bold">
            The Art Gallery
          </h1>
          <div className="border-l-2 border-white py-6 pl-4">
            <h2 className="mb-4 text-2xl font-bold">
              Je ne sais quoi{" "}
              <span className=" text-sm font-normal italic">
                (zhə-nə-ˌsā-ˈkwä)
              </span>
            </h2>

            <p className="text-sm">
              <span className="rounded-sm bg-primary-foreground p-1 text-primary">
                noun:
              </span>{" "}
              An indefinable, elusive quality or charm.
            </p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search by title, artist, or medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {query.isFetched &&
            filteredArtworks!.map((artwork) => (
              <div
                key={String(artwork._id ?? 0)}
                className="overflow-hidden rounded-md bg-white shadow-md"
              >
                <Image
                  src={"/placeholder.svg"}
                  alt={artwork.title}
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold">{artwork.title}</h3>
                  <p className="mb-2 text-gray-500">{artwork.artist_title}</p>
                  <p className="text-gray-500">{artwork.medium}</p>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
