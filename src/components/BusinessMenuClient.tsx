'use client';

import React, { useState, useEffect } from 'react';
import { Negocio, CategoriaMenu, Producto, CartState, CartItem } from '@/lib/types';
import { checkOpen, format12h, getDisplayHours } from '@/lib/timeUtils';
import { ChevronLeft, ChevronRight, ChevronDown, Clock, ShoppingCart, Info, AlertTriangle, ArrowLeft, Heart, MessageSquare, Search, MapPin, Plus, List, X, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import QuickReview, { getApprovalPercent, getBusinessRating } from '@/components/QuickReview';
import AddressModal from '@/components/AddressModal';

const Instagram = ({ size = 15, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 15, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface BusinessMenuClientProps {
  negocio: Negocio;
  categorias: CategoriaMenu[];
}

export default function BusinessMenuClient({ negocio, categorias }: BusinessMenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [topbarHeight, setTopbarHeight] = useState(120);
  const [cart, setCart] = useState<CartState>({ negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] });
  const isManualScrollingRef = React.useRef(false);
  const manualScrollTimeoutRef = React.useRef<any>(null);

  const scrollCarousel = (id: string, direction: 'left' | 'right') => {
    const el = document.getElementById(`carousel-${id}`);
    if (el) {
      const scrollAmount = 240;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Client address and Search Term states
  const [menuSearchTerm, setMenuSearchTerm] = useState('');
  const [clientAddress, setClientAddress] = useState('Calle Libertad #100, Centro, Jamay');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('client_address');
    if (savedAddress) {
      setClientAddress(savedAddress);
    }
  }, []);

  const handleChangeAddress = (newAddr: string) => {
    setClientAddress(newAddr);
  };

  const filteredCategorias = React.useMemo(() => {
    return categorias.map(cat => {
      const products = (cat.productos || []).filter(p => 
        p.nombre.toLowerCase().includes(menuSearchTerm.toLowerCase()) || 
        (p.descripcion && p.descripcion.toLowerCase().includes(menuSearchTerm.toLowerCase()))
      );
      return { ...cat, productos: products };
    }).filter(cat => cat.productos.length > 0);
  }, [categorias, menuSearchTerm]);

  useEffect(() => {
    if (filteredCategorias.length > 0) {
      setActiveCategory(filteredCategorias[0].id);
    }
  }, [menuSearchTerm]);

  // Rating states based on reviews
  const [reviewsVersion, setReviewsVersion] = useState(0);
  const [ratingInfo, setRatingInfo] = useState<{ rating: number; total: number; approval: { percent: number; total: number } | null }>({
    rating: negocio.rating || 5.0,
    total: negocio.total_ratings || 10,
    approval: null
  });

  useEffect(() => {
    const info = getBusinessRating(negocio.id, negocio.rating || 5.0, negocio.total_ratings || 10);
    const app = getApprovalPercent(negocio.id);
    setRatingInfo({
      rating: info.rating,
      total: info.total,
      approval: app
    });
  }, [negocio.id, reviewsVersion]);

  useEffect(() => {
    const handleScroll = () => {
      const topbar = document.getElementById('sticky-topbar');
      const mainTitle = document.getElementById('business-main-title');
      if (topbar) {
        const height = topbar.getBoundingClientRect().height;
        setTopbarHeight(height);
        
        if (mainTitle) {
          const mainTitleRect = mainTitle.getBoundingClientRect();
          // We set isScrolled to true only if the top of the main title is covered by the topbar
          setIsScrolled(mainTitleRect.top <= height);
        } else {
          setIsScrolled(window.scrollY > 220);
        }
      } else {
        setIsScrolled(window.scrollY > 220);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Scrollspy: detect active category on scroll
  useEffect(() => {
    if (filteredCategorias.length === 0) return;

    // Use IntersectionObserver to spy on which category section is currently at the top of the viewport
    const observerOptions = {
      root: null, // viewport
      // Detection band starts below the sticky header area (~180px)
      rootMargin: '-180px 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrollingRef.current) return;

      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Sort by how close the top of the element is to the top of the viewport
        const sorted = intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const activeId = sorted[0].target.id.replace('category-', '');
        setActiveCategory(activeId);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    filteredCategorias.forEach(cat => {
      const el = document.getElementById(`category-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredCategorias]);

  // Listener to handle edge cases like scrolling to the bottom of the page
  useEffect(() => {
    const handleScrollAtBottom = () => {
      if (isManualScrollingRef.current) return;

      // Check if scroll reached the bottom of the document
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
      if (isAtBottom && filteredCategorias.length > 0) {
        const lastCat = filteredCategorias[filteredCategorias.length - 1];
        setActiveCategory(lastCat.id);
      }
    };

    window.addEventListener('scroll', handleScrollAtBottom);
    return () => {
      window.removeEventListener('scroll', handleScrollAtBottom);
    };
  }, [filteredCategorias]);

  // Automatically scroll the active category chip in the sub-bar into view
  useEffect(() => {
    if (!activeCategory) return;
    const activeChip = document.getElementById(`chip-${activeCategory}`);
    if (activeChip) {
      activeChip.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('rappi_jamay_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
    
    if (categorias.length > 0) {
      setActiveCategory(categorias[0].id);
    }
  }, [categorias]);



  const isOpenNow = checkOpen(negocio.horario_apertura, negocio.horario_cierre, negocio.slug);

  // Handle product click
  const handleProductClick = (producto: Producto) => {
    if (!producto.disponible) return;
    setSelectedProduct(producto);
    setIsProductModalOpen(true);
  };

  // Add Item to Cart
  const handleAddItemToCart = (item: CartItem) => {
    if (item.producto) {
      if (!item.producto.negocio_nombre) item.producto.negocio_nombre = negocio.nombre;
      if (!item.producto.negocio_id) item.producto.negocio_id = negocio.id;
    }
    addDirectly(item);
  };

  const addDirectly = (item: CartItem) => {
    // 1. Get current cart from state (which is in sync with localStorage)
    const updatedItems = [...cart.items];
    
    const existingItemIndex = updatedItems.findIndex(existing => {
      if (existing.producto.id !== item.producto.id) return false;
      
      const keys1 = Object.keys(existing.opcionesSeleccionadas);
      const keys2 = Object.keys(item.opcionesSeleccionadas);
      if (keys1.length !== keys2.length) return false;
      
      for (const k of keys1) {
        const opts1 = existing.opcionesSeleccionadas[k] || [];
        const opts2 = item.opcionesSeleccionadas[k] || [];
        if (opts1.length !== opts2.length) return false;
        
        const optIds1 = opts1.map(o => o.id).sort();
        const optIds2 = opts2.map(o => o.id).sort();
        
        for (let i = 0; i < optIds1.length; i++) {
          if (optIds1[i] !== optIds2[i]) return false;
        }
      }
      return true;
    });

    if (existingItemIndex > -1) {
      const existing = { ...updatedItems[existingItemIndex] };
      const singlePrice = Number(existing.precioTotalItem) / existing.cantidad;
      existing.cantidad += item.cantidad;
      existing.precioTotalItem = singlePrice * existing.cantidad;
      updatedItems[existingItemIndex] = existing;
    } else {
      updatedItems.push(item);
    }

    // Check if there are multiple unique negocioIds in updatedItems
    const uniqueBizIds = new Set(updatedItems.map(i => i.producto.negocio_id || negocio.id));
    const isMultiStore = uniqueBizIds.size > 1;

    const updatedCart = {
      negocioId: isMultiStore ? 'multiple' : negocio.id,
      negocioNombre: isMultiStore ? 'Múltiples Negocios' : negocio.nombre,
      negocioWhatsapp: isMultiStore ? 'multiple' : negocio.whatsapp,
      negocioNotasEnvio: isMultiStore ? 'Costos de envío varían por negocio' : negocio.notas_envio,
      negocioCostoEnvio: isMultiStore ? 0 : (negocio.costo_envio !== undefined ? negocio.costo_envio : 0),
      items: updatedItems
    };

    setCart(updatedCart);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updatedCart));
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  // Cart operations
  const handleUpdateQuantity = (idx: number, newQty: number) => {
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

  const handleUpdateNotes = (idx: number, notes: string) => {
    const newItems = [...cart.items];
    newItems[idx] = { ...newItems[idx], notas: notes };
    const updated = { ...cart, items: newItems };
    setCart(updated);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
  };

  const handleRemoveItem = (idx: number) => {
    const newItems = cart.items.filter((_, i) => i !== idx);
    const isCartEmpty = newItems.length === 0;
    const updated = {
      negocioId: isCartEmpty ? null : cart.negocioId,
      negocioNombre: isCartEmpty ? null : cart.negocioNombre,
      negocioWhatsapp: isCartEmpty ? null : cart.negocioWhatsapp,
      negocioNotasEnvio: isCartEmpty ? null : cart.negocioNotasEnvio,
      negocioCostoEnvio: isCartEmpty ? null : cart.negocioCostoEnvio,
      items: newItems
    };
    setCart(updated);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const handleClearCart = () => {
    const cleared = { negocioId: null, negocioNombre: null, negocioWhatsapp: null, negocioNotasEnvio: null, negocioCostoEnvio: null, items: [] };
    setCart(cleared);
    localStorage.removeItem('rappi_jamay_cart');
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    
    isManualScrollingRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    
    const element = document.getElementById(`category-${catId}`);
    const topbar = document.getElementById('sticky-topbar');
    const categoriesSelector = document.getElementById('categories-selector');
    
    if (element) {
      let offset = topbarHeight;
      if (topbar) {
        offset = topbar.getBoundingClientRect().height;
        if (categoriesSelector) {
          offset += categoriesSelector.getBoundingClientRect().height;
        }
      }
      
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset + 2; // small buffer for accuracy

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      manualScrollTimeoutRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 800);
    }
  };

  const totalEnProductos = cart.items.reduce((sum, item) => sum + Number(item.precioTotalItem), 0);
  const totalCartQty = cart.items.reduce((sum, item) => sum + item.cantidad, 0);

  // Extract featured products of this business
  const featuredProducts = categorias.flatMap(c => c.productos || []).filter(p => p.destacado);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100 pb-48">
      
      {/* Top Search & Address Bar (Above Cover) */}
      <div id="sticky-topbar" className="bg-[#1947c7] sticky top-0 z-30 px-5 pt-5 pb-3 space-y-3 relative">
        {/* Row 1: Logo & Address Selector & Cart Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            
            <Link href="/" className="active:scale-[0.98] transition-all flex-shrink-0">
              <img 
                src="/KEPIDO LOGO BLANCO.png" 
                alt="Kepido Logo" 
                className="h-[38px] w-auto object-contain flex-shrink-0"
              />
            </Link>
            
            {/* Compact Address Selector */}
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

          {/* Right actions: Cart */}
          {totalCartQty > 0 && (
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-white/15 text-white border border-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Ver carrito"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse-slow">
                {totalCartQty}
              </span>
            </button>
          )}
        </div>

        {/* Row 2: Search Input */}
        <div className="relative flex items-center bg-white border border-white/25 rounded-xl overflow-hidden px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-black/10 transition-all shadow-xs">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text"
            placeholder="Buscar productos en este menú..."
            value={menuSearchTerm}
            onChange={(e) => setMenuSearchTerm(e.target.value)}
            className="w-full text-[12px] text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
          {menuSearchTerm && (
            <button 
              onClick={() => setMenuSearchTerm('')}
              className="text-gray-400 hover:text-gray-600 text-[10px] font-bold cursor-pointer ml-2"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Sticky Business Name Banner (Absolute child of sticky topbar) */}
        {isScrolled && (
          <div 
            id="sticky-business-name-banner"
            className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 text-gray-900 h-[46px] px-5 flex items-center justify-between shadow-xs animate-slide-down z-25"
          >
            <div className="flex items-center min-w-0">
              <Link 
                href="/" 
                className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center flex-shrink-0 mr-1.5 active:scale-95"
                aria-label="Volver al inicio"
              >
                <ChevronLeft size={20} className="stroke-[2.5]" />
              </Link>
              <span className="font-bold text-[18px] tracking-tight truncate text-slate-900">
                {negocio.nombre}
              </span>
            </div>
            <button 
              onClick={() => setIsInfoModalOpen(true)}
              className="text-gray-400 hover:text-slate-650 p-1.5 flex items-center justify-center cursor-pointer transition-colors rounded-full hover:bg-gray-50 active:scale-95"
              aria-label="Información del negocio"
            >
              <Info size={18} className="stroke-[2.2]" />
            </button>
          </div>
        )}
      </div>

      {/* Top Banner Cover */}
      <div className="relative h-44 sm:h-48 bg-slate-100 flex items-center justify-center">
        {negocio.portada_url && (
          <img 
            src={negocio.portada_url} 
            alt={negocio.nombre} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/35" />

        {/* Back Arrow button (Top Left) */}
        <Link 
          href="/" 
          className="absolute top-4 left-4 p-2.5 rounded-full bg-white/25 text-white border border-white/20 hover:bg-white/40 backdrop-blur-sm shadow-md transition-colors z-20 flex items-center justify-center"
          aria-label="Volver al inicio"
        >
          <ChevronLeft size={20} />
        </Link>

        {/* Centered Logo Circle overlay */}
        <div className="absolute z-10 w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center">
          {negocio.logo_url && (
            <img 
              src={negocio.logo_url} 
              alt={negocio.nombre} 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info button (Top Right) */}
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/25 text-white border border-white/20 hover:bg-white/40 backdrop-blur-sm shadow-md transition-colors z-20 cursor-pointer flex items-center justify-center"
          aria-label="Información del negocio"
        >
          <Info size={20} />
        </button>
      </div>

      {/* Business Info details & toggle bar */}
      <div className="bg-white px-5 py-5 border-b border-gray-100 space-y-4">
        
        {/* Name, address, and category section - left-aligned */}
        <div className="flex items-start gap-3.5 pt-1">
          
          {/* Text details */}
          <div className="flex-1 min-w-0 text-left space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 id="business-main-title" className="text-title-2 text-gray-900 leading-tight">
                {negocio.nombre}
              </h1>
              {isOpenNow ? (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-100 flex-shrink-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse-slow" />
                  Abierto
                </span>
              ) : (
                <span className="inline-flex items-center bg-red-50 text-red-650 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-100 flex-shrink-0">
                  Cerrado
                </span>
              )}
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide leading-tight">
              {negocio.direccion || 'JAMAY, JALISCO, MÉXICO'}
            </p>
            <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
              {negocio.categoria_principal} {negocio.descripcion ? `• ${negocio.descripcion}` : ''}
            </p>
          </div>
        </div>



        {/* Consolidated Info Pill (Delivery, Envío, Calificación) */}
        <div className="border border-gray-200/80 shadow-xs rounded-2xl flex divide-x divide-gray-200 bg-white overflow-hidden">
          {/* Column 1: Delivery Time */}
          <div className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-gray-450 font-bold uppercase tracking-wider flex items-center gap-1 justify-center">
              Delivery <Clock size={11} className="text-gray-400" />
            </span>
            <span className="font-semibold text-slate-800 text-[14px] mt-1 block">
              {negocio.tiempo_delivery || '30-40 min'}
            </span>
          </div>

          {/* Column 2: Shipping Cost */}
          <div className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-center bg-slate-50/10">
            <span className="text-[10px] text-gray-450 font-bold uppercase tracking-wider block">
              Envío
            </span>
            <span className="font-semibold text-emerald-600 text-[14px] mt-1 block">
              {negocio.costo_envio && negocio.costo_envio > 0 ? `$${negocio.costo_envio.toFixed(2)}` : 'Gratis'}
            </span>
            {(!negocio.costo_envio || negocio.costo_envio === 0) && (
              <span className="text-[8px] text-gray-400 font-medium block mt-0.5">(nuevos usuarios)</span>
            )}
          </div>

          {/* Column 3: Rating (Clickable to open reviews) */}
          <button
            onClick={() => setIsReviewOpen(true)}
            className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-center hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
          >
            <span className="text-[10px] text-gray-450 font-bold uppercase tracking-wider block group-hover:text-rose-500 transition-colors">
              Calificación
            </span>
            <div className="flex items-center gap-1 mt-1 justify-center">
              <Heart size={13} className="fill-rose-500 text-rose-500 animate-pulse-slow" />
              <span className="font-bold text-slate-800 text-[14px]">
                {ratingInfo.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[8px] text-gray-400 font-medium block mt-0.5">({ratingInfo.total} opiniones)</span>
          </button>
        </div>


      </div>

      {/* Promociones Locales */}
      {negocio.promociones_locales && negocio.promociones_locales.length > 0 && (
        <div className="bg-white px-5 pb-5 pt-2 border-b border-gray-100">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Promociones Especiales</h3>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 snap-x hide-scrollbar">
            {negocio.promociones_locales.map((promo, idx) => (
              <div key={idx} className="flex-none w-64 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/50 rounded-2xl p-3 flex gap-3 shadow-sm snap-start shrink-0">
                <div className="w-14 h-14 bg-white rounded-xl shadow-xs flex items-center justify-center p-2 shrink-0">
                  <img src={promo.imagen_url} alt={promo.titulo} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{promo.titulo}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-2">{promo.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Categories Selector Sub-bar */}
      {filteredCategorias.length > 0 && (
        <div 
          id="categories-selector"
          style={{ top: `${topbarHeight + (isScrolled ? 44 : 0)}px` }}
          className="bg-white sticky z-20 shadow-xs px-5 py-2.5 flex flex-col gap-2 transition-colors duration-200"
        >
          
          <div className="flex items-center gap-2">
            {/* Menu Icon Button */}
            <button
              onClick={() => setIsMenuModalOpen(true)}
              className="flex-shrink-0 p-1.5 text-slate-800 hover:text-emerald-600 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title="Ver menú completo"
            >
              <List size={22} className="stroke-[2.2]" />
            </button>
            
            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 flex-shrink-0"></div>

          {/* Scrolling category list */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
            {filteredCategorias.map(cat => (
              <button
                key={cat.id}
                id={`chip-${cat.id}`}
                onClick={() => scrollToCategory(cat.id)}
                className={`px-3.5 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}

      {/* Warning Alert if Business is Closed */}
      {!isOpenNow && (
        <div className="mx-5 mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100/80 text-amber-855 flex gap-2.5">
          <Info size={18} className="flex-shrink-0 mt-0.5 text-amber-600" />
          <div className="text-[12px]">
            <p className="font-bold">Este negocio está Cerrado ahora.</p>
            <p className="mt-0.5 text-amber-705/90">Puedes ver el menú y armar tu pedido, pero el negocio podría no recibirlo en WhatsApp hasta que abra.</p>
          </div>
        </div>
      )}

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <section className="mt-5 px-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-title-2 text-gray-800">
              Artículos destacados
            </h2>
            <div className="flex gap-1.5">
              <button 
                onClick={() => scrollCarousel('featured', 'left')}
                className="w-7 h-7 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-550 hover:text-gray-855 active:scale-95 transition-all cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                onClick={() => scrollCarousel('featured', 'right')}
                className="w-7 h-7 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-550 hover:text-gray-855 active:scale-95 transition-all cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div 
            id="carousel-featured"
            className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {featuredProducts.map((producto, index) => {
              const approvalPercent = producto.rating 
                ? Math.round((producto.rating / 5) * 100) 
                : (producto.nombre.charCodeAt(0) % 15) + 80;
              const totalReviews = producto.total_ratings 
                ? producto.total_ratings 
                : (producto.nombre.charCodeAt(1) % 40) + 10;
              
              return (
                <button
                  key={producto.id}
                  onClick={() => handleProductClick(producto)}
                  disabled={!producto.disponible}
                  className={`w-40 flex-shrink-0 bg-transparent transition-all text-left active:scale-[0.98] cursor-pointer snap-center flex flex-col gap-2 relative ${
                    !producto.disponible ? 'opacity-45 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-gray-100/80">
                    {producto.imagen_url ? (
                      <img 
                        src={producto.imagen_url} 
                        alt={producto.nombre} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-600 text-[20px] font-bold bg-emerald-50/60">
                        {producto.nombre[0]}
                      </div>
                    )}

                    {/* Plus icon inside the image container, at its bottom-right corner */}
                    {producto.disponible && (
                      <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-white text-gray-900 flex items-center justify-center shadow-md hover:bg-gray-50 active:scale-95 transition-all z-10">
                        <Plus size={16} strokeWidth={2.5} className="text-gray-900" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 min-h-[40px]">
                      {producto.nombre}
                    </h4>
                    <div className="flex items-center text-[12px] text-gray-550 font-semibold gap-1 truncate">
                      <span className="text-gray-900 font-bold">
                        ${Number(producto.precio).toFixed(2)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 text-gray-550 font-bold">
                        <Heart size={12} className="text-rose-500 fill-rose-500 flex-shrink-0" />
                        <span>{approvalPercent}% ({totalReviews})</span>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Category Group Listings with products */}
      <div className="mt-4 px-5 space-y-8">
        {filteredCategorias.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center py-12">
            <p className="text-gray-400 text-[12px]">No se encontraron productos para tu búsqueda en este menú.</p>
            <button 
              onClick={() => setMenuSearchTerm('')}
              className="mt-3 text-[12px] font-bold text-emerald-600 hover:underline cursor-pointer"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : filteredCategorias.map(categoria => (
            <section 
              key={categoria.id} 
              id={`category-${categoria.id}`}
              className="space-y-3"
            >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-title-2 text-gray-800">
                {categoria.nombre}
              </h2>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => scrollCarousel(categoria.id, 'left')}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-550 hover:text-gray-850 active:scale-95 transition-all cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  onClick={() => scrollCarousel(categoria.id, 'right')}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-550 hover:text-gray-850 active:scale-95 transition-all cursor-pointer"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {categoria.productos && categoria.productos.length > 0 ? (
              <div 
                id={`carousel-${categoria.id}`}
                className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar snap-x snap-mandatory scroll-smooth"
              >
                {categoria.productos.map((producto, idx) => {
                  const approvalPercent = producto.rating 
                    ? Math.round((producto.rating / 5) * 100) 
                    : (producto.nombre.charCodeAt(0) % 15) + 80;
                  const totalReviews = producto.total_ratings 
                    ? producto.total_ratings 
                    : (producto.nombre.charCodeAt(1) % 40) + 10;
                  
                  let badgeText = '';
                  let badgeClass = '';
                  if (!producto.disponible) {
                    badgeText = 'Agotado';
                    badgeClass = 'bg-red-50 text-red-600 border border-red-100/50';
                  } else if (idx === 0) {
                    badgeText = '#1 Más pedido';
                    badgeClass = 'bg-gray-100 text-gray-700';
                  } else if (idx === 2 && (producto.rating || 5) >= 4.7) {
                    badgeText = '#2 Más pedido';
                    badgeClass = 'bg-gray-100 text-gray-700';
                  } else if (producto.grupos_opciones && producto.grupos_opciones.length > 0) {
                    badgeText = 'Personalizable';
                    badgeClass = 'bg-slate-100 text-slate-600';
                  }
                  
                  return (
                    <button
                      key={producto.id}
                      onClick={() => handleProductClick(producto)}
                      disabled={!producto.disponible}
                      className={`w-40 flex-shrink-0 bg-transparent transition-all text-left active:scale-[0.98] cursor-pointer snap-center flex flex-col gap-2 relative ${
                        !producto.disponible ? 'opacity-45 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-gray-100/80">
                        {producto.imagen_url ? (
                          <img 
                            src={producto.imagen_url} 
                            alt={producto.nombre} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-emerald-600 text-[20px] font-bold bg-emerald-50/60">
                            {producto.nombre[0]}
                          </div>
                        )}

                        {/* Plus icon inside the image container, at its bottom-right corner */}
                        {producto.disponible && (
                          <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-white text-gray-900 flex items-center justify-center shadow-md hover:bg-gray-50 active:scale-95 transition-all z-10">
                            <Plus size={16} strokeWidth={2.5} className="text-gray-900" />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 min-h-[40px]">
                          {producto.nombre}
                        </h4>
                        
                        <div className="flex items-center text-[12px] text-gray-550 font-semibold gap-1 truncate">
                          <span className="text-gray-900 font-bold">
                            ${Number(producto.precio).toFixed(2)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1 text-gray-550 font-bold">
                            <Heart size={12} className="text-rose-500 fill-rose-500 flex-shrink-0" />
                            <span>{approvalPercent}% ({totalReviews})</span>
                          </span>
                        </div>
                        
                        {badgeText && (
                          <div className="pt-0.5">
                            <span className={`inline-block text-[9px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                              {badgeText}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-[12px] text-gray-400 italic">No hay productos en esta sección.</p>
            )}
          </section>
        ))}
      </div>

      {/* Info Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-2xl space-y-4 border border-gray-150 relative">
            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-650 font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-base flex items-center gap-2">
                <Info className="text-emerald-500" size={20} />
                <span>Información del Local</span>
              </h3>
              
              <div className="space-y-4 text-xs text-gray-600">
                
                {/* Abierto / Cerrado destacado */}
                <div className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm ${isOpenNow ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-650'}`}>
                  {isOpenNow ? (
                    <><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow"/> Abierto Ahora</>
                  ) : (
                    <>Cerrado Actualmente</>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="w-8 flex justify-center mt-0.5 text-emerald-500"><Clock size={18} /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Horario de Atención</h4>
                    <p className="mt-0.5 text-gray-500 leading-relaxed font-semibold">
                      {getDisplayHours(negocio)}
                    </p>
                    <p className="text-[10px] text-gray-450 italic mt-0.5">Lunes a Domingo / Horario local</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-8 flex justify-center mt-0.5 text-rose-500"><MapPin size={18} /></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Ubicación</h4>
                    <p className="mt-0.5 text-gray-500 leading-relaxed mb-2">{negocio.direccion || 'No especificada'}</p>
                    {negocio.direccion && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(negocio.direccion + ', Jamay, Jalisco')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                        <MapPin size={12} /> Abrir en Maps
                      </a>
                    )}
                  </div>
                </div>

                {/* Contacto & Redes (movido aquí para no saturar) */}
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">Contacto Directo y Redes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {negocio.telefono && (
                      <a 
                        href={`tel:${negocio.telefono.replace(/[^0-9+]/g, '')}`} 
                        className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-3 rounded-xl transition-colors font-bold col-span-2 text-xs border border-blue-100 shadow-sm"
                      >
                        <Phone size={14} className="shrink-0" /> Llamar directo ({negocio.telefono})
                      </a>
                    )}
                    {negocio.instagram && (
                      <a href={`https://instagram.com/${negocio.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 py-2 px-3 rounded-xl transition-colors font-medium col-span-1">
                        <Instagram size={15} className="shrink-0" /> Instagram
                      </a>
                    )}
                    {negocio.facebook && (
                      <a href={`https://facebook.com/${negocio.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-3 rounded-xl transition-colors font-medium col-span-1">
                        <Facebook size={15} className="shrink-0" /> Facebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}



      {/* Product Customizer Modal */}
      <ProductModal 
        isOpen={isProductModalOpen}
        product={selectedProduct}
        onClose={() => setIsProductModalOpen(false)}
        onAdd={handleAddItemToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        updateItemNotes={handleUpdateNotes}
        removeItem={handleRemoveItem}
        clearCart={handleClearCart}
      />

      {/* Quick Review Modal */}
      <QuickReview
        negocioId={negocio.id}
        negocioNombre={negocio.nombre}
        isOpen={isReviewOpen}
        onClose={() => {
          setIsReviewOpen(false);
          setReviewsVersion(v => v + 1);
        }}
      />

      {/* Address Selection Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentAddress={clientAddress}
        onChangeAddress={handleChangeAddress}
      />

      {/* Menú completo Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMenuModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden border border-slate-100 flex flex-col max-h-[70vh] relative z-10 animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-[16px]">Menú completo</h3>
              <button 
                onClick={() => setIsMenuModalOpen(false)}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full p-1.5 transition-colors cursor-pointer flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            {/* Category list */}
            <div className="flex-1 overflow-y-auto py-1 divide-y divide-gray-50">
              {filteredCategorias.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      scrollToCategory(cat.id);
                      setIsMenuModalOpen(false);
                    }}
                    className={`w-full text-left py-3.5 px-4 block text-[13.5px] transition-colors ${
                      isActive 
                        ? 'border-l-[3.5px] border-slate-950 bg-slate-50 font-bold text-slate-900' 
                        : 'text-gray-600 hover:bg-slate-50/50 hover:text-slate-800'
                    }`}
                  >
                    {cat.nombre}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
