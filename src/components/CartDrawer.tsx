'use client';

import React, { useState } from 'react';
import { CartState, CartItem } from '@/lib/types';
import { X, Trash2, ShoppingBag, Send, AlertTriangle, FileText, ChevronRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartState;
  updateQuantity: (index: number, quantity: number) => void;
  updateItemNotes: (index: number, notes: string) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  updateItemNotes,
  removeItem,
  clearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalEnProductos = cart.items.reduce((sum, item) => sum + Number(item.precioTotalItem), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Drawer Card */}
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden animate-slide-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Header styled exactly like reference image */}
        <div className="p-5 border-b border-gray-150 bg-white flex items-center justify-between relative">
          <div className="flex-1 text-center">
            <h2 className="font-bold text-[17px] text-gray-900 tracking-tight">Tu Pedido</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="absolute right-5 p-2 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-300 transition-all text-gray-400 hover:text-gray-650 focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X size={15} />
          </button>
        </div>

        {cart.items.length === 0 ? (
          /* Empty Cart in minimalist aesthetic */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-16 h-16 bg-slate-50 text-gray-400 border border-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="stroke-[1.5]" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-800">Tu carrito está vacío</h3>
            <p className="text-xs text-gray-400 mt-1.5 max-w-xs leading-relaxed">
              Explora los negocios locales y arma tu pedido personalizado.
            </p>
            <button 
              type="button"
              onClick={onClose}
              className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
            >
              Ver Locales
            </button>
          </div>
        ) : (
          /* Cart Items & Form */
          <>
            <div className="bg-slate-50/50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Resumen de Compra
              </span>
              <button 
                type="button"
                onClick={clearCart}
                className="text-[10px] uppercase font-bold text-red-600 hover:text-red-750 flex items-center gap-1 cursor-pointer"
                title="Vaciar carrito"
              >
                <Trash2 size={11.5} />
                Vaciar carrito
              </button>
            </div>

            {/* Scrollable area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white">
              {/* Product list grouped by business */}
              <div className="space-y-6">
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
                    <div key={bizName} className="space-y-4">
                      {/* Business Group Header styled minimally */}
                      <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-[12px] font-bold uppercase tracking-wider text-gray-500">
                          {bizName}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-gray-100">
                        {items.map(({ item, originalIndex }) => (
                          <div key={originalIndex} className="py-4 first:pt-1 last:pb-1 flex items-start gap-4">
                            {/* Left: Product Image */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                              {item.producto.imagen_url ? (
                                <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-full h-full object-cover" />
                              ) : (
                                <ShoppingBag size={20} className="text-gray-300 stroke-[1.5]" />
                              )}
                            </div>

                            {/* Middle: Details & Counter */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between h-full min-h-[64px]">
                              <div className="space-y-0.5">
                                <h5 className="font-bold text-gray-800 text-[14.5px] leading-tight truncate">
                                  {item.producto.nombre}
                                </h5>
                                
                                {/* Selected extras or description */}
                                {Object.values(item.opcionesSeleccionadas).flat().length > 0 ? (
                                  <div className="space-y-0.5">
                                    {Object.values(item.opcionesSeleccionadas).flat().map((opt, optIdx) => (
                                      <p key={optIdx} className="text-[11px] text-gray-400 font-medium truncate">
                                        + {opt.nombre} {opt.precio_adicional > 0 ? `(+$${Number(opt.precio_adicional).toFixed(2)})` : ''}
                                      </p>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-gray-400 truncate leading-normal">
                                    {item.producto.descripcion || 'Sin descripción'}
                                  </p>
                                )}
                              </div>

                              {/* Item Notes */}
                              <div className="mt-2.5 flex items-center gap-1.5 bg-slate-50 border border-gray-150/60 rounded-lg px-2.5 py-1 max-w-[210px]">
                                <FileText size={10} className="text-gray-400 flex-shrink-0" />
                                <input 
                                  type="text"
                                  placeholder="Notas: sin cebolla..."
                                  value={item.notas || ''}
                                  onChange={(e) => updateItemNotes(originalIndex, e.target.value)}
                                  className="flex-1 text-[10.5px] text-gray-655 bg-transparent focus:outline-none border-none p-0 focus:ring-0 placeholder:text-gray-400 truncate"
                                />
                              </div>

                              {/* Counter exactly like the reference image */}
                              <div className="flex items-center gap-2.5 mt-2.5">
                                <button
                                  type="button"
                                  onClick={() => item.cantidad > 1 ? updateQuantity(originalIndex, item.cantidad - 1) : removeItem(originalIndex)}
                                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer text-sm font-semibold active:scale-95"
                                  aria-label="Disminuir cantidad"
                                >
                                  -
                                </button>
                                <span className="text-[13px] font-semibold text-gray-800 min-w-[15px] text-center">
                                  {item.cantidad}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(originalIndex, item.cantidad + 1)}
                                  className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer text-sm font-semibold active:scale-95"
                                  aria-label="Aumentar cantidad"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Right: Price & Delete */}
                            <div className="flex flex-col items-end justify-between h-full min-h-[64px] flex-shrink-0">
                              <span className="font-bold text-gray-900 text-[14.5px]">${Number(item.precioTotalItem).toFixed(2)}</span>
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

              {/* Delivery Notes Info only */}
              {cart.negocioNotasEnvio && (
                <div className="border-t border-gray-100 pt-4">
                  <div className="bg-slate-50 text-slate-600 text-[11.5px] p-3 rounded-xl border border-slate-100 leading-relaxed">
                    <p className="font-bold text-slate-700">Costos de Envío de este Local:</p>
                    <p className="mt-0.5 text-slate-500">{cart.negocioNotasEnvio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Order button pointing to /carrito */}
            <div className="p-5 bg-white border-t border-gray-100 space-y-4 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px] text-gray-500 font-medium">
                  <span>Subtotal en Productos</span>
                  <span>${totalEnProductos.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  * El costo de envío se calculará en la siguiente pantalla según tu dirección y método de entrega.
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="button"
                onClick={() => {
                  onClose();
                  window.location.href = '/carrito';
                }}
                className="w-full bg-gradient-to-r from-[#FF6B00] to-[#ff8800] hover:from-[#e55f00] hover:to-[#e57a00] active:scale-[0.99] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-md transition-all flex items-center justify-between cursor-pointer border-none"
              >
                <span className="text-[13.5px]">Proceder al Pedido</span>
                <span className="bg-black/20 text-white text-[12.5px] font-bold px-2.5 py-1 rounded-xl shadow-xs">
                  ${totalEnProductos.toFixed(2)}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
