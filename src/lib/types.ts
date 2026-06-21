export interface Negocio {
  id: string;
  slug: string;
  nombre: string;
  whatsapp: string;
  whatsapp_secundario?: string | null;
  horario_apertura: string; // "HH:MM:SS" or similar
  horario_cierre: string;    // "HH:MM:SS" or similar
  logo_url: string | null;
  portada_url: string | null;
  categoria_principal: string;
  activo: boolean;
  notas_envio?: string | null;
  created_at?: string;
  rating?: number;
  total_ratings?: number;
  tags?: string[];
  latitud?: number;
  longitud?: number;
  direccion?: string;
  descripcion?: string;
  costo_envio?: number;
  tiempo_delivery?: string;
  telefono?: string | null;
  delivery_propio?: boolean;
  instagram?: string;
  facebook?: string;
  promociones_locales?: { imagen_url: string; titulo: string; descripcion: string }[];
}

export interface CategoriaMenu {
  id: string;
  negocio_id: string;
  nombre: string;
  orden: number;
  created_at?: string;
  productos?: Producto[];
}

export interface Producto {
  id: string;
  categoria_id: string;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  imagen_url: string | null;
  disponible: boolean;
  created_at?: string;
  grupos_opciones?: GrupoOpciones[];
  destacado?: boolean;
  rating?: number;
  total_ratings?: number;
  negocio_id?: string;
  negocio_slug?: string;
  negocio_nombre?: string;
  negocio_whatsapp?: string;
  tags?: string[];
}

export interface GrupoOpciones {
  id: string;
  producto_id: string;
  nombre: string;
  seleccion_multiple: boolean;
  obligatorio: boolean;
  created_at?: string;
  opciones_extras?: OpcionExtra[];
}

export interface OpcionExtra {
  id: string;
  grupo_id: string;
  nombre: string;
  precio_adicional: number;
  created_at?: string;
}

// Frontend Application state interfaces
export interface CartItem {
  producto: Producto;
  cantidad: number;
  notas: string;
  // Selected options map: { grupo_id: OpcionExtra[] }
  opcionesSeleccionadas: {
    [grupoId: string]: OpcionExtra[];
  };
  precioTotalItem: number; // calculated at selection time (base price + extras) * quantity
}

export interface CartState {
  negocioId: string | null;
  negocioNombre: string | null;
  negocioWhatsapp: string | null;
  negocioNotasEnvio?: string | null;
  negocioCostoEnvio?: number | null;
  items: CartItem[];
}

export interface Promocion {
  id: string;
  imagen_url: string;
  titulo?: string;
  descripcion?: string;
  negocio_id?: string;
  negocio_slug?: string;
  activo: boolean;
  created_at?: string;
}
