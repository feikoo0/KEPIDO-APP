'use client';

import React, { useState, useEffect } from 'react';
import { Negocio, CartState, Producto, CartItem, Promocion } from '@/lib/types';
import { getNegocios, getProductosDestacados, getAllProductos, getPromociones } from '@/lib/supabase';
import { checkOpen, format12h } from '@/lib/timeUtils';
import { Search, MapPin, Clock, ShoppingCart, ChevronRight, ChevronDown, Heart, AlertTriangle, Filter, Zap, Star, Truck, Sparkles, Bike, X, Timer } from 'lucide-react';
import Link from 'next/link';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import { getApprovalPercent } from '@/components/QuickReview';
import AddressModal from '@/components/AddressModal';
import BottomNav from '@/components/BottomNav';
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

const categoryChips = [
  { id: 'tacos', label: 'Tacos', icon: '/tacos.webp' },
  { id: 'hamburguesas', label: 'Hamburguesas', icon: '/hamburguesas.webp' },
  { id: 'pizza', label: 'Pizza', icon: '/pizza.webp' },
  { id: 'postres', label: 'Postres', icon: '/postres.webp' },
  { id: 'mariscos', label: 'Mariscos', icon: '/mariscos.webp' },
  { id: 'tortas', label: 'Tortas', icon: '/tortas.webp' },
  { id: 'cafe', label: 'Café y Bebidas', icon: '/cafe.webp' },
  { id: 'alitas', label: 'Alitas y Snacks', icon: '/alitas.webp' },
  { id: 'pollo', label: 'Pollo', icon: '/pollo.webp' },
  { id: 'carnes', label: 'Carnes y Asados', icon: '/carnes.webp' },
  { id: 'sushi', label: 'Sushi', icon: '/sushi.webp' }
];

