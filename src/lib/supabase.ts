import { createClient } from '@supabase/supabase-js';
import { Negocio, CategoriaMenu, Producto, GrupoOpciones, OpcionExtra, Promocion } from './types';
import { mockNegocios, mockCategoriasMenu, mockProductos, mockGruposOpciones, mockOpcionesExtras, mockPromociones } from './mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials are properly configured (not empty and not the placeholder)
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseUrl !== 'your-supabase-project-url' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-supabase-anon-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetch all businesses
 */
export async function getNegocios(): Promise<Negocio[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Using Mock Data for getNegocios');
    return mockNegocios.filter(n => n.activo);
  }

  try {
    const { data, error } = await supabase
      .from('negocios')
      .select('*')
      .eq('activo', true)
      .order('nombre');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching businesses from Supabase, falling back to mock:', error);
    return mockNegocios.filter(n => n.activo);
  }
}

/**
 * Fetch complete nested menu for a business by its slug
 */
export async function getNegocioCompleto(slug: string): Promise<{
  negocio: Negocio;
  categorias: CategoriaMenu[];
} | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.log(`Using Mock Data for getNegocioCompleto(${slug})`);
    const negocio = mockNegocios.find(n => n.slug === slug && n.activo);
    if (!negocio) return null;

    // Get categories
    const categorias = mockCategoriasMenu
      .filter(c => c.negocio_id === negocio.id)
      .sort((a, b) => a.orden - b.orden);

    // Map products, options, etc.
    const categoriasConProductos = categorias.map(cat => {
      const productos = mockProductos
        .filter(p => p.categoria_id === cat.id && p.disponible)
        .map(prod => {
          const grupos = mockGruposOpciones
            .filter(g => g.producto_id === prod.id)
            .map(grupo => {
              const extras = mockOpcionesExtras.filter(e => e.grupo_id === grupo.id);
              return { ...grupo, opciones_extras: extras };
            });
          return { ...prod, grupos_opciones: grupos };
        });
      return { ...cat, productos };
    });

    return { negocio, categorias: categoriasConProductos };
  }

  try {
    // 1. Fetch business
    const { data: negocio, error: negocioError } = await supabase
      .from('negocios')
      .select('*')
      .eq('slug', slug)
      .eq('activo', true)
      .maybeSingle();

    if (negocioError) throw negocioError;
    if (!negocio) return null;

    // 2. Fetch categories
    const { data: categorias, error: catError } = await supabase
      .from('categorias_menu')
      .select('*')
      .eq('negocio_id', negocio.id)
      .order('orden');

    if (catError) throw catError;

    if (!categorias || categorias.length === 0) {
      return { negocio, categorias: [] };
    }

    const catIds = categorias.map(c => c.id);

    // 3. Fetch products
    const { data: productos, error: prodError } = await supabase
      .from('productos')
      .select('*')
      .in('categoria_id', catIds)
      .eq('disponible', true);

    if (prodError) throw prodError;

    // 4. Fetch option groups if we have products
    let optionGroups: GrupoOpciones[] = [];
    let optionsExtras: OpcionExtra[] = [];

    if (productos && productos.length > 0) {
      const prodIds = productos.map(p => p.id);
      
      const { data: grupos, error: grupoError } = await supabase
        .from('grupos_opciones')
        .select('*')
        .in('producto_id', prodIds);

      if (grupoError) throw grupoError;
      optionGroups = grupos || [];

      if (optionGroups.length > 0) {
        const grupoIds = optionGroups.map(g => g.id);
        const { data: extras, error: extraError } = await supabase
          .from('opciones_extras')
          .select('*')
          .in('grupo_id', grupoIds);

        if (extraError) throw extraError;
        optionsExtras = extras || [];
      }
    }

    // 5. Assemble relational tree in memory
    const categoriasConProductos: CategoriaMenu[] = categorias.map(cat => {
      const catProductos = (productos || [])
        .filter(p => p.categoria_id === cat.id)
        .map(prod => {
          const prodGrupos = optionGroups
            .filter(g => g.producto_id === prod.id)
            .map(grupo => {
              const grupoExtras = optionsExtras.filter(e => e.grupo_id === grupo.id);
              return {
                ...grupo,
                opciones_extras: grupoExtras
              };
            });
          
          return {
            ...prod,
            grupos_opciones: prodGrupos
          };
        });

      return {
        ...cat,
        productos: catProductos
      };
    });

    return { negocio, categorias: categoriasConProductos };

  } catch (error) {
    console.error(`Error fetching business completeness for slug ${slug} from Supabase:`, error);
    // fallback to mock
    return getNegocioCompletoMock(slug);
  }
}

