import { client } from "../sanity/client";

// 1. Define the Vehicle Interface to satisfy TypeScript
export interface Vehicle {
  _id: string;
  name: string;
  category: 'EV' | 'SUV' | 'Sedan';
  modelUrl: string;
  imageUrl: string;
  transparentPngUrl?: string;
  tagline?: string;
  specs: {
    range: string;
    acceleration: string;
    topSpeed: string;
    battery?: string;
  };
}

export const cmsApi = {
  // Fetch Vehicles
  getVehicles: async (): Promise<Vehicle[]> => {
    const query = `*[_type == "vehicle"]{
      _id,
      name,
      category,
      tagline,
      specs,
      "modelUrl": modelFile.asset->url,
      "imageUrl": mainImage.asset->url,
      "transparentPngUrl": transparentPng.asset->url
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  },

  // Fetch News
  getNews: async () => {
    const query = `*[_type == "news"] | order(publishedAt desc){
      _id,
      title,
      "imageUrl": image.asset->url,
      publishedAt,
      content
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  },

  // Fetch Events
  getEvents: async () => {
    const query = `*[_type == "event"] | order(date asc){
      _id,
      title,
      date,
      location,
      "imageUrl": image.asset->url
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  }
};