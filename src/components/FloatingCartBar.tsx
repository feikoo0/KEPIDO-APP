'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartBar() {
  const pathname = usePathname();
  const [cartQty, setCartQty] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [isMultiStore, setIsMultiStore] = useState(false);
  const [mounted, setMounted] = useState(false);

  const updateCartData = () => {
    try {
      const cart = localStorage.getItem('rappi_jamay_cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        if (parsedCart && Array.isArray(parsedCart.items) && parsedCart.items.length > 0) {
          const totalQty = parsedCart.items.reduce((sum: number, item: any) => sum + (item.cantidad || 0), 0);
          const productsTotal = parsedCart.items.reduce((sum: number, item: any) => sum + (Number(item.precioTotalItem) || 0), 0);
          
          const isMulti = parsedCart.negocioId === 'multiple';
          setIsMultiStore(isMulti);
          setCartSubtotal(productsTotal);

          let shipping = 0;
          if (!isMulti) {
            const savedMethod = localStorage.getItem('rappi_jamay_metodo_entrega');
            if (savedMethod !== 'recoger') {
              shipping = parsedCart.negocioCostoEnvio || 0;
            }
          }

          setShippingCost(shipping);
          setCartQty(totalQty);
          setCartTotal(productsTotal + shipping);
        } else {
          setCartQty(0);
          setCartSubtotal(0);
          setShippingCost(0);
          setCartTotal(0);
          setIsMultiStore(false);
        }
      } else {
        setCartQty(0);
        setCartSubtotal(0);
        setShippingCost(0);
        setCartTotal(0);
        setIsMultiStore(false);
      }
    } catch (e) {
      console.error("Error reading localStorage in FloatingCartBar", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    updateCartData();

    window.addEventListener('cart-updated', updateCartData);
    window.addEventListener('storage', updateCartData);

    return () => {
      window.removeEventListener('cart-updated', updateCartData);
      window.removeEventListener('storage', updateCartData);
    };
  }, []);

  if (!mounted || cartQty === 0) return null;

  // Evolved state inside the Cart page: Return null since it has its own integrated bottom panel
  if (pathname === '/carrito') {
    return null;
  }

  // Standard state on Home / Menu / Favorites
  return (
    <div className="fixed bottom-22 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-sm bg-gradient-to-r from-[#FF6B00] to-[#ff8800] border border-[#ff8800]/20 py-1.5 pr-1.5 pl-3.5 rounded-full shadow-[0_8px_30px_rgba(255,107,0,0.25)] z-40 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-2 pl-0.5 text-white">
        <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
          <ShoppingBag size={16} className="text-white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-white/85 font-semibold leading-tight">
            {cartQty} {cartQty === 1 ? 'Producto' : 'Productos'}
          </span>
          <span className="text-[16px] font-extrabold text-white leading-none mt-0.5">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <Link 
        href="/carrito"
        className="bg-white hover:bg-slate-50 active:scale-[0.97] text-[#FF6B00] font-extrabold text-[12.5px] py-2 px-5 rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer"
      >
        Ir a pagar
      </Link>
    </div>
  );
}
