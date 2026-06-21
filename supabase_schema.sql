-- Create Negocios Table
CREATE TABLE negocios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    whatsapp TEXT NOT NULL, -- including country code (e.g. 523312345678)
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL,
    logo_url TEXT,
    portada_url TEXT,
    categoria_principal TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0 NOT NULL,
    total_ratings INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Categorias Menu Table
CREATE TABLE categorias_menu (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    negocio_id UUID REFERENCES negocios(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    orden INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Productos Table
CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES categorias_menu(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE NOT NULL,
    destacado BOOLEAN DEFAULT FALSE NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0 NOT NULL,
    total_ratings INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Grupos Opciones Table
CREATE TABLE grupos_opciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    seleccion_multiple BOOLEAN DEFAULT FALSE NOT NULL,
    obligatorio BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Opciones Extras Table
CREATE TABLE opciones_extras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grupo_id UUID REFERENCES grupos_opciones(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    precio_adicional NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for optimized loading
CREATE INDEX idx_negocios_slug ON negocios(slug);
CREATE INDEX idx_categorias_menu_negocio ON categorias_menu(negocio_id);
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_grupos_opciones_producto ON grupos_opciones(producto_id);
CREATE INDEX idx_opciones_extras_grupo ON opciones_extras(grupo_id);

-- Enable Row Level Security (RLS)
ALTER TABLE negocios ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos_opciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE opciones_extras ENABLE ROW LEVEL SECURITY;

-- Enable Public Read Access (Select Policies)
CREATE POLICY "Allow public read access on negocios" ON negocios
    FOR SELECT USING (activo = TRUE);

CREATE POLICY "Allow public read access on categorias_menu" ON categorias_menu
    FOR SELECT USING (TRUE);

CREATE POLICY "Allow public read access on productos" ON productos
    FOR SELECT USING (disponible = TRUE);

CREATE POLICY "Allow public read access on grupos_opciones" ON grupos_opciones
    FOR SELECT USING (TRUE);

CREATE POLICY "Allow public read access on opciones_extras" ON opciones_extras
    FOR SELECT USING (TRUE);
