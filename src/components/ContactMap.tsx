
import { useEffect, useRef, useState } from "react";

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  // Handle map initialization
  useEffect(() => {
    if (mapRef.current && apiKey) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = function() {
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 19.0760, lng: 72.8777 }, // Mumbai coordinates
          zoom: 14,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        });

        const marker = new google.maps.Marker({
          position: { lat: 19.0760, lng: 72.8777 },
          map: map,
          title: "SuperBikes Showroom"
        });

        setMapLoaded(true);
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    }
  }, [apiKey, mapRef]);

  // Handle API key input
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("map-api-key") as HTMLInputElement;
    if (input.value) {
      setApiKey(input.value);
      localStorage.setItem("map_api_key", input.value);
    }
  };

  // Check for saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("map_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  if (apiKey) {
    return (
      <div className="w-full h-full min-h-[300px]">
        <div 
          ref={mapRef} 
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-muted/30">
      <p className="mb-4 text-muted-foreground">Enter your Google Maps API Key</p>
      <form onSubmit={handleApiKeySubmit} className="w-full max-w-sm flex gap-2">
        <Input 
          id="map-api-key" 
          type="text" 
          placeholder="Enter Google Maps API Key"
          className="flex-grow"
        />
        <Button type="submit">Load Map</Button>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">
        Your key will be saved in local storage for convenience.
      </p>
    </div>
  );
}

// Add type declaration for the global Google Maps callback
declare global {
  interface Window {
    initMap: () => void;
  }
}