// Fallback helper for mock
function getNegocioCompletoMock(slug: string) {
  const negocio = mockNegocios.find(n => n.slug === slug && n.activo);
  if (!negocio) return null;

  const categorias = mockCategoriasMenu
    .filter(c => c.negocio_id === negocio.id)
    .sort((a, b) => a.orden - b.orden);

  const categoriasConProductos = categorias.map(cat => {
    const productos = mockProductos
      .filter(p => p.categoria_id === cat.id && p.disponible)
      .map(prod => {
        const grupos = mockGruposOpciones
          .filter(g => g.producto_id === prod.id)
          .map(grupo => {
            const extras = mockOpcionesExtras.filter(e => e.grupo_id === grupo.id);
            return { ...grupo, opciones_extras: extras };
          });
        return { ...prod, grupos_opciones: grupos };
      });
    return { ...cat, productos };
  });

  return { negocio, categorias: categoriasConProductos };
}

/**
 * Fetch featured products across all active businesses
 */
export async function getProductosDestacados(): Promise<Producto[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Using Mock Data for getProductosDestacados');
    return getProductosDestacadosMock();
  }

  try {
    const { data: activeNegocios, error: negError } = await supabase
      .from('negocios')
      .select('id, slug, nombre, whatsapp')
      .eq('activo', true);

    if (negError) throw negError;
    if (!activeNegocios || activeNegocios.length === 0) return [];

    const negIds = activeNegocios.map(n => n.id);

    const { data: categorias, error: catError } = await supabase
      .from('categorias_menu')
      .select('id, negocio_id')
      .in('negocio_id', negIds);

    if (catError) throw catError;
    if (!categorias || categorias.length === 0) return [];

    const catIds = categorias.map(c => c.id);

    const { data: productos, error: prodError } = await supabase
      .from('productos')
      .select('*')
      .in('categoria_id', catIds)
      .eq('destacado', true)
      .eq('disponible', true);

    if (prodError) throw prodError;
    if (!productos || productos.length === 0) return [];

    const prodIds = productos.map(p => p.id);
    const { data: grupos, error: grupoError } = await supabase
      .from('grupos_opciones')
      .select('*')
      .in('producto_id', prodIds);

    if (grupoError) throw grupoError;
    const optionGroups = grupos || [];

    let optionsExtras: OpcionExtra[] = [];
    if (optionGroups.length > 0) {
      const grupoIds = optionGroups.map(g => g.id);
      const { data: extras, error: extraError } = await supabase
        .from('opciones_extras')
        .select('*')
        .in('grupo_id', grupoIds);

      if (extraError) throw extraError;
      optionsExtras = extras || [];
    }

    const mapped = productos.map(prod => {
      const cat = categorias.find(c => c.id === prod.categoria_id);
      const negocio = cat ? activeNegocios.find(n => n.id === cat.negocio_id) : null;
      
      const prodGrupos = optionGroups
        .filter(g => g.producto_id === prod.id)
        .map(grupo => {
          const grupoExtras = optionsExtras.filter(e => e.grupo_id === grupo.id);
          return {
            ...grupo,
            opciones_extras: grupoExtras
          };
        });

      return {
        ...prod,
        grupos_opciones: prodGrupos,
        negocio_id: negocio?.id,
        negocio_slug: negocio?.slug,
        negocio_nombre: negocio?.nombre,
        negocio_whatsapp: negocio?.whatsapp
      };
    });

    return mapped;
  } catch (error) {
    console.error('Error fetching featured products from Supabase, falling back to mock:', error);
    return getProductosDestacadosMock();
  }
}

