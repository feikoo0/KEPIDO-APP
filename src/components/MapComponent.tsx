'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Negocio } from '@/lib/types';
import Link from 'next/link';
import { Heart } from 'lucide-react';

// Fix Leaflet icon issue by using a custom glowing Emerald Pin SVG icon
const createCustomIcon = (nombre: string, isOpen: boolean) => {
  const initial = nombre.charAt(0);
  const colorClass = isOpen ? '#10b981' : '#ef4444'; // Emerald for open, Red for closed
  const pulseClass = isOpen ? 'animate-pulse' : '';

  const html = `
    <div class="relative w-10 h-10 flex items-center justify-center">
      <!-- Glow ring -->
      <div class="absolute inset-0 rounded-full bg-white shadow-lg border border-slate-200/50"></div>
      
      <!-- Colored indicator ring -->
      <div class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-md">
        <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${colorClass};"></div>
      </div>
      
      <!-- Initial letter -->
      <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-sm relative z-10 shadow-inner">
        ${initial}
      </div>
      
      <!-- Pin tip -->
      <div class="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-white drop-shadow-sm"></div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -42]
  });
};

interface MapComponentProps {
  businesses: Negocio[];
  checkOpen: (apertura: string, cierre: string) => boolean;
}

export default function MapComponent({ businesses, checkOpen }: MapComponentProps) {
  // Center of Jamay, Jalisco
  const position: [number, number] = [20.2885, -102.7105];

  // Stable key ensures map is created once per mount and doesn't recreate on re-renders (like typing in search bar),
  // but forces clean unmount/remount to prevent the "Map container is being reused" Leaflet error.
  const [mapKey] = React.useState(() => 'map-' + Math.random().toString(36).substring(2, 9));

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
      <MapContainer
        key={mapKey}
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[450px] z-10"
        zoomControl={false} // Clean UI: hide zoom controls or position them elsewhere
      >
        {/* Modern styled tile layer (Voyager style - clean, light cream map) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {businesses.map(negocio => {
          if (!negocio.latitud || !negocio.longitud) return null;
          
          const isOpen = checkOpen(negocio.horario_apertura, negocio.horario_cierre);
          const customIcon = createCustomIcon(negocio.nombre, isOpen);

          return (
            <Marker
              key={negocio.id}
              position={[negocio.latitud, negocio.longitud]}
              icon={customIcon}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 min-w-[200px] text-slate-800">
                  {/* Banner image if available */}
                  {negocio.portada_url && (
                    <div className="h-16 w-full rounded-lg overflow-hidden mb-2 bg-slate-100">
                      <img
                        src={negocio.portada_url}
                        alt={negocio.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Header info */}
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-gray-900 leading-tight">
                      {negocio.nombre}
                    </h4>
                    {negocio.rating && (
                      <div className="flex items-center gap-0.5 text-rose-500 text-xs font-bold shrink-0">
                        <Heart size={11} className="fill-rose-500 text-rose-500" />
                        <span>{negocio.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                    {negocio.direccion || negocio.categoria_principal}
                  </p>

                  {/* Open/Closed status */}
                  <div className="mt-2 flex items-center justify-between">
                    {isOpen ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Abierto
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        Cerrado
                      </span>
                    )}

                    <Link
                      href={`/${negocio.slug}`}
                      className="inline-flex items-center justify-center bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                    >
                      Ver Menú
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Embedded Leaflet popup stylings in CSS to override default styling */}
      <style jsx global>{`
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem !important;
          padding: 4px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
        }
        .custom-leaflet-popup .leaflet-popup-content {
          margin: 6px 8px !important;
        }
        .custom-leaflet-popup .leaflet-popup-tip-container {
          margin-top: -1px !important;
        }
      `}</style>
    </div>
  );
}
