'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Wrench, Sparkles, ChevronRight, MapPin, ChevronDown, Search, ShoppingCart, Shield } from 'lucide-react';
import AddressModal from '@/components/AddressModal';
import { CartState } from '@/lib/types';

export default function PerfilPage() {
  const router = useRouter();
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100 pb-28">
      {/* Top Header */}
      <header className="bg-[#1947c7] sticky top-0 z-30 px-5 pt-5 pb-3 space-y-3">
        {/* Row 1: Logo, Address Selector & Cart Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <img 
                src="/KEPIDO LOGO BLANCO.png" 
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative">
        {/* Top Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#1947c7] to-slate-50 pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Animated Construction Visual */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6B00] relative z-10 animate-bounce">
              <Wrench size={40} className="transform -rotate-45" />
            </div>
            {/* Decorative Sparkles */}
            <div className="absolute -top-2 -right-2 text-amber-500 animate-pulse">
              <Sparkles size={20} />
            </div>
            <div className="absolute -bottom-2 -left-2 text-[#1947c7] animate-pulse delay-75">
              <Sparkles size={16} />
            </div>
            {/* Subtle Ring Glow */}
            <div className="absolute inset-0 bg-[#FF6B00]/10 rounded-full scale-125 blur-md -z-0"></div>
          </div>

          <h2 className="text-title-2 text-gray-800 mb-3">
            ¡Sección en Construcción!
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
            Estamos cocinando cosas increíbles para ti. Pronto podrás registrarte, guardar tus direcciones y ver tu historial de pedidos aquí.
          </p>

          {/* Action Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-tr from-[#1947c7] to-[#2563eb] text-white text-sm font-bold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Regresar a Inicio</span>
            <ChevronRight size={16} />
          </Link>

          {/* Legal Links */}
          <Link 
            href="/legal"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#1947c7] transition-colors cursor-pointer"
          >
            <Shield size={12} />
            <span>Términos y Aviso de Privacidad</span>
          </Link>
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