function getProductosDestacadosMock(): Producto[] {
  return mockProductos
    .filter(p => p.destacado && p.disponible)
    .map(prod => {
      const cat = mockCategoriasMenu.find(c => c.id === prod.categoria_id);
      const negocio = cat ? mockNegocios.find(n => n.id === cat.negocio_id) : null;
      const grupos = mockGruposOpciones
        .filter(g => g.producto_id === prod.id)
        .map(grupo => {
          const extras = mockOpcionesExtras.filter(e => e.grupo_id === grupo.id);
          return { ...grupo, opciones_extras: extras };
        });
      return {
        ...prod,
        grupos_opciones: grupos,
        negocio_id: negocio?.id,
        negocio_slug: negocio?.slug,
        negocio_nombre: negocio?.nombre,
        negocio_whatsapp: negocio?.whatsapp
      };
    });
}

/**
 * Fetch all products across all active businesses (for global search)
 */
export async function getAllProductos(): Promise<Producto[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Using Mock Data for getAllProductos');
    return getAllProductosMock();
  }

  try {
    const { data: activeNegocios, error: negError } = await supabase
      .from('negocios')
      .select('id, slug, nombre, whatsapp')
      .eq('activo', true);

    if (negError) throw negError;
    if (!activeNegocios || activeNegocios.length === 0) return [];

    const negIds = activeNegocios.map(n => n.id);

    const { data: categorias, error: catError } = await supabase
      .from('categorias_menu')
      .select('id, negocio_id')
      .in('negocio_id', negIds);

    if (catError) throw catError;
    if (!categorias || categorias.length === 0) return [];

    const catIds = categorias.map(c => c.id);

    const { data: productos, error: prodError } = await supabase
      .from('productos')
      .select('*')
      .in('categoria_id', catIds)
      .eq('disponible', true);

    if (prodError) throw prodError;
    if (!productos || productos.length === 0) return [];

    const prodIds = productos.map(p => p.id);
    const { data: grupos, error: grupoError } = await supabase
      .from('grupos_opciones')
      .select('*')
      .in('producto_id', prodIds);

    if (grupoError) throw grupoError;
    const optionGroups = grupos || [];

    let optionsExtras: OpcionExtra[] = [];
    if (optionGroups.length > 0) {
      const grupoIds = optionGroups.map(g => g.id);
      const { data: extras, error: extraError } = await supabase
        .from('opciones_extras')
        .select('*')
        .in('grupo_id', grupoIds);

      if (extraError) throw extraError;
      optionsExtras = extras || [];
    }

    const mapped = productos.map(prod => {
      const cat = categorias.find(c => c.id === prod.categoria_id);
      const negocio = cat ? activeNegocios.find(n => n.id === cat.negocio_id) : null;
      
      const prodGrupos = optionGroups
        .filter(g => g.producto_id === prod.id)
        .map(grupo => {
          const grupoExtras = optionsExtras.filter(e => e.grupo_id === grupo.id);
          return {
            ...grupo,
            opciones_extras: grupoExtras
          };
        });

      return {
        ...prod,
        grupos_opciones: prodGrupos,
        negocio_id: negocio?.id,
        negocio_slug: negocio?.slug,
        negocio_nombre: negocio?.nombre,
        negocio_whatsapp: negocio?.whatsapp
      };
    });

    return mapped;
  } catch (error) {
    console.error('Error fetching all products from Supabase, falling back to mock:', error);
    return getAllProductosMock();
  }
}

function getAllProductosMock(): Producto[] {
  return mockProductos
    .filter(p => p.disponible)
    .map(prod => {
      const cat = mockCategoriasMenu.find(c => c.id === prod.categoria_id);
      const negocio = cat ? mockNegocios.find(n => n.id === cat.negocio_id) : null;
      const grupos = mockGruposOpciones
        .filter(g => g.producto_id === prod.id)
        .map(grupo => {
          const extras = mockOpcionesExtras.filter(e => e.grupo_id === grupo.id);
          return { ...grupo, opciones_extras: extras };
        });
      return {
        ...prod,
        grupos_opciones: grupos,
        negocio_id: negocio?.id,
        negocio_slug: negocio?.slug,
        negocio_nombre: negocio?.nombre,
        negocio_whatsapp: negocio?.whatsapp
      };
    });
}

/**
 * Fetch active promotional banners
 */
export async function getPromociones(): Promise<Promocion[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Using Mock Data for getPromociones');
    return mockPromociones.filter(p => p.activo);
  }

  try {
    const { data, error } = await supabase
      .from('promociones')
      .select('*')
      .eq('activo', true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching promotions from Supabase, falling back to mock:', error);
    return mockPromociones.filter(p => p.activo);
  }
}
