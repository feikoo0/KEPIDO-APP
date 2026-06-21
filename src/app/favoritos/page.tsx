'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getNegocios } from '@/lib/supabase';
import { Negocio, CartState } from '@/lib/types';
import { checkOpen } from '@/lib/timeUtils';
import { Star, Heart, Timer, HeartOff, MapPin, ChevronDown, Search, ShoppingCart } from 'lucide-react';
import { getApprovalPercent } from '@/components/QuickReview';
import AddressModal from '@/components/AddressModal';

// Delivery Moto Icon
const DeliveryMotoIcon = ({ className = '', size = 15.5 }: { className?: string; size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M6 18h12" />
    <path d="M8 18l1-5h7l1 5" />
    <path d="M10 13l1-7h2.5" />
    <path d="M12.5 6h2" />
    <rect x="4" y="9" width="4.5" height="4.5" rx="0.5" />
  </svg>
);

export default function FavoritosPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientAddress, setClientAddress] = useState('Calle Libertad #100, Centro, Jamay');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [cart, setCart] = useState<CartState>({ negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] });

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('rappi_jamay_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart({ negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('client_address');
    if (savedAddress) {
      setClientAddress(savedAddress);
    }
    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  const handleChangeAddress = (newAddr: string) => {
    setClientAddress(newAddr);
    localStorage.setItem('client_address', newAddr);
  };



  const loadData = async () => {
    try {
      const allNegocios = await getNegocios();
      setNegocios(allNegocios);

      const savedFavs = localStorage.getItem('kepido_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Error loading favorites data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    
    setFavorites(updated);
    localStorage.setItem('kepido_favorites', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favorites-updated'));
  };

  const favoritedNegocios = negocios.filter(n => favorites.includes(n.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100 pb-28">
      {/* Top Header */}
      <header className="bg-[#1947c7] sticky top-0 z-30 px-5 pt-5 pb-3 space-y-3">
        {/* Row 1: Logo, Address Selector & Cart Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <img 
                src="/KEPIDO LOGO BLANCO.webp" 
                alt="Kepido Logo" 
                className="h-[38px] w-auto object-contain flex-shrink-0 cursor-pointer"
              />
            </Link>
            
            {/* Client Address Selector (Compact, Premium design on Orange) */}
            <div 
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-1.5 text-white cursor-pointer group bg-white/15 border border-white/10 hover:bg-white/20 rounded-lg py-1 px-2.5 transition-all min-w-0 max-w-[145px] sm:max-w-[200px]"
            >
              <MapPin size={13} className="text-white flex-shrink-0" />
              <span className="text-[12.5px] font-bold text-white group-hover:text-white/95 transition-colors truncate">
                {clientAddress}
              </span>
              <ChevronDown size={11} className="text-white/80 flex-shrink-0" />
            </div>
          </div>
          
          {/* Cart Icon trigger */}
          {cart.items.length > 0 && (
            <Link 
              href="/carrito"
              className="relative p-2 bg-white/15 text-white border border-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Ver carrito"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse-slow">
                {cart.items.reduce((sum, item) => sum + item.cantidad, 0)}
              </span>
            </Link>
          )}
        </div>

        {/* Row 4: Big Search Input */}
        <div className="relative flex items-center bg-white border border-white/25 rounded-xl overflow-hidden px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-black/10 transition-all shadow-xs">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text"
            placeholder="¿Qué se te antoja hoy?"
            onFocus={() => {
              router.push('/?focus=true');
            }}
            onChange={(e) => {
              router.push(`/?search=${encodeURIComponent(e.target.value)}&focus=true`);
            }}
            className="w-full text-[12px] text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-6 px-5 pt-6 relative flex flex-col">
        {/* Top Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#1947c7] to-slate-50 pointer-events-none -z-0" />

        <div className="relative z-10 flex-1 flex flex-col">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-t-[#1947c7] border-slate-200 rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500 font-semibold">Cargando favoritos...</span>
            </div>
          ) : favoritedNegocios.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500 animate-pulse">
                <HeartOff size={44} />
              </div>
              <h2 className="text-title-3 text-gray-800 mb-2">No tienes favoritos aún</h2>
              <p className="text-sm text-gray-500 max-w-xs mb-8">
                Guarda tus restaurantes y negocios favoritos para acceder a ellos rápidamente cuando tengas hambre.
              </p>
              <Link 
                href="/"
                className="bg-gradient-to-tr from-[#1947c7] to-[#2563eb] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                Explorar Negocios
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-title-3 text-gray-800">
                Mis Negocios Guardados ({favoritedNegocios.length})
              </h2>
              <div className="grid grid-cols-1 gap-5">
                {favoritedNegocios.map((negocio) => {
                  const isOpen = checkOpen(negocio.horario_apertura, negocio.horario_cierre, negocio.slug);
                  const approval = getApprovalPercent(negocio.id);
                  
                  return (
                    <Link 
                      href={`/${negocio.slug}`}
                      key={negocio.id}
                      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col gap-3 relative transition-all active:scale-[0.99] ${
                        !isOpen ? 'opacity-60 grayscale-[10%]' : ''
                      }`}
                    >
                      {/* Cover Photo */}
                      <div className="relative h-40 w-full bg-slate-100">
                        {negocio.portada_url && (
                          <img 
                            src={negocio.portada_url} 
                            alt={negocio.nombre} 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Rating Pill */}
                        <div className="absolute top-3 left-3 bg-white text-gray-900 text-[12px] font-bold h-7 px-2.5 rounded-full shadow-md flex items-center gap-1 z-10">
                          <Star size={11.5} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                          <span className="leading-none">{(negocio.rating || 5.0).toFixed(1)}</span>
                          {approval && (
                            <span className="text-gray-400 font-normal text-[10px] leading-none">({approval.total})</span>
                          )}
                        </div>
                        
                        {/* Status Badge */}
                        <span className={`absolute top-3 right-12 text-[10px] font-bold uppercase px-3 h-7 flex items-center justify-center rounded-full shadow-md tracking-wider z-10 ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          {isOpen ? 'Abierto' : 'Cerrado'}
                        </span>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => handleToggleFavorite(negocio.id, e)}
                          className="absolute top-3 right-3 w-7 h-7 bg-white hover:bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-md z-10 transition-colors active:scale-90"
                        >
                          <Heart size={14} className="fill-rose-500 text-rose-500" />
                        </button>
                      </div>
                      
                      {/* Info */}
                      <div className="px-4 pb-4 flex items-center gap-3">
                        {negocio.logo_url && (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-150 flex-shrink-0 bg-slate-50 flex items-center justify-center shadow-sm">
                            <img 
                              src={negocio.logo_url} 
                              alt={`${negocio.nombre} Logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <h4 className="font-semibold text-gray-900 leading-tight text-[16px] truncate">
                            {negocio.nombre}
                          </h4>
                          <div className="flex items-center text-[12px] font-semibold gap-2">
                            <div className="flex items-center gap-1.5">
                              <DeliveryMotoIcon className="text-emerald-600" size={14} />
                              <span className={negocio.costo_envio === 0 ? 'text-emerald-600' : 'text-gray-500'}>
                                {negocio.costo_envio === 0 ? 'Envío gratis' : `Envío por $${negocio.costo_envio}`}
                              </span>
                            </div>
                            <span className="text-gray-300 font-normal">|</span>
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Timer size={13} className="text-gray-400" />
                              <span className="text-gray-500">{negocio.tiempo_delivery || '25-35 min'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Address Selection Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentAddress={clientAddress}
        onChangeAddress={handleChangeAddress}
      />
    </div>
  );
}