const categoryTagMap: Record<string, string[]> = {
  tacos: ['tacos', 'quesadillas', 'birria'],
  hamburguesas: ['hamburguesas', 'burgers', 'burger'],
  pizza: ['pizza', 'pizzas'],
  postres: ['postres', 'nieves', 'helados', 'crepas', 'dulces'],
  mariscos: ['mariscos', 'ceviche', 'camarones', 'pescado', 'tostadas'],
  tortas: ['tortas', 'lonches', 'baguettes', 'ahogadas'],
  cafe: ['cafe', 'café', 'bebidas', 'jugos', 'licuados', 'frappes', 'malteadas', 'smoothies', 'tés', 'tisanas'],
  alitas: ['alitas', 'snacks', 'boneless', 'elotes', 'esquites'],
  pollo: ['pollo', 'pollos'],
  carnes: ['carnes', 'asados', 'cortes', 'asador', 'arrachera', 'costillas'],
  sushi: ['sushi', 'roscas', 'bowls']
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Negocio[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Producto[]>([]);
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<Negocio[]>([]);
  const [recommendedTitle, setRecommendedTitle] = useState('');
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [promotions, setPromotions] = useState<Promocion[]>([]);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const promoCarouselRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Featured Product modal state
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // RappiFavor state
  const [isRappiFavorOpen, setIsRappiFavorOpen] = useState(false);
  const [favorNombre, setFavorNombre] = useState('');
  const [favorDescripcion, setFavorDescripcion] = useState('');
  const [favorRecogida, setFavorRecogida] = useState('');
  const [favorEntrega, setFavorEntrega] = useState('Calle Libertad #100, Centro, Jamay');
  const [favorError, setFavorError] = useState<string | null>(null);

  // Client address states
  const [clientAddress, setClientAddress] = useState('Calle Libertad #100, Centro, Jamay');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('client_address');
    if (savedAddress) {
      setClientAddress(savedAddress);
      setFavorEntrega(savedAddress);
    }

    // Parse URL query params for search and autofocus
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get('search');
      if (searchParam) {
        setSearchTerm(searchParam);
      }
      const focusParam = params.get('focus');
      if (focusParam === 'true') {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 150);
      }
    }
  }, []);

  const handleChangeAddress = (newAddr: string) => {
    setClientAddress(newAddr);
    setFavorEntrega(newAddr);
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('client_address');
    if (savedAddress) {
      setFavorEntrega(savedAddress);
      setClientAddress(savedAddress);
    }
    const savedName = localStorage.getItem('client_name');
    if (savedName) {
      setFavorNombre(savedName);
    }
  }, [isRappiFavorOpen]);

  const [cart, setCart] = useState<CartState>({ negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch businesses on mount
  useEffect(() => {
    async function loadData() {
      const data = await getNegocios();
      // Shuffle the list of businesses
      const shuffled = shuffleArray(data);
      setBusinesses(shuffled);
      
      const openBusinessIds = new Set(
        shuffled
          .filter(b => checkOpen(b.horario_apertura, b.horario_cierre, b.slug))
          .map(b => b.id)
      );

      const featured = await getProductosDestacados();
      const openFeatured = featured.filter(p => openBusinessIds.has(p.negocio_id || ''));

      const allProds = await getAllProductos();
      const openAllProds = allProds.filter(p => openBusinessIds.has(p.negocio_id || ''));
      setAllProducts(openAllProds);
      
      // Calculate dynamic recommendations based on hour
      const hour = new Date().getHours();
      let title = '';
      let matchingTags: string[] = [];

      if (hour >= 6 && hour < 12) {
        title = '¿Qué desayunamos hoy?';
        matchingTags = ['desayunos', 'lonches', 'cafe', 'café', 'baguettes', 'jugos', 'licuados', 'menudo'];
      } else if (hour >= 12 && hour < 17) {
        title = '¿Qué se te antoja de comer?';
        matchingTags = ['comida', 'almuerzo', 'mariscos', 'pescados', 'china', 'asiática', 'carnes', 'asados', 'cortes', 'sushi'];
      } else if (hour >= 17 && hour < 20) {
        title = '¿Un antojito de la tarde?';
        matchingTags = ['postres', 'nieves', 'helados', 'crepas', 'dulces', 'cafe', 'café', 'frappes', 'malteadas', 'elotes', 'esquites', 'antojos', 'snacks'];
      } else if (hour >= 20 && hour < 23) {
        title = '¿Qué cenamos hoy?';
        matchingTags = ['cena', 'tacos', 'hamburguesas', 'pizza', 'sushi', 'alitas', 'boneless'];
      } else {
        title = '¿Antojo trasnochero?';
        matchingTags = ['cena', 'tacos', 'hamburguesas', 'pizza', 'snacks', 'alitas'];
      }

      setRecommendedTitle(title);

      // 1. Filter recommended businesses
      const matchingBusinesses = shuffled.filter(b => {
        const tagsLower = (b.tags || []).map(t => t.toLowerCase());
        const catLower = b.categoria_principal.toLowerCase();
        return matchingTags.some(mt => 
          tagsLower.some(t => t.includes(mt)) || catLower.includes(mt)
        );
      });

      // Filter currently open ones first for recommendations
      const openMatching = matchingBusinesses.filter(b => checkOpen(b.horario_apertura, b.horario_cierre, b.slug));
      const finalRecs = openMatching.length > 0 ? openMatching : matchingBusinesses;
      setRecommendedBusinesses(finalRecs.slice(0, 6));

      // 2. Filter featured products based on the current hour's slot
      const matchingFeatured = openFeatured.filter(p => {
        // Belongs to one of the matching businesses
        const belongsToRecommended = matchingBusinesses.some(b => b.id === p.negocio_id);
        
        // Or product name/desc/tags contain any slot keyword
        const prodTagsLower = (p.tags || []).map(t => t.toLowerCase());
        const prodNameLower = p.nombre.toLowerCase();
        const prodDescLower = (p.descripcion || '').toLowerCase();
        
        const matchesKeywords = matchingTags.some(mt => 
          prodNameLower.includes(mt) || 
          prodDescLower.includes(mt) || 
          prodTagsLower.some(t => t.includes(mt))
        );

        return belongsToRecommended || matchesKeywords;
      });

      // If we got enough items, use them, otherwise fall back to all open featured products
      const finalFeaturedList = matchingFeatured.length >= 3 ? matchingFeatured : openFeatured;
      const shuffledFeatured = shuffleArray(finalFeaturedList);
      setFeaturedProducts(shuffledFeatured.slice(0, 10));

      const promos = await getPromociones();
      const appPromo: Promocion = {
        id: 'promo_registro_negocios',
        imagen_url: '/ANUNCIA.webp?v=3',
        titulo: '¡Aumenta tus ventas!',
        descripcion: 'Pública GRATIS tu negocio en nuestra app.',
        activo: true
      };
      setPromotions([appPromo, ...promos]);
      setLoading(false);
    }
    loadData();

    // Load Cart from localStorage
    const savedCart = localStorage.getItem('rappi_jamay_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }

    // Load Favorites from localStorage
    const savedFavs = localStorage.getItem('kepido_favorites');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error('Error loading favorites from localStorage', e);
      }
    }
  }, []);

  // Sync favorites and cart when updated elsewhere
  useEffect(() => {
    const updateFavs = () => {
      const savedFavs = localStorage.getItem('kepido_favorites');
      if (savedFavs) {
        try {
          setFavorites(JSON.parse(savedFavs));
        } catch (e) {
          console.error(e);
        }
      } else {
        setFavorites([]);
      }
    };
    
    const updateCart = () => {
      const savedCart = localStorage.getItem('rappi_jamay_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error(e);
        }
      } else {
        setCart({ negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] });
      }
    };
    
    window.addEventListener('favorites-updated', updateFavs);
    window.addEventListener('cart-updated', updateCart);
    return () => {
      window.removeEventListener('favorites-updated', updateFavs);
      window.removeEventListener('cart-updated', updateCart);
    };
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
    setTimeout(() => window.dispatchEvent(new CustomEvent('favorites-updated')), 0);
  };

  // Auto-scroll promotions banner (resets on interaction/index change)
  useEffect(() => {
    if (promotions.length <= 1) return;
    const timer = setTimeout(() => {
      const next = (currentPromoIndex + 1) % promotions.length;
      if (promoCarouselRef.current) {
        const itemWidth = promoCarouselRef.current.clientWidth;
        promoCarouselRef.current.scrollTo({
          left: next * itemWidth,
          behavior: 'smooth'
        });
      }
      setCurrentPromoIndex(next);
    }, 7000);
    return () => clearTimeout(timer);
  }, [promotions, currentPromoIndex, resetTimerTrigger]);

  const handlePromoScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.clientWidth;
    if (itemWidth > 0) {
      const index = Math.round(scrollLeft / itemWidth);
      if (index !== currentPromoIndex && index >= 0 && index < promotions.length) {
        setCurrentPromoIndex(index);
      }
    }
  };



  // Cart updates
  const handleUpdateQuantity = (idx: number, newQty: number) => {
    setCart(prev => {
      const newItems = [...prev.items];
      const item = newItems[idx];
      const singlePrice = Number(item.precioTotalItem) / item.cantidad;
      
      item.cantidad = newQty;
      item.precioTotalItem = singlePrice * newQty;
      
      const updated = { ...prev, items: newItems };
      localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateNotes = (idx: number, notes: string) => {
    setCart(prev => {
      const newItems = [...prev.items];
      newItems[idx].notas = notes;
      const updated = { ...prev, items: newItems };
      localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart(prev => {
      const newItems = prev.items.filter((_, i) => i !== idx);
      const isCartEmpty = newItems.length === 0;
      const updated = {
        negocioId: isCartEmpty ? null : prev.negocioId,
        negocioNombre: isCartEmpty ? null : prev.negocioNombre,
        negocioWhatsapp: isCartEmpty ? null : prev.negocioWhatsapp,
        items: newItems
      };
      localStorage.setItem('rappi_jamay_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearCart = () => {
    const cleared = { negocioId: null, negocioNombre: null, negocioWhatsapp: null, items: [] };
    setCart(cleared);
    localStorage.removeItem('rappi_jamay_cart');
  };

  // Add Item to Cart
  const handleAddItemToCart = (item: CartItem) => {
    addDirectly(item);
  };

  const addDirectly = (item: CartItem) => {
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
      const existing = updatedItems[existingItemIndex];
      const singlePrice = Number(existing.precioTotalItem) / existing.cantidad;
      existing.cantidad += item.cantidad;
      existing.precioTotalItem = singlePrice * existing.cantidad;
    } else {
      updatedItems.push(item);
    }

    // Check if there are multiple unique negocioIds in updatedItems
    const uniqueBizIds = new Set(updatedItems.map(i => i.producto.negocio_id));
    const isMultiStore = uniqueBizIds.size > 1;

    const singleBizId = item.producto.negocio_id || null;
    const singleBiz = businesses.find(b => b.id === singleBizId);

    const updatedCart = {
      negocioId: isMultiStore ? 'multiple' : singleBizId,
      negocioNombre: isMultiStore ? 'Múltiples Negocios' : (item.producto.negocio_nombre || (singleBiz?.nombre || 'Local')),
      negocioWhatsapp: isMultiStore ? 'multiple' : (item.producto.negocio_whatsapp || (singleBiz?.whatsapp || '523921009557')),
      negocioNotasEnvio: isMultiStore ? 'Costos de envío varían por negocio' : (singleBiz?.notas_envio || null),
      negocioCostoEnvio: isMultiStore ? 0 : (singleBiz?.costo_envio !== undefined ? singleBiz.costo_envio : 0),
      items: updatedItems
    };

    setCart(updatedCart);
    localStorage.setItem('rappi_jamay_cart', JSON.stringify(updatedCart));
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const handleSendFavor = () => {
    if (!favorNombre.trim()) {
      setFavorError('Por favor, ingresa tu nombre.');
      return;
    }
    if (!favorDescripcion.trim()) {
      setFavorError('Por favor, describe qué necesitas.');
      return;
    }
    if (!favorEntrega.trim()) {
      setFavorError('Por favor, ingresa la dirección de entrega.');
      return;
    }

    setFavorError(null);

    // Persist to localStorage
    localStorage.setItem('client_name', favorNombre.trim());
    localStorage.setItem('client_address', favorEntrega.trim());

    const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━';
    let message = `⚡ *¡HOLA! SOLICITUD DE MANDADITO — KEPIDO APP* ⚡\n`;
    message += `${separator}\n\n`;
    
    message += `👤 *Cliente:*\n${favorNombre.trim()}\n\n`;
    message += `📋 *Detalle del favor:*\n${favorDescripcion.trim()}\n\n`;
    
    if (favorRecogida.trim()) {
      message += `📍 *Lugar de compra / recogida:*\n${favorRecogida.trim()}\n\n`;
    } else {
      message += `📍 *Lugar de compra / recogida:*\nNo especificado (a convenir)\n\n`;
    }
    
    message += `🏠 *Dirección de entrega:*\n${favorEntrega.trim()}\n\n`;
    message += `💵 *Tarifa estimada:*\nA acordar con el chofer (Tarifa base desde $35.00 pesos en Jamay)\n\n`;
    message += `${separator}\n`;
    message += `_Pedido enviado vía KEPIDO App Jamay_`;

    const sanitizedPhone = '523921009557'; // Central Mandaditos dispatcher
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    setIsRappiFavorOpen(false);
    setFavorDescripcion('');
    setFavorRecogida('');
  };

  // Toggle filter chip
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  // Match search and category filters
  const filtered = businesses.filter(b => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = b.nombre.toLowerCase().includes(searchLower) ||
                          b.categoria_principal.toLowerCase().includes(searchLower) ||
                          (b.tags || []).some(t => t.toLowerCase().includes(searchLower));
    
    const tagsLower = (b.tags || []).map(t => t.toLowerCase());
    const matchedTagsForCategory = categoryTagMap[selectedCategory] || [selectedCategory];
    const matchesCategory = selectedCategory === 'todos' || 
                            matchedTagsForCategory.some(mt => b.categoria_principal.toLowerCase().includes(mt.toLowerCase())) ||
                            tagsLower.some(t => matchedTagsForCategory.some(mt => t.includes(mt.toLowerCase())));

    // Smart filter chips (AND logic)
    const isOpen = checkOpen(b.horario_apertura, b.horario_cierre, b.slug);
    if (activeFilters.has('abierto') && !isOpen) return false;
    if (activeFilters.has('envio_gratis') && b.costo_envio && b.costo_envio > 0) return false;

    return matchesSearch && matchesCategory;
  });

  // Sorting: Open-first always, then apply active sort filters
  const sorted = [...filtered].sort((a, b) => {
    const aOpen = checkOpen(a.horario_apertura, a.horario_cierre, a.slug);
    const bOpen = checkOpen(b.horario_apertura, b.horario_cierre, b.slug);
    
    // Absolute priority: open first, closed last
    if (aOpen && !bOpen) return -1;
    if (!aOpen && bOpen) return 1;

    // If both have same open status, sort by selected criteria:
    // 1. Sort by "Mejor calificados"
    if (activeFilters.has('mejor_calificados')) {
      const diff = (b.rating || 0) - (a.rating || 0);
      if (diff !== 0) return diff;
    }

    // 2. Sort by "Más rápido" (parse "30-40 min" → take first number)
    if (activeFilters.has('mas_rapido')) {
      const parseTime = (t?: string) => {
        if (!t) return 999;
        const match = t.match(/(\d+)/);
        return match ? parseInt(match[1]) : 999;
      };
      const diff = parseTime(a.tiempo_delivery) - parseTime(b.tiempo_delivery);
      if (diff !== 0) return diff;
    }

    return 0;
  });

  // Top 10 places: open first, then sorted by rating (descending)
  const topTenBusinesses = [...businesses]
    .sort((a, b) => {
      const aOpen = checkOpen(a.horario_apertura, a.horario_cierre, a.slug);
      const bOpen = checkOpen(b.horario_apertura, b.horario_cierre, b.slug);
      if (aOpen && !bOpen) return -1;
      if (!aOpen && bOpen) return 1;
      // If both are open or both closed, sort by rating
      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 10);

  // Global search for products based on searchTerm (if not empty)
  const filteredProducts = searchTerm.trim() === '' ? [] : allProducts.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesName = p.nombre.toLowerCase().includes(term);
    const matchesDesc = p.descripcion?.toLowerCase().includes(term) || false;
    const matchesTags = (p.tags || []).some(t => t.toLowerCase().includes(term));
    return matchesName || matchesDesc || matchesTags;
  });

  // Determine if user is actively filtering (search, category, or filter chips)
  const isFiltering = searchTerm.trim() !== '' || selectedCategory !== 'todos' || activeFilters.size > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100">
      {/* Top Header */}
      <header className="bg-[#1947c7] sticky top-0 z-30 px-5 pt-5 pb-3 space-y-3">
        {/* Row 1: Logo, Address Selector & Cart Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Logo on the Left */}
          <img 
            src="/KEPIDO LOGO BLANCO.webp" 
            alt="Kepido Logo" 
            className="h-[38px] w-auto object-contain flex-shrink-0"
          />
          
          {/* Address & Cart on the Right */}
          <div className="flex items-center gap-2 min-w-0 justify-end flex-1">
            {/* Client Address Selector (Compact, Premium design on Orange) */}
            <div 
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-1.5 text-white cursor-pointer group bg-white/15 border border-white/10 hover:bg-white/20 rounded-lg py-1 px-2.5 transition-all min-w-0 max-w-[145px] sm:max-w-[210px] flex-shrink"
            >
              <MapPin size={13} className="text-white flex-shrink-0" />
              <span className="text-[12.5px] font-bold text-white group-hover:text-white/95 transition-colors truncate">
                {clientAddress}
              </span>
              <ChevronDown size={11} className="text-white/80 flex-shrink-0" />
            </div>
            
            {/* Cart Icon trigger */}
            {cart.items.length > 0 && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-white/15 text-white border border-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Ver carrito"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse-slow">
                  {cart.items.reduce((sum, item) => sum + item.cantidad, 0)}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Row 4: Big Search Input */}
        <div className="relative flex items-center bg-white border border-white/25 rounded-xl overflow-hidden px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-black/10 transition-all shadow-xs">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            ref={searchInputRef}
            type="text"
            placeholder="¿Qué se te antoja hoy?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-[12px] text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
        </div>
      </header>      
      
      {/* Main Content */}
      <main className="flex-1 pb-28 relative">
        {/* Top Gradient Background ending at the middle of the promotions carousel */}
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#1947c7] to-slate-50 pointer-events-none" />

        {/* Promotions Carousel */}
        {promotions.length > 0 && (
          <section className="pt-3 relative z-10">
            <div 
              ref={promoCarouselRef}
              onScroll={handlePromoScroll}
              onTouchStart={() => setResetTimerTrigger(prev => prev + 1)}
              onMouseDown={() => setResetTimerTrigger(prev => prev + 1)}
              className="flex gap-4 overflow-x-auto pb-1.5 px-5 no-scrollbar snap-x snap-mandatory scroll-smooth"
            >
              {promotions.map((promo) => {
                const isRegisterPromo = promo.id === 'promo_registro_negocios';
                const cardContent = (
                  <div className="relative w-full h-42 rounded-3xl overflow-hidden shadow-md group">
                    <img 
                      src={promo.imagen_url} 
                      alt={promo.titulo || ''} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!isRegisterPromo && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
                        
                        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-10">
                          <div className="mt-1">
                            {promo.titulo && (
                              <h4 className="font-semibold text-[19px] sm:text-[21px] leading-tight drop-shadow-xs">
                                {promo.titulo}
                              </h4>
                            )}
                            {promo.descripcion && (
                              <p className="text-[12px] text-white/90 font-medium leading-snug max-w-[85%] mt-0.5 drop-shadow-xs line-clamp-2">
                                {promo.descripcion}
                              </p>
                            )}
                          </div>

                          <div className="mt-2">
                            <span className="inline-flex items-center justify-center bg-[#FF6B00] text-white font-bold px-4 py-1.5 rounded-full text-[12px] shadow-md hover:bg-[#E05F00] transition-colors duration-200">
                              Ver menú
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );

                const whatsappUrl = `https://wa.me/523921261074?text=${encodeURIComponent('Hola! Me interesa agregar mi negocio a la aplicación Kepido.')}`;

                return (
                  <div key={promo.id} className="w-[88vw] max-w-[380px] flex-shrink-0 snap-center">
                    {isRegisterPromo ? (
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block active:scale-[0.99] transition-transform">
                        {cardContent}
                      </a>
                    ) : promo.negocio_slug ? (
                      <Link href={`/${promo.negocio_slug}`} className="block active:scale-[0.99] transition-transform">
                        {cardContent}
                      </Link>
                    ) : (
                      cardContent
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Dots Indicator */}
            {promotions.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2">
                {promotions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPromoIndex(idx);
                      if (promoCarouselRef.current) {
                        const itemWidth = promoCarouselRef.current.clientWidth;
                        promoCarouselRef.current.scrollTo({
                          left: idx * itemWidth,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`h-1 rounded-full transition-all duration-350 cursor-pointer ${
                      idx === currentPromoIndex 
                        ? 'w-4 bg-[#FF6B00]' 
                        : 'w-1 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir a promo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Menu Category Carousel */}
        <div className="py-3.5 relative z-10">
          <section className="overflow-x-auto px-5 flex gap-4 no-scrollbar bg-transparent">
            {categoryChips.map(chip => (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(prev => prev === chip.id ? 'todos' : chip.id)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all shadow-xs relative overflow-hidden ${
                  selectedCategory === chip.id
                    ? 'ring-2 ring-[#FF6B00] scale-105 bg-white shadow-md'
                    : 'bg-white border border-[#FF6B00]/15 hover:border-[#FF6B00]/30 group-hover:bg-white/95'
                }`}>
                  <img 
                    src={chip.icon} 
                    alt={chip.label} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-[9.5px] font-semibold tracking-wide uppercase ${
                  selectedCategory === chip.id ? 'text-[#FF6B00]' : 'text-gray-500 group-hover:text-[#FF6B00]'
                }`}>
                  {chip.label}
                </span>
              </button>
            ))}
          </section>
        </div>
        {/* Smart Filter Chips - Inspired by Uber Eats / DoorDash */}
        <section className="px-5 pt-2 pb-1">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'abierto', label: 'Abierto ahora', icon: <Zap size={12} /> },
              { id: 'envio_gratis', label: 'Envío gratis', icon: <Truck size={12} /> },
              { id: 'mejor_calificados', label: 'Mejor calificados', icon: <Star size={12} /> },
              { id: 'mas_rapido', label: 'Más rápido', icon: <Clock size={12} /> },
            ].map(chip => {
              const isActive = activeFilters.has(chip.id);
              return (
                <button
                  key={chip.id}
                  onClick={() => toggleFilter(chip.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border active:scale-95 ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`transition-colors ${isActive ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {chip.icon}
                  </span>
                  {chip.label}
                </button>
              );
            })}
          </div>
          {activeFilters.size > 0 && (
            <button
              onClick={() => setActiveFilters(new Set())}
              className="mt-2 text-[12px] text-emerald-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Filter size={10} />
              Limpiar filtros ({activeFilters.size})
            </button>
          )}
        </section>
        
        {/* Top 10 Best Places Carousel - Hidden when filtering */}
        {!isFiltering && (
        <section className="mt-3.5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 className="text-title-2 sm:text-title-1 tracking-tight leading-tight text-gray-800">
              Top 10 Mejores Lugares
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar snap-x snap-mandatory">
            {topTenBusinesses.map((negocio, index) => {
              const isOpen = checkOpen(negocio.horario_apertura, negocio.horario_cierre, negocio.slug);
              const approval = getApprovalPercent(negocio.id);
              return (
                <Link 
                  href={`/${negocio.slug}`}
                  key={negocio.id}
                  className={`w-[310px] flex-shrink-0 bg-transparent active:scale-[0.99] transition-all duration-200 snap-center relative flex flex-col gap-2.5 ${
                    !isOpen ? 'opacity-50 grayscale-20' : ''
                  }`}
                >
                  {/* Cover Photo */}
                  <div className="relative h-42 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
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
                      <Heart 
                        size={14} 
                        className={favorites.includes(negocio.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} 
                      />
                    </button>
                  </div>
                  
                  {/* Info */}
                  <div className="text-left px-1 flex items-center gap-3">
                    {negocio.logo_url && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-150 flex-shrink-0 bg-slate-50 flex items-center justify-center shadow-xs">
                        <img 
                          src={negocio.logo_url} 
                          alt={`${negocio.nombre} Logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h4 className="text-title-3 text-gray-900 leading-tight truncate">
                        {negocio.nombre}
                      </h4>
                      <div className="flex items-center text-[12.5px] font-semibold gap-2">
                        {/* Costo de envio (Repartidor) */}
                        <div className="flex items-center gap-1.5">
                          <DeliveryMotoIcon className="text-emerald-600" size={15.5} />
                          <span className={(!negocio.costo_envio || negocio.costo_envio === 0) ? 'text-emerald-600' : 'text-gray-500'}>
                            {(!negocio.costo_envio || negocio.costo_envio === 0) ? 'Envío gratis' : `Envío por $${negocio.costo_envio}`}
                          </span>
                        </div>
                        
                        <span className="text-gray-250 font-normal">|</span>
                        
                        {/* Tiempo (Cronómetro) */}
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Timer size={14} className="text-gray-400" />
                          <span className="text-gray-500">{negocio.tiempo_delivery || '25-35 min'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        )}

        {/* Recomendaciones del Momento Carousel - Hidden when filtering */}
        {!isFiltering && recommendedBusinesses.length > 0 && (
        <section className="mt-3.5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 className="text-title-2 sm:text-title-1 tracking-tight leading-tight text-gray-800">
              {recommendedTitle}
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar snap-x snap-mandatory">
            {recommendedBusinesses.map((negocio) => {
              const isOpen = checkOpen(negocio.horario_apertura, negocio.horario_cierre, negocio.slug);
              return (
                <Link 
                  href={`/${negocio.slug}`}
                  key={`rec-${negocio.id}`}
                  className={`w-[240px] flex-shrink-0 bg-transparent active:scale-[0.99] transition-all duration-200 snap-center relative flex flex-col gap-2 ${
                    !isOpen ? 'opacity-50 grayscale-20' : ''
                  }`}
                >
                  {/* Cover Photo */}
                  <div className="h-[120px] w-full rounded-2xl overflow-hidden bg-slate-100 relative shadow-xs border border-gray-150">
                    {negocio.portada_url ? (
                      <img 
                        src={negocio.portada_url} 
                        alt={negocio.nombre} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-slate-200">
                        {negocio.nombre}
                      </div>
                    )}
                    
                    {/* Badge status */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm border ${
                        isOpen 
                          ? 'bg-emerald-500 text-white border-emerald-400' 
                          : 'bg-red-500 text-white border-red-400'
                      }`}>
                        {isOpen ? 'Abierto' : 'Cerrado'}
                      </span>
                    </div>

                    {/* Costo envío */}
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg shadow-sm">
                      Envío: {negocio.costo_envio === 0 ? 'Gratis' : `$${negocio.costo_envio}`}
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="px-1 flex flex-col gap-0.5">
                    <h3 className="font-bold text-[13.5px] text-gray-800 leading-tight truncate">
                      {negocio.nombre}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        {negocio.rating?.toFixed(1) || 'N/A'}
                      </span>
                      <span>•</span>
                      <span>{negocio.tiempo_delivery || '30-40 min'}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        )}

        {/* Featured Products Carousel - Hidden when filtering */}
        {!isFiltering && featuredProducts.length > 0 && (
          <section className="mt-5">
            <h2 className="text-title-2 sm:text-title-1 tracking-tight leading-tight text-gray-800 mb-3 px-5">
              Productos Destacados
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar">
              {featuredProducts.map(producto => (
                <button
                  key={producto.id}
                  onClick={() => {
                    setSelectedProduct(producto);
                    setIsProductModalOpen(true);
                  }}
                  className="w-40 flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/65 shadow-xs hover:border-emerald-350 hover:shadow-sm transition-all text-left active:scale-[0.98] cursor-pointer"
                >
                  <div className="h-28 bg-slate-100 relative">
                    {producto.imagen_url ? (
                      <img 
                        src={producto.imagen_url} 
                        alt={producto.nombre} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl font-bold bg-slate-100">
                        {producto.nombre[0]}
                      </div>
                    )}
                    {producto.rating && (
                      <span className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs text-rose-600 text-[12px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs border border-rose-50">
                        <Heart size={10} className="fill-rose-500 text-rose-500" />
                        {producto.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <span className="text-[8px] font-bold text-gray-400 block truncate">
                      {producto.negocio_nombre}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-[16px] truncate leading-tight">
                      {producto.nombre}
                    </h4>
                    <span className="font-bold text-emerald-600 text-[12px] block">
                      ${Number(producto.precio).toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Global Product Search Results */}
        {searchTerm.trim() !== '' && (
          <section className="px-5 mt-5">
            <h2 className="text-title-2 sm:text-title-1 tracking-tight leading-tight text-gray-800 mb-3">
              Productos Encontrados ({filteredProducts.length})
            </h2>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-gray-150 text-center py-8">
                <p className="text-gray-400 text-[12px]">No se encontraron productos coincidentes.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                {filteredProducts.map(producto => (
                  <button
                    key={producto.id}
                    onClick={() => {
                      setSelectedProduct(producto);
                      setIsProductModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-gray-200/60 hover:border-emerald-300 hover:shadow-xs transition-all text-left active:scale-[0.99] cursor-pointer"
                  >
                    {/* Image / Placeholder */}
                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-gray-100 flex-shrink-0 overflow-hidden relative">
                      {producto.imagen_url ? (
                        <img 
                          src={producto.imagen_url} 
                          alt={producto.nombre} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-semibold text-base">
                          {producto.nombre[0]}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {producto.negocio_nombre}
                        </span>
                        {producto.rating && (
                          <div className="flex items-center gap-0.5 text-rose-500 text-[12px] font-bold">
                            <Heart size={10} className="fill-rose-500 text-rose-500" />
                            <span>{producto.rating}</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-950 text-[16px] truncate mt-1 leading-tight">
                        {producto.nombre}
                      </h4>
                      {producto.descripcion && (
                        <p className="text-[12px] text-gray-400 truncate mt-0.5">
                          {producto.descripcion}
                        </p>
                      )}
                      <span className="font-bold text-gray-900 text-[12px] mt-1 block">
                        ${Number(producto.precio).toFixed(2)}
                      </span>
                    </div>

                    {/* Action Arrow */}
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <ChevronRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Business Grid */}
        <section className={isFiltering ? "mt-1 space-y-4" : "mt-3 space-y-4"}>
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center gap-2">
              <h2 className="text-title-2 sm:text-title-1 tracking-tight leading-tight text-gray-800">
                {isFiltering ? 'Resultados' : 'Locales en Jamay'}
              </h2>
              {isFiltering && (
                <span className="text-[12px] text-gray-400 font-semibold mt-1">({sorted.length})</span>
              )}
            </div>
            {isFiltering ? (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); setActiveFilters(new Set()); }}
                className="text-[12px] font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/70 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <X size={12} /> Limpiar
              </button>
            ) : (
              !loading && sorted.length > 0 && (
                <button 
                  onClick={() => setIsGridView(!isGridView)}
                  className="text-[13.5px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  {isGridView ? 'Ver menos' : 'Ver todos'}
                </button>
              )
            )}
          </div>
          {loading ? (
            /* Loading skeletons */
            <div className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-[310px] h-[230px] flex-shrink-0 bg-white rounded-2xl animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="px-5">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center py-12">
                <p className="text-gray-400 text-[12px]">No encontramos negocios para tu búsqueda.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); setActiveFilters(new Set()); }}
                  className="mt-3 text-[12px] font-bold text-emerald-600 hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          ) : (
            <div className={(isGridView || isFiltering) ? "grid grid-cols-1 gap-6 px-5 pb-6" : "flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar snap-x snap-mandatory"}>
              {sorted.map(negocio => {
                const isOpen = checkOpen(negocio.horario_apertura, negocio.horario_cierre, negocio.slug);
                const approval = getApprovalPercent(negocio.id);
                return (
                  <Link 
                    href={`/${negocio.slug}`}
                    key={negocio.id}
                    className={`${(isGridView || isFiltering) ? 'w-full' : 'w-[310px] flex-shrink-0 snap-center'} bg-transparent active:scale-[0.99] transition-all duration-200 relative flex flex-col gap-2.5 ${
                      !isOpen ? 'opacity-50 grayscale-20' : ''
                    }`}
                  >
                    {/* Cover Photo */}
                    <div className="relative h-42 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
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
                        <Heart 
                          size={14} 
                          className={favorites.includes(negocio.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} 
                        />
                      </button>
                    </div>
 
                    {/* Info */}
                    <div className="text-left px-1 flex items-center gap-3">
                      {negocio.logo_url && (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-150 flex-shrink-0 bg-slate-50 flex items-center justify-center shadow-xs">
                          <img 
                            src={negocio.logo_url} 
                            alt={`${negocio.nombre} Logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <h4 className="text-title-3 text-gray-900 leading-tight truncate">
                          {negocio.nombre}
                        </h4>
                        <div className="flex items-center text-[12.5px] font-semibold gap-2">
                          {/* Costo de envio (Repartidor) */}
                          <div className="flex items-center gap-1.5">
                            <DeliveryMotoIcon className="text-emerald-600" size={15.5} />
                            <span className={(!negocio.costo_envio || negocio.costo_envio === 0) ? 'text-emerald-600' : 'text-gray-500'}>
                              {(!negocio.costo_envio || negocio.costo_envio === 0) ? 'Envío gratis' : `Envío por $${negocio.costo_envio}`}
                            </span>
                          </div>
                          
                          <span className="text-gray-250 font-normal">|</span>
                          
                          {/* Tiempo (Cronómetro) */}
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Timer size={14} className="text-gray-400" />
                            <span className="text-gray-500">{negocio.tiempo_delivery || '25-35 min'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Mandaditos / RappiFavor - Hidden when filtering */}
        {!isFiltering && (
        <section className="px-5 mt-8 mb-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 border border-emerald-500/25 p-5 text-white shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
            {/* Background elements */}
            <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="absolute left-[-20px] bottom-[-20px] w-24 h-24 rounded-full bg-emerald-400/10 blur-xl" />
            
            <div className="relative flex items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">
                  <Sparkles size={8} /> KEPIDO MANDADOS
                </span>
                <h3 className="text-[17px] font-bold leading-tight mt-2.5">
                  ¿Necesitas un Mandadito?
                </h3>
                <p className="text-[11.5px] text-emerald-100 leading-relaxed font-medium">
                  ¿Que compremos algo en el súper, farmacia o traigamos un paquete? Nosotros vamos por ti en Jamay.
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-lg flex-shrink-0 overflow-hidden bg-emerald-900/30">
                <img 
                  src="/repartidor.webp" 
                  alt="Repartidor KEPIDO" 
                  className="w-full h-full object-cover object-top animate-fade-in"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
              <span className="text-[11px] text-emerald-100 font-bold">
                Tarifa base desde <span className="text-white font-extrabold">$35.00</span>
              </span>
              <button 
                onClick={() => setIsRappiFavorOpen(true)}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-[11px] py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Solicitar Mandado</span>
                <ChevronRight size={12} className="stroke-[3px]" />
              </button>
            </div>
          </div>
          
          {/* Enlace a legal debajo de la tarjeta */}
          <div className="text-center mt-3">
            <Link 
              href="/legal" 
              className="text-[11.5px] text-gray-400 hover:text-emerald-600 font-bold underline transition-colors"
            >
              Términos de Servicio y Aviso de Privacidad
            </Link>
          </div>
        </section>
        )}

        {/* Extra spacing at the bottom so content can clear the floating cart and bottom nav */}
        <div className="h-40" />
      </main>

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
        {/* Product Customizer Modal */}
        <ProductModal 
          isOpen={isProductModalOpen}
          product={selectedProduct}
          onClose={() => setIsProductModalOpen(false)}
          onAdd={handleAddItemToCart}
        />

        {/* KEPIDO Mandado Modal */}
        {isRappiFavorOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up border border-gray-150 relative no-scrollbar flex flex-col">
              {/* Header Portada Image with fade-out white gradient at the bottom */}
              <div className="relative h-[160px] w-full bg-slate-100 flex-shrink-0">
                <img 
                  src="/repartidor.webp" 
                  alt="Repartidor KEPIDO" 
                  className="w-full h-full object-cover object-top"
                />
                {/* White gradient fading from the bottom of the cover to the middle */}
                <div 
                  className="absolute inset-0" 
                  style={{ background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%)' }} 
                />
                
                {/* Floating Close Button */}
                <button 
                  onClick={() => setIsRappiFavorOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1.5 rounded-full bg-white/75 backdrop-blur-xs shadow-md border border-white/50 cursor-pointer z-10 hover:scale-105 active:scale-95"
                  aria-label="Cerrar modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body Container */}
              <div className="px-5 pb-5 space-y-4 -mt-5 relative z-10 flex-1">
                {/* Title & Description using KEPIDO Header structure */}
                <div className="text-center space-y-1.5">
                  <h2 className="text-title-2 tracking-tight leading-tight text-gray-800">
                    Solicitar Mandado
                  </h2>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-[95%] mx-auto">
                    Escribe qué necesitas que compremos, recojamos o enviemos. Te lo entregamos en minutos.
                  </p>
                </div>

                {favorError && (
                  <div className="bg-red-50 text-red-650 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100 shadow-sm">
                    <AlertTriangle size={14} className="flex-shrink-0 text-red-500" />
                    <span>{favorError}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[14px] font-bold text-black mb-1.5">
                      Tu Nombre *
                    </label>
                    <input 
                      type="text" 
                      value={favorNombre}
                      onChange={(e) => setFavorNombre(e.target.value)}
                      className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-black mb-1.5">
                      ¿Qué necesitas? (Detalle del favor) *
                    </label>
                    <textarea 
                      value={favorDescripcion}
                      onChange={(e) => setFavorDescripcion(e.target.value)}
                      rows={3}
                      className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                      placeholder="Ej. Comprar paracetamol de patente en Farmacia Guadalajara y un refresco Coca-Cola de 2 litros."
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-black mb-1.5">
                      Lugar de compra/recogida (Opcional)
                    </label>
                    <input 
                      type="text" 
                      value={favorRecogida}
                      onChange={(e) => setFavorRecogida(e.target.value)}
                      className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                      placeholder="Ej. Farmacia Guadalajara Centro / Oxxo de la plaza"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-black mb-1.5">
                      Dirección de Entrega *
                    </label>
                    <input 
                      type="text" 
                      value={favorEntrega}
                      onChange={(e) => setFavorEntrega(e.target.value)}
                      className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                      placeholder="Ej. Calle Hidalgo #45, Centro"
                    />
                  </div>
                </div>

                {/* Estimates Box */}
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-3.5 space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-orange-800 block">Tarifa Estimada</span>
                  <p className="text-[10px] text-orange-700 leading-relaxed font-semibold">
                    La tarifa base de mandados en Jamay inicia en <span className="text-orange-900 font-extrabold">$35.00 pesos</span>. El chofer asignado coordinará el monto final de envío y los costos de los productos al entregártelos.
                  </p>
                </div>

                {/* Send CTA */}
                <button 
                  onClick={handleSendFavor}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-3.5 rounded-2xl text-[12.5px] shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Truck size={15} />
                  <span>Enviar solicitud a WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

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
