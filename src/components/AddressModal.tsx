'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Pencil, Trash2, X, Check, Home, Briefcase, Plus, Map } from 'lucide-react';

interface AddressItem {
  id: string;
  text: string;
  label: string; // 'Casa', 'Trabajo', 'Otro'
  selected: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onChangeAddress: (address: string) => void;
}

// Simulated local mock suggestions in Jamay, Jalisco
const MOCK_JAMAY_SUGGESTIONS = [
  'Calle Libertad #100, Centro, Jamay, Jalisco',
  'Morelos #32, Centro, Jamay, Jalisco',
  'Porfirio Díaz #45, Centro, Jamay, Jalisco',
  'Morelos #163, Centro, Jamay, Jalisco',
  'Madero #80, Centro, Jamay, Jalisco',
  'Zaragoza #54, Centro, Jamay, Jalisco',
  'Libertad #152, Centro, Jamay, Jalisco',
  'Libertad #98, Centro, Jamay, Jalisco',
  'Calle Libertad #42, Centro, Jamay, Jalisco',
  'Calle Libertad #112, Centro, Jamay, Jalisco',
  'Frente al Banco Bienestar, Centro, Jamay, Jalisco',
  'Morelos #110, Centro, Jamay, Jalisco',
  'Libertad #18, Centro, Jamay, Jalisco',
  'Juárez #12, Centro, Jamay, Jalisco',
  'Hidalgo #88, Centro, Jamay, Jalisco'
];

