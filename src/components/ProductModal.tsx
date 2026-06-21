'use client';

import React, { useState, useEffect } from 'react';
import { Producto, OpcionExtra, CartItem } from '@/lib/types';
import { X, Plus, Minus, AlertCircle, Heart } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  product: Producto | null;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
}

export default function ProductModal({ isOpen, product, onClose, onAdd }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [grupoId: string]: OpcionExtra[] }>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  // Interactive Product Rating State
  const [prodRating, setProdRating] = useState(5.0);
  const [totalProdCount, setTotalProdCount] = useState(1);
  const [totalProdSum, setTotalProdSum] = useState(5.0);
  const [userProdRating, setUserProdRating] = useState<number>(0);

  // Reset selections when modal opens with a new product
  useEffect(() => {
    if (product) {
      setQuantity(1);
      
      const initialOptions: { [grupoId: string]: OpcionExtra[] } = {};
      
      // Auto-select first option for mandatory single-select option groups
      product.grupos_opciones?.forEach(grupo => {
        if (grupo.obligatorio && !grupo.seleccion_multiple && grupo.opciones_extras && grupo.opciones_extras.length > 0) {
          initialOptions[grupo.id] = [grupo.opciones_extras[0]];
        } else {
          initialOptions[grupo.id] = [];
        }
      });
      
      setSelectedOptions(initialOptions);
      setValidationError(null);

      // Load product rating state
      const savedRating = localStorage.getItem(`rating_product_${product.id}`);
      if (savedRating) {
        setUserProdRating(Number(savedRating));
      } else {
        setUserProdRating(0);
      }
      
      const pRating = product.rating || 5.0;
      const pCount = product.total_ratings || 1;
      setProdRating(pRating);
      setTotalProdCount(pCount);
      setTotalProdSum(pRating * pCount);
    }
  }, [product]);

  const handleRateProduct = (score: number) => {
    if (!product) return;
    let diff = score;
    let countChange = 1;
    if (userProdRating > 0) {
      diff = score - userProdRating;
      countChange = 0;
    }
    
    const newSum = totalProdSum + diff;
    const newCount = totalProdCount + countChange;
    setTotalProdSum(newSum);
    setTotalProdCount(newCount);
    setUserProdRating(score);
    localStorage.setItem(`rating_product_${product.id}`, score.toString());
    
    product.rating = newSum / newCount;
    product.total_ratings = newCount;
  };

  if (!isOpen || !product) return null;

  const handleSelectOption = (grupoId: string, option: OpcionExtra, isMultiple: boolean) => {
    setSelectedOptions(prev => {
      const currentSelected = prev[grupoId] || [];
      
      if (isMultiple) {
        // Toggle selection
        const exists = currentSelected.some(item => item.id === option.id);
        const updated = exists
          ? currentSelected.filter(item => item.id !== option.id)
          : [...currentSelected, option];
        return { ...prev, [grupoId]: updated };
      } else {
        // Replace selection (radio behavior)
        return { ...prev, [grupoId]: [option] };
      }
    });
  };

  const isGroupSelected = (grupoId: string, optionId: string): boolean => {
    return (selectedOptions[grupoId] || []).some(item => item.id === optionId);
  };

  // Helper to validate mandatory option groups
  const validateSelections = (): boolean => {
    if (!product.grupos_opciones) return true;

    for (const grupo of product.grupos_opciones) {
      if (grupo.obligatorio) {
        const selections = selectedOptions[grupo.id] || [];
        if (selections.length === 0) {
          setValidationError(`Por favor, selecciona al menos una opción en "${grupo.nombre}"`);
          return false;
        }
      }
    }
    setValidationError(null);
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelections()) return;

    // Calculate total price
    const basePrice = Number(product.precio);
    const extrasPrice = Object.values(selectedOptions)
      .flat()
      .reduce((sum, opt) => sum + Number(opt.precio_adicional), 0);
    
    const singleItemPrice = basePrice + extrasPrice;
    const precioTotalItem = singleItemPrice * quantity;

    const cartItem: CartItem = {
      producto: product,
      cantidad: quantity,
      notas: '', // will be collected in the cart drawer
      opcionesSeleccionadas: selectedOptions,
      precioTotalItem
    };

    onAdd(cartItem);
    onClose();
  };

  // Calculate pricing in real-time
  const basePrice = Number(product.precio);
  const extrasPrice = Object.values(selectedOptions)
    .flat()
    .reduce((sum, opt) => sum + Number(opt.precio_adicional), 0);
  
  const singleItemPrice = basePrice + extrasPrice;
  const totalPrice = singleItemPrice * quantity;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Modal Card */}
      <div 
        className="relative w-full max-h-[92vh] sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Header (with close button) */}
        <div className="absolute right-4 top-4 z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Image */}
        {product.imagen_url && (
          <div className="w-full h-48 sm:h-56 relative bg-gray-100">
            <img 
              src={product.imagen_url} 
              alt={product.nombre} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Product details */}
        <div className="p-5 pb-3 border-b border-gray-100">
          <h2 className="text-title-2 text-gray-900 leading-tight">{product.nombre}</h2>
          {product.descripcion && (
            <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{product.descripcion}</p>
          )}

          {/* Interactive Heart Rating */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="text-xs text-gray-400 font-medium">¿Te gustó este platillo?</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRateProduct(star)}
                  className="cursor-pointer transition-transform active:scale-120 p-0.5"
                  aria-label={`Calificar producto con ${star} corazones`}
                >
                  <Heart
                    size={14}
                    className={`${
                      star <= (userProdRating || prodRating)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-rose-500">
              {((totalProdSum / totalProdCount) || prodRating).toFixed(1)}
              <span className="text-gray-400 font-medium text-[10px] ml-0.5">({totalProdCount})</span>
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-title-3 text-emerald-600">${basePrice.toFixed(2)} <span className="text-xs text-gray-400 font-normal">precio base</span></span>
          </div>
        </div>

        {/* Options List - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 max-h-[45vh] sm:max-h-[50vh]">
          {product.grupos_opciones && product.grupos_opciones.length > 0 ? (
            product.grupos_opciones.map(grupo => (
              <fieldset key={grupo.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <legend className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                    {grupo.nombre}
                  </legend>
                  {grupo.obligatorio ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-50 text-red-600 border border-red-100">
                      Obligatorio
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-gray-50 text-gray-400">
                      Opcional
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl divide-y divide-gray-200/60 overflow-hidden border border-gray-100">
                  {grupo.opciones_extras && grupo.opciones_extras.map(opcion => {
                    const isSelected = isGroupSelected(grupo.id, opcion.id);
                    return (
                      <label 
                        key={opcion.id}
                        className={`flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-emerald-50/30 transition-colors ${
                          isSelected ? 'bg-emerald-50/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type={grupo.seleccion_multiple ? "checkbox" : "radio"}
                            name={`grupo-${grupo.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(grupo.id, opcion, grupo.seleccion_multiple)}
                            className="w-5 h-5 rounded-full text-emerald-600 border-gray-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                          />
                          <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {opcion.nombre}
                          </span>
                        </div>
                        {opcion.precio_adicional > 0 && (
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-md">
                            +${Number(opcion.precio_adicional).toFixed(2)}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 py-6">Este platillo no requiere especificaciones.</p>
          )}
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="px-5 py-2.5 bg-red-50 border-t border-b border-red-100 text-red-600 flex items-center gap-2 text-xs font-semibold">
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        {/* Footer controls: Quantity and Add to Cart */}
        <div className="p-5 bg-white border-t border-gray-100 flex items-center justify-between gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          {/* Quantity selector - Rounded Pill */}
          <div className="flex items-center bg-slate-50 border border-gray-150 rounded-full p-1 gap-1.5 shadow-xs">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-gray-600 hover:text-emerald-600 flex items-center justify-center transition-all border border-gray-200/50 focus:outline-none active:scale-95 cursor-pointer"
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
            >
              <Minus size={14} className="stroke-[2.5]" />
            </button>
            <span className="px-2 font-bold text-gray-800 text-[15px] min-w-[20px] text-center">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-gray-600 hover:text-emerald-600 flex items-center justify-center transition-all border border-gray-200/50 focus:outline-none active:scale-95 cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Add Button - Premium Rounded Pill Gradient */}
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white font-extrabold py-3.5 px-6 rounded-full shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-between cursor-pointer border-none"
          >
            <span className="text-[13.5px]">Agregar al Pedido</span>
            <span className="bg-emerald-700/60 text-white text-[12.5px] font-bold px-3 py-1 rounded-xl shadow-xs">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
