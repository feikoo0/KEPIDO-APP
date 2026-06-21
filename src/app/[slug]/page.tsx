import React from 'react';
import { getNegocioCompleto } from '@/lib/supabase';
import BusinessMenuClient from '@/components/BusinessMenuClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getNegocioCompleto(slug);
  
  if (!data) {
    return {
      title: 'Negocio No Encontrado - Rappi Jamay',
      description: 'El negocio que buscas no existe o no está activo en Jamay.'
    };
  }

  return {
    title: `${data.negocio.nombre} - Menú Digital en Jamay`,
    description: `Ordena directo al WhatsApp de ${data.negocio.nombre} en Jamay. Explora ${data.negocio.categoria_principal}, personaliza tu pedido y recíbelo por delivery o pasa a recoger.`
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getNegocioCompleto(slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-5 max-w-md mx-auto shadow-xl border-x border-gray-150 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <InfoIcon size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Negocio No Encontrado</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
          El local "{slug}" no está disponible o no existe en Jamay.
        </p>
        <Link 
          href="/" 
          className="mt-6 bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Volver al Directorio</span>
        </Link>
      </div>
    );
  }

  return (
    <BusinessMenuClient 
      negocio={data.negocio} 
      categorias={data.categorias} 
    />
  );
}

// Simple fallback helper icon
function InfoIcon({ size }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}
