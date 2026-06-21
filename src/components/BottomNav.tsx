'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Check if current path matches to show/hide BottomNav
  const showNav = true; // Show on all pages, including business detail pages

  const updateCounts = () => {
    try {
      // Favorites count
      const favs = localStorage.getItem('kepido_favorites');
      if (favs) {
        const parsedFavs = JSON.parse(favs);
        setFavoritesCount(Array.isArray(parsedFavs) ? parsedFavs.length : 0);
      } else {
        setFavoritesCount(0);
      }

      // Cart count
      const cart = localStorage.getItem('rappi_jamay_cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        if (parsedCart && Array.isArray(parsedCart.items)) {
          const totalQty = parsedCart.items.reduce((sum: number, item: any) => sum + (item.cantidad || 0), 0);
          setCartCount(totalQty);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    updateCounts();

    // Listen to custom events for live updates in single page app transitions
    window.addEventListener('cart-updated', updateCounts);
    window.addEventListener('favorites-updated', updateCounts);
    // Listen to storage events to keep counts in sync across tabs if needed
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('cart-updated', updateCounts);
      window.removeEventListener('favorites-updated', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  if (!mounted || !showNav) return null;

  const tabs = [
    {
      name: 'Inicio',
      path: '/',
      icon: Home,
    },
    {
      name: 'Favoritos',
      path: '/favoritos',
      icon: Heart,
      badge: favoritesCount,
    },
    {
      name: 'Carrito',
      path: '/carrito',
      icon: ShoppingCart,
      badge: cartCount,
    },
    {
      name: 'Perfil',
      path: '/perfil',
      icon: User,
    },
  ];

  const isSecondaryTab = pathname === '/favoritos' || pathname === '/carrito' || pathname === '/perfil';
  const activeIndex = isSecondaryTab 
    ? tabs.findIndex(tab => pathname === tab.path)
    : 0; // Default to Home (Index 0) on home page and business detail pages

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-sm bg-white/75 backdrop-blur-md border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.12),0_5px_15px_rgba(0,0,0,0.06)] rounded-full p-1.5 z-50">
      {/* Inner border gradient: gray to transparent */}
      <div 
        className="absolute inset-0 rounded-full border-[1.5px] border-slate-300/40 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
      />
      <div className="relative flex items-center justify-between h-12 px-1">
        {/* Sliding background indicator pill */}
        {activeIndex !== -1 && (
          <div 
            className="absolute h-12 rounded-full transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] -z-0 bg-gradient-to-tr from-[#FF6B00] to-[#ff8800] shadow-md shadow-orange-500/20"
            style={{
              width: '24%',
              left: `${activeIndex * 24.8 + 0.6}%`,
            }}
          />
        )}

        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeIndex === idx;
          const isCartWithItems = tab.name === 'Carrito' && tab.badge !== undefined && tab.badge > 0;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="relative z-10 flex items-center justify-center w-[23%] h-full transition-transform duration-200 active:scale-90"
              aria-label={tab.name}
            >
              <div className="relative p-2.5 flex items-center justify-center">
                <Icon
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isActive
                      ? 'text-white stroke-[2.5]'
                      : isCartWithItems
                        ? 'text-[#FF6B00] stroke-[2.2]'
                        : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  isActive ? (
                    <span className="absolute -top-1 -right-1.5 text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#FF6B00] bg-white text-[#FF6B00] transition-all duration-300">
                      {tab.badge}
                    </span>
                  ) : (
                    // Inactive: tiny minimal dot (non-invasive indicator)
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF6B00] border-2 border-white rounded-full transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" />
                  )
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