export default function AddressModal({ isOpen, onClose, currentAddress, onChangeAddress }: AddressModalProps) {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Inline edit temp states
  const [editAddressText, setEditAddressText] = useState('');
  const [editAddressLabel, setEditAddressLabel] = useState('Casa');

  // Google Maps state
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const autocompleteService = useRef<any>(null);

  // Load Google Maps script if API key is provided
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'your-google-maps-key') {
      console.log('Google Maps API key not configured. Using local mock autocompletion.');
      return;
    }

    if ((window as any).google?.maps?.places) {
      setGoogleMapsLoaded(true);
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
      return;
    }

    // Prevent duplicate scripts
    const scriptId = 'google-maps-places-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if ((window as any).google?.maps?.places) {
          setGoogleMapsLoaded(true);
          autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  // Load addresses from LocalStorage on mount/open
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('rappi_jamay_addresses');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as AddressItem[];
          setAddresses(parsed);
        } catch (e) {
          initializeDefaultAddress();
        }
      } else {
        initializeDefaultAddress();
      }
    }
  }, [isOpen, currentAddress]);

  const initializeDefaultAddress = () => {
    const activeText = currentAddress || 'Calle Libertad #100, Centro, Jamay';
    const defaultList: AddressItem[] = [
      { id: 'default-1', text: activeText, label: 'Casa', selected: true }
    ];
    setAddresses(defaultList);
    localStorage.setItem('rappi_jamay_addresses', JSON.stringify(defaultList));
  };

  // Sync addresses to localStorage
  const saveAddressesToStorage = (updated: AddressItem[]) => {
    setAddresses(updated);
    localStorage.setItem('rappi_jamay_addresses', JSON.stringify(updated));
    
    // Find selected one and update global client_address
    const selected = updated.find(a => a.selected);
    if (selected) {
      localStorage.setItem('client_address', selected.text);
      onChangeAddress(selected.text);
    }
  };

  // Triggered when typing in address search bar
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    if (googleMapsLoaded && autocompleteService.current) {
      // Use real Google Places Autocomplete
      autocompleteService.current.getPlacePredictions(
        {
          input: searchQuery,
          componentRestrictions: { country: 'mx' },
          locationBias: new (window as any).google.maps.LatLng(20.2885, -102.7105), // Bias to Jamay
          radius: 10000 // 10km bias
        },
        (predictions: any[], status: any) => {
          if (status === 'OK' && predictions) {
            setSuggestions(predictions.map(p => p.description));
          } else {
            // Fallback to local filtering if Google search returns empty
            filterLocalMock();
          }
        }
      );
    } else {
      // Fallback: Local search filter
      filterLocalMock();
    }
  }, [searchQuery, googleMapsLoaded]);

  const filterLocalMock = () => {
    const query = searchQuery.toLowerCase();
    const filtered = MOCK_JAMAY_SUGGESTIONS.filter(item => 
      item.toLowerCase().includes(query)
    );
    setSuggestions(filtered);
  };

  const handleSelectAddress = (id: string) => {
    const updated = addresses.map(a => ({
      ...a,
      selected: a.id === id
    }));
    saveAddressesToStorage(updated);
    onClose();
  };

  const handleAddAddressText = (text: string) => {
    // Determine a label
    let label = 'Otro';
    if (addresses.length === 0) label = 'Casa';
    else if (addresses.length === 1) label = 'Trabajo';

    const newAddress: AddressItem = {
      id: 'addr-' + Date.now(),
      text: text,
      label: label,
      selected: true
    };

    // Deselect all others
    const updated = addresses.map(a => ({ ...a, selected: false }));
    const newList = [newAddress, ...updated];
    saveAddressesToStorage(newList);
    setSearchQuery('');
    setSuggestions([]);
    onClose();
  };

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const toDelete = addresses.find(a => a.id === id);
    const filtered = addresses.filter(a => a.id !== id);
    
    // If we deleted the active one, select another
    if (toDelete?.selected && filtered.length > 0) {
      filtered[0].selected = true;
    }
    
    saveAddressesToStorage(filtered);
    if (filtered.length === 0) {
      // Clear out active address if empty list
      localStorage.removeItem('client_address');
      onChangeAddress('Ingresa tu dirección...');
    }
  };

  const handleStartEdit = (item: AddressItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditAddressText(item.text);
    setEditAddressLabel(item.label);
  };

  const handleSaveEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editAddressText.trim()) return;

    const updated = addresses.map(a => {
      if (a.id === id) {
        return { ...a, text: editAddressText.trim(), label: editAddressLabel };
      }
      return a;
    });

    saveAddressesToStorage(updated);
    setEditingId(null);
  };

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'casa':
        return <Home size={15} className="text-emerald-500" />;
      case 'trabajo':
        return <Briefcase size={15} className="text-emerald-500" />;
      default:
        return <MapPin size={15} className="text-emerald-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-gray-100">
          <h2 className="text-[18px] font-bold text-gray-800">
            Agrega o escoge una dirección
          </h2>
          <button 
            onClick={onClose}
            className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full p-1.5 transition-colors cursor-pointer flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input block */}
        <div className="p-5 pb-3 border-b border-gray-100 bg-slate-50/50">
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden px-3.5 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text"
              placeholder="Escribe la dirección de entrega"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[13px] text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Panel */}
          {suggestions.length > 0 && (
            <div className="mt-2 bg-white border border-gray-150 rounded-xl shadow-lg max-h-48 overflow-y-auto z-20 divide-y divide-gray-50">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddAddressText(sug)}
                  className="w-full text-left py-2.5 px-4 text-[12px] text-gray-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors flex items-center gap-2"
                >
                  <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{sug}</span>
                </button>
              ))}
            </div>
          )}

          {/* Suggest typed address manually if typing but no official suggestions */}
          {searchQuery.trim() && suggestions.length === 0 && (
            <button
              onClick={() => handleAddAddressText(searchQuery.trim())}
              className="w-full mt-2 text-left py-2.5 px-4 text-[12px] text-emerald-600 font-bold bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors flex items-center gap-2"
            >
              <Plus size={13} />
              <span className="truncate">Usar dirección escrita: "{searchQuery}"</span>
            </button>
          )}
        </div>

        {/* Saved Addresses List */}
        <div className="flex-1 overflow-y-auto p-5 py-2 divide-y divide-gray-100">
          {addresses.length === 0 ? (
            <div className="py-8 text-center text-gray-450 flex flex-col items-center justify-center">
              <Map size={32} className="stroke-[1.5] mb-2 text-gray-300" />
              <p className="text-[13px] font-medium">No tienes direcciones guardadas.</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Ingresa una dirección en el buscador de arriba.</p>
            </div>
          ) : (
            addresses.map(item => (
              <div 
                key={item.id}
                className={`py-3.5 flex items-start justify-between gap-3 group transition-all ${
                  editingId === item.id ? '' : 'cursor-pointer'
                }`}
                onClick={() => editingId !== item.id && handleSelectAddress(item.id)}
              >
                {/* Radio selection circle or Edit label */}
                {editingId === item.id ? (
                  <div className="flex flex-col gap-2.5 w-full bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <input 
                      type="text"
                      value={editAddressText}
                      onChange={(e) => setEditAddressText(e.target.value)}
                      className="w-full text-[12px] border border-gray-300 rounded-lg p-2 bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="Modifica tu dirección..."
                      autoFocus
                    />
                    
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-gray-500">Etiqueta:</span>
                        {['Casa', 'Trabajo', 'Otro'].map(lbl => (
                          <button
                            key={lbl}
                            onClick={(e) => { e.stopPropagation(); setEditAddressLabel(lbl); }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                              editAddressLabel === lbl
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                          className="px-2.5 py-1 text-[10px] text-gray-500 hover:bg-gray-200 rounded-md transition-colors font-bold"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={(e) => handleSaveEdit(item.id, e)}
                          className="px-2.5 py-1 bg-slate-900 text-white hover:bg-emerald-600 rounded-md transition-colors font-bold flex items-center gap-0.5"
                        >
                          <Check size={10} /> Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Radio button on the left */}
                      <div className="mt-0.5 shrink-0">
                        {item.selected ? (
                          <div className="border-2 border-emerald-500 flex items-center justify-center w-5 h-5 rounded-full">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          </div>
                        ) : (
                          <div className="border-2 border-gray-300 w-5 h-5 rounded-full hover:border-emerald-400 transition-colors" />
                        )}
                      </div>

                      {/* Text & Icon/Label */}
                      <div className="min-w-0 flex-1">
                        <p className={`text-[13px] leading-snug font-bold ${
                          item.selected ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {item.text}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {getLabelIcon(item.label)}
                          <span className="text-[10px] text-gray-400 font-bold capitalize">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons (Pencil, Trash) */}
                    <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity pl-2">
                      <button
                        onClick={(e) => handleStartEdit(item, e)}
                        className="p-1.5 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="Editar dirección"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteAddress(item.id, e)}
                        className="p-1.5 text-gray-450 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar dirección"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
