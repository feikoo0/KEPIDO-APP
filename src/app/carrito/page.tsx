'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartState, CartItem, Negocio } from '@/lib/types';
import { getNegocios } from '@/lib/supabase';
import { Trash2, ShoppingBag, AlertTriangle, FileText, ChevronRight, MapPin, ChevronDown, Search, ShoppingCart, Store, Truck, X, CheckCircle, MessageSquare } from 'lucide-react';
import AddressModal from '@/components/AddressModal';

const MANDADITOS_WHATSAPP = '523921009557'; // Central Mandaditos dispatcher for Jamay

export default function CarritoPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartState>({
    negocioId: null,
    negocioNombre: null,
    negocioWhatsapp: null,
    negocioNotasEnvio: null,
    negocioCostoEnvio: null,
    items: []
  });
  const [mounted, setMounted] = useState(false);
  const [clienteDireccion, setClienteDireccion] = useState('');
  const metodoEntrega = 'domicilio';
  const [formError, setFormError] = useState<string | null>(null);
  const [clientAddress, setClientAddress] = useState('Calle Libertad #100, Centro, Jamay');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [allNegocios, setAllNegocios] = useState<Negocio[]>([]);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [splitStep, setSplitStep] = useState<'selection' | 'sending'>('selection');
  const [sentBusinesses, setSentBusinesses] = useState<string[]>([]);
  const [sentMandaditos, setSentMandaditos] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const contentEl = el.firstElementChild as HTMLElement;

    const checkScrollability = () => {
      const scrollable = el.scrollHeight > el.clientHeight + 10;
      setIsScrollable(scrollable);
      setShowScrollIndicator(scrollable && el.scrollTop < 10);
    };

    checkScrollability();

    const observer = new ResizeObserver(() => {
      checkScrollability();
    });

    observer.observe(el);
    if (contentEl) {
      observer.observe(contentEl);
    }

    window.addEventListener('resize', checkScrollability);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScrollability);
    };
  }, [cart, mounted]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop > 15) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(el.scrollHeight > el.clientHeight + 10);
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('rappi_jamay_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const savedAddress = localStorage.getItem('client_address');
    if (savedAddress) {
      setClienteDireccion(savedAddress);
      setClientAddress(savedAddress);
    } else {
      setClienteDireccion('Calle Libertad #100, Centro, Jamay');
      setClientAddress('Calle Libertad #100, Centro, Jamay');
    }

    async function loadNegocios() {
      try {
        const data = await getNegocios();
        setAllNegocios(data);
      } catch (err) {
        console.error('Error loading negocios:', err);
      }
    }
    loadNegocios();
  }, []);

  const totalEnProductos = cart.items.reduce((sum, item) => sum + Number(item.precioTotalItem), 0);

  useEffect(() => {
    const handleOrderSubmit = () => {
      handleCheckoutProceed();
    };
    window.addEventListener('submit-order', handleOrderSubmit);
    return () => {
      window.removeEventListener('submit-order', handleOrderSubmit);
    };
  }, [clienteDireccion, cart, totalEnProductos, allNegocios]);

  const businessesInCart = React.useMemo(() => {
    const ids = Array.from(new Set(cart.items.map(item => item.producto.negocio_id).filter(Boolean)));
    return allNegocios.filter(n => ids.includes(n.id));
  }, [cart.items, allNegocios]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl border-x border-gray-100 items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-[#1947c7] border-slate-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleChangeAddress = (newAddr: string) => {
    setClientAddress(newAddr);
    setClienteDireccion(newAddr);
    localStorage.setItem('client_address', newAddr);
  };

  const updateQuantity = (idx: number, newQty: number) => {
    const newItems = [...cart.items];
    const item = { ...newItems[idx] };
    const singlePrice = Number(item.precioTotalItem) / item.cantidad;
    
    item.cantidad = newQty;
    item.precioTotalItem = singlePrice * newQty;
    newItems[idx] = item;
    
    const updated = { ...cart, items: newItems };
    setCart(updated);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const updateItemNotes = (idx: number, notas: string) => {
    const newItems = [...cart.items];
    newItems[idx] = { ...newItems[idx], notas };
    
    const updated = { ...cart, items: newItems };
    setCart(updated);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
  };

  const removeItem = (idx: number) => {
    const newItems = cart.items.filter((_, i) => i !== idx);
    let updated: CartState;
    
    if (newItems.length === 0) {
      updated = {
        negocioId: null,
        negocioNombre: null,
        negocioWhatsapp: null,
        negocioNotasEnvio: null,
        negocioCostoEnvio: null,
        items: []
      };
      localStorage.removeItem('rappi_jamay_cart');
    } else {
      updated = { ...cart, items: newItems };
      localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
    }
    
    setCart(updated);
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const clearCart = () => {
    localStorage.removeItem('rappi_jamay_cart');
    setCart({
      negocioId: null,
      negocioNombre: null,
      negocioWhatsapp: null,
      negocioNotasEnvio: null,
      negocioCostoEnvio: null,
      items: []
    });
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const sanitizePhoneNumber = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  function buildOrderMessage(targetLabel: string, isPickup: boolean = false) {
    const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━';
    const uniqueBusinesses = new Set(cart.items.map(item => item.producto.negocio_id).filter(Boolean));
    const isMultiStoreOrder = uniqueBusinesses.size > 1;

    // Get client name if saved in localStorage
    const savedName = typeof window !== 'undefined' ? localStorage.getItem('client_name') : '';

    let message = isMultiStoreOrder
      ? `🛍️ *NUEVO PEDIDO MULTI-TIENDA — KEPIDO APP* 🛍️\n`
      : `📋 *NUEVO PEDIDO — KEPIDO APP* 🛍️\n`;
    
    message += `${separator}\n\n`;

    message += `📍 *DATOS DE ENTREGA:*\n`;
    if (savedName && savedName.trim()) {
      message += `• *Cliente:* ${savedName.trim()}\n`;
    }
    message += `• *Dirección:* ${clienteDireccion.trim()}\n\n`;
    
    message += `${separator}\n\n`;

    message += `🛒 *DETALLE DE PRODUCTOS:*\n\n`;

    const itemsByBusiness: { [bizName: string]: CartItem[] } = {};
    cart.items.forEach(item => {
      const bizName = item.producto.negocio_nombre || cart.negocioNombre || 'Local';
      if (!itemsByBusiness[bizName]) itemsByBusiness[bizName] = [];
      itemsByBusiness[bizName].push(item);
    });

    Object.entries(itemsByBusiness).forEach(([bizName, items]) => {
      message += `*📍 Local: ${bizName.toUpperCase()}*\n`;
      items.forEach(item => {
        message += `• *${item.cantidad}x ${item.producto.nombre}* ($${Number(item.precioTotalItem).toFixed(2)})\n`;
        const optionsList = Object.values(item.opcionesSeleccionadas).flat();
        optionsList.forEach(opt => {
          if (Number(opt.precio_adicional) > 0) {
            message += `   ↳ ${opt.nombre} (+$${Number(opt.precio_adicional).toFixed(2)})\n`;
          } else {
            message += `   ↳ ${opt.nombre}\n`;
          }
        });
        if (item.notas && item.notas.trim()) {
          message += `   💬 _Notas: "${item.notas.trim()}"_\n`;
        }
      });
      message += `\n`;
    });

    message += `${separator}\n\n`;
    message += `💰 *RESUMEN DE PAGO:*\n`;
    message += `• *Subtotal:* $${totalEnProductos.toFixed(2)}\n`;

    if (isMultiStoreOrder) {
      message += `• *Envío:* A cotizar por Mandaditos (Múltiples tiendas)\n`;
      message += `• *Total General:* *$${totalEnProductos.toFixed(2)} + costo de envío*\n\n`;
    } else {
      const business = businessesInCart[0];
      const hasDeliveryPropio = business?.delivery_propio;
      const costoEnvio = isPickup ? 0 : (business !== undefined && business.costo_envio !== undefined ? business.costo_envio : (cart.negocioCostoEnvio || 0));
      const totalGeneral = totalEnProductos + costoEnvio;

      if (isPickup) {
        message += `• *Envío:* Gratis (Retiro en tienda / Pasa a recoger 🛍️)\n`;
      } else if (hasDeliveryPropio) {
        message += `• *Envío:* ${costoEnvio === 0 ? 'Gratis (Servicio propio del negocio 🛵)' : `$${costoEnvio.toFixed(2)} (Servicio propio del negocio 🛵)`}\n`;
      } else {
        message += `• *Envío:* ${costoEnvio === 0 ? 'Gratis (Servicio de Mandaditos 🛵)' : `$${costoEnvio.toFixed(2)} (Servicio de Mandaditos 🛵)`}\n`;
      }
      message += `• *Total General:* *$${totalGeneral.toFixed(2)}*\n\n`;
    }

    message += `${separator}\n`;
    message += `_*${targetLabel.trim()}*_`;
    return message;
  }

  function buildBusinessDirectMessage(negocio: Negocio, businessItems: CartItem[]) {
    const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━';
    const savedName = typeof window !== 'undefined' ? localStorage.getItem('client_name') : '';

    let message = `📋 *NUEVO PEDIDO DIRECTO — KEPIDO APP* 🛍️\n`;
    message += `${separator}\n\n`;

    message += `📍 *DATOS DE ENTREGA:*\n`;
    if (savedName && savedName.trim()) {
      message += `• *Cliente:* ${savedName.trim()}\n`;
    }
    message += `• *Dirección:* ${clienteDireccion.trim()}\n\n`;

    message += `${separator}\n\n`;

    message += `🛒 *DETALLE DE PRODUCTOS (${negocio.nombre.toUpperCase()}):*\n\n`;
    businessItems.forEach(item => {
      message += `• *${item.cantidad}x ${item.producto.nombre}* ($${Number(item.precioTotalItem).toFixed(2)})\n`;
      const optionsList = Object.values(item.opcionesSeleccionadas).flat();
      optionsList.forEach(opt => {
        if (Number(opt.precio_adicional) > 0) {
          message += `   ↳ ${opt.nombre} (+$${Number(opt.precio_adicional).toFixed(2)})\n`;
        } else {
          message += `   ↳ ${opt.nombre}\n`;
        }
      });
      if (item.notas && item.notas.trim()) {
        message += `   💬 _Notas: "${item.notas.trim()}"_\n`;
      }
    });

    const totalProductos = businessItems.reduce((sum, item) => sum + Number(item.precioTotalItem), 0);
    const costoEnvio = negocio.costo_envio || 0;
    const totalGeneral = totalProductos + costoEnvio;

    message += `\n${separator}\n\n`;
    message += `💰 *RESUMEN DE PAGO:*\n`;
    message += `• *Subtotal:* $${totalProductos.toFixed(2)}\n`;
    
    if (negocio.delivery_propio) {
      message += `• *Envío:* ${costoEnvio === 0 ? 'Gratis (Servicio propio del negocio 🛵)' : `$${costoEnvio.toFixed(2)} (Servicio propio del negocio 🛵)`}\n`;
    } else {
      message += `• *Envío:* ${costoEnvio === 0 ? 'Gratis (Servicio de Mandaditos 🛵)' : `$${costoEnvio.toFixed(2)} (Servicio de Mandaditos 🛵)`}\n`;
    }
    
    message += `• *Total General:* *$${totalGeneral.toFixed(2)}*\n\n`;

    message += `${separator}\n`;
    message += `_Pedido directo al negocio vía KEPIDO App_`;
    return message;
  }

  function buildMandaditosRemainingMessage(remainingItems: CartItem[]) {
    const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━';
    const savedName = typeof window !== 'undefined' ? localStorage.getItem('client_name') : '';

    let message = `🛍️ *NUEVO PEDIDO (VÍA MANDADITOS) — KEPIDO APP* 🛍️\n`;
    message += `${separator}\n\n`;

    message += `📍 *DATOS DE ENTREGA:*\n`;
    if (savedName && savedName.trim()) {
      message += `• *Cliente:* ${savedName.trim()}\n`;
    }
    message += `• *Dirección:* ${clienteDireccion.trim()}\n\n`;

    message += `${separator}\n\n`;

    message += `🛒 *DETALLE DE PRODUCTOS:*\n\n`;
    const itemsByBusiness: { [bizName: string]: CartItem[] } = {};
    remainingItems.forEach(item => {
      const bizName = item.producto.negocio_nombre || 'Local';
      if (!itemsByBusiness[bizName]) itemsByBusiness[bizName] = [];
      itemsByBusiness[bizName].push(item);
    });

    Object.entries(itemsByBusiness).forEach(([bizName, items]) => {
      message += `*📍 Local: ${bizName.toUpperCase()}*\n`;
      items.forEach(item => {
        message += `• *${item.cantidad}x ${item.producto.nombre}* ($${Number(item.precioTotalItem).toFixed(2)})\n`;
        const optionsList = Object.values(item.opcionesSeleccionadas).flat();
        optionsList.forEach(opt => {
          if (Number(opt.precio_adicional) > 0) {
            message += `   ↳ ${opt.nombre} (+$${Number(opt.precio_adicional).toFixed(2)})\n`;
          } else {
            message += `   ↳ ${opt.nombre}\n`;
          }
        });
        if (item.notas && item.notas.trim()) {
          message += `   💬 _Notas: "${item.notas.trim()}"_\n`;
        }
      });
      message += `\n`;
    });

    const totalProductos = remainingItems.reduce((sum, item) => sum + Number(item.precioTotalItem), 0);

    message += `${separator}\n\n`;
    message += `💰 *RESUMEN DE PAGO:*\n`;
    message += `• *Subtotal:* $${totalProductos.toFixed(2)}\n`;
    message += `• *Envío:* A cotizar por Mandaditos (Múltiples tiendas)\n`;
    message += `• *Total General:* *$${totalProductos.toFixed(2)} + costo de envío*\n\n`;

    message += `${separator}\n`;
    message += `_Pedido enviado a Servicio Mandaditos vía KEPIDO App_`;
    return message;
  }

  function handleSendToNegocio(isPickup: boolean = false) {
    if (!clienteDireccion.trim() || clienteDireccion === 'Ingresa tu dirección...') {
      setFormError('Por favor, selecciona una dirección para la entrega.');
      setIsAddressModalOpen(true);
      return;
    }
    setFormError(null);
    localStorage.setItem('client_address', clienteDireccion.trim());
    const label = isPickup 
      ? 'Pedido para recoger — Cliente pasa a local' 
      : 'Pedido vía KEPIDO App — Domicilio del negocio';
    const msg = buildOrderMessage(label, isPickup);
    const phone = sanitizePhoneNumber(cart.negocioWhatsapp || '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleSendOrder() {
    if (!clienteDireccion.trim() || clienteDireccion === 'Ingresa tu dirección...') {
      setFormError('Por favor, selecciona una dirección para la entrega.');
      setIsAddressModalOpen(true);
      return;
    }
    setFormError(null);
    localStorage.setItem('client_address', clienteDireccion.trim());
    const msg = buildOrderMessage('Pedido vía KEPIDO App — Enviado a Servicio Mandaditos');
    const phone = sanitizePhoneNumber(MANDADITOS_WHATSAPP);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleCheckoutProceed() {
    if (!clienteDireccion.trim() || clienteDireccion === 'Ingresa tu dirección...') {
      setFormError('Por favor, selecciona una dirección para la entrega.');
      setIsAddressModalOpen(true);
      return;
    }
    setFormError(null);
    localStorage.setItem('client_address', clienteDireccion.trim());

    // Check if multi-store AND contains any business with own delivery
    const uniqueBusinesses = Array.from(new Set(cart.items.map(item => item.producto.negocio_id).filter(Boolean)));
    const isMultiStoreOrder = uniqueBusinesses.length > 1;
    
    // Find if any business in the cart has delivery_propio
    const ownDeliveryBizs = businessesInCart.filter(n => n.delivery_propio);

    if (isMultiStoreOrder && ownDeliveryBizs.length > 0) {
      // Open split order modal!
      setIsSplitModalOpen(true);
      setSplitStep('selection');
      setSentBusinesses([]);
      setSentMandaditos(false);
    } else {
      // Normal flow: send consolidated to Mandaditos
      const msg = buildOrderMessage('Pedido vía KEPIDO App — Enviado a Servicio Mandaditos');
      const phone = sanitizePhoneNumber(MANDADITOS_WHATSAPP);
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100 overflow-hidden">
      {/* Top Header */}
      <header className="bg-[#1947c7] sticky top-0 z-30 px-5 pt-5 pb-3 space-y-3 flex-shrink-0">
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
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-[#1947c7] to-slate-50 pointer-events-none -z-0" />

        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl m-5 border border-gray-100 shadow-xs">
              <div className="w-16 h-16 bg-slate-50 text-gray-400 border border-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="stroke-[1.5]" />
              </div>
              <h3 className="text-[17px] font-bold text-gray-800">Tu carrito está vacío</h3>
              <p className="text-xs text-gray-400 mt-1.5 max-w-xs leading-relaxed">
                Explora los negocios locales y arma tu pedido personalizado.
              </p>
              <Link 
                href="/"
                className="mt-6 bg-[#1947c7] hover:bg-[#1947c7]/95 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Ver Locales
              </Link>
            </div>
          ) : (
            <>
              <div className="px-5 pt-4 pb-2.5 flex items-center justify-between flex-shrink-0 z-10">
                <h2 className="text-[20px] font-black text-white tracking-tight">
                  Tu Carrito
                </h2>
                <button 
                  type="button"
                  onClick={clearCart}
                  className="text-[11.5px] font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-white/12 border border-white/10 hover:bg-white/18 rounded-xl px-3 py-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Trash2 size={13} className="text-white/80" />
                  Vaciar carrito
                </button>
              </div>
              {/* Items Area Wrapper */}
              <div className="flex-1 relative overflow-hidden flex flex-col">
                {/* Scrollable container */}
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-5 pb-6 bg-slate-50 no-scrollbar"
                >
                  {/* Single child wrapper for ResizeObserver */}
                  <div className="space-y-5">
                    {/* Product list grouped by business */}
                    <div className="space-y-5">
                      {(() => {
                        const groupedItems: { [bizName: string]: { item: CartItem; originalIndex: number }[] } = {};
                        cart.items.forEach((item, idx) => {
                          const bizName = item.producto.negocio_nombre || cart.negocioNombre || 'Local';
                          if (!groupedItems[bizName]) {
                            groupedItems[bizName] = [];
                          }
                          groupedItems[bizName].push({ item, originalIndex: idx });
                        });

                        return Object.entries(groupedItems).map(([bizName, items]) => (
                          <div key={bizName} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-4">
                            {/* Business Group Header */}
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                                {bizName}
                              </span>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-slate-100">
                              {items.map(({ item, originalIndex }) => (
                                <div key={originalIndex} className="py-4 first:pt-1 last:pb-1 flex items-start gap-4">
                                  {/* Left: Product Image */}
                                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                                    {item.producto.imagen_url ? (
                                      <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                      <ShoppingBag size={20} className="text-gray-300 stroke-[1.5]" />
                                    )}
                                  </div>

                                  {/* Middle: Details & Counter */}
                                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full min-h-[64px]">
                                    <div className="space-y-0.5">
                                      <h5 className="font-bold text-slate-800 text-[14.5px] leading-tight truncate">
                                        {item.producto.nombre}
                                      </h5>
                                      
                                      {Object.values(item.opcionesSeleccionadas).flat().length > 0 ? (
                                        <div className="space-y-0.5">
                                          {Object.values(item.opcionesSeleccionadas).flat().map((opt, optIdx) => (
                                            <p key={optIdx} className="text-[11px] text-slate-400 font-medium truncate">
                                              + {opt.nombre} {opt.precio_adicional > 0 ? `(+$${Number(opt.precio_adicional).toFixed(2)})` : ''}
                                            </p>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-[11px] text-slate-400 truncate leading-normal">
                                          {item.producto.descripcion || 'Sin descripción'}
                                        </p>
                                      )}
                                    </div>

                                    {/* Item Notes */}
                                    <div className="mt-2.5 flex items-center gap-1.5 bg-slate-50 border border-slate-150/60 rounded-lg px-2.5 py-1 max-w-[210px]">
                                      <FileText size={10} className="text-slate-400 flex-shrink-0" />
                                      <input 
                                        type="text"
                                        placeholder="Notas: sin cebolla..."
                                        value={item.notas || ''}
                                        onChange={(e) => updateItemNotes(originalIndex, e.target.value)}
                                        className="flex-1 text-[10.5px] text-slate-650 bg-transparent focus:outline-none border-none p-0 focus:ring-0 placeholder:text-slate-400 truncate"
                                      />
                                    </div>

                                    {/* Counter */}
                                    <div className="flex items-center gap-2.5 mt-2.5">
                                      <div className="flex items-center bg-slate-50 border border-slate-150 rounded-full p-0.5 gap-1 shadow-xs">
                                        <button
                                          type="button"
                                          onClick={() => item.cantidad > 1 ? updateQuantity(originalIndex, item.cantidad - 1) : removeItem(originalIndex)}
                                          className="w-6.5 h-6.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-red-500 flex items-center justify-center transition-all border border-slate-200/50 focus:outline-none active:scale-95 cursor-pointer text-xs font-bold"
                                          aria-label="Disminuir cantidad"
                                        >
                                          -
                                        </button>
                                        <span className="px-1.5 font-bold text-slate-800 text-[13px] min-w-[15px] text-center">
                                          {item.cantidad}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => updateQuantity(originalIndex, item.cantidad + 1)}
                                          className="w-6.5 h-6.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all border border-slate-200/50 focus:outline-none active:scale-95 cursor-pointer text-xs font-bold"
                                          aria-label="Aumentar cantidad"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Price & Delete */}
                                  <div className="flex flex-col items-end justify-between h-full min-h-[64px] flex-shrink-0">
                                    <span className="font-bold text-slate-900 text-[14.5px]">${Number(item.precioTotalItem).toFixed(2)}</span>
                                    <button 
                                      type="button"
                                      onClick={() => removeItem(originalIndex)}
                                      className="text-[11px] text-red-500 hover:text-red-750 hover:underline mt-2 font-medium cursor-pointer"
                                      aria-label="Eliminar artículo"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                  </div>
                </div>
                
                {/* Smooth bottom fade indicator */}
                {isScrollable && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10" />
                )}

                {/* Subtle scroll chevron indicator (no text) */}
                <div
                  className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full flex items-center justify-center shadow-sm pointer-events-none z-15 transition-all duration-300 ${
                    showScrollIndicator ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  <ChevronDown size={14} className="animate-bounce text-slate-400" />
                </div>
              </div>

              {/* Form Errors */}
              {formError && (
                <div className="px-5 py-3 bg-red-50 border-t border-red-100 text-red-650 flex items-center gap-2 text-xs font-semibold flex-shrink-0">
                  <AlertTriangle size={14} />
                  <span>{formError}</span>
                </div>
              )}

              {/* Fixed Bottom Summary Panel (Local/Static) */}
              {(() => {
                const uniqueBusinesses = new Set(cart.items.map(item => item.producto.negocio_id).filter(Boolean));
                const isMultiStore = uniqueBusinesses.size > 1;
                
                const business = businessesInCart[0];
                const hasDeliveryPropio = !isMultiStore && business?.delivery_propio;
                const isMandaditosShipping = isMultiStore || !hasDeliveryPropio;

                const costoEnvio = isMandaditosShipping ? 0 : (business?.costo_envio || 0);
                const totalGeneral = totalEnProductos + costoEnvio;

                return (
                  <div className="bg-white border-t border-slate-100 p-5 pb-28 space-y-4 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] z-20 flex-shrink-0">
                    {/* Dirección de Entrega Selector */}
                    <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[13px]">
                        <MapPin size={15} className="text-emerald-600 flex-shrink-0" />
                        <span>Entregar en:</span>
                      </div>
                      
                      <div 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="flex items-center gap-1 text-[#FF6B00] font-black text-[13px] hover:text-[#ff8800] transition-colors cursor-pointer max-w-[210px] min-w-0"
                      >
                        <span className="truncate">{clientAddress}</span>
                        <ChevronRight size={14} className="flex-shrink-0" />
                      </div>
                    </div>

                    <div className="space-y-2.5 text-[13px]">
                      <div className="flex items-center justify-between text-gray-500 font-semibold">
                        <span>Subtotal</span>
                        <span className="font-extrabold text-gray-800">${totalEnProductos.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-gray-500 font-semibold">
                        <span>Costo de envío</span>
                        {isMandaditosShipping ? (
                          <span className="text-gray-400 italic text-[12px]">A cotizar (Mandaditos)</span>
                        ) : (
                          <span className={costoEnvio === 0 ? 'text-emerald-600 font-extrabold' : 'font-extrabold text-gray-800'}>
                            {costoEnvio === 0 ? 'Gratis' : `$${costoEnvio.toFixed(2)}`}
                          </span>
                        )}
                      </div>

                      <div className="h-px bg-slate-100 my-1.5" />

                      <div className="flex items-center justify-between text-[16px] font-black text-gray-900">
                        <span>Total estimado</span>
                        <span>
                          ${totalGeneral.toFixed(2)}{isMandaditosShipping ? ' + envío' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Buttons */}
                    {/* Case A: Single business WITH its own WhatsApp delivery */}
                    {!isMultiStore && cart.negocioWhatsapp ? (
                      (() => {
                        const business = businessesInCart[0];
                        const hasDeliveryPropio = business?.delivery_propio;
                        const costoEnvio = business?.costo_envio || 0;
                        
                        if (hasDeliveryPropio) {
                          return (
                            <div className="space-y-2.5">
                              {/* Option 1: Pedir a domicilio del negocio */}
                              <button
                                type="button"
                                onClick={() => handleSendToNegocio(false)}
                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white font-black text-[13.5px] py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-between cursor-pointer border-none"
                              >
                                <div className="flex items-center gap-2">
                                  <Store size={16} className="flex-shrink-0" />
                                  <div className="text-left">
                                    <div className="font-black leading-tight">Pedir al negocio</div>
                                    <div className="text-[10.5px] font-semibold text-white/80 leading-tight">
                                      {costoEnvio === 0 ? 'Domicilio gratis del local' : `Envío del local: $${costoEnvio.toFixed(2)}`}
                                    </div>
                                  </div>
                                </div>
                                <span className="bg-emerald-700/60 text-white text-[12px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex-shrink-0">
                                  ${(totalEnProductos + costoEnvio).toFixed(2)}
                                </span>
                              </button>

                              {/* Option 2: Pedir por Mandaditos */}
                              <button
                                type="button"
                                onClick={handleSendOrder}
                                className="w-full bg-white hover:bg-slate-50 active:scale-[0.98] text-[#FF6B00] font-black text-[13.5px] py-3.5 px-4 rounded-2xl border-2 border-[#FF6B00]/30 hover:border-[#FF6B00]/50 transition-all flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Truck size={16} className="flex-shrink-0" />
                                  <div className="text-left">
                                    <div className="font-black leading-tight">Pedir por Mandaditos</div>
                                    <div className="text-[10.5px] font-semibold text-slate-400 leading-tight">Servicio de entrega local</div>
                                  </div>
                                </div>
                                <ChevronRight size={16} className="text-[#FF6B00]/60 flex-shrink-0" />
                              </button>
                            </div>
                          );
                        } else {
                          return (
                            <div className="space-y-2.5">
                              {/* Option 1: Pedir por Mandaditos (Primary) */}
                              <button
                                type="button"
                                onClick={handleSendOrder}
                                className="w-full bg-gradient-to-r from-[#FF6B00] to-[#ff8800] hover:from-[#e55f00] hover:to-[#e57a00] active:scale-[0.98] text-white font-black text-[13.5px] py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,0,0.3)] transition-all flex items-center justify-between cursor-pointer border-none"
                              >
                                <div className="flex items-center gap-2">
                                  <Truck size={16} className="flex-shrink-0" />
                                  <div className="text-left">
                                    <div className="font-black leading-tight">Pedir por Mandaditos</div>
                                    <div className="text-[10.5px] font-semibold text-white/80 leading-tight">Servicio de entrega local</div>
                                  </div>
                                </div>
                                <span className="bg-black/20 text-white text-[12px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex-shrink-0">
                                  ${totalEnProductos.toFixed(2)} + envío
                                </span>
                              </button>

                              {/* Option 2: Pedir para recoger (Secondary) */}
                              <button
                                type="button"
                                onClick={() => handleSendToNegocio(true)}
                                className="w-full bg-white hover:bg-slate-50 active:scale-[0.98] text-emerald-600 font-black text-[13.5px] py-3.5 px-4 rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Store size={16} className="flex-shrink-0 text-emerald-500" />
                                  <div className="text-left">
                                    <div className="font-black leading-tight">Pedir para recoger</div>
                                    <div className="text-[10.5px] font-semibold text-slate-400 leading-tight">Tú pasas por el pedido al local</div>
                                  </div>
                                </div>
                                <span className="bg-emerald-50 text-emerald-700 text-[12px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex-shrink-0 border border-emerald-100">
                                  ${totalEnProductos.toFixed(2)}
                                </span>
                              </button>
                            </div>
                          );
                        }
                      })()
                    ) : (
                      /* Case B: Multi-store or no business WhatsApp → only Mandaditos */
                      <button
                        type="button"
                        onClick={handleCheckoutProceed}
                        className="w-full bg-gradient-to-r from-[#FF6B00] to-[#ff8800] hover:from-[#e55f00] hover:to-[#e57a00] active:scale-[0.98] text-white font-black text-[13.5px] py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,0,0.3)] transition-all flex items-center justify-between cursor-pointer border-none"
                      >
                        <div className="flex items-center gap-2">
                          <Truck size={16} className="flex-shrink-0" />
                          <div className="text-left">
                            <div className="font-black leading-tight">Proceder con el Pedido</div>
                            <div className="text-[10.5px] font-semibold text-white/80 leading-tight">Servicio de entrega local</div>
                          </div>
                        </div>
                        <span className="bg-black/20 text-white text-[12px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex-shrink-0">
                          ${totalEnProductos.toFixed(2)} + envío
                        </span>
                      </button>
                    )}
                  </div>
                );
              })()}
            </>
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

      {/* Split Order Modal */}
      {isSplitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              if (splitStep === 'selection') {
                setIsSplitModalOpen(false);
              }
            }}
          />
          
          {/* Modal content container */}
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col border border-slate-100 max-h-[85vh] animate-scale-in">
            {/* Header */}
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-gray-800 text-[15px] flex items-center gap-1.5">
                {splitStep === 'selection' ? (
                  <>
                    <AlertTriangle className="text-amber-500" size={18} />
                    <span>Opciones de Envío</span>
                  </>
                ) : (
                  <>
                    <Store className="text-[#1947c7]" size={18} />
                    <span>Enviar Pedidos</span>
                  </>
                )}
              </h3>
              {splitStep === 'selection' && (
                <button 
                  onClick={() => setIsSplitModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {splitStep === 'selection' ? (
                <>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Detectamos que uno o más negocios en tu carrito cuentan con **servicio a domicilio propio**:
                  </p>
                  
                  {/* List of businesses with status */}
                  <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {businessesInCart.map(biz => (
                      <div key={biz.id} className="flex items-center justify-between text-xs font-bold">
                        <span className="text-gray-700">{biz.nombre}</span>
                        {biz.delivery_propio ? (
                          <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px]">
                            Envío Propio (Ahorro)
                          </span>
                        ) : (
                          <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-[10px]">
                            Requiere Mandaditos
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    ¿Prefieres pedir a cada negocio por separado para ahorrar en costo de envío, o prefieres proceder con el pedido consolidado a Mandaditos?
                  </p>

                  <div className="pt-2 space-y-2.5">
                    {/* Option Split */}
                    <button
                      onClick={() => setSplitStep('sending')}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Pedir por separado (Ahorrar Envío)
                    </button>

                    {/* Option Consolidated */}
                    <button
                      onClick={() => {
                        const msg = buildOrderMessage('Pedido vía KEPIDO App — Enviado a Servicio Mandaditos');
                        const phone = sanitizePhoneNumber(MANDADITOS_WHATSAPP);
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                        setIsSplitModalOpen(false);
                      }}
                      className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Pedir todo por Mandaditos
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Envía el detalle de tu pedido a cada chat de WhatsApp correspondiente:
                  </p>

                  <div className="space-y-3 pt-1">
                    {/* List of steps */}
                    {businessesInCart.filter(b => b.delivery_propio).map((biz, idx) => {
                      const isSent = sentBusinesses.includes(biz.id);
                      const bizItems = cart.items.filter(item => item.producto.negocio_id === biz.id);
                      return (
                        <div 
                          key={biz.id} 
                          className={`p-3.5 rounded-2xl border transition-all ${
                            isSent 
                              ? 'bg-emerald-50/40 border-emerald-100' 
                              : 'bg-white border-slate-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-xs text-gray-800">
                              Paso {idx + 1}: {biz.nombre}
                            </span>
                            {isSent && (
                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                <CheckCircle size={10} /> Enviado
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[11px] text-gray-400 mb-3.5 leading-relaxed">
                            {bizItems.length} {bizItems.length === 1 ? 'artículo' : 'artículos'} directos al local con envío propio.
                          </p>

                          <button
                            onClick={() => {
                              const msg = buildBusinessDirectMessage(biz, bizItems);
                              const phone = sanitizePhoneNumber(biz.whatsapp || '');
                              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                              if (!sentBusinesses.includes(biz.id)) {
                                setSentBusinesses([...sentBusinesses, biz.id]);
                              }
                            }}
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              isSent
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                            }`}
                          >
                            <MessageSquare size={13} />
                            <span>{isSent ? 'Volver a enviar' : 'Enviar a ' + biz.nombre}</span>
                          </button>
                        </div>
                      );
                    })}

                    {/* Step for Mandaditos if remaining items exist */}
                    {(() => {
                      const remainingItems = cart.items.filter(item => {
                        const biz = allNegocios.find(n => n.id === item.producto.negocio_id);
                        return !biz || !biz.delivery_propio;
                      });
                      
                      if (remainingItems.length === 0) return null;

                      const ownDeliveryCount = businessesInCart.filter(b => b.delivery_propio).length;
                      const stepIndex = ownDeliveryCount + 1;
                      
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl border transition-all ${
                            sentMandaditos 
                              ? 'bg-emerald-50/40 border-emerald-100' 
                              : 'bg-white border-slate-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-xs text-gray-800">
                              Paso {stepIndex}: Mandaditos (Otros locales)
                            </span>
                            {sentMandaditos && (
                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                <CheckCircle size={10} /> Enviado
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[11px] text-gray-400 mb-3.5 leading-relaxed">
                            {remainingItems.length} {remainingItems.length === 1 ? 'artículo' : 'artículos'} de locales que requieren servicio a domicilio externo.
                          </p>

                          <button
                            onClick={() => {
                              const msg = buildMandaditosRemainingMessage(remainingItems);
                              const phone = sanitizePhoneNumber(MANDADITOS_WHATSAPP);
                              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                              setSentMandaditos(true);
                            }}
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              sentMandaditos
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                : 'bg-gradient-to-r from-[#FF6B00] to-[#ff8800] hover:from-[#e55f00] hover:to-[#e57a00] text-white shadow-xs'
                            }`}
                          >
                            <Truck size={13} />
                            <span>{sentMandaditos ? 'Volver a enviar' : 'Enviar a Mandaditos'}</span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Complete & Clear Cart button */}
                  {(() => {
                    const ownDeliveryBizs = businessesInCart.filter(b => b.delivery_propio);
                    const remainingItems = cart.items.filter(item => {
                      const biz = allNegocios.find(n => n.id === item.producto.negocio_id);
                      return !biz || !biz.delivery_propio;
                    });
                    
                    const isFullySent = sentBusinesses.length === ownDeliveryBizs.length && 
                      (remainingItems.length === 0 || sentMandaditos);

                    return (
                      <div className="pt-2 flex flex-col gap-2">
                        {isFullySent ? (
                          <>
                            <button
                              onClick={() => {
                                clearCart();
                                setIsSplitModalOpen(false);
                              }}
                              className="w-full bg-[#1947c7] hover:bg-[#1538b0] text-white font-black text-xs py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                            >
                              Finalizar y Limpiar Carrito
                            </button>
                            <button
                              onClick={() => {
                                setIsSplitModalOpen(false);
                              }}
                              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all active:scale-[0.98] cursor-pointer"
                            >
                              Finalizar (Mantener Artículos)
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setIsSplitModalOpen(false)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-[11px] py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                          >
                            Volver al Carrito
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
