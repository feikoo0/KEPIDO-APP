import { Negocio, CategoriaMenu, Producto, GrupoOpciones, OpcionExtra, Promocion } from './types';

// Mock Businesses (Negocios)
export const mockNegocios: Negocio[] = [
  {
    id: 'n0',
    slug: 'mazter-pizza',
    nombre: 'Mazter Pizza',
    whatsapp: '523921231915', // WhatsApp: 392 123 1915
    telefono: '3929242564', // Llamadas: 392 924 2564
    delivery_propio: true,
    horario_apertura: '13:00:00',
    horario_cierre: '23:00:00',
    logo_url: '/foto perfil mazter pizza.jpg',
    portada_url: '/foto portada mazter pizza.jpg',
    categoria_principal: 'Pizzas y Hamburguesas',
    activo: true,
    notas_envio: 'Servicio a domicilio gratis en Jamay. Al Batallón $15. Afueras del pueblo $40.',
    rating: 4.8,
    total_ratings: 24,
    tags: ['Pizza', 'Hamburguesas', 'Alitas', 'Cena', 'Fast Food'],
    latitud: 20.2895,
    longitud: -102.7105,
    direccion: 'Morelos #32, Centro, Jamay',
    descripcion: 'Pizzas artesanales al horno, hamburguesas jugosas y alitas crujientes con las mejores salsas de Jamay.',
    costo_envio: 0,
    tiempo_delivery: '30-45 min',
    instagram: 'mazterpizza_jamay',
    facebook: 'MazterPizza',
    promociones_locales: [
      {
        imagen_url: '/burger_3d_icon.png',
        titulo: 'Combazo Godín',
        descripcion: '2 Hamburguesas + 2 Papas por $150'
      },
      {
        imagen_url: '/pizza_3d_icon.png',
        titulo: 'Viernes de Pizza',
        descripcion: 'En la compra de tu pizza grande llévate un refresco de 2L gratis.'
      }
    ]
  },
  {
    id: 'n2',
    slug: 'nutri-deli',
    nombre: 'Nutri Deli',
    whatsapp: '523921275364',
    horario_apertura: '07:00:00',
    horario_cierre: '15:00:00',
    logo_url: '/foto perfil nutri deli.png',
    portada_url: '/foto portada nutri deli.png',
    categoria_principal: 'Saludable',
    activo: true,
    notas_envio: 'Morelos #163, Jamay. Servicio a domicilio.',
    rating: 4.7,
    total_ratings: 15,
    tags: ['Saludable', 'Ensaladas', 'Jugos', 'Lonches', 'Sandwiches', 'Desayunos'],
    latitud: 20.2868,
    longitud: -102.7092,
    direccion: 'Morelos #163, Centro, Jamay',
    descripcion: 'Desayunos nutritivos, jugos naturales prensados en frío, ensaladas frescas y lonches balanceados.',
    costo_envio: 35,
    tiempo_delivery: '25-40 min'
  },
  {
    id: 'n3',
    slug: 'nieves-don-chicho',
    nombre: 'Nieves de Garrafa Don Chicho',
    whatsapp: '523921275364', // using a functional WhatsApp contact
    horario_apertura: '10:00:00',
    horario_cierre: '22:00:00',
    logo_url: '/foto perfil chicho.png',
    portada_url: '/foto portada chicho.png',
    categoria_principal: 'Postres y Antojos Dulces',
    activo: true,
    notas_envio: 'Nieve de Garrafa y Café en Jamay. Servicio a domicilio.',
    rating: 4.9,
    total_ratings: 38,
    tags: ['Nieves', 'Helados', 'cafe', 'Frappes', 'Malteadas', 'Postres', 'Bebidas'],
    latitud: 20.2891,
    longitud: -102.7121,
    direccion: 'Madero #80, Centro, Jamay',
    descripcion: 'Nieves artesanales de garrafa con frutas naturales y café gourmet caliente y frío.',
    costo_envio: 35,
    tiempo_delivery: '15-30 min'
  },
  {
    id: 'n4',
    slug: 'dapur-asia',
    nombre: 'Comida China Dapur Asia',
    whatsapp: '523921073749',
    horario_apertura: '12:00:00',
    horario_cierre: '20:00:00',
    logo_url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Asiática',
    activo: true,
    notas_envio: 'Servicio a domicilio rápido en todo Jamay.',
    rating: 4.8,
    total_ratings: 31,
    tags: ['China', 'Arroz', 'Cantones', 'Noodles', 'Asiática', 'Almuerzo', 'Comida', 'Pollo'],
    latitud: 20.2874,
    longitud: -102.7115,
    direccion: 'Morelos #110, Centro, Jamay',
    descripcion: 'Deliciosa comida china cantonesa y noodles preparados al wok en el momento.',
    costo_envio: 35,
    tiempo_delivery: '30-45 min'
  },
  {
    id: 'n5',
    slug: 'pollos-jez',
    nombre: 'Pollos Jez',
    whatsapp: '523921073749',
    horario_apertura: '10:30:00',
    horario_cierre: '18:30:00',
    logo_url: 'https://images.unsplash.com/photo-1587593817647-4397991341ff?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Pollos al Carbón',
    activo: true,
    notas_envio: 'Pollo y costilla a la leña calientito.',
    rating: 4.9,
    total_ratings: 27,
    tags: ['Pollo', 'Costillas', 'Al carbón', 'Asado', 'Almuerzo', 'Comida', 'Alitas', 'Carnes', 'Asados'],
    latitud: 20.2898,
    longitud: -102.7088,
    direccion: 'Zaragoza #54, Centro, Jamay',
    descripcion: 'Jugosos pollos al carbón y costillitas asadas acompañadas de arroz, papas y salsas picositas.',
    costo_envio: 35,
    tiempo_delivery: '25-40 min'
  },
  {
    id: 'n6',
    slug: 'el-nuevo-calamar',
    nombre: 'El Nuevo Calamar',
    whatsapp: '523921073749',
    horario_apertura: '10:00:00',
    horario_cierre: '18:00:00',
    logo_url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Mariscos',
    activo: true,
    notas_envio: 'Los mariscos más frescos de Jamay directos a tu mesa.',
    rating: 4.8,
    total_ratings: 35,
    tags: ['Mariscos', 'Ceviche', 'Camarones', 'Pescado', 'Cocteles', 'Almuerzo', 'Tostadas'],
    latitud: 20.2855,
    longitud: -102.7099,
    direccion: 'Libertad #18, Centro, Jamay',
    descripcion: 'Cocteles, aguachiles y tostadas de camarón y mariscos frescos preparados con recetas locales.',
    costo_envio: 35,
    tiempo_delivery: '30-45 min'
  },
  {
    id: 'n7',
    slug: 'pizzas-libertad',
    nombre: 'Pizzas Libertad',
    whatsapp: '523921073749',
    horario_apertura: '17:00:00',
    horario_cierre: '23:00:00',
    logo_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Pizzas y Hamburguesas',
    activo: true,
    notas_envio: 'Pizzas artesanales de 30cm cocinadas al momento.',
    rating: 4.9,
    total_ratings: 19,
    tags: ['Pizza', 'Italiana', 'Artesanal', 'Cena', 'Toritos', 'Bombón', 'Fast Food'],
    latitud: 20.2861,
    longitud: -102.7126,
    direccion: 'Libertad #152, Centro, Jamay',
    descripcion: 'Exquisita variedad de pizzas rústicas con ingredientes frescos y masa delgada.',
    costo_envio: 35,
    tiempo_delivery: '35-50 min'
  },
  {
    id: 'n8',
    slug: 'el-gordo-richy',
    nombre: 'El Gordo Richy',
    whatsapp: '523921086117',
    horario_apertura: '17:00:00',
    horario_cierre: '23:30:00',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Tacos y Hamburguesas',
    activo: true,
    notas_envio: 'Horario: Martes a Domingo de 5:00 PM a 11:30 PM. Tacos, Hamburguesas, Lonches y Burritos. Pedidos al 3921086117.',
    rating: 4.8,
    total_ratings: 14,
    tags: ['Tacos', 'Birria', 'Hamburguesas', 'Lonches', 'Burritos', 'Almuerzo', 'Cena', 'Bistec', 'Tortas'],
    latitud: 20.2872,
    longitud: -102.7128,
    direccion: 'Calle Libertad #42, Centro, Jamay',
    descripcion: 'Riquísimos tacos de birria y bistec, lonches calientes y hamburguesas con papas fritas.',
    costo_envio: 35,
    tiempo_delivery: '25-40 min'
  },
  {
    id: 'n9',
    slug: 'cafe-cali',
    nombre: 'Cafe Calli',
    whatsapp: '523921009557',
    horario_apertura: '08:30:00',
    horario_cierre: '23:00:00',
    logo_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Cafetería y Alimentos',
    activo: true,
    notas_envio: 'Desayunos, Comida, Crepas y Cafés. Abierto todos los días de 8:30 AM a 11:00 PM.',
    rating: 4.9,
    total_ratings: 41,
    tags: ['cafe', 'Desayunos', 'Chilaquiles', 'Crepas', 'Hamburguesas', 'Sushi', 'Frappes', 'Bebidas', 'Postres'],
    latitud: 20.2885,
    longitud: -102.7118,
    direccion: 'Libertad #98, Centro, Jamay',
    descripcion: 'La mejor barra de cafés de la zona, chilaquiles abundantes, crepas dulces y sushis espectaculares.',
    costo_envio: 0,
    tiempo_delivery: '20-35 min'
  },
  {
    id: 'n10',
    slug: 'el-trompo',
    nombre: 'El Trompo',
    whatsapp: '523921009557', // Consolidated dispatcher
    horario_apertura: '07:00:00',
    horario_cierre: '14:00:00',
    logo_url: 'https://images.unsplash.com/photo-1555124818-7255161405bc?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Desayunos y Lonches',
    activo: true,
    notas_envio: 'Sabrosos Lonches, Chilaquiles, Omelettes y Licuados. Todos los días de 7:00 AM a 2:00 PM.',
    rating: 4.9,
    total_ratings: 32,
    tags: ['Lonches', 'Chilaquiles', 'Omelettes', 'Baguettes', 'Desayunos', 'Licuados', 'Menudo', 'Tortas'],
    latitud: 20.2878,
    longitud: -102.7125,
    direccion: 'Calle Libertad #112, Centro, Jamay',
    descripcion: 'Especialistas en desayunos tradicionales mexicanos, menudo dominguero, omelettes y lonches norteños.',
    costo_envio: 35,
    tiempo_delivery: '20-30 min'
  },
  {
    id: 'n11',
    slug: 'el-senador',
    nombre: 'Restaurante Bar El Senador',
    whatsapp: '523921009557', // Consolidated central dispatcher
    horario_apertura: '12:30:00',
    horario_cierre: '18:30:00',
    logo_url: '/foto perfil senador.png',
    portada_url: '/foto portada el senador.png',
    categoria_principal: 'Mariscos y Carnes',
    activo: true,
    notas_envio: 'Horario: Domingo a Jueves de 12:30 PM a 6:30 PM. Viernes y Sábado de 12:30 PM a 11:30 PM. Especialidades en mariscos y cortes premium.',
    rating: 5.0,
    total_ratings: 45,
    tags: ['Mariscos', 'Pescados', 'Carnes', 'Cortes', 'Bar', 'Comida', 'Almuerzo'],
    latitud: 20.2865,
    longitud: -102.7132,
    direccion: 'Jamay, Jalisco, México',
    descripcion: 'Las mejores especialidades de mariscos y cortes de carne en Jamay. Tradición y sabor.',
    costo_envio: 35,
    tiempo_delivery: '35-50 min'
  },
  {
    id: 'n12',
    slug: 'california-burger',
    nombre: 'California Burger',
    whatsapp: '18056365844',
    horario_apertura: '17:00:00',
    horario_cierre: '23:00:00',
    logo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Hamburguesas al Carbón',
    activo: true,
    notas_envio: 'Horario: Abierto todos los días de 5:00 PM a 11:00 PM. Hamburguesas al carbón con el original sabor de la playa.',
    rating: 4.8,
    total_ratings: 12,
    tags: ['Hamburguesas', 'Al carbón', 'Snacks', 'Cena', 'Fast Food'],
    latitud: 20.2885,
    longitud: -102.7118,
    direccion: 'Frente al Banco Bienestar, Centro, Jamay',
    descripcion: 'Hamburguesas al carbón premium, snacks deliciosos y papas preparadas con ingredientes frescos.',
    costo_envio: 35,
    tiempo_delivery: '25-40 min'
  },
  {
    id: 'n13',
    slug: 'tortas-ahogadas-el-chespi',
    nombre: 'Tortas Ahogadas El Chespi',
    whatsapp: '523921586170',
    whatsapp_secundario: '523921053502',
    horario_apertura: '08:30:00',
    horario_cierre: '16:00:00',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&auto=format&fit=crop&q=80',
    portada_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1000&auto=format&fit=crop&q=80',
    categoria_principal: 'Tortas Ahogadas',
    activo: true,
    notas_envio: 'Envío a domicilio disponible en todo Jamay por un pequeño costo extra.',
    rating: 4.9,
    total_ratings: 35,
    tags: ['Tortas Ahogadas', 'Tacos', 'Carnitas', 'Almuerzo', 'Mexicana'],
    latitud: 20.2871,
    longitud: -102.7128,
    direccion: 'Jamay, Jalisco (Servicio a domicilio)',
    descripcion: 'Tradicionales tortas ahogadas de carnitas estilo Guadalajara, tacos sencillos y con carne, y paquetes del día con el mejor sabor y salsa especial de la casa.',
    costo_envio: 35,
    tiempo_delivery: '20-35 min'
  },
  {
    id: 'n14',
    slug: 'el-antojito',
    nombre: 'El Antojito',
    whatsapp: '523921007410',
    horario_apertura: '17:00:00',
    horario_cierre: '21:30:00',
    logo_url: '/foto perfil el antojito.png',
    portada_url: '/foto portada el antojito.png',
    categoria_principal: 'Elotes y Esquites',
    activo: true,
    notas_envio: 'Visitados en Morelos #304, Jamay. Servicio a domicilio de Lunes a Viernes de 5:00 PM a 9:30 PM.',
    rating: 4.9,
    total_ratings: 28,
    tags: ['Elotes', 'Esquites', 'Antojos', 'Sabrielotes', 'Elotachos', 'Alitas', 'Snacks', 'Cena'],
    latitud: 20.2902,
    longitud: -102.7135,
    direccion: 'Morelos #304, Col. Centro, Jamay, Jalisco',
    descripcion: 'Elotes y esquites preparados, sabrielotes, elotachos y deliciosos antojos con aderezos y toppings al gusto.',
    costo_envio: 20,
    tiempo_delivery: '15-30 min'
  },
  {
    id: 'n15',
    slug: 'roshi-rosca-de-sushi',
    nombre: 'Roshi Rosca de Sushi',
    whatsapp: '523921077991',
    telefono: '3921120447',
    delivery_propio: false,
    horario_apertura: '13:00:00',
    horario_cierre: '22:00:00',
    logo_url: '/foto perfil roshi.png',
    portada_url: '/foto portada roshi.png',
    categoria_principal: 'Sushi',
    activo: true,
    notas_envio: 'Lunes y Jueves: 5:00 PM a 10:00 PM. Viernes a Domingo: 1:00 PM a 4:00 PM y 7:00 PM a 10:00 PM.',
    rating: 4.9,
    total_ratings: 18,
    tags: ['Sushi', 'Roscas', 'Asiática', 'Individuales', 'Bowls', 'Bebidas'],
    latitud: 20.2880,
    longitud: -102.7110,
    descripcion: 'Roscas de arroz con ensalada de surimi y camarón, bowls saludables, bites empanizados y refrescantes bebidas.',
    costo_envio: 35,
    tiempo_delivery: '30-45 min'
  },
  {
    id: 'n16',
    slug: 'asador-la-liebre',
    nombre: 'Asador La Liebre (La Libre)',
    whatsapp: '523921007410',
    delivery_propio: false,
    horario_apertura: '18:00:00',
    horario_cierre: '23:59:00',
    logo_url: '/foto perfil la libre.png',
    portada_url: '/foto portada la libre.png',
    categoria_principal: 'Cortes y Asados',
    activo: true,
    notas_envio: 'Horario: Abierto todos los días de 6:00 PM a 12:00 AM. Especialidades al asador, cortes premium, tacos y papas rellenas.',
    rating: 4.8,
    total_ratings: 20,
    tags: ['Asados', 'Cortes', 'Tacos', 'Cena', 'Carnes'],
    latitud: 20.2875,
    longitud: -102.7120,
    direccion: 'Jamay, Jalisco, México',
    descripcion: 'Deliciosos cortes a la leña, papas rellenas gratinadas, tacos con tortillas hechas a mano y especialidades al asador.',
    costo_envio: 35,
    tiempo_delivery: '35-50 min'
  },
  {
    id: 'n17',
    slug: 'punto-21',
    nombre: 'Punto 21',
    whatsapp: '523921007410',
    delivery_propio: false,
    horario_apertura: '16:00:00',
    horario_cierre: '22:00:00',
    logo_url: '/foto perfil punto 21.png',
    portada_url: '/foto portada punto 21.png',
    categoria_principal: 'Hamburguesas',
    activo: true,
    notas_envio: 'Solo servicio para llevar. Horario de 4:00 PM a 10:00 PM. Jamay, Jal.',
    rating: 4.9,
    total_ratings: 15,
    tags: ['Hamburguesas', 'Snacks', 'Alitas', 'Boneless', 'Cena'],
    latitud: 20.2868,
    longitud: -102.7100,
    direccion: 'Jamay, Jalisco, México',
    descripcion: 'Hamburguesas gourmet (Suprema, Especial, Arrachera, Pollo Extreme) y snacks deliciosos (Alitas, Boneless, Dedos de queso). Solo para llevar.',
    costo_envio: 35,
    tiempo_delivery: '25-40 min'
  },
  {
    id: 'n18',
    slug: 'la-barra-63',
    nombre: 'La Barra 63',
    whatsapp: '523921009557', // Central dispatcher (delivery_propio: false)
    delivery_propio: false,
    horario_apertura: '17:00:00',
    horario_cierre: '23:30:00',
    logo_url: '/la_barra_63_logo.png',
    portada_url: '/la_barra_63_cover.png',
    categoria_principal: 'Hamburguesas y Pizzas',
    activo: true,
    notas_envio: 'Horario: Abierto todos los días de 5:00 PM a 11:30 PM. Snacks, Alitas, Hamburguesas y Pizzas. Servicio de entrega mediante Mandaditos.',
    rating: 4.8,
    total_ratings: 12,
    tags: ['Hamburguesas', 'Pizza', 'Alitas', 'Snacks', 'Cena'],
    latitud: 20.2882,
    longitud: -102.7110,
    direccion: 'Jamay, Jalisco, México',
    descripcion: 'Las mejores hamburguesas (Sencilla, Tuta y Arrolladora), pizzas artesanales y una gran variedad de alitas y snacks en Jamay.',
    costo_envio: 35,
    tiempo_delivery: '30-45 min'
  },
  {
    id: 'n19',
    slug: 'casa-d-sofi',
    nombre: "Casa D' Sofi",
    whatsapp: '523929408616',
    telefono: '3929408616',
    delivery_propio: true,
    horario_apertura: '13:00:00',
    horario_cierre: '23:59:00',
    logo_url: '/casa_d_sofi_logo.png',
    portada_url: '/casa_d_sofi_cover.png',
    categoria_principal: 'Comida Japonesa y Snacks',
    activo: true,
    notas_envio: 'Domingo a Miércoles de 1PM a 5PM y 8PM a 12AM (Solo Delivery). Jueves a Sábado de 1PM a 5PM y 8PM a 12AM (Servicio en Restaurante y Delivery).',
    rating: 4.9,
    total_ratings: 20,
    tags: ['sushi', 'snacks', 'alitas', 'pollo', 'cena'],
    latitud: 20.2885,
    longitud: -102.7115,
    direccion: 'Jamay, Jalisco, México',
    descripcion: 'Ramen artesanal premium (Shoyu y Camarón), deliciosas quesadillas de marlín y camarón glaseadas, y pollo frito estilo Karaage.',
    costo_envio: 30,
    tiempo_delivery: '30-45 min'
  }
];

// Mock Menu Categories (Categorias de Menu)
export const mockCategoriasMenu: CategoriaMenu[] = [
  // Mazter Pizza
  { id: 'c_mp1', negocio_id: 'n0', nombre: 'Pizzas Clásicas', orden: 1 },
  { id: 'c_mp2', negocio_id: 'n0', nombre: 'Pizzas Especiales', orden: 2 },
  { id: 'c_mp3', negocio_id: 'n0', nombre: 'Pizzas VIP', orden: 3 },
  { id: 'c_mp4', negocio_id: 'n0', nombre: 'Alitas', orden: 4 },
  { id: 'c_mp5', negocio_id: 'n0', nombre: 'Empanadas', orden: 5 },
  { id: 'c_mp6', negocio_id: 'n0', nombre: 'Hamburguesas con Papas', orden: 6 },
  { id: 'c_mp7', negocio_id: 'n0', nombre: 'Complementos', orden: 7 },
  { id: 'c_mp8', negocio_id: 'n0', nombre: 'Refrescos', orden: 8 },

  // Nutri Deli
  { id: 'c_nd1', negocio_id: 'n2', nombre: 'Lonches', orden: 1 },
  { id: 'c_nd2', negocio_id: 'n2', nombre: 'Sandwiches', orden: 2 },
  { id: 'c_nd3', negocio_id: 'n2', nombre: 'Huevos', orden: 3 },
  { id: 'c_nd4', negocio_id: 'n2', nombre: 'Chilaquiles', orden: 4 },
  { id: 'c_nd5', negocio_id: 'n2', nombre: 'Hotcakes', orden: 5 },
  { id: 'c_nd6', negocio_id: 'n2', nombre: 'Ensaladas', orden: 6 },
  { id: 'c_nd7', negocio_id: 'n2', nombre: 'Gustitos', orden: 7 },
  { id: 'c_nd8', negocio_id: 'n2', nombre: 'Licuados Frutas y Verduras', orden: 8 },
  { id: 'c_nd9', negocio_id: 'n2', nombre: 'Frutas', orden: 9 },
  { id: 'c_nd10', negocio_id: 'n2', nombre: 'Bebidas', orden: 10 },

  // Nieves de Garrafa Don Chicho
  { id: 'c_dc1', negocio_id: 'n3', nombre: 'Capuchinos', orden: 1 },
  { id: 'c_dc2', negocio_id: 'n3', nombre: 'Café', orden: 2 },
  { id: 'c_dc3', negocio_id: 'n3', nombre: 'Nieve de Garrafa', orden: 3 },
  { id: 'c_dc4', negocio_id: 'n3', nombre: 'Frappes', orden: 4 },
  { id: 'c_dc5', negocio_id: 'n3', nombre: 'Malteadas', orden: 5 },
  { id: 'c_dc6', negocio_id: 'n3', nombre: 'Smoothies & Tés', orden: 6 },
  { id: 'c_dc7', negocio_id: 'n3', nombre: 'Ice Latte', orden: 7 },
  { id: 'c_dc8', negocio_id: 'n3', nombre: 'Tisanas', orden: 8 },
  { id: 'c_dc9', negocio_id: 'n3', nombre: 'Postres', orden: 9 },

  // Dapur Asia
  { id: 'c_da1', negocio_id: 'n4', nombre: 'Especial', orden: 1 },

  // Pollos Jez
  { id: 'c_pj1', negocio_id: 'n5', nombre: 'Pollo y Costilla', orden: 1 },
  { id: 'c_pj2', negocio_id: 'n5', nombre: 'Alitas', orden: 2 },
  { id: 'c_pj3', negocio_id: 'n5', nombre: 'Especialidades', orden: 3 },

  // El Nuevo Calamar
  { id: 'c_nc1', negocio_id: 'n6', nombre: 'Entradas', orden: 1 },
  { id: 'c_nc2', negocio_id: 'n6', nombre: 'Cocteles', orden: 2 },
  { id: 'c_nc3', negocio_id: 'n6', nombre: 'Especialidades', orden: 3 },
  { id: 'c_nc4', negocio_id: 'n6', nombre: 'Camarones por Orden', orden: 4 },
  { id: 'c_nc5', negocio_id: 'n6', nombre: "Pa' Compartir", orden: 5 },

  // Pizzas Libertad
  { id: 'c_pl1', negocio_id: 'n7', nombre: 'Pizzas', orden: 1 },
  { id: 'c_pl2', negocio_id: 'n7', nombre: 'Entradas y Especialidades', orden: 2 },

  // El Gordo Richy
  { id: 'c_gr1', negocio_id: 'n8', nombre: 'Tacos', orden: 1 },
  { id: 'c_gr2', negocio_id: 'n8', nombre: 'Lonches', orden: 2 },
  { id: 'c_gr3', negocio_id: 'n8', nombre: 'Hamburguesas', orden: 3 },
  { id: 'c_gr4', negocio_id: 'n8', nombre: 'Burrotes & Snacks', orden: 4 },

  // Cafe Cali
  { id: 'c_cc1', negocio_id: 'n9', nombre: 'Desayunos (8:30 AM - 12:30 PM)', orden: 1 },
  { id: 'c_cc2', negocio_id: 'n9', nombre: 'Crepas, Waffles & Hotcakes', orden: 2 },
  { id: 'c_cc3', negocio_id: 'n9', nombre: 'Alimentos (12:30 PM - 11:00 PM)', orden: 3 },
  { id: 'c_cc4', negocio_id: 'n9', nombre: 'Ensaladas', orden: 4 },
  { id: 'c_cc5', negocio_id: 'n9', nombre: 'Sushi', orden: 5 },
  { id: 'c_cc6', negocio_id: 'n9', nombre: 'Bebidas con Café', orden: 6 },
  { id: 'c_cc7', negocio_id: 'n9', nombre: 'Bebidas sin Café', orden: 7 },

  // El Trompo
  { id: 'c_et1', negocio_id: 'n10', nombre: 'Sabrosos Lonches', orden: 1 },
  { id: 'c_et2', negocio_id: 'n10', nombre: 'Ricos Sandwiches', orden: 2 },
  { id: 'c_et3', negocio_id: 'n10', nombre: 'Deliciosos Tacos', orden: 3 },
  { id: 'c_et4', negocio_id: 'n10', nombre: 'Gringas y Burritos', orden: 4 },
  { id: 'c_et5', negocio_id: 'n10', nombre: 'Nuestras Ensaladas', orden: 5 },
  { id: 'c_et6', negocio_id: 'n10', nombre: 'Especialidad en Chilaquiles', orden: 6 },
  { id: 'c_et7', negocio_id: 'n10', nombre: 'Suaves Omelettes', orden: 7 },
  { id: 'c_et8', negocio_id: 'n10', nombre: 'Crujientes Baguettes', orden: 8 },
  { id: 'c_et9', negocio_id: 'n10', nombre: 'Deliciosas Hamburguesas', orden: 9 },
  { id: 'c_et10', negocio_id: 'n10', nombre: 'Tradicional Menudo', orden: 10 },
  { id: 'c_et11', negocio_id: 'n10', nombre: 'Únicos Platillos', orden: 11 },
  { id: 'c_et12', negocio_id: 'n10', nombre: 'Platillos Dulces', orden: 12 },
  { id: 'c_et13', negocio_id: 'n10', nombre: 'Nuestras Bebidas', orden: 13 },

  // El Senador
  { id: 'c_es1', negocio_id: 'n11', nombre: 'Especialidades de la Casa (Filetes)', orden: 1 },
  { id: 'c_es2', negocio_id: 'n11', nombre: 'Camarones', orden: 2 },
  { id: 'c_es3', negocio_id: 'n11', nombre: 'Cocteles', orden: 3 },
  { id: 'c_es4', negocio_id: 'n11', nombre: 'Caldos y Sopas', orden: 4 },
  { id: 'c_es5', negocio_id: 'n11', nombre: 'Botanas Frías', orden: 5 },
  { id: 'c_es6', negocio_id: 'n11', nombre: 'Botanas Calientes', orden: 6 },
  { id: 'c_es7', negocio_id: 'n11', nombre: 'Pescados Enteros', orden: 7 },
  { id: 'c_es8', negocio_id: 'n11', nombre: 'Carnes y Aves', orden: 8 },
  { id: 'c_es9', negocio_id: 'n11', nombre: 'Menú Infantil', orden: 9 },
  { id: 'c_es10', negocio_id: 'n11', nombre: 'Bebidas sin Alcohol', orden: 10 },
  { id: 'c_es11', negocio_id: 'n11', nombre: 'Bebidas con Alcohol y Bar', orden: 11 },
  
  // California Burger
  { id: 'c_cb1', negocio_id: 'n12', nombre: 'Hamburguesas al Carbón', orden: 1 },
  { id: 'c_cb2', negocio_id: 'n12', nombre: 'Snacks', orden: 2 },
  { id: 'c_cb3', negocio_id: 'n12', nombre: 'Algo Más', orden: 3 },
  { id: 'c_cb4', negocio_id: 'n12', nombre: 'Bebidas', orden: 4 },

  // Tortas Ahogadas El Chespi
  { id: 'c_chespi1', negocio_id: 'n13', nombre: 'Paquetes del Día', orden: 1 },
  { id: 'c_chespi2', negocio_id: 'n13', nombre: 'Individuales', orden: 2 },
  { id: 'c_chespi3', negocio_id: 'n13', nombre: 'Bebidas', orden: 3 },

  // El Antojito
  { id: 'c_ea1', negocio_id: 'n14', nombre: 'Los Clásicos', orden: 1 },
  { id: 'c_ea2', negocio_id: 'n14', nombre: 'Pal\' Antojo', orden: 2 },
  { id: 'c_ea3', negocio_id: 'n14', nombre: 'Otros', orden: 3 },

  // Roshi Rosca de Sushi
  { id: 'c_roshi1', negocio_id: 'n15', nombre: 'Roscas Para Compartir', orden: 1 },
  { id: 'c_roshi2', negocio_id: 'n15', nombre: 'Individuales', orden: 2 },
  { id: 'c_roshi3', negocio_id: 'n15', nombre: 'Roshi Bites', orden: 3 },
  { id: 'c_roshi4', negocio_id: 'n15', nombre: 'Roshi Bowl', orden: 4 },
  { id: 'c_roshi5', negocio_id: 'n15', nombre: 'Bebidas', orden: 5 },

  // Asador La Liebre
  { id: 'c_libre1', negocio_id: 'n16', nombre: 'Botanas', orden: 1 },
  { id: 'c_libre2', negocio_id: 'n16', nombre: 'Gratinados', orden: 2 },
  { id: 'c_libre3', negocio_id: 'n16', nombre: 'Papa Rellena', orden: 3 },
  { id: 'c_libre4', negocio_id: 'n16', nombre: 'Cortes', orden: 4 },
  { id: 'c_libre5', negocio_id: 'n16', nombre: 'Especiales', orden: 5 },
  { id: 'c_libre6', negocio_id: 'n16', nombre: 'Tacos', orden: 6 },
  { id: 'c_libre7', negocio_id: 'n16', nombre: 'Quecas', orden: 7 },
  { id: 'c_libre8', negocio_id: 'n16', nombre: 'Bebidas', orden: 8 },

  // Punto 21
  { id: 'c_punto1', negocio_id: 'n17', nombre: 'Hamburguesas', orden: 1 },
  { id: 'c_punto2', negocio_id: 'n17', nombre: 'Snacks', orden: 2 },

  // La Barra 63
  { id: 'c_lb1', negocio_id: 'n18', nombre: 'Alitas', orden: 1 },
  { id: 'c_lb2', negocio_id: 'n18', nombre: 'Snacks', orden: 2 },
  { id: 'c_lb3', negocio_id: 'n18', nombre: 'Hamburguesas', orden: 3 },
  { id: 'c_lb4', negocio_id: 'n18', nombre: 'Pizzas', orden: 4 },

  // Casa D' Sofi
  { id: 'c_ds1', negocio_id: 'n19', nombre: 'Especialidades', orden: 1 },
  { id: 'c_ds2', negocio_id: 'n19', nombre: 'Bebidas', orden: 2 }
];

// Mock Products (Productos)
export const mockProductos: Producto[] = [
  // Mazter Pizza - Pizzas Clásicas (Base price = 100)
  {
    id: 'p_mp1',
    categoria_id: 'c_mp1',
    nombre: 'Pizza Surtida',
    descripcion: 'Chorizo, salchicha, morrón.',
    precio: 100.00,
    imagen_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp2',
    categoria_id: 'c_mp1',
    nombre: 'Pizza Pepperoni',
    descripcion: 'Pepperoni.',
    precio: 100.00,
    imagen_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp3',
    categoria_id: 'c_mp1',
    nombre: 'Pizza Mexicana',
    descripcion: 'Chorizo, jalapeño, cebolla, jitomate.',
    precio: 100.00,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp4',
    categoria_id: 'c_mp1',
    nombre: 'Pizza Carnes Frías',
    descripcion: 'Jamón, salchicha, salami.',
    precio: 100.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp5',
    categoria_id: 'c_mp1',
    nombre: 'Pizza Hawaiana',
    descripcion: 'Jamón, piña.',
    precio: 100.00,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },

  // Mazter Pizza - Pizzas Especiales (Base price = 110)
  {
    id: 'p_mp6',
    categoria_id: 'c_mp2',
    nombre: 'Pizza Especial',
    descripcion: 'Chorizo, salami, salchicha, piña, morrón, champiñones.',
    precio: 110.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp7',
    categoria_id: 'c_mp2',
    nombre: 'Pizza Mazter',
    descripcion: 'Chorizo, pepperoni, jitomate, carne, jalapeño, cebolla, champiñones, aceitunas.',
    precio: 110.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp8',
    categoria_id: 'c_mp2',
    nombre: 'Pizza Italiana',
    descripcion: 'Chorizo, pepperoni, cebolla, carne, morrón, champiñones, aceitunas.',
    precio: 110.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp9',
    categoria_id: 'c_mp2',
    nombre: 'Pizza Carnivor',
    descripcion: 'Jamón, salami, pepperoni, salchicha, carne.',
    precio: 110.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp10',
    categoria_id: 'c_mp2',
    nombre: 'Pizza Vegetariana',
    descripcion: 'Jitomate, champiñones, piña, morrón, aceitunas.',
    precio: 110.00,
    imagen_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },

  // Mazter Pizza - Pizzas VIP (Base price = 120)
  {
    id: 'p_mp11',
    categoria_id: 'c_mp3',
    nombre: 'Pizza Suprema',
    descripcion: 'Jamón, salami, pepperoni, carne, salchicha, morrón, cebolla, chorizo, jitomate, aceitunas, champiñones.',
    precio: 120.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true,
    destacado: true,
    rating: 4.8,
    total_ratings: 12
  },
  {
    id: 'p_mp12',
    categoria_id: 'c_mp3',
    nombre: 'Pizza Camarón',
    descripcion: 'Camarón, champiñones, morrón.',
    precio: 120.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },
  {
    id: 'p_mp13',
    categoria_id: 'c_mp3',
    nombre: 'Pizza Arrachera',
    descripcion: 'Arrachera, cebolla, jalapeño.',
    precio: 120.00,
    imagen_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=80',
    disponible: true
  },

  // Mazter Pizza - Alitas
  { id: 'p_mp14', categoria_id: 'c_mp4', nombre: 'Alitas Búfalo', precio: 130.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp15', categoria_id: 'c_mp4', nombre: 'Alitas BBQ', precio: 130.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp16', categoria_id: 'c_mp4', nombre: 'Alitas Mango Habanero', precio: 130.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp17', categoria_id: 'c_mp4', nombre: 'Alitas Lemon Pepper', precio: 130.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp18', categoria_id: 'c_mp4', nombre: 'Alitas Tamarindo Habanero', precio: 130.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80', disponible: true },

  // Mazter Pizza - Empanadas
  { id: 'p_mp19', categoria_id: 'c_mp5', nombre: 'Empanada Normal', precio: 15.00, descripcion: 'Queso, jamón y salchicha.', imagen_url: null, disponible: true },
  { id: 'p_mp20', categoria_id: 'c_mp5', nombre: 'Empanada Especial', precio: 25.00, descripcion: 'Extra queso, jamón, salchicha, piña, salami y champiñones.', imagen_url: null, disponible: true },
  { id: 'p_mp21', categoria_id: 'c_mp5', nombre: 'Empanada Carnívor', precio: 30.00, descripcion: 'Extra queso, champiñones, pepperoni, carne molida y cebolla.', imagen_url: null, disponible: true },

  // Mazter Pizza - Hamburguesas
  { id: 'p_mp22', categoria_id: 'c_mp6', nombre: 'Hamburguesa Normal', precio: 85.00, descripcion: 'Carne de res y queso amarillo.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp23', categoria_id: 'c_mp6', nombre: 'Hamburguesa Especial', precio: 95.00, descripcion: 'Carne de res, queso asadero, jamón y salami.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true, destacado: true, rating: 4.7, total_ratings: 15 },
  { id: 'p_mp24', categoria_id: 'c_mp6', nombre: 'Hamburguesa Camarón', precio: 95.00, descripcion: 'Camarones y queso asadero.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp25', categoria_id: 'c_mp6', nombre: 'Hamburguesa Camarón con Carne', precio: 135.00, descripcion: 'Camarones, carne de res y queso asadero.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp26', categoria_id: 'c_mp6', nombre: 'Hamburguesa Hawaiana', precio: 95.00, descripcion: 'Carne de res, queso asadero, piña y jamón.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp27', categoria_id: 'c_mp6', nombre: 'Hamburguesa Champiñones', precio: 95.00, descripcion: 'Carne de res, queso asadero, jamón y champiñones.', imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', disponible: true },

  // Mazter Pizza - Complementos
  { id: 'p_mp28', categoria_id: 'c_mp7', nombre: 'Orden de Papas', precio: 60.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80', disponible: true },

  // Mazter Pizza - Refrescos
  { id: 'p_mp29', categoria_id: 'c_mp8', nombre: 'Refresco 600 ML', precio: 22.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80', disponible: true },
  { id: 'p_mp30', categoria_id: 'c_mp8', nombre: 'Refresco 2 Litros', precio: 45.00, descripcion: null, imagen_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80', disponible: true },


  // Nutri Deli - Lonches
  { id: 'p_nd1', categoria_id: 'c_nd1', nombre: 'Lonche Tapatio', precio: 65.00, descripcion: 'Lonche de pierna adobada con queso, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd2', categoria_id: 'c_nd1', nombre: 'Lonche Tradicional', precio: 55.00, descripcion: 'Lonche de jamón con queso, jitomate, cebolla, lechuga, aguacate y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd3', categoria_id: 'c_nd1', nombre: 'Lonche Hawai', precio: 70.00, descripcion: 'Lonche de jamón, salami, piña asada, queso y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd4', categoria_id: 'c_nd1', nombre: 'Lonche Deli', precio: 75.00, descripcion: 'Lonche de salami, jamón, queso, pierna adobada, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd5', categoria_id: 'c_nd1', nombre: 'Lonche Ligero', precio: 70.00, descripcion: 'Lonche sin migajón, pollo asado, panela, lechuga, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },

  // Nutri Deli - Sandwiches
  { id: 'p_nd6', categoria_id: 'c_nd2', nombre: 'Sandwich Tradicional', precio: 50.00, descripcion: 'Pan integral, jamón, queso, lechuga, jitomate, cebolla, aguacate, chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd7', categoria_id: 'c_nd2', nombre: 'Sandwich Ligero', precio: 55.00, descripcion: 'Pan integral, pechuga asada, panela, lechuga, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd8', categoria_id: 'c_nd2', nombre: 'Sandwich Deli', precio: 65.00, descripcion: 'Pan integral, salami, jamón, queso, pierna adobada, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },
  { id: 'p_nd9', categoria_id: 'c_nd2', nombre: 'Sandwich Tapatio', precio: 55.00, descripcion: 'Pan integral de pierna adobada con queso, jitomate, cebolla, aguacate y chile jalapeño.', disponible: true, imagen_url: null },

  // Nutri Deli - Huevos
  { id: 'p_nd10', categoria_id: 'c_nd3', nombre: 'Huevos Revueltos', precio: 70.00, descripcion: 'Acompañados de frijoles y ensalada.', disponible: true, imagen_url: null },
  { id: 'p_nd11', categoria_id: 'c_nd3', nombre: 'Huevo con Jamón', precio: 80.00, descripcion: 'Acompañados de frijoles y ensalada.', disponible: true, imagen_url: null },
  { id: 'p_nd12', categoria_id: 'c_nd3', nombre: 'Huevos Estrellados', precio: 80.00, descripcion: 'Estrellados naturales o en salsa, acompañados de frijoles y ensalada.', disponible: true, imagen_url: null },
  { id: 'p_nd13', categoria_id: 'c_nd3', nombre: 'Claras Naturales', precio: 85.00, descripcion: 'Revueltas con espinacas, cebolla, champiñones, frijoles y ensalada.', disponible: true, imagen_url: null },

  // Nutri Deli - Chilaquiles
  { id: 'p_nd14', categoria_id: 'c_nd4', nombre: 'Chilaquiles Sencillos', precio: 80.00, descripcion: 'Acompañados de frijoles, queso, crema y bolillo doradito.', disponible: true, imagen_url: null },
  { id: 'p_nd15', categoria_id: 'c_nd4', nombre: 'Chilaquiles con Pollo o Huevo', precio: 100.00, descripcion: 'Acompañados de frijoles, queso, crema y bolillo doradito.', disponible: true, imagen_url: null },
  { id: 'p_nd16', categoria_id: 'c_nd4', nombre: 'Chilaquiles con Arrachera', precio: 110.00, descripcion: 'Acompañados de frijoles, queso, crema y bolillo doradito.', disponible: true, imagen_url: null },

  // Nutri Deli - Hotcakes
  { id: 'p_nd17', categoria_id: 'c_nd5', nombre: 'Hotcakes (2 pz)', precio: 65.00, descripcion: 'Elige tu endulzante favorito y extras.', disponible: true, imagen_url: null },

  // Nutri Deli - Ensaladas
  { id: 'p_nd18', categoria_id: 'c_nd6', nombre: 'Ensalada Deli', precio: 135.00, descripcion: 'Pollo, mix de lechugas, fresa, arándanos, pepino, pimiento, jitomate cherry, queso de cabra y nuez. Con aderezo Ranch casero.', disponible: true, destacado: true, rating: 4.8, total_ratings: 10, imagen_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_nd19', categoria_id: 'c_nd6', nombre: 'Ensalada Mexicana', precio: 120.00, descripcion: 'Pollo, mix de lechugas, jitomate cherry, cebolla morada, pepino, queso panela, tortillitas doradas. Con aderezo Ranch casero.', disponible: true, imagen_url: null },
  { id: 'p_nd20', categoria_id: 'c_nd6', nombre: 'Ensalada Especial', precio: 140.00, descripcion: 'Jamón, pollo, queso panela, mix de lechugas, zanahoria, jitomate cherry y pepino. Con aderezo Ranch casero.', disponible: true, imagen_url: null },

  // Nutri Deli - Gustitos
  { id: 'p_nd21', categoria_id: 'c_nd7', nombre: 'Hamburguesa Deli', precio: 95.00, descripcion: 'Carne 100% hecha en casa, queso, lechuga, jitomate, cebolla, catsup, mostaza y chile jalapeño, acompañada de papas a la francesa.', disponible: true, imagen_url: null },
  { id: 'p_nd22', categoria_id: 'c_nd7', nombre: 'Mollete Mexicano', precio: 50.00, descripcion: 'Par de molletes de frijoles, queso gratinado, pico de gallo, aguacate.', disponible: true, imagen_url: null },
  { id: 'p_nd23', categoria_id: 'c_nd7', nombre: 'Mollete Especial', precio: 75.00, descripcion: 'Par de molletes de frijoles, queso gratinado, chilaquiles rojos, arrachera, crema y queso cotija.', disponible: true, destacado: true, rating: 4.9, total_ratings: 14, imagen_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_nd24', categoria_id: 'c_nd7', nombre: 'Mollete Dulce', precio: 40.00, descripcion: 'Par de molletes con mantequilla, lechera y canela.', disponible: true, imagen_url: null },
  { id: 'p_nd25', categoria_id: 'c_nd7', nombre: 'Señor Burrito', precio: 35.00, descripcion: 'Tortilla de harina, pierna adobada con ensalada.', disponible: true, imagen_url: null },
  { id: 'p_nd26', categoria_id: 'c_nd7', nombre: 'Doña Sincronizada', precio: 35.00, descripcion: 'Doña sincronizada con queso, jamón y ensalada.', disponible: true, imagen_url: null },

  // Nutri Deli - Licuados Frutas y Verduras
  { id: 'p_nd27', categoria_id: 'c_nd8', nombre: 'Licuado Verde Fit', precio: 45.00, descripcion: 'Piña, apio, pepino, perejil, jugo de naranja.', disponible: true, imagen_url: null },
  { id: 'p_nd28', categoria_id: 'c_nd8', nombre: 'Licuado Verde Detox', precio: 40.00, descripcion: 'Agua, espinaca, piña, pepino, nopal, jengibre.', disponible: true, imagen_url: null },
  { id: 'p_nd29', categoria_id: 'c_nd8', nombre: 'Licuado Energético', precio: 45.00, descripcion: 'Jugo de naranja, fresa, plátano.', disponible: true, imagen_url: null },
  { id: 'p_nd30', categoria_id: 'c_nd8', nombre: 'Licuado Despierta', precio: 45.00, descripcion: 'Leche, café, plátano congelado, crema de avellanas.', disponible: true, imagen_url: null },
  { id: 'p_nd31', categoria_id: 'c_nd8', nombre: 'Licuado Vita Fresh', precio: 45.00, descripcion: 'Jugo de naranja, fresa, jengibre, miel, limón.', disponible: true, imagen_url: null },
  { id: 'p_nd32', categoria_id: 'c_nd8', nombre: 'Licuado Tropical', precio: 45.00, descripcion: 'Jugo de naranja o leche, plátano, manzana, fresa, papaya, granola, miel.', disponible: true, imagen_url: null },

  // Nutri Deli - Frutas
  { id: 'p_nd33', categoria_id: 'c_nd9', nombre: 'Yogurth con Fruta', precio: 70.00, descripcion: 'Yogurth natural, manzana, plátano, fresa, papaya con miel y cereal de tu elección.', disponible: true, imagen_url: null },
  { id: 'p_nd34', categoria_id: 'c_nd9', nombre: 'Plato de Fruta', precio: 65.00, descripcion: 'Fruta de temporada con miel.', disponible: true, imagen_url: null },

  { id: 'p_nd40', categoria_id: 'c_nd10', nombre: 'Refresco Lata', precio: 25.00, descripcion: 'Refresco frío a elegir.', disponible: true, imagen_url: null },

  // Don Chicho - Capuchinos (Base price is Chica, Grande is +10)
  { id: 'p_dc1', categoria_id: 'c_dc1', nombre: 'Capuchino Tradicional', precio: 60.00, descripcion: 'Capuchino tradicional espumoso.', disponible: true, imagen_url: null },
  { id: 'p_dc2', categoria_id: 'c_dc1', nombre: 'Capuchino Baileys', precio: 70.00, descripcion: 'Con un toque de crema de licor Baileys.', disponible: true, imagen_url: null },
  { id: 'p_dc3', categoria_id: 'c_dc1', nombre: 'Capuchino Moka', precio: 65.00, descripcion: 'Capuchino sabor chocolate y café.', disponible: true, imagen_url: null },
  { id: 'p_dc4', categoria_id: 'c_dc1', nombre: 'Capuchino Chocolate', precio: 45.00, descripcion: 'Chocolate caliente espumoso.', disponible: true, imagen_url: null },
  { id: 'p_dc5', categoria_id: 'c_dc1', nombre: 'Capuchino Chocolate Blanco', precio: 65.00, descripcion: 'Delicioso chocolate blanco caliente.', disponible: true, imagen_url: null },
  { id: 'p_dc6', categoria_id: 'c_dc1', nombre: 'Capuchino Chocolate con Menta', precio: 65.00, descripcion: 'Fresco toque de menta y chocolate.', disponible: true, imagen_url: null },
  { id: 'p_dc7', categoria_id: 'c_dc1', nombre: 'Capuchino Chocolate Almendrado', precio: 60.00, descripcion: 'Sabor almendra y chocolate.', disponible: true, imagen_url: null },
  { id: 'p_dc8', categoria_id: 'c_dc1', nombre: 'Capuchino Taro', precio: 65.00, descripcion: 'Té taro cremoso caliente.', disponible: true, imagen_url: null },
  { id: 'p_dc9', categoria_id: 'c_dc1', nombre: 'Capuchino Matcha', precio: 65.00, descripcion: 'Té matcha premium caliente.', disponible: true, imagen_url: null },
  { id: 'p_dc10', categoria_id: 'c_dc1', nombre: 'Capuchino Chai Especias', precio: 65.00, descripcion: 'Té chai con especias aromáticas.', disponible: true, imagen_url: null },
  { id: 'p_dc11', categoria_id: 'c_dc1', nombre: 'Capuchino Chai Vainilla', precio: 65.00, descripcion: 'Té chai sabor vainilla dulce.', disponible: true, imagen_url: null },
  { id: 'p_dc12', categoria_id: 'c_dc1', nombre: 'Capuchino Chai Manzana Canela', precio: 65.00, descripcion: 'Deliciosa combinación otoñal de té chai.', disponible: true, imagen_url: null },
  { id: 'p_dc13', categoria_id: 'c_dc1', nombre: 'Capuchino Caramelo', precio: 65.00, descripcion: 'Con jarabe de caramelo.', disponible: true, imagen_url: null },
  { id: 'p_dc14', categoria_id: 'c_dc1', nombre: 'Capuchino Canela', precio: 65.00, descripcion: 'Con toque de canela molida.', disponible: true, imagen_url: null },
  { id: 'p_dc15', categoria_id: 'c_dc1', nombre: 'Capuchino Vainilla', precio: 65.00, descripcion: 'Con jarabe de vainilla.', disponible: true, imagen_url: null },

  // Don Chicho - Café
  { id: 'p_dc16', categoria_id: 'c_dc2', nombre: 'Espresso Sencillo', precio: 20.00, descripcion: 'Café espresso concentrado.', disponible: true, imagen_url: null },
  { id: 'p_dc17', categoria_id: 'c_dc2', nombre: 'Espresso Doble', precio: 30.00, descripcion: 'Doble carga de espresso.', disponible: true, imagen_url: null },
  { id: 'p_dc18', categoria_id: 'c_dc2', nombre: 'Café Cortadito', precio: 45.00, descripcion: 'Espresso cortado con un toque de leche.', disponible: true, imagen_url: null },
  { id: 'p_dc19', categoria_id: 'c_dc2', nombre: 'Café Americano', precio: 35.00, descripcion: 'Café americano clásico.', disponible: true, imagen_url: null },
  { id: 'p_dc20', categoria_id: 'c_dc2', nombre: 'Café Americano Intenso', precio: 40.00, descripcion: 'Americano con carga extra.', disponible: true, imagen_url: null },
  { id: 'p_dc21', categoria_id: 'c_dc2', nombre: 'Café Affogato', precio: 50.00, descripcion: 'Espresso vertido sobre helado de vainilla.', disponible: true, imagen_url: null },
  { id: 'p_dc22', categoria_id: 'c_dc2', nombre: 'Café Americano a las Rocas', precio: 50.00, descripcion: 'Americano frío servido con hielos.', disponible: true, imagen_url: null },
  { id: 'p_dc23', categoria_id: 'c_dc2', nombre: 'Café Carajillo', precio: 90.00, descripcion: 'Licor 43 batido con carga de espresso.', disponible: true, imagen_url: null },

  // Don Chicho - Nieve de Garrafa (Base pricing is Vaso Chico/Cono Sencillo)
  { id: 'p_dc24', categoria_id: 'c_dc3', nombre: 'Nieve de Garrafa (Vaso)', precio: 35.00, descripcion: 'Elige tu tamaño y sabor de nieve de garrafa artesanal.', disponible: true, destacado: true, rating: 4.9, total_ratings: 28, imagen_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_dc25', categoria_id: 'c_dc3', nombre: 'Nieve de Garrafa (Cono)', precio: 35.00, descripcion: 'Elige tu tipo de cono y sabor de nieve de garrafa.', disponible: true, imagen_url: null },

  // Don Chicho - Frappes (Base is CH. GDE is +10, Venti is +15. Moka con menta has custom sizing)
  { id: 'p_dc26', categoria_id: 'c_dc4', nombre: 'Frappe Espresso', precio: 70.00, descripcion: 'Frappe de espresso helado.', disponible: true, imagen_url: null },
  { id: 'p_dc27', categoria_id: 'c_dc4', nombre: 'Frappe Moka', precio: 70.00, descripcion: 'Frappe sabor chocolate.', disponible: true, imagen_url: null },
  { id: 'p_dc28', categoria_id: 'c_dc4', nombre: 'Frappe Taro', precio: 70.00, descripcion: null, disponible: true, imagen_url: null },
  { id: 'p_dc29', categoria_id: 'c_dc4', nombre: 'Frappe Moka con Menta', precio: 75.00, descripcion: 'Moka fresco con menta frapeado.', disponible: true, imagen_url: null },
  { id: 'p_dc30', categoria_id: 'c_dc4', nombre: 'Frappe Matcha', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc31', categoria_id: 'c_dc4', nombre: 'Frappe Banana Moka', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc32', categoria_id: 'c_dc4', nombre: 'Frappe Chai Vainilla', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc33', categoria_id: 'c_dc4', nombre: 'Frappe Chai Especias', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc34', categoria_id: 'c_dc4', nombre: 'Frappe Chai Manzana Canela', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc35', categoria_id: 'c_dc4', nombre: 'Frappe Chocolate Blanco', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc36', categoria_id: 'c_dc4', nombre: 'Frappe Canela', precio: 70.00, disponible: true, imagen_url: null },
  
  // Don Chicho - Frappes Gourmet
  { id: 'p_dc37', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Caramelo', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_dc38', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Baileys', precio: 80.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 15, imagen_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_dc39', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Licor de Almendras', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_dc40', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Kahlúa', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_dc41', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Frangelico', precio: 95.00, descripcion: 'Frappe sabor avellana premium.', disponible: true, imagen_url: null },
  { id: 'p_dc42', categoria_id: 'c_dc4', nombre: 'Frappe Gourmet Red Velvet', precio: 95.00, disponible: true, imagen_url: null },

  // Don Chicho - Malteadas
  { id: 'p_dc43', categoria_id: 'c_dc5', nombre: 'Malteada Oreo', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc44', categoria_id: 'c_dc5', nombre: 'Malteada Fresa', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc45', categoria_id: 'c_dc5', nombre: 'Malteada Vainilla', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc46', categoria_id: 'c_dc5', nombre: 'Malteada Rompope', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc47', categoria_id: 'c_dc5', nombre: 'Malteada Chicle', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc48', categoria_id: 'c_dc5', nombre: 'Malteada Chocolate', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_dc49', categoria_id: 'c_dc5', nombre: 'Malteada Nutella', precio: 60.00, disponible: true, imagen_url: null },

  // Don Chicho - Smoothies & Tés
  { id: 'p_dc50', categoria_id: 'c_dc6', nombre: 'Smoothie Mango', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc51', categoria_id: 'c_dc6', nombre: 'Smoothie Limón', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc52', categoria_id: 'c_dc6', nombre: 'Smoothie Fresa', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc53', categoria_id: 'c_dc6', nombre: 'Té Frío Limón', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_dc54', categoria_id: 'c_dc6', nombre: 'Té Frío Negro con Limón', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_dc55', categoria_id: 'c_dc6', nombre: 'Té Frío Durazno', precio: 35.00, disponible: true, imagen_url: null },

  // Don Chicho - Ice Latte
  { id: 'p_dc56', categoria_id: 'c_dc7', nombre: 'Ice Latte Espresso', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_dc57', categoria_id: 'c_dc7', nombre: 'Ice Latte Caramelo', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc58', categoria_id: 'c_dc7', nombre: 'Ice Latte Baileys', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_dc59', categoria_id: 'c_dc7', nombre: 'Ice Latte Moka', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc60', categoria_id: 'c_dc7', nombre: 'Ice Latte Chocolate', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc61', categoria_id: 'c_dc7', nombre: 'Ice Latte Blanco', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc62', categoria_id: 'c_dc7', nombre: 'Ice Latte Chai Vainilla', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc63', categoria_id: 'c_dc7', nombre: 'Ice Latte Chai Especias', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc64', categoria_id: 'c_dc7', nombre: 'Ice Latte Chai Manzana Canela', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc65', categoria_id: 'c_dc7', nombre: 'Ice Latte Taro', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc66', categoria_id: 'c_dc7', nombre: 'Ice Latte Vainilla', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_dc67', categoria_id: 'c_dc7', nombre: 'Ice Latte Canela', precio: 70.00, disponible: true, imagen_url: null },

  // Don Chicho - Tisanas
  { id: 'p_dc68', categoria_id: 'c_dc8', nombre: 'Tisana Caliente Frutos Rojos', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc69', categoria_id: 'c_dc8', nombre: 'Tisana Caliente Passion Fruit', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc70', categoria_id: 'c_dc8', nombre: 'Tisana Frapeada Frutos Rojos', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_dc71', categoria_id: 'c_dc8', nombre: 'Tisana Frapeada Passion Fruit', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_dc72', categoria_id: 'c_dc8', nombre: 'Tisana a las Rocas Frutos Rojos', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_dc73', categoria_id: 'c_dc8', nombre: 'Tisana a las Rocas Passion Fruit', precio: 85.00, disponible: true, imagen_url: null },

  // Don Chicho - Postres
  { id: 'p_dc74', categoria_id: 'c_dc9', nombre: 'Brownie BYME (Chico)', precio: 28.00, disponible: true, imagen_url: null },
  { id: 'p_dc75', categoria_id: 'c_dc9', nombre: 'Brownie BYME (Grande)', precio: 38.00, disponible: true, imagen_url: null },
  { id: 'p_dc76', categoria_id: 'c_dc9', nombre: 'Brownie con Helado (Chico)', precio: 55.00, disponible: true, imagen_url: null },
  { id: 'p_dc77', categoria_id: 'c_dc9', nombre: 'Brownie con Helado (Grande)', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_dc78', categoria_id: 'c_dc9', nombre: 'Banana Split', precio: 80.00, disponible: true, imagen_url: null },

  // Dapur Asia
  { id: 'p_da1', categoria_id: 'c_da1', nombre: 'Pollo Agridulce', precio: 110.00, disponible: true, imagen_url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_da2', categoria_id: 'c_da1', nombre: 'Pollo Dapur Asia', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_da3', categoria_id: 'c_da1', nombre: 'Pollo Naranja', precio: 110.00, disponible: true, imagen_url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_da4', categoria_id: 'c_da1', nombre: 'Happy Family', descripcion: 'Pollo, Carne de Res y Camarón.', precio: 110.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 12, imagen_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_da5', categoria_id: 'c_da1', nombre: 'Pollo Cantones', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_da6', categoria_id: 'c_da1', nombre: 'Mie Kuah', descripcion: 'Noodle, Pollo, Camarón y verduras.', precio: 95.00, disponible: true, imagen_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80' },

  // Pollos Jez
  { id: 'p_pj1', categoria_id: 'c_pj1', nombre: '1 Pollo', descripcion: 'Acompañado de arroz, papas, 2 salsas y cebollas.', precio: 180.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 15, imagen_url: 'https://images.unsplash.com/photo-1587593817647-4397991341ff?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_pj2', categoria_id: 'c_pj1', nombre: '1/2 Pollo', descripcion: 'Acompañado de arroz, papas, 2 salsas y cebollas.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_pj3', categoria_id: 'c_pj1', nombre: '1 Kg. Jugosa Costilla', descripcion: 'Acompañado de arroz, papas, 2 salsas y cebollas.', precio: 290.00, disponible: true, imagen_url: null },
  { id: 'p_pj4', categoria_id: 'c_pj1', nombre: '1/2 Kg. Jugosa Costilla', descripcion: 'Acompañado de arroz, papas, 2 salsas y cebollas.', precio: 180.00, disponible: true, imagen_url: null },
  { id: 'p_pj5', categoria_id: 'c_pj2', nombre: 'Alitas Naturales (10 piezas)', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_pj6', categoria_id: 'c_pj2', nombre: 'Alitas BBQ (10 piezas)', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_pj7', categoria_id: 'c_pj2', nombre: 'Alitas Búfalo (10 piezas)', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_pj8', categoria_id: 'c_pj2', nombre: 'Alitas Mango Habanero (10 pzas)', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_pj9', categoria_id: 'c_pj2', nombre: 'Alitas Tamarindo Habanero (10 pzas)', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_pj10', categoria_id: 'c_pj3', nombre: 'Chamorro (1 kg)', descripcion: 'El precio final es de acuerdo al peso.', precio: 130.00, disponible: true, imagen_url: null },

  // El Nuevo Calamar
  { id: 'p_nc1', categoria_id: 'c_nc1', nombre: 'Aguachile Verde', descripcion: 'Fresco aguachile de camarón con salsa verde especial de la casa.', precio: 60.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 20, imagen_url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_nc2', categoria_id: 'c_nc1', nombre: 'Ceviche de Pescado', descripcion: 'Ceviche tradicional de pescado.', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_nc3', categoria_id: 'c_nc1', nombre: 'Ceviche de Camarón', descripcion: 'Ceviche de camarón fresco picado.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_nc4', categoria_id: 'c_nc1', nombre: 'Marlin', descripcion: 'Tostada de Marlin guisado.', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_nc5', categoria_id: 'c_nc2', nombre: 'Coctel de Camarón', descripcion: 'Coctel helado con aguacate.', precio: 175.00, disponible: true, imagen_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_nc6', categoria_id: 'c_nc3', nombre: 'Sopa de Mariscos', descripcion: 'Caldo caliente con camarón, pulpo, pescado y verduras.', precio: 170.00, disponible: true, imagen_url: null },
  { id: 'p_nc7', categoria_id: 'c_nc4', nombre: 'Camarones a la Diabla', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc8', categoria_id: 'c_nc4', nombre: 'Camarones al Mojo de Ajo', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc9', categoria_id: 'c_nc4', nombre: 'Camarones a la Mantequilla', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc10', categoria_id: 'c_nc4', nombre: 'Camarones a la Mexicana', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc11', categoria_id: 'c_nc4', nombre: 'Camarones al Coco', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc12', categoria_id: 'c_nc4', nombre: 'Camarones al Chipotle', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc13', categoria_id: 'c_nc4', nombre: 'Camarones Empanizados', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc14', categoria_id: 'c_nc4', nombre: 'Camarones Asados', descripcion: 'Acompañados con verdura, ensalada y arroz.', precio: 200.00, disponible: true, imagen_url: null },
  { id: 'p_nc15', categoria_id: 'c_nc5', nombre: 'Charola de Mariscos', descripcion: 'Ceviche de pescado, Marlin, ensalada, camarones a la diabla, al mojo, empanizados, filete de basa empanizado, aguacate, jitomate, cebolla y naranja.', precio: 700.00, disponible: true, imagen_url: null },

  // Pizzas Libertad
  { id: 'p_pl1', categoria_id: 'c_pl1', nombre: 'Pizza Pollo', descripcion: 'Salsa alfredo, queso mozzarella, pollo y champiñones.', precio: 130.00, disponible: true, imagen_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_pl2', categoria_id: 'c_pl1', nombre: 'Pizza Salchicha Italiana', descripcion: 'Salsa de jitomate, queso mozzarella, pepperoni, aceitunas negras, salchicha italiana y pimiento morrón.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_pl3', categoria_id: 'c_pl1', nombre: 'Pizza Margarita', descripcion: 'Salsa de jitomate, mozzarella fresca y albahaca.', precio: 130.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 11, imagen_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop&q=80' },
  { id: 'p_pl4', categoria_id: 'c_pl1', nombre: 'Pizza Higo', descripcion: 'Aceite, queso mozzarella, queso de cabra, queso crema, mermelada de higo, jamón serrano y higo fresco.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_pl5', categoria_id: 'c_pl1', nombre: 'Pizza Libertad', descripcion: 'Salsa de tu gusto, queso mozzarella y hasta 4 ingredientes a elegir del menú.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_pl6', categoria_id: 'c_pl1', nombre: 'Pizza Bombón y Nutella', descripcion: 'Deliciosa pizza con base de nutella y cubierta de ricos bombones.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_pl7', categoria_id: 'c_pl2', nombre: 'Toritos', descripcion: 'Tortilla de harina, frijoles, carne asada, cilantro, cebolla, queso mozzarella bañado en salsa de tomate con queso gratinado arriba.', precio: 90.00, disponible: true, imagen_url: null },

  // El Gordo Richy - Tacos
  { id: 'p_gr1', categoria_id: 'c_gr1', nombre: 'Taco de Birria', descripcion: 'Delicioso taco de birria con cebolla y cilantro.', precio: 15.00, disponible: true, imagen_url: null },
  { id: 'p_gr2', categoria_id: 'c_gr1', nombre: 'Taco de Bistec', descripcion: 'Taco de bistec con cebolla y cilantro.', precio: 15.00, disponible: true, imagen_url: null },

  // El Gordo Richy - Lonches
  { id: 'p_gr3', categoria_id: 'c_gr2', nombre: 'Lonche de Birria con Queso', descripcion: 'Lonche calientito con deliciosa birria y queso fundido.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_gr4', categoria_id: 'c_gr2', nombre: 'Lonche de Bistec con Queso', descripcion: 'Lonche de bistec con queso asadero fundido.', precio: 55.00, disponible: true, imagen_url: null },

  // El Gordo Richy - Hamburguesas
  { id: 'p_gr5', categoria_id: 'c_gr3', nombre: 'Hamburguesa Clásica Res', descripcion: 'Hamburguesa con carne de res, verdura, aderezos y papas fritas.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_gr6', categoria_id: 'c_gr3', nombre: 'Hamburguesa de Arrachera', descripcion: 'Jugosa arrachera con papas fritas, aderezos y verdura.', precio: 105.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 9, imagen_url: null },
  { id: 'p_gr7', categoria_id: 'c_gr3', nombre: 'Hamburguesa Hawaiana', descripcion: 'Con jamón, piña, queso asadero y papas fritas.', precio: 110.00, disponible: true, imagen_url: null },

  // El Gordo Richy - Snacks
  { id: 'p_gr8', categoria_id: 'c_gr4', nombre: 'Consomé de Birria', descripcion: 'Consomé calientito sazonado con cebolla y cilantro.', precio: 25.00, disponible: true, imagen_url: null },
  { id: 'p_gr9', categoria_id: 'c_gr4', nombre: 'Sincronizada', descripcion: 'Queso y jamón en tortilla de harina con verdura.', precio: 50.00, disponible: true, imagen_url: null },
  { id: 'p_gr10', categoria_id: 'c_gr4', nombre: 'Gringa de Bistec o Birria', descripcion: 'Tortilla de harina con queso asadero y carne de tu elección.', precio: 25.00, disponible: true, imagen_url: null },
  { id: 'p_gr11', categoria_id: 'c_gr4', nombre: 'Burrote de Bistec o Birria', descripcion: 'Burrito gigante relleno de frijoles, queso y carne.', precio: 100.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 5, imagen_url: null },

  // Cafe Cali - Desayunos (8:30 AM - 12:30 PM)
  { id: 'p_cc1', categoria_id: 'c_cc1', nombre: 'Chilaquiles Rojos', descripcion: 'Sencillos con crema, queso y frijoles.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_cc2', categoria_id: 'c_cc1', nombre: 'Chilaquiles Verdes', descripcion: 'Sencillos con crema, queso y frijoles.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_cc3', categoria_id: 'c_cc1', nombre: 'Chilaquiles Chipotle', descripcion: 'Sencillos con crema, queso y salsa chipotle.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_cc4', categoria_id: 'c_cc1', nombre: 'Pan Francés Frutos Rojos', descripcion: 'Preparado con pan Brioche y frutos rojos.', precio: 72.00, disponible: true, imagen_url: null },
  { id: 'p_cc5', categoria_id: 'c_cc1', nombre: 'Pan Francés Nutella Rellenos', descripcion: 'Preparado con pan Brioche y relleno de Nutella.', precio: 72.00, disponible: true, imagen_url: null },
  { id: 'p_cc6', categoria_id: 'c_cc1', nombre: 'Omelet Ahogado', descripcion: 'Acompañado de frijoles, pan y ensalada.', precio: 115.00, disponible: true, imagen_url: null },
  { id: 'p_cc7', categoria_id: 'c_cc1', nombre: 'Omelet Mexicano', descripcion: 'Acompañado de frijoles, pan y ensalada.', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_cc8', categoria_id: 'c_cc1', nombre: 'Omelet Claras', descripcion: 'Acompañado de frijoles, pan y ensalada.', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_cc9', categoria_id: 'c_cc1', nombre: 'Omelet Calli', descripcion: 'Acompañado de frijoles, pan y ensalada.', precio: 105.00, disponible: true, imagen_url: null },
  { id: 'p_cc10', categoria_id: 'c_cc1', nombre: 'Bowl Temporada', descripcion: 'Papaya, plátano, melón y frutos rojos.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_cc11', categoria_id: 'c_cc1', nombre: 'Buen Dia Bowl', descripcion: 'Yogurth griego, chía activada con leche de coco, fruta de temporada, granola y miel de agave.', precio: 60.00, disponible: true, imagen_url: null },

  // Cafe Cali - Crepas, Waffles & Hotcakes (8:30 AM - 11:00 PM)
  { id: 'p_cc12', categoria_id: 'c_cc2', nombre: 'Wafle (1 Ingrediente)', descripcion: 'Elige tu untable/relleno.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_cc13', categoria_id: 'c_cc2', nombre: 'Wafle (2 Ingredientes)', descripcion: 'Elige tus untables/rellenos.', precio: 105.00, disponible: true, imagen_url: null },
  { id: 'p_cc14', categoria_id: 'c_cc2', nombre: 'Hotcakes (1 Ingrediente)', descripcion: 'Elige tu untable/relleno.', precio: 55.00, disponible: true, imagen_url: null },
  { id: 'p_cc15', categoria_id: 'c_cc2', nombre: 'Hotcakes (2 Ingredientes)', descripcion: 'Elige tus untables/rellenos.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_cc16', categoria_id: 'c_cc2', nombre: 'Crepa Dulce (1 Ingrediente)', descripcion: 'Elige tu untable/relleno.', precio: 50.00, disponible: true, imagen_url: null },
  { id: 'p_cc17', categoria_id: 'c_cc2', nombre: 'Crepa Dulce (2 Ingredientes)', descripcion: 'Elige tus untables/rellenos.', precio: 63.00, disponible: true, imagen_url: null },
  { id: 'p_cc18', categoria_id: 'c_cc2', nombre: 'Crepa Dulce (3 Ingredientes)', descripcion: 'Elige tus untables/rellenos.', precio: 82.00, disponible: true, imagen_url: null },
  { id: 'p_cc19', categoria_id: 'c_cc2', nombre: 'Crepa Salada Jamón, Manchego y Peperoni', descripcion: 'Deliciosa crepa salada.', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_cc20', categoria_id: 'c_cc2', nombre: 'Crepa Salada Jamón, Manchego y Champiñones', descripcion: 'Deliciosa crepa salada con champiñones.', precio: 80.00, disponible: true, imagen_url: null },

  // Cafe Cali - Alimentos (12:30 PM - 11:00 PM)
  { id: 'p_cc21', categoria_id: 'c_cc3', nombre: 'Hamburguesa Arrachera', descripcion: 'Arrachera (90g), jitomate, tocino. Con papas (150g).', precio: 150.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 12, imagen_url: null },
  { id: 'p_cc22', categoria_id: 'c_cc3', nombre: 'Hamburguesa Mexicana', descripcion: 'Carne de res (100g), guacamole, queso manchego, jitomate y lechuga. Con papas (150g).', precio: 135.00, disponible: true, imagen_url: null },
  { id: 'p_cc23', categoria_id: 'c_cc3', nombre: 'Orden de Costillas', descripcion: 'Acompañadas con puré de papa, elote asado y aderezo. Elige tu salsa.', precio: 149.00, disponible: true, imagen_url: null },
  { id: 'p_cc24', categoria_id: 'c_cc3', nombre: 'Papas Francesas', descripcion: 'Crujientes papas fritas.', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_cc25', categoria_id: 'c_cc3', nombre: 'Papas Gajo', descripcion: 'Acompañadas de aderezo Ranch, cátsup y mostaza.', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_cc26', categoria_id: 'c_cc3', nombre: 'Pasta Alfredo con Camarones', descripcion: 'Salsa Alfredo cremosa con camarones.', precio: 149.00, disponible: true, imagen_url: null },
  { id: 'p_cc27', categoria_id: 'c_cc3', nombre: 'Pasta Chipotle con Pollo o Arrachera', descripcion: 'Pasta cremosa con chipotle.', precio: 135.00, disponible: true, imagen_url: null },
  { id: 'p_cc28', categoria_id: 'c_cc3', nombre: 'Fajitas de Arrachera', descripcion: 'Acompañadas de papas gajo, guacamole, frijoles y tortillas.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_cc29', categoria_id: 'c_cc3', nombre: 'Fajitas de Pollo', descripcion: 'Acompañadas de papas gajo, guacamole, frijoles y tortillas.', precio: 190.00, disponible: true, imagen_url: null },
  { id: 'p_cc30', categoria_id: 'c_cc3', nombre: 'Burrito de Camarón, Pollo y Arrachera', descripcion: 'Relleno de camarón, pollo, arrachera, queso asadero, coronado con aguacate y aderezo de la casa.', precio: 120.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 7, imagen_url: null },
  { id: 'p_cc31', categoria_id: 'c_cc3', nombre: 'Tacos Gobernador (Orden 3pz)', descripcion: 'Rellenos de camarón, chile poblano, queso asadero.', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_cc32', categoria_id: 'c_cc3', nombre: 'Corte de Arrachera', descripcion: 'Acompañado de papas, guacamole, frijoles y tortilla.', precio: 180.00, disponible: true, imagen_url: null },
  { id: 'p_cc33', categoria_id: 'c_cc3', nombre: 'Alitas (7 piezas)', descripcion: 'Acompañadas con aderezo, zanahoria y pepino. Elige tu salsa.', precio: 120.00, disponible: true, imagen_url: null },

  // Cafe Cali - Ensaladas
  { id: 'p_cc34', categoria_id: 'c_cc4', nombre: 'Ensalada Cali (Barra Fría)', descripcion: 'Arma tu ensalada seleccionando el tamaño, base, proteína, aderezo y toppings.', precio: 115.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 18, imagen_url: null },

  // Cafe Cali - Sushi
  { id: 'p_cc35', categoria_id: 'c_cc5', nombre: 'Sushi California', descripcion: 'Relleno de surimi o camarón, queso filadelfia, pepino, zanahoria, cubierto de ajonjolí.', precio: 135.00, disponible: true, imagen_url: null },
  { id: 'p_cc36', categoria_id: 'c_cc5', nombre: 'Sushi King', descripcion: 'Relleno de camarón, arrachera y pollo, queso filadelfia, pepino, empanizado, cubierto de tocino y aderezo de chipotle.', precio: 195.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 14, imagen_url: null },
  { id: 'p_cc37', categoria_id: 'c_cc5', nombre: 'Sushi Mexicano', descripcion: 'Relleno de arrachera, queso filadelfia, empanizado con trocitos de arrachera encima.', precio: 185.00, disponible: true, imagen_url: null },
  { id: 'p_cc38', categoria_id: 'c_cc5', nombre: 'Sushi Oruga', descripcion: 'Relleno de surimi o camarón, queso filadelfia, pepino, zanahoria y cobertura de ajonjolí con aguacate.', precio: 175.00, disponible: true, imagen_url: null },
  { id: 'p_cc39', categoria_id: 'c_cc5', nombre: 'Sushi Empanizado', descripcion: 'Relleno de surimi o camarón, queso filadelfia, pepino, zanahoria y aguacate (aderezo opcional de cilantro y surimi capeado).', precio: 155.00, disponible: true, imagen_url: null },
  { id: 'p_cc40', categoria_id: 'c_cc5', nombre: 'Sushi Empanizado Clásico', descripcion: 'Relleno de surimi o camarón, queso filadelfia, pepino, zanahoria y aguacate (con salsa teriyaki con spicy).', precio: 155.00, disponible: true, imagen_url: null },
  { id: 'p_cc41', categoria_id: 'c_cc5', nombre: 'Sushi Crazy Roll', descripcion: 'Mitad California, mitad Empanizado.', precio: 155.00, disponible: true, imagen_url: null },

  // Cafe Cali - Bebidas con Café
  { id: 'p_cc42', categoria_id: 'c_cc6', nombre: 'Capuchino o Latte Caliente', descripcion: 'Elige tu sabor y tipo de leche.', precio: 89.00, disponible: true, imagen_url: null },
  { id: 'p_cc43', categoria_id: 'c_cc6', nombre: 'Café Americano', descripcion: 'Caliente clásico.', precio: 40.00, disponible: true, imagen_url: null },
  { id: 'p_cc44', categoria_id: 'c_cc6', nombre: 'Café de Olla Cafe Calli', descripcion: 'Tradicional sazonado.', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_cc45', categoria_id: 'c_cc6', nombre: 'Americano Refill', descripcion: 'Relleno de café americano.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_cc46', categoria_id: 'c_cc6', nombre: 'Café Intenso Expresso', descripcion: 'Sencillo o doble.', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_cc47', categoria_id: 'c_cc6', nombre: 'Chocolate Caliente', descripcion: 'Obscuro o Blanco.', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_cc48', categoria_id: 'c_cc6', nombre: 'Frapuchino de Café', descripcion: 'Elige tu sabor (Moka, Blanco, Oreo, etc.).', precio: 107.00, disponible: true, imagen_url: null },
  { id: 'p_cc49', categoria_id: 'c_cc6', nombre: 'Latte Frío', descripcion: 'Elige tu sabor dulce.', precio: 90.00, disponible: true, imagen_url: null },

  // Cafe Cali - Bebidas sin Café
  { id: 'p_cc50', categoria_id: 'c_cc7', nombre: 'Tisana Caliente o Frapeada', descripcion: 'Frutos de la pasión o Kiwi-Maracuyá.', precio: 105.00, disponible: true, imagen_url: null },
  { id: 'p_cc51', categoria_id: 'c_cc7', nombre: 'Té Gourmet', descripcion: 'Durazno, Manzanilla o Menta (Caliente o Frío).', precio: 28.00, disponible: true, imagen_url: null },
  { id: 'p_cc52', categoria_id: 'c_cc7', nombre: 'Chai Rio', descripcion: 'Manzana Canela o Vainilla.', precio: 98.00, disponible: true, imagen_url: null },
  { id: 'p_cc53', categoria_id: 'c_cc7', nombre: 'Soda Italiana', descripcion: 'Elige tu sabor frutal.', precio: 92.00, disponible: true, imagen_url: null },
  { id: 'p_cc54', categoria_id: 'c_cc7', nombre: 'Smoothie Sin Café', descripcion: 'Zarzamora, Mango Chamoy o Piña Colada.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_cc55', categoria_id: 'c_cc7', nombre: 'Frappe Sin Café (Fresas con Crema o Matcha)', descripcion: 'Elige sabor.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_cc56', categoria_id: 'c_cc7', nombre: 'Frappe Especial (Gansito o Pingüino)', descripcion: 'Delicioso frappe de pastelito dulce.', precio: 140.00, disponible: true, imagen_url: null },

  // El Trompo - Sabrosos Lonches
  { id: 'p_et1', categoria_id: 'c_et1', nombre: 'Lonche Especial', descripcion: 'Telera. Jamón, queso americano, pastor o lomo adobado, queso oaxaca. Acompañado de ensalada fresca.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_et2', categoria_id: 'c_et1', nombre: 'Lonche El Trompo', descripcion: 'Bolillo. Cama de frijoles refritos, milanesa de pollo empanizado, chilaquiles (rojos o verdes), queso fresco, crema. Con salsa extra.', precio: 115.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 15, imagen_url: null },
  { id: 'p_et3', categoria_id: 'c_et1', nombre: 'Lonche Sencillo', descripcion: 'Telera. Jamón de pavo y queso panela asado a la plancha. Con ensalada fresca.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et4', categoria_id: 'c_et1', nombre: 'Lonche Fit', descripcion: 'Birote/Telera. Pechuga de pollo a la plancha, espinacas, rebanadas de queso panela. Con ensalada.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et5', categoria_id: 'c_et1', nombre: 'Lonche Norteño', descripcion: 'Telera. Carne a elegir (pastor, carne asada o arrachera). Con cilantro, cebolla caramelizada, pepino y rabanos.', precio: 90.00, disponible: true, imagen_url: null },

  // El Trompo - Ricos Sandwiches
  { id: 'p_et6', categoria_id: 'c_et2', nombre: 'Club Sandwich', descripcion: '3 pisos de pan de 12 granos, jamón, queso americano, pollo empanizado, queso oaxaca. Con ensalada.', precio: 100.00, disponible: true, imagen_url: null },
  { id: 'p_et7', categoria_id: 'c_et2', nombre: 'Sandwich Sencillo', descripcion: 'Pan de 12 granos, jamón de pavo y queso oaxaca. Con ensalada.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_et8', categoria_id: 'c_et2', nombre: 'Avo-Crunch', descripcion: 'Pan de 12 granos crujiente, cubierto con nuestro aguacate fresco, un huevo estrellado y trozos de tocino. Con ensalada.', precio: 100.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 8, imagen_url: null },
  { id: 'p_et9', categoria_id: 'c_et2', nombre: 'Sandwich Fit', descripcion: 'Pechuga de pollo a la plancha sobre espinacas frescas, queso panela, aguacate y jitomate.', precio: 90.00, disponible: true, imagen_url: null },

  // El Trompo - Deliciosos Tacos
  { id: 'p_et10', categoria_id: 'c_et3', nombre: 'Tacos Clásicos (Orden 3pz)', descripcion: 'Elige tu carne: carne asada, birria de cazuela, pastor o arrachera.', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_et11', categoria_id: 'c_et3', nombre: 'Tacos de Camarón (Orden 2pz)', descripcion: 'Camarones empanizados en corte mariposa, ensalada de la casa, aguacate y aderezo ranch y chipotle.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et12', categoria_id: 'c_et3', nombre: 'Tacos Costras (Orden 3pz)', descripcion: 'Tortilla hecha a mano con costra de queso, aguacate y aderezo chipotle. Elige tu carne.', precio: 100.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 12, imagen_url: null },

  // El Trompo - Gringas y Burritos
  { id: 'p_et13', categoria_id: 'c_et4', nombre: 'Gringa Sencilla (Maíz o Harina)', descripcion: 'Tortilla grande, queso oaxaca y carne a elegir.', precio: 50.00, disponible: true, imagen_url: null },
  { id: 'p_et14', categoria_id: 'c_et4', nombre: 'Gringa Campechana (Maíz o Harina)', descripcion: 'Tortilla grande, arrachera, chorizo y queso oaxaca.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_et15', categoria_id: 'c_et4', nombre: 'Burritos (Orden 2pz)', descripcion: 'Tortilla de harina, frijoles refritos y proteína a elegir.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et16', categoria_id: 'c_et4', nombre: 'Quesadilla (Maíz o Harina)', descripcion: 'Tortilla grande y queso oaxaca.', precio: 30.00, disponible: true, imagen_url: null },

  // El Trompo - Nuestras Ensaladas
  { id: 'p_et17', categoria_id: 'c_et5', nombre: 'Ensalada Trompo', descripcion: 'Lechugas, cherry, pepino, zanahoria, queso parmesano, pasta tornillo, pollo asado y pollo empanizado. Incluye aderezo y toppings.', precio: 150.00, disponible: true, imagen_url: null },
  { id: 'p_et18', categoria_id: 'c_et5', nombre: 'Ensalada Fresca', descripcion: 'Lechugas, cherry, pepino, zanahoria, pechuga de pollo asada. Incluye aderezo y toppings.', precio: 135.00, disponible: true, imagen_url: null },
  { id: 'p_et19', categoria_id: 'c_et5', nombre: 'Ensalada Crispy', descripcion: 'Lechugas, cherry, pepino, zanahoria, pechuga de pollo empanizada crujiente. Incluye aderezo y toppings.', precio: 135.00, disponible: true, imagen_url: null },
  { id: 'p_et20', categoria_id: 'c_et5', nombre: 'Ensalada Norteña', descripcion: 'Lechugas, cherry, pepino, zanahoria, arrachera o carne asada, y aguacate. Incluye aderezo y toppings.', precio: 135.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 6, imagen_url: null },

  // El Trompo - Especialidad en Chilaquiles
  { id: 'p_et21', categoria_id: 'c_et6', nombre: 'Chilaquiles Suizos', descripcion: 'Salsa cremosa de la casa, gratinados con queso, pollo deshebrado y aguacate. Con ensalada, pan y frijoles.', precio: 130.00, disponible: true, imagen_url: null },
  { id: 'p_et22', categoria_id: 'c_et6', nombre: 'Chilaquiles Enchipotlados', descripcion: 'Salsa chipotle ahumada con arrachera. Con ensalada, pan y frijoles.', precio: 130.00, disponible: true, imagen_url: null },
  { id: 'p_et23', categoria_id: 'c_et6', nombre: 'Chilaquiles El Patron', descripcion: 'Mixtos, coronados con arrachera, queso gratinado y aguacate. Con ensalada, pan y frijoles.', precio: 130.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 18, imagen_url: null },
  { id: 'p_et24', categoria_id: 'c_et6', nombre: 'Chilaquiles De La Casa', descripcion: 'Mixtos verdes y rojos, queso fresco, pollo en cuadritos. Con ensalada, pan y frijoles.', precio: 115.00, disponible: true, imagen_url: null },
  { id: 'p_et25', categoria_id: 'c_et6', nombre: 'Chilaquiles Sencillos', descripcion: 'Salsa a elegir con queso fresco y crema. Con ensalada, pan y frijoles.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_et26', categoria_id: 'c_et6', nombre: 'Chilaquiles Norteños', descripcion: 'Rojos, queso fresco, carne asada y cebolla. Con ensalada, pan y frijoles.', precio: 120.00, disponible: true, imagen_url: null },
  { id: 'p_et27', categoria_id: 'c_et6', nombre: 'Chilaquiles Campesinos', descripcion: 'Verdes con queso fresco, 2 huevos estrellados y cilantro. Con ensalada, pan y frijoles.', precio: 105.00, disponible: true, imagen_url: null },
  { id: 'p_et28', categoria_id: 'c_et6', nombre: 'Crea tus Chilaquiles (Base)', descripcion: 'Elige tu salsa, proteína y extras. Acompañados de ensalada, pan, queso fresco, crema y frijoles.', precio: 90.00, disponible: true, imagen_url: null },

  // El Trompo - Suaves Omelettes
  { id: 'p_et29', categoria_id: 'c_et7', nombre: 'Omelette al Gusto', descripcion: 'Elige 3 ingredientes (queso oaxaca, pimiento, jamón, tocino, chorizo, mexicana, salchicha, champiñón o elote). Con ensalada, frijoles y pan/tortillas.', precio: 115.00, disponible: true, imagen_url: null },
  { id: 'p_et30', categoria_id: 'c_et7', nombre: 'Omelette Verde Fit', descripcion: 'Con espinacas, jamón, queso crema, queso oaxaca, cebolla guisada, rodajas de jitomate asado. Con ensalada y frijoles.', precio: 120.00, disponible: true, imagen_url: null },
  { id: 'p_et31', categoria_id: 'c_et7', nombre: 'Huevos al Gusto', descripcion: 'Estrellados o revueltos al gusto. Con ensalada, frijoles y pan/tortillas.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_et32', categoria_id: 'c_et7', nombre: 'Omelette Relleno de Chilaquiles', descripcion: 'Omelette relleno de chilaquiles y salsa a elegir, con queso fresco. Con ensalada y frijoles.', precio: 120.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 9, imagen_url: null },
  { id: 'p_et33', categoria_id: 'c_et7', nombre: 'Omelette Poblano', descripcion: 'Relleno de chile poblano, elote dulce, champiñones, cebolla, queso oaxaca, bañado en crema poblana. Con ensalada y frijoles.', precio: 120.00, disponible: true, imagen_url: null },

  // El Trompo - Crujientes Baguettes
  { id: 'p_et34', categoria_id: 'c_et8', nombre: 'Baguette Del Trompo', descripcion: 'Pollo empanizado, jamón, queso americano, queso oaxaca. Acompañado de papas.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_et35', categoria_id: 'c_et8', nombre: 'Baguette Crunchy', descripcion: 'Pollo empanizado crujiente, queso oaxaca. Acompañado de ensalada.', precio: 105.00, disponible: true, imagen_url: null },
  { id: 'p_et36', categoria_id: 'c_et8', nombre: 'Arma tu Baguette (Base)', descripcion: 'Pan artesanal, jamón, lechuga y jitomate. Elige tu proteína y extras. Con papas.', precio: 85.00, disponible: true, imagen_url: null },

  // El Trompo - Hamburguesas
  { id: 'p_et37', categoria_id: 'c_et9', nombre: 'Hamburguesa Clásica', descripcion: 'Carne de res o pechuga de pollo crujiente, con queso americano derretido. Con ensalada fresca.', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_et38', categoria_id: 'c_et9', nombre: 'Hamburguesa De La Casa', descripcion: 'Carne de res o pollo crujiente, doble queso (Oaxaca y americano), jamón de pavo y cebolla caramelizada. Con ensalada.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et39', categoria_id: 'c_et9', nombre: 'Hamburguesa Suprema', descripcion: 'Carne de res y pollo crujiente, doble queso (Oaxaca y americano), jamón de pavo, cebolla caramelizada, coronada con aros de cebolla. Con ensalada.', precio: 120.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 11, imagen_url: null },

  // El Trompo - Menudo
  { id: 'p_et40', categoria_id: 'c_et10', nombre: 'Menudo Grande', descripcion: 'Menudo rojo tradicional. Pídelo surtido o elige panza/pata. Con tortillas hechas a mano y cebolla/limón.', precio: 150.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 20, imagen_url: null },
  { id: 'p_et41', categoria_id: 'c_et10', nombre: 'Menudo Chico', descripcion: 'Menudo rojo. Surtido o panza/pata. Con tortillas hechas a mano.', precio: 130.00, disponible: true, imagen_url: null },

  // El Trompo - Únicos Platillos
  { id: 'p_et42', categoria_id: 'c_et11', nombre: 'Enchiladas Suizas (3 pz)', descripcion: 'Tortillas hechas a mano rellenas de pollo deshebrado, bañadas en salsa cremosa, gratinadas con queso. Con aguacate y cebolla morada.', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_et43', categoria_id: 'c_et11', nombre: 'Carne Asada', descripcion: 'Corte de res a la parrilla, con frijoles, ensalada fresca, tortillas a mano y papas francesas.', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_et44', categoria_id: 'c_et11', nombre: 'Pollo Asado', descripcion: 'Pechuga de pollo a la plancha, con frijoles, ensalada fresca, tortillas a mano y papas francesas.', precio: 140.00, disponible: true, imagen_url: null },

  // El Trompo - Platillos Dulces
  { id: 'p_et45', categoria_id: 'c_et12', nombre: 'Molletes Dulces o Salados', descripcion: 'Birote tostado con lechera, mantequilla, azúcar y canela (Dulce) o Frijoles, queso oaxaca y pico de gallo (Salado).', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_et46', categoria_id: 'c_et12', nombre: 'Hotcakes Esponjosos (2 pz)', descripcion: 'Con fruta de temporada. Elige tu untable.', precio: 90.00, disponible: true, imagen_url: null },
  { id: 'p_et47', categoria_id: 'c_et12', nombre: 'Frutas de Temporada', descripcion: 'Con yogurth griego y granola.', precio: 50.00, disponible: true, imagen_url: null },
  { id: 'p_et48', categoria_id: 'c_et12', nombre: 'Waffles con Helado y Frutas', descripcion: 'Waffle dorado, frutas de temporada y helado artesanal (fresa o vainilla).', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_et49', categoria_id: 'c_et12', nombre: 'Pan Francés (2 pz)', descripcion: 'Pan artesanal dorado con mantequilla, azúcar y canela. Bañado en crema dulce de la casa y miel de maple con frutos rojos.', precio: 100.00, disponible: true, imagen_url: null },

  // El Trompo - Bebidas
  { id: 'p_et50', categoria_id: 'c_et13', nombre: 'Café Expreso', descripcion: 'Cargado y caliente.', precio: 30.00, disponible: true, imagen_url: null },
  { id: 'p_et51', categoria_id: 'c_et13', nombre: 'Café Doble Expreso', descripcion: 'Doble carga.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_et52', categoria_id: 'c_et13', nombre: 'Capuchino caliente', descripcion: 'Espumoso.', precio: 60.00, disponible: true, imagen_url: null },
  { id: 'p_et53', categoria_id: 'c_et13', nombre: 'Café Americano', precio: 50.00, disponible: true, imagen_url: null },
  { id: 'p_et54', categoria_id: 'c_et13', nombre: 'Café de Olla (Refill)', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_et55', categoria_id: 'c_et13', nombre: 'Latte Vainilla o Caramelo', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_et56', categoria_id: 'c_et13', nombre: 'Malteada Fresa o Vainilla', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_et57', categoria_id: 'c_et13', nombre: 'Chocomilk o Licuado (Fresa/Plátano)', precio: 45.00, disponible: true, imagen_url: null },
  { id: 'p_et58', categoria_id: 'c_et13', nombre: 'Agua Fresca del Día', precio: 25.00, disponible: true, imagen_url: null },
  { id: 'p_et59', categoria_id: 'c_et13', nombre: 'Jugo de Naranja o Zanahoria', precio: 40.00, disponible: true, imagen_url: null },
  { id: 'p_et60', categoria_id: 'c_et13', nombre: 'Jugo Verde', precio: 45.00, disponible: true, imagen_url: null },
  { id: 'p_et61', categoria_id: 'c_et13', nombre: 'Refresco o Agua Embotellada', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_et62', categoria_id: 'c_et13', nombre: 'Cerveza Corona (Clara u Obscura)', precio: 45.00, disponible: true, imagen_url: null },

  // El Senador - Especialidades de la Casa (Filetes)
  { id: 'p_es1', categoria_id: 'c_es1', nombre: 'Filete de Pescado El Senador', descripcion: 'Filete relleno de mariscos (camarón y pulpo), bañado en una de las mejores cremas de chipotle de la casa, acompañado de ensalada y arroz.', precio: 260.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 18, imagen_url: null },
  { id: 'p_es2', categoria_id: 'c_es1', nombre: 'Filete Imperial', descripcion: 'Filete de pescado envuelto en tocino, relleno de camarón y pulpo, gratinado con queso de la región.', precio: 250.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 12, imagen_url: null },
  { id: 'p_es3', categoria_id: 'c_es1', nombre: 'Filete al Gusto', descripcion: 'Preparado a tu elección: Empanizado, Al Mojo de Ajo, A la Diabla, A la Plancha o Al Ajillo.', precio: 185.00, disponible: true, imagen_url: null },
  { id: 'p_es4', categoria_id: 'c_es1', nombre: 'Filete Relleno', descripcion: 'Filete de pescado relleno de camarón y pulpo, gratinado con queso.', precio: 220.00, disponible: true, imagen_url: null },
  { id: 'p_es5', categoria_id: 'c_es1', nombre: 'Filete Gratinado', descripcion: 'Filete a la plancha gratinado con queso premium y champiñones frescos.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_es6', categoria_id: 'c_es1', nombre: 'Filete en Salsa de Queso', descripcion: 'Filete de pescado bañado en una suave y cremosa salsa de tres quesos.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_es7', categoria_id: 'c_es1', nombre: 'Filete en Crema de Chipotle', descripcion: 'Filete de pescado bañado en crema de chipotle con un toque de especias.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_es8', categoria_id: 'c_es1', nombre: 'Filete en Crema de Cilantro', descripcion: 'Filete de pescado bañado en una cremosa salsa de cilantro fresco.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_es9', categoria_id: 'c_es1', nombre: 'Filete en Salsa de Mango', descripcion: 'Bañado en una reducción dulce y picante de mango natural (disponible en temporada).', precio: 215.00, disponible: true, imagen_url: null },
  { id: 'p_es10', categoria_id: 'c_es1', nombre: 'Filete Mar y Tierra', descripcion: 'Combinación de filete de pescado, camarones seleccionados y fajitas de carne de res al gusto.', precio: 260.00, disponible: true, imagen_url: null },

  // El Senador - Camarones
  { id: 'p_es35', categoria_id: 'c_es2', nombre: 'Camarones al Gusto', descripcion: 'Preparados a tu elección: Empanizados, Al Mojo de Ajo, A la Diabla, A la Plancha o Al Ajillo.', precio: 225.00, disponible: true, imagen_url: null },
  { id: 'p_es36', categoria_id: 'c_es2', nombre: 'Camarones Imperial', descripcion: 'Camarones gigantes envueltos en tocino crujiente y rellenos de queso gratinado.', precio: 250.00, disponible: true, destacado: true, rating: 4.7, total_ratings: 9, imagen_url: null },
  { id: 'p_es37', categoria_id: 'c_es2', nombre: 'Camarones al Coco', descripcion: 'Camarones empanizados con coco rallado, acompañados de salsa de mango o tamarindo según tu elección.', precio: 255.00, disponible: true, imagen_url: null },
  { id: 'p_es38', categoria_id: 'c_es2', nombre: 'Camarones Momia', descripcion: 'Envueltos en tocino, rellenos de queso y una tirita de chile jalapeño para dar un toque único.', precio: 250.00, disponible: true, imagen_url: null },
  { id: 'p_es39', categoria_id: 'c_es2', nombre: 'Camarones en Salsa de Queso', descripcion: 'Bañados en nuestra crema especial de quesos fundidos.', precio: 235.00, disponible: true, imagen_url: null },
  { id: 'p_es40a', categoria_id: 'c_es2', nombre: 'Camarones en Crema de Chipotle', descripcion: 'Camarones cocinados en una salsa tersa de chile chipotle.', precio: 235.00, disponible: true, imagen_url: null },
  { id: 'p_es41a', categoria_id: 'c_es2', nombre: 'Camarones en Crema de Cilantro', descripcion: 'Camarones salteados y bañados en crema aromática de cilantro.', precio: 235.00, disponible: true, imagen_url: null },
  { id: 'p_es42a', categoria_id: 'c_es2', nombre: 'Camarones Mar y Tierra', descripcion: 'Combinación perfecta de camarones crujientes acompañados de jugosas tiras de carne de res y tocino.', precio: 270.00, disponible: true, imagen_url: null },
  { id: 'p_es43a', categoria_id: 'c_es2', nombre: 'Brocheta de Camarón', descripcion: 'Brocheta de camarón intercalada con cebolla, pimiento morrón y tocino, gratinada con queso.', precio: 240.00, disponible: true, imagen_url: null },

  // El Senador - Cocteles
  { id: 'p_es11', categoria_id: 'c_es3', nombre: 'Coctel de Camarón', descripcion: 'Fresca selección de camarones preparados en su jugo con verduras. (Elige tamaño)', precio: 145.00, disponible: true, imagen_url: null },
  { id: 'p_es12', categoria_id: 'c_es3', nombre: 'Coctel de Pulpo', descripcion: 'Fresca selección de pulpo preparado con aguacate, jitomate, cebolla y cilantro. (Elige tamaño)', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es13', categoria_id: 'c_es3', nombre: 'Coctel de Ostión', descripcion: 'Fresca selección de ostiones preparados en su jugo. (Elige tamaño)', precio: 145.00, disponible: true, imagen_url: null },
  { id: 'p_es14', categoria_id: 'c_es3', nombre: 'Coctel Campechana', descripcion: 'Combinación clásica de camarón y pulpo. (Elige tamaño)', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es15', categoria_id: 'c_es3', nombre: 'Coctel Especial', descripcion: 'Mezcla de camarón, pulpo y ostiones frescos en su jugo. (Elige tamaño)', precio: 175.00, disponible: true, imagen_url: null },
  { id: 'p_es16', categoria_id: 'c_es3', nombre: 'Coctel El Senador', descripcion: 'La especialidad fría: Camarón, pulpo, ostión, callo de hacha y camarón de aguachile en copa grande.', precio: 270.00, disponible: true, destacado: true, rating: 5.0, total_ratings: 25, imagen_url: null },

  // El Senador - Caldos y Sopas
  { id: 'p_es17', categoria_id: 'c_es4', nombre: 'Caldo de Camarón', descripcion: 'Caldo caliente con camarones seleccionados y verduras de la estación.', precio: 175.00, disponible: true, imagen_url: null },
  { id: 'p_es18', categoria_id: 'c_es4', nombre: 'Caldo de Pescado', descripcion: 'Caldo reconfortante de filete de pescado con verduras.', precio: 160.00, disponible: true, imagen_url: null },
  { id: 'p_es19', categoria_id: 'c_es4', nombre: 'Caldo Mixto', descripcion: 'Combinación de camarón y pescado en caldo rojo de la casa.', precio: 185.00, disponible: true, imagen_url: null },
  { id: 'p_es20', categoria_id: 'c_es4', nombre: 'Sopa de Mariscos (7 Mares)', descripcion: 'Completa sopa con camarón, pulpo, pescado, almeja, jaiba y calamar.', precio: 235.00, disponible: true, imagen_url: null },
  { id: 'p_es20a', categoria_id: 'c_es4', nombre: 'Sopa El Senador', descripcion: 'Sopa de mariscos premium con una selección especial de los mariscos más frescos de la temporada.', precio: 260.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 16, imagen_url: null },

  // El Senador - Botanas Frías
  { id: 'p_es21', categoria_id: 'c_es5', nombre: 'Ceviche de Pescado', descripcion: 'Ceviche curtido con limón, jitomate, cebolla y cilantro. (Elige tamaño)', precio: 110.00, disponible: true, imagen_url: null },
  { id: 'p_es22', categoria_id: 'c_es5', nombre: 'Ceviche de Camarón', descripcion: 'Ceviche de camarón fresco picado con cebolla, cilantro y jitomate. (Elige tamaño)', precio: 140.00, disponible: true, imagen_url: null },
  { id: 'p_es23', categoria_id: 'c_es5', nombre: 'Ceviche Mixto', descripcion: 'Combinación al gusto de camarón, pulpo y pescado. (Elige tamaño)', precio: 150.00, disponible: true, imagen_url: null },
  { id: 'p_es24', categoria_id: 'c_es5', nombre: 'Aguachile Verde', descripcion: 'Camarón curtido al momento en limón con salsa de chile serrano fresco y cilantro. (Elige tamaño)', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es25', categoria_id: 'c_es5', nombre: 'Aguachile Rojo', descripcion: 'Camarón curtido en limón con nuestra picante salsa de chile de árbol. (Elige tamaño)', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es26', categoria_id: 'c_es5', nombre: 'Aguachile Negro', descripcion: 'Camarón curtido con salsa especial de la casa a base de chiles tatemados. (Elige tamaño)', precio: 175.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 14, imagen_url: null },
  { id: 'p_es27', categoria_id: 'c_es5', nombre: 'Ostiones en su Concha', precio: 150.00, disponible: true, imagen_url: null },
  { id: 'p_es28', categoria_id: 'c_es5', nombre: 'Tostada de Ceviche de Pescado', precio: 55.00, disponible: true, imagen_url: null },
  { id: 'p_es29', categoria_id: 'c_es5', nombre: 'Tostada de Ceviche de Camarón', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_es30', categoria_id: 'c_es5', nombre: 'Tostada de Pulpo', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_es31', categoria_id: 'c_es5', nombre: 'Tostada Mixta', descripcion: 'Preparada con camarón, pulpo y pescado.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_es32', categoria_id: 'c_es5', nombre: 'Tostada Especial', descripcion: 'Preparada con camarón, pulpo y callo de hacha.', precio: 110.00, disponible: true, imagen_url: null },

  // El Senador - Botanas Calientes
  { id: 'p_es33', categoria_id: 'c_es6', nombre: 'Chicharrón de Pescado', descripcion: 'Trocitos de pescado marinados, fritos a la perfección y acompañados de aderezo especial.', precio: 175.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 20, imagen_url: null },
  { id: 'p_es34a', categoria_id: 'c_es6', nombre: 'Chicharrón de Camarón', descripcion: 'Camarones fritos sazonados con receta de la casa.', precio: 210.00, disponible: true, imagen_url: null },
  { id: 'p_es34b', categoria_id: 'c_es6', nombre: 'Dedos de Pescado', descripcion: 'Tiritas de filete de pescado empanizadas, acompañadas de papas fritas.', precio: 150.00, disponible: true, imagen_url: null },
  { id: 'p_es34c', categoria_id: 'c_es6', nombre: 'Calamar Frito', descripcion: 'Aros de calamar ligeramente empanizados y fritos.', precio: 180.00, disponible: true, imagen_url: null },
  { id: 'p_es34d', categoria_id: 'c_es6', nombre: 'Papas Fritas', precio: 70.00, disponible: true, imagen_url: null },
  { id: 'p_es34e', categoria_id: 'c_es6', nombre: 'Guacamole', descripcion: 'Aguacate fresco preparado con tomate, cebolla, cilantro y jalapeño, acompañado de totopos.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_es34', categoria_id: 'c_es6', nombre: 'Quesadillas (Orden de 3 piezas)', descripcion: 'Elige sencillas o con camarón.', precio: 60.00, disponible: true, imagen_url: null },

  // El Senador - Pescados Enteros
  { id: 'p_es41', categoria_id: 'c_es7', nombre: 'Huachinango al Gusto (Por kg)', descripcion: 'Precio promedio por kilogramo. Preparado Al Ajo, Al Mojo de Ajo, A la Diabla o simplemente Frito.', precio: 420.00, disponible: true, imagen_url: null },
  { id: 'p_es42', categoria_id: 'c_es7', nombre: 'Mojarra al Gusto', descripcion: 'Mojarra fresca preparada Frita, Al Ajo, Al Mojo de Ajo o A la Diabla.', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es43', categoria_id: 'c_es7', nombre: 'Mojarra Rellena', descripcion: 'Mojarra entera rellena de guisado de mariscos (camarón y pulpo) y gratinada con queso.', precio: 240.00, disponible: true, destacado: true, rating: 4.9, total_ratings: 11, imagen_url: null },
  { id: 'p_es44', categoria_id: 'c_es7', nombre: 'Pescado Zarandeado (Por kg)', descripcion: 'Estilo Nayarit, cocinado lentamente a las brasas con carbón (Pedido mínimo de 1 kg).', precio: 420.00, disponible: true, imagen_url: null },

  // El Senador - Carnes y Aves
  { id: 'p_es45', categoria_id: 'c_es8', nombre: 'Corte New York', descripcion: 'Jugoso corte de 300g de res a la parrilla, acompañado de papa al horno y verduras cocidas al vapor.', precio: 290.00, disponible: true, imagen_url: null },
  { id: 'p_es46', categoria_id: 'c_es8', nombre: 'Rib Eye', descripcion: 'Corte premium de 300g, gran suavidad y sabor, acompañado de papa al horno y verduras.', precio: 310.00, disponible: true, destacado: true, rating: 4.8, total_ratings: 8, imagen_url: null },
  { id: 'p_es47', categoria_id: 'c_es8', nombre: 'Pechuga de Pollo al Gusto', descripcion: 'Preparada A la Plancha, Empanizada o estilo Cordon Bleu.', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es48', categoria_id: 'c_es8', nombre: 'Fajitas de Pollo', descripcion: 'Tiras de pechuga de pollo salteadas con cebolla y pimiento morrón.', precio: 165.00, disponible: true, imagen_url: null },
  { id: 'p_es49', categoria_id: 'c_es8', nombre: 'Fajitas de Res', descripcion: 'Tiras de res salteadas con cebolla, pimientos y sazonadores de la casa.', precio: 185.00, disponible: true, imagen_url: null },
  { id: 'p_es40', categoria_id: 'c_es8', nombre: 'Hamburguesa con Papas', descripcion: 'Hamburguesa con papas fritas. Elige sencilla o doble.', precio: 110.00, disponible: true, imagen_url: null },

  // El Senador - Menú Infantil
  { id: 'p_es50a', categoria_id: 'c_es9', nombre: 'Nuggets de Pollo', descripcion: 'Acompañados de una porción de papas fritas crujientes.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_es50b', categoria_id: 'c_es9', nombre: 'Deditos de Pescado Infantil', descripcion: 'Tiras de pescado empanizadas, acompañadas de papas fritas.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_es50c', categoria_id: 'c_es9', nombre: 'Quesadilla con Papas', descripcion: 'Quesadilla sencilla acompañada de papas fritas.', precio: 75.00, disponible: true, imagen_url: null },
  { id: 'p_es50d', categoria_id: 'c_es9', nombre: 'Mini Hamburguesa con Papas', descripcion: 'Hamburguesa pequeña de carne de res y queso con papas fritas.', precio: 90.00, disponible: true, imagen_url: null },

  // El Senador - Bebidas sin Alcohol
  { id: 'p_es50', categoria_id: 'c_es10', nombre: 'Refresco de botella', descripcion: 'Presentación de 355ml.', precio: 32.00, disponible: true, imagen_url: null },
  { id: 'p_es50e', categoria_id: 'c_es10', nombre: 'Agua Embotellada', precio: 25.00, disponible: true, imagen_url: null },
  { id: 'p_es51', categoria_id: 'c_es10', nombre: 'Limonada / Naranjada', descripcion: 'Preparada al instante, puede ser Natural o Mineral.', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_es52', categoria_id: 'c_es10', nombre: 'Agua de Sabor', descripcion: 'Sabores tradicionales como Horchata y Jamaica.', precio: 35.00, disponible: true, imagen_url: null },
  { id: 'p_es53', categoria_id: 'c_es10', nombre: 'Clamato Preparado', descripcion: 'Preparado con salsas negras, limón, sal y pimienta (sin alcohol).', precio: 65.00, disponible: true, imagen_url: null },
  { id: 'p_es54', categoria_id: 'c_es10', nombre: 'Café Americano', precio: 30.00, disponible: true, imagen_url: null },
  { id: 'p_es55', categoria_id: 'c_es10', nombre: 'Té caliente', precio: 25.00, disponible: true, imagen_url: null },

  // El Senador - Bebidas con Alcohol y Bar
  { id: 'p_es56', categoria_id: 'c_es11', nombre: 'Cerveza Media', descripcion: 'Marcas tradicionales: Corona, Victoria, Pacífico.', precio: 40.00, disponible: true, imagen_url: null },
  { id: 'p_es57', categoria_id: 'c_es11', nombre: 'Cerveza Mega / Familiar', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_es58', categoria_id: 'c_es11', nombre: 'Cerveza de Barril', descripcion: 'Servida bien fría en vaso.', precio: 45.00, disponible: true, imagen_url: null },
  { id: 'p_es59', categoria_id: 'c_es11', nombre: 'Michelada Preparada', descripcion: 'Cerveza de tu elección preparada con clamato, mezcla de salsas oscuras, limón y sal.', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_es60', categoria_id: 'c_es11', nombre: 'Cantarito de Tequila', descripcion: 'Preparado tradicional con jugo de limón, naranja, toronja, refresco de toronja y tequila de la casa.', precio: 95.00, disponible: true, imagen_url: null },
  { id: 'p_es61', categoria_id: 'c_es11', nombre: 'Margarita', descripcion: 'Coctel clásico disponible en sabores de Limón, Fresa o Mango.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_es62', categoria_id: 'c_es11', nombre: 'Piña Colada', descripcion: 'Crema de coco, jugo de piña, leche evaporada y ron blanco.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_es63', categoria_id: 'c_es11', nombre: 'Vampiro', descripcion: 'Mezcla de tequila, sangrita, refresco de toronja, limón y sal.', precio: 85.00, disponible: true, imagen_url: null },
  { id: 'p_es64', categoria_id: 'c_es11', nombre: 'Paloma', descripcion: 'Tequila blanco, refresco de toronja, pizca de sal y limón.', precio: 80.00, disponible: true, imagen_url: null },
  { id: 'p_es65', categoria_id: 'c_es11', nombre: 'Cuba Libre', descripcion: 'Ron blanco, refresco de cola y jugo de limón.', precio: 80.00, disponible: true, imagen_url: null },

  // California Burger - Hamburguesas al Carbón
  {
    id: 'p_cb1',
    categoria_id: 'c_cb1',
    nombre: 'California Burger',
    descripcion: 'La original de la playa. Hamburguesa de res al carbón con ingredientes seleccionados.',
    precio: 80.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 8,
    imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb2',
    categoria_id: 'c_cb1',
    nombre: 'BBQ Wave',
    descripcion: 'Hamburguesa al carbón con un irresistible sabor ahumado y bañada en nuestra salsa BBQ especial.',
    precio: 80.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb3',
    categoria_id: 'c_cb1',
    nombre: 'Jalapeño Heat',
    descripcion: '¡Picante y delicioso! Hamburguesa al carbón con chiles jalapeños y aderezo especial.',
    precio: 80.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb4',
    categoria_id: 'c_cb1',
    nombre: 'Pollo Burger (con fries)',
    descripcion: 'Hamburguesa de pollo crujiente acompañada de una generosa porción de papas a la francesa.',
    precio: 90.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80'
  },

  // California Burger - Snacks
  {
    id: 'p_cb5',
    categoria_id: 'c_cb2',
    nombre: 'Dedos de Queso',
    descripcion: 'Crujientes y rellenos de queso mozzarella derretido.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76c7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb6',
    categoria_id: 'c_cb2',
    nombre: 'Aros de Cebolla',
    descripcion: 'Clásicos aros de cebolla empanizados y fritos a la perfección.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb7',
    categoria_id: 'c_cb2',
    nombre: 'Papas a la Francesa',
    descripcion: 'Papas fritas clásicas, crujientes por fuera y suaves por dentro.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb8',
    categoria_id: 'c_cb2',
    nombre: 'Papas Mariana',
    descripcion: '¡Explosión de Sabor! Papas fritas con preparación y condimentos especiales de la casa.',
    precio: 60.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb9',
    categoria_id: 'c_cb2',
    nombre: 'Nachos',
    descripcion: 'Nachos crujientes bañados en delicioso queso caliente.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb10',
    categoria_id: 'c_cb2',
    nombre: 'Boneless Wings (BBQ - Buffalo)',
    descripcion: 'Deliciosos trozos de pollo deshuesado empanizados, bañados en salsa BBQ o Buffalo.',
    precio: 70.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&auto=format&fit=crop&q=80'
  },

  // California Burger - Algo Más
  {
    id: 'p_cb11',
    categoria_id: 'c_cb3',
    nombre: 'Happy Dogo',
    descripcion: 'Hot dog premium preparado con tocino y aderezos especiales.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb12',
    categoria_id: 'c_cb3',
    nombre: 'Salchichas Lokas',
    descripcion: 'Salchichas preparadas al estilo local con salsas y condimentos.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb13',
    categoria_id: 'c_cb3',
    nombre: 'Nuggets',
    descripcion: 'Crujientes nuggets de pollo, perfectos para acompañar.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1562967914-01dee72a1b41?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb14',
    categoria_id: 'c_cb3',
    nombre: 'Burgesita',
    descripcion: 'Nuestra versión infantil o mini de hamburguesa sencilla.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400&auto=format&fit=crop&q=80'
  },

  // California Burger - Bebidas
  {
    id: 'p_cb15',
    categoria_id: 'c_cb4',
    nombre: 'Refrescos',
    descripcion: 'Variedad de marcas en diferentes tamaños.',
    precio: 20.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_cb16',
    categoria_id: 'c_cb4',
    nombre: 'Agua',
    descripcion: 'Agua purificada embotellada.',
    precio: 20.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1608885898957-a599fb1863fc?w=400&auto=format&fit=crop&q=80'
  },

  // Tortas Ahogadas El Chespi - Paquetes del Día
  {
    id: 'p_chespi_paq1',
    categoria_id: 'c_chespi1',
    nombre: 'Paquete 1',
    descripcion: '2 Tortas Ahogadas + 6 Tacos Dorados Sencillos.',
    precio: 180.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 15,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_paq2',
    categoria_id: 'c_chespi1',
    nombre: 'Paquete 2',
    descripcion: '2 Tortas Ahogadas + 3 Tacos Dorados con Carne.',
    precio: 160.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_paq3',
    categoria_id: 'c_chespi1',
    nombre: 'Paquete 3',
    descripcion: '3 Tortas Ahogadas + 4 Tacos Dorados Sencillos.',
    precio: 230.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_paq4',
    categoria_id: 'c_chespi1',
    nombre: 'Paquete 4',
    descripcion: '4 Tortas Ahogadas + 4 Tacos Dorados Sencillos.',
    precio: 300.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_paq5',
    categoria_id: 'c_chespi1',
    nombre: 'Paquete 5',
    descripcion: '5 Tortas Ahogadas + 3 Tacos Dorados Sencillos.',
    precio: 355.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80'
  },

  // Tortas Ahogadas El Chespi - Individuales
  {
    id: 'p_chespi_torta',
    categoria_id: 'c_chespi2',
    nombre: 'Torta Ahogada de Carnitas',
    descripcion: 'Birote salado crujiente relleno de deliciosas carnitas de cerdo, bañado en salsa de jitomate y picante al gusto.',
    precio: 65.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_taco_c',
    categoria_id: 'c_chespi2',
    nombre: 'Taco Dorado con Carne',
    descripcion: 'Taco dorado relleno (papa, frijol o requesón) servido con una porción de jugosas carnitas encima y cebollita desflemada.',
    precio: 22.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_taco_s',
    categoria_id: 'c_chespi2',
    nombre: 'Taco Dorado Sencillo',
    descripcion: 'Taco dorado crujiente relleno de papa, frijol o requesón, bañado en salsa de jitomate y col picada.',
    precio: 12.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80'
  },

  // Tortas Ahogadas El Chespi - Bebidas
  {
    id: 'p_chespi_refresco',
    categoria_id: 'c_chespi3',
    nombre: 'Refrescos',
    descripcion: 'Refresco de botella frío de tu elección.',
    precio: 20.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_chespi_agua',
    categoria_id: 'c_chespi3',
    nombre: 'Agua Fresca de Sabor',
    descripcion: 'Agua fresca de sabor natural preparada al día (Horchata o Jamaica).',
    precio: 25.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1608885898957-a599fb1863fc?w=400&auto=format&fit=crop&q=80'
  },

  // El Antojito - Los Clásicos
  {
    id: 'p_ea_revolcado',
    categoria_id: 'c_ea1',
    nombre: 'Revolcado',
    descripcion: 'Elote entero con la base de aderezos. Elige tu tipo de elote y toppings.',
    precio: 25.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_vaso',
    categoria_id: 'c_ea1',
    nombre: 'En Vaso',
    descripcion: 'Elote desgranado con la base de aderezos y toppings al gusto.',
    precio: 35.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_costillitas',
    categoria_id: 'c_ea1',
    nombre: 'Costillitas',
    descripcion: 'Elote cortado tipo costilla. Incluye salsas a elegir (Mango Habanero, Búfalo).',
    precio: 40.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80'
  },

  // El Antojito - Pal' Antojo
  {
    id: 'p_ea_sabrielotes',
    categoria_id: 'c_ea2',
    nombre: 'Sabrielotes',
    descripcion: 'Sabritas de tu elección con elote desgranado, base de aderezos y toppings.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_elotachos',
    categoria_id: 'c_ea2',
    nombre: 'Elotachos',
    descripcion: 'Tostitos verdes con elote desgranado, queso amarillo, base de aderezos y toppings.',
    precio: 55.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_especial',
    categoria_id: 'c_ea2',
    nombre: 'Especial',
    descripcion: 'Sabritas de tu elección, elote desgranado, sopa Maruchan, queso amarillo, aderezos y toppings.',
    precio: 65.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_maruelote',
    categoria_id: 'c_ea2',
    nombre: 'Marúelote',
    descripcion: 'Sopa Maruchan con elote desgranado, queso amarillo, base de aderezos y toppings.',
    precio: 50.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80'
  },

  // El Antojito - Otros
  {
    id: 'p_ea_salchichas',
    categoria_id: 'c_ea3',
    nombre: 'Salchichas Adobadas',
    descripcion: 'Deliciosas salchichas adobadas con aderezos al gusto.',
    precio: 35.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p_ea_papas',
    categoria_id: 'c_ea3',
    nombre: 'Papas Adobadas',
    descripcion: 'Crujientes papas adobadas preparadas al gusto.',
    precio: 35.00,
    disponible: true,
    imagen_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80'
  },

  // Roshi Rosca de Sushi - Roscas Para Compartir (c_roshi1)
  {
    id: 'p_roshi_tradicional',
    categoria_id: 'c_roshi1',
    nombre: 'Rosca Tradicional',
    descripcion: 'Rosca de arroz con ensalada de surimi.',
    precio: 360.00,
    disponible: true,
    imagen_url: '/foto portada roshi.png'
  },
  {
    id: 'p_roshi_clasica',
    categoria_id: 'c_roshi1',
    nombre: 'Rosca Clásica',
    descripcion: 'Rosca de arroz con camarón cocido y ensalada de surimi.',
    precio: 380.00,
    disponible: true,
    imagen_url: '/foto portada roshi.png'
  },
  {
    id: 'p_roshi_crunch',
    categoria_id: 'c_roshi1',
    nombre: 'Rosca Crunch',
    descripcion: 'Rosca de arroz con camarón empanizado y ensalada de surimi.',
    precio: 400.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 12,
    imagen_url: '/foto portada roshi.png'
  },
  {
    id: 'p_roshi_roca',
    categoria_id: 'c_roshi1',
    nombre: 'Rosca Roca',
    descripcion: 'Rosca de arroz con camarón capeado y aderezo spicy, con ensalada de surimi.',
    precio: 420.00,
    disponible: true,
    imagen_url: '/foto portada roshi.png'
  },
  {
    id: 'p_roshi_monchosa',
    categoria_id: 'c_roshi1',
    nombre: 'Rosca La Monchosa',
    descripcion: 'Rosca de arroz con doble porción extra de camarón tanto empanizado como en la ensalada de surimi.',
    precio: 480.00,
    disponible: true,
    destacado: true,
    rating: 5.0,
    total_ratings: 8,
    imagen_url: '/foto portada roshi.png'
  },

  // Roshi Rosca de Sushi - Individuales (c_roshi2)
  {
    id: 'p_roshi_ind_tradicional',
    categoria_id: 'c_roshi2',
    nombre: 'Tradicional Individual',
    descripcion: 'Rosca de arroz con ensalada de surimi.',
    precio: 110.00,
    disponible: true,
    imagen_url: '/foto perfil roshi.png'
  },
  {
    id: 'p_roshi_ind_clasica',
    categoria_id: 'c_roshi2',
    nombre: 'Clásica Individual',
    descripcion: 'Rosca de arroz con camarón cocido y ensalada de surimi.',
    precio: 113.00,
    disponible: true,
    imagen_url: '/foto perfil roshi.png'
  },
  {
    id: 'p_roshi_ind_crunch',
    categoria_id: 'c_roshi2',
    nombre: 'Crunch Individual',
    descripcion: 'Rosca de arroz con camarón empanizado y ensalada de surimi.',
    precio: 125.00,
    disponible: true,
    destacado: true,
    rating: 4.8,
    total_ratings: 15,
    imagen_url: '/foto perfil roshi.png'
  },
  {
    id: 'p_roshi_ind_roca',
    categoria_id: 'c_roshi2',
    nombre: 'Roca Individual',
    descripcion: 'Rosca de arroz con camarón capeado y aderezo spicy, con ensalada de surimi.',
    precio: 135.00,
    disponible: true,
    imagen_url: '/foto perfil roshi.png'
  },

  // Roshi Rosca de Sushi - Roshi Bites (c_roshi3)
  {
    id: 'p_roshi_bites_spicy',
    categoria_id: 'c_roshi3',
    nombre: 'Bites Spicy (8 pzs.)',
    descripcion: 'Bolas de arroz empanizado con ensalada de camarón, surimi, zanahoria y pepino con un toque spicy.',
    precio: 140.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 14,
    imagen_url: '/foto roshi bites.png'
  },
  {
    id: 'p_roshi_bites_jalapeno',
    categoria_id: 'c_roshi3',
    nombre: 'Bites Jalapeño (8 pzs.)',
    descripcion: 'Bolas de arroz empanizado con philadelphia, trocitos de chile jalapeño y pepino.',
    precio: 110.00,
    disponible: true,
    imagen_url: '/foto roshi bites.png'
  },

  // Roshi Rosca de Sushi - Roshi Bowl (c_roshi4)
  {
    id: 'p_roshi_bowl_crunch',
    categoria_id: 'c_roshi4',
    nombre: 'Crunch Bowl',
    descripcion: 'Base de arroz con camarón empanizado, philadelphia, aguacate, pepino y zanahoria.',
    precio: 140.00,
    disponible: true,
    imagen_url: '/foto roshi bowl.png'
  },
  {
    id: 'p_roshi_bowl_spicy',
    categoria_id: 'c_roshi4',
    nombre: 'Spicy Bowl',
    descripcion: 'Base de arroz con ensalada de camarón, surimi, zanahoria y pepino con un toque spicy y aguacate.',
    precio: 130.00,
    disponible: true,
    destacado: true,
    rating: 4.8,
    total_ratings: 11,
    imagen_url: '/foto roshi bowl.png'
  },
  {
    id: 'p_roshi_bowl_fit',
    categoria_id: 'c_roshi4',
    nombre: 'Fit Bowl',
    descripcion: 'Base de arroz con ensalada de atún cremosa, elote, aguacate y zanahoria.',
    precio: 115.00,
    disponible: true,
    imagen_url: '/foto roshi bowl.png'
  },

  // Roshi Rosca de Sushi - Bebidas (c_roshi5)
  {
    id: 'p_roshi_refresco',
    categoria_id: 'c_roshi5',
    nombre: 'Refresco',
    descripcion: 'Refresco frío a elegir.',
    precio: 22.00,
    disponible: true,
    imagen_url: '/foto roshi drink.png'
  },
  {
    id: 'p_roshi_te_frio',
    categoria_id: 'c_roshi5',
    nombre: 'Té Frío',
    descripcion: 'Refrescante té frío de la casa (Refil 1 vez).',
    precio: 50.00,
    disponible: true,
    imagen_url: '/foto roshi drink.png'
  },
  {
    id: 'p_roshi_agua_fresca',
    categoria_id: 'c_roshi5',
    nombre: 'Agua Fresca del Día',
    descripcion: 'Agua fresca natural preparada diariamente.',
    precio: 30.00,
    disponible: true,
    imagen_url: '/foto roshi drink.png'
  },

  // Asador La Liebre - Botanas (c_libre1)
  {
    id: 'p_libre_papas_francesa',
    categoria_id: 'c_libre1',
    nombre: 'Papas a la Francesa o Gajo',
    descripcion: 'Papas cortadas al momento y fritas a la perfección.',
    precio: 65.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_papas_arregladitas',
    categoria_id: 'c_libre1',
    nombre: 'Papas Arregladitas',
    descripcion: 'Papas a la francesa con arrachera, queso fundido y aderezos de la casa.',
    precio: 120.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 12,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_alitas',
    categoria_id: 'c_libre1',
    nombre: 'Alitas 7 pz',
    descripcion: 'Deliciosas alitas crujientes con salsa a elegir.',
    precio: 105.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_mango_hab_fries',
    categoria_id: 'c_libre1',
    nombre: 'Mango Habanero Fries',
    descripcion: 'Papas francesas con trozos de boneless bañados con aderezo chipotle y ranch.',
    precio: 140.00,
    disponible: true,
    destacado: true,
    rating: 4.8,
    total_ratings: 9,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_guacamole',
    categoria_id: 'c_libre1',
    nombre: 'Guacamole',
    descripcion: 'Guacamole fresco machacado al momento con totopos.',
    precio: 85.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_guacamole_ranchero',
    categoria_id: 'c_libre1',
    nombre: 'Guacamole Ranchero',
    descripcion: 'Guacamole fresco con trocitos de cecina asada encima.',
    precio: 140.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_aguachile',
    categoria_id: 'c_libre1',
    nombre: 'Aguachile de Rib Eye',
    descripcion: 'Rib Eye al grill bañado en salsas negras especiales de la casa con cebolla morada, chile serrano y aguacate.',
    precio: 295.00,
    disponible: true,
    destacado: true,
    rating: 5.0,
    total_ratings: 16,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Gratinados (c_libre2)
  {
    id: 'p_libre_grat_asada',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Asada',
    descripcion: 'Queso fundido con carne asada al carbón, incluye tortillas hechas a mano.',
    precio: 150.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_grat_chorizo',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Chorizo',
    descripcion: 'Queso fundido con delicioso chorizo asado, incluye tortillas hechas a mano.',
    precio: 140.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_grat_pollo',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Pollo',
    descripcion: 'Queso fundido con pollo deshebrado, incluye tortillas hechas a mano.',
    precio: 140.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_grat_chiztorra',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Chiztorra',
    descripcion: 'Queso fundido con chiztorra dorada, incluye tortillas hechas a mano.',
    precio: 140.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_grat_cecina',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Cecina',
    descripcion: 'Queso fundido con cecina asada, incluye tortillas hechas a mano.',
    precio: 150.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_grat_arrachera',
    categoria_id: 'c_libre2',
    nombre: 'Gratinado de Arrachera',
    descripcion: 'Queso fundido con arrachera de cerdo tierna, incluye tortillas hechas a mano.',
    precio: 150.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Papa Rellena (c_libre3)
  {
    id: 'p_libre_papa_rellena',
    categoria_id: 'c_libre3',
    nombre: 'Papa Rellena',
    descripcion: 'Papa asada acompañada de queso fundido, crema, aderezo chipotle, perejil seco y tu elección de carne.',
    precio: 140.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 22,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Cortes (c_libre4)
  {
    id: 'p_libre_corte_arrachera',
    categoria_id: 'c_libre4',
    nombre: 'Corte Arrachera (350gr)',
    descripcion: 'Arrachera tierna a la leña acompañada con un chile asado, papas francesas o gajo.',
    precio: 280.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_corte_tbone',
    categoria_id: 'c_libre4',
    nombre: 'Corte T-Bone (350gr)',
    descripcion: 'Corte T-Bone a la leña acompañado con un chile asado, papas francesas o gajo.',
    precio: 290.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_corte_newyork',
    categoria_id: 'c_libre4',
    nombre: 'Corte New York (350gr)',
    descripcion: 'Corte New York a la leña acompañado con un chile asado, papas francesas o gajo.',
    precio: 295.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_corte_ribeye',
    categoria_id: 'c_libre4',
    nombre: 'Corte Rib Eye (350gr)',
    descripcion: 'Jugoso Rib Eye a la leña acompañado con un chile asado, papas francesas o gajo.',
    precio: 310.00,
    disponible: true,
    destacado: true,
    rating: 5.0,
    total_ratings: 18,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Especiales (c_libre5)
  {
    id: 'p_libre_esp_burrita',
    categoria_id: 'c_libre5',
    nombre: 'Burrita Libre',
    descripcion: 'Tortilla de harina grande con queso gratinado, frijoles y carne a elegir, bañada en aderezos.',
    precio: 110.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_esp_burrita_envuelta',
    categoria_id: 'c_libre5',
    nombre: 'Burrita Envuelta',
    descripcion: 'Tortilla de harina con queso, frijoles y carne a elegir, envuelta en crujiente tocino.',
    precio: 120.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 15,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_esp_hamburguesa',
    categoria_id: 'c_libre5',
    nombre: 'Hamburguesa La Libre',
    descripcion: 'Bollo de hamburguesa con queso fundido, carne preparada con tocino ahumado, aderezo de la casa, lechuga, jitomate y cebolla morada.',
    precio: 135.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },
  {
    id: 'p_libre_esp_lonche',
    categoria_id: 'c_libre5',
    nombre: 'Lonche Especial',
    descripcion: 'Pan para lonche dorado con queso fundido y tu elección de carne asada.',
    precio: 95.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Tacos (c_libre6)
  {
    id: 'p_libre_taco',
    categoria_id: 'c_libre6',
    nombre: 'Taco con Carne a Elegir',
    descripcion: 'Taco elaborado con tortilla hecha a mano y la carne de tu elección.',
    precio: 32.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Quecas (c_libre7)
  {
    id: 'p_libre_queca',
    categoria_id: 'c_libre7',
    nombre: 'Queca con Carne a Elegir',
    descripcion: 'Quesadilla en tortilla de maíz o harina con queso y tu elección de carne.',
    precio: 40.00,
    disponible: true,
    imagen_url: '/foto portada la libre.png'
  },

  // Asador La Liebre - Bebidas (c_libre8)
  {
    id: 'p_libre_refresco',
    categoria_id: 'c_libre8',
    nombre: 'Refresco',
    descripcion: 'Refresco frío de botella a elegir.',
    precio: 30.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_agua_fresca',
    categoria_id: 'c_libre8',
    nombre: 'Agua Fresca',
    descripcion: 'Refrescante agua fresca natural de sabor del día (lima u horchata).',
    precio: 28.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_agua_natural',
    categoria_id: 'c_libre8',
    nombre: 'Agua Natural',
    descripcion: 'Botella de agua purificada fría.',
    precio: 20.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_cerveza',
    categoria_id: 'c_libre8',
    nombre: 'Cerveza Corona',
    descripcion: 'Cerveza Corona de botella (clara u oscura).',
    precio: 36.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_tequila_3030',
    categoria_id: 'c_libre8',
    nombre: 'Tequila 30-30 Blanco',
    descripcion: 'Caballito de Tequila 30-30 Blanco premium.',
    precio: 80.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_tequila_tepa',
    categoria_id: 'c_libre8',
    nombre: 'Tequila Hacienda de Tepa',
    descripcion: 'Caballito de Tequila Hacienda de Tepa reposado.',
    precio: 80.00,
    disponible: true,
    imagen_url: null
  },
  {
    id: 'p_libre_tequila_herradura',
    categoria_id: 'c_libre8',
    nombre: 'Tequila Herradura Antiguo',
    descripcion: 'Caballito de Tequila Herradura Antiguo de la casa.',
    precio: 90.00,
    disponible: true,
    imagen_url: null
  },

  // Punto 21 - Hamburguesas (c_punto1)
  {
    id: 'p_punto_hamb_sencilla',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa Sencilla',
    descripcion: 'Hamburguesa clásica con carne de res, queso amarillo, verdura fresca y papas fritas.',
    precio: 90.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_especial',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa Especial 21',
    descripcion: 'Carne de res, tocino crujiente, aros de cebolla, queso amarillo, verdura y papas.',
    precio: 115.00,
    disponible: true,
    destacado: true,
    rating: 4.8,
    total_ratings: 12,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_suprema',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa Suprema 21',
    descripcion: 'Doble carne de res, tocino crujiente, aros de cebolla, queso amarillo, verdura y papas.',
    precio: 129.00,
    disponible: true,
    destacado: true,
    rating: 4.9,
    total_ratings: 16,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_arrachera',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa de Arrachera',
    descripcion: 'Jugosa carne de arrachera de res, queso amarillo, verdura y papas.',
    precio: 115.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_pollo_crujiente',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa de Pollo Crujiente',
    descripcion: 'Tiras de pollo crujiente empanizado, queso amarillo, verdura y papas.',
    precio: 115.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_boneless',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa de Boneless',
    descripcion: 'Trocitos de pollo natural o bañados con tu salsa favorita, queso amarillo, verdura y papas.',
    precio: 115.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_hamb_pollo_extreme',
    categoria_id: 'c_punto1',
    nombre: 'Hamburguesa Pollo Extreme',
    descripcion: 'Tiras de pollo crujiente, aros de cebolla, dedos de queso gratinados, queso amarillo, verdura fresca y papas.',
    precio: 139.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },

  // Punto 21 - Snacks (c_punto2)
  {
    id: 'p_punto_snack_alitas_10',
    categoria_id: 'c_punto2',
    nombre: 'Alitas (10 pzas)',
    descripcion: '10 deliciosas alitas bañadas en tu salsa favorita.',
    precio: 149.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_alitas_1k',
    categoria_id: 'c_punto2',
    nombre: 'Alitas (1 kg)',
    descripcion: '1 kg de deliciosas alitas crujientes con salsa a elegir.',
    precio: 289.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_boneless_200',
    categoria_id: 'c_punto2',
    nombre: 'Boneless (200 gr)',
    descripcion: '200 gramos de trozos de pechuga de pollo empanizados y bañados en salsa.',
    precio: 95.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_boneless_350',
    categoria_id: 'c_punto2',
    nombre: 'Boneless (350 gr)',
    descripcion: '350 gramos de jugosos boneless crujientes con salsa a elegir.',
    precio: 149.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_aros_200',
    categoria_id: 'c_punto2',
    nombre: 'Aros de Cebolla (200 gr)',
    descripcion: '200 gramos de aros de cebolla empanizados crujientes.',
    precio: 95.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_aros_350',
    categoria_id: 'c_punto2',
    nombre: 'Aros de Cebolla (350 gr)',
    descripcion: '350 gramos de crujientes aros de cebolla.',
    precio: 135.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_dedos_6',
    categoria_id: 'c_punto2',
    nombre: 'Dedos de Queso (6 pzas)',
    descripcion: '6 piezas de deliciosos dedos de queso mozzarella derretidos y empanizados.',
    precio: 95.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_dedos_11',
    categoria_id: 'c_punto2',
    nombre: 'Dedos de Queso (11 pzas)',
    descripcion: '11 piezas de jugosos dedos de queso mozzarella crujientes.',
    precio: 169.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_francesa_200',
    categoria_id: 'c_punto2',
    nombre: 'Papas Francesas (200 gr)',
    descripcion: '200 gramos de papas a la francesa sazonadas.',
    precio: 50.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_francesa_350',
    categoria_id: 'c_punto2',
    nombre: 'Papas Francesas (350 gr)',
    descripcion: '350 gramos de papas francesas calientes.',
    precio: 70.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_gajo_200',
    categoria_id: 'c_punto2',
    nombre: 'Papas Gajo (200 gr)',
    descripcion: '200 gramos de papas gajo sazonadas con especias.',
    precio: 50.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  {
    id: 'p_punto_snack_gajo_350',
    categoria_id: 'c_punto2',
    nombre: 'Papas Gajo (350 gr)',
    descripcion: '350 gramos de crujientes papas gajo.',
    precio: 70.00,
    disponible: true,
    imagen_url: '/foto portada punto 21.png'
  },
  // La Barra 63 - Alitas
  {
    id: 'p_lb_alitas_450',
    categoria_id: 'c_lb1',
    nombre: 'Alitas (450 gr)',
    descripcion: '450 gramos de alitas fritas, crujientes y bañadas en la salsa de tu elección.',
    precio: 100.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_alitas_900',
    categoria_id: 'c_lb1',
    nombre: 'Alitas (900 gr)',
    descripcion: '900 gramos de alitas fritas, crujientes y bañadas en la salsa de tu elección.',
    precio: 200.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },

  // La Barra 63 - Snacks
  {
    id: 'p_lb_tiras_kfc',
    categoria_id: 'c_lb2',
    nombre: 'Tiras KFC (5 pzs)',
    descripcion: '5 piezas de tiras de pechuga crujientes estilo KFC.',
    precio: 120.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_ensalada_pollo',
    categoria_id: 'c_lb2',
    nombre: 'Ensalada de Pollo',
    descripcion: 'Fresca ensalada mixta de vegetales de la casa acompañada con tiras de pollo.',
    precio: 80.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_nuggets_10',
    categoria_id: 'c_lb2',
    nombre: 'Nuggets (10 pzs)',
    descripcion: '10 piezas de nuggets de pollo doraditos.',
    precio: 90.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_nuggets_20',
    categoria_id: 'c_lb2',
    nombre: 'Nuggets (20 pzs)',
    descripcion: '20 piezas de deliciosos nuggets de pollo doraditos.',
    precio: 180.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_boneless_7',
    categoria_id: 'c_lb2',
    nombre: 'Boneless (7 pzs)',
    descripcion: '7 piezas de pechuga de pollo deshuesada, crujientes por fuera y jugosos por dentro, bañados en tu salsa favorita.',
    precio: 100.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_boneless_14',
    categoria_id: 'c_lb2',
    nombre: 'Boneless (14 pzs)',
    descripcion: '14 piezas de tiernos y crujientes trozos de pechuga de pollo deshuesada bañados en la salsa de tu elección.',
    precio: 200.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_dedos_queso_6',
    categoria_id: 'c_lb2',
    nombre: 'Dedos de Queso (6 pzs)',
    descripcion: '6 dedos de queso mozzarella empanizados y fritos.',
    precio: 90.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_dedos_queso_12',
    categoria_id: 'c_lb2',
    nombre: 'Dedos de Queso (12 pzs)',
    descripcion: '12 deliciosos dedos de queso mozzarella doraditos.',
    precio: 180.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_aros_cebolla_10',
    categoria_id: 'c_lb2',
    nombre: 'Aros de Cebolla (10 pzs)',
    descripcion: '10 crujientes aros de cebolla empanizados.',
    precio: 90.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_aros_cebolla_20',
    categoria_id: 'c_lb2',
    nombre: 'Aros de Cebolla (20 pzs)',
    descripcion: '20 deliciosos y crujientes aros de cebolla empanizados.',
    precio: 180.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_papas_francesa',
    categoria_id: 'c_lb2',
    nombre: 'Papas Francesas',
    descripcion: 'Porción clásica de papas fritas doraditas.',
    precio: 60.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_papas_gajo',
    categoria_id: 'c_lb2',
    nombre: 'Papas Gajo',
    descripcion: 'Papas gajo sazonadas. Puedes seleccionarlas sencillas o preparadas estilo Cheddar Tocino, Parmesano o Ajo.',
    precio: 70.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },

  // La Barra 63 - Hamburguesas
  {
    id: 'p_lb_burger_res',
    categoria_id: 'c_lb3',
    nombre: 'Hamburguesa de Res',
    descripcion: 'Hamburguesa con carne de res. Elige el estilo: Sencilla, Tuta o Arrolladora.',
    precio: 70.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_burger_pollo',
    categoria_id: 'c_lb3',
    nombre: 'Hamburguesa de Pollo',
    descripcion: 'Hamburguesa con pechuga de pollo. Elige el estilo: Sencilla, Tuta o Arrolladora.',
    precio: 70.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_burger_kfc',
    categoria_id: 'c_lb3',
    nombre: 'Hamburguesa KFC',
    descripcion: 'Hamburguesa con crujiente pollo estilo KFC. Elige el estilo: Sencilla, Tuta o Arrolladora.',
    precio: 80.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_burger_arrachera',
    categoria_id: 'c_lb3',
    nombre: 'Hamburguesa de Arrachera',
    descripcion: 'Hamburguesa con carne de arrachera seleccionada. Elige el estilo: Sencilla, Tuta o Arrolladora.',
    precio: 80.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_burger_seloin',
    categoria_id: 'c_lb3',
    nombre: 'Hamburguesa de Seloin (Sirloin)',
    descripcion: 'Hamburguesa con carne selecta de Sirloin. Elige el estilo: Sencilla, Tuta o Arrolladora.',
    precio: 80.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },

  // La Barra 63 - Pizzas
  {
    id: 'p_lb_pizza_pastor',
    categoria_id: 'c_lb4',
    nombre: 'Pizza Chica de Pastor',
    descripcion: 'Pizza individual con abundante carne al pastor, piña dulce, cebolla, cilantro fresco, limón y nuestra salsa especial chipotle.',
    precio: 100.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  {
    id: 'p_lb_pizza_barra_63',
    categoria_id: 'c_lb4',
    nombre: 'Pizza Chica Estilo Barra 63',
    descripcion: 'Pizza individual de la casa con pepperoni, carne molida selecta, pimiento morrón verde, aceitunas negras y salsa catsup.',
    precio: 100.00,
    disponible: true,
    imagen_url: '/la_barra_63_cover.png'
  },
  // Casa D' Sofi - Especialidades
  {
    id: 'p_ds_shoyu',
    categoria_id: 'c_ds1',
    nombre: 'Shoyu Ramen',
    descripcion: 'Caldo eterno, fideo casero, cerdo glaseado, huevo ajitama, germinado y espinaca.',
    precio: 155.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  },
  {
    id: 'p_ds_camaron',
    categoria_id: 'c_ds1',
    nombre: 'Camarón Ramen',
    descripcion: 'Caldo de camarón, miso y crema de cacahuate, fideo casero, elote tatemado.',
    precio: 170.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  },
  {
    id: 'p_ds_quesadilla',
    categoria_id: 'c_ds1',
    nombre: 'Quesadilla Glaseada',
    descripcion: 'Rellena de proteína a elegir, fritas y glaseadas en salsa de soya y miel de ajos.',
    precio: 40.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  },
  {
    id: 'p_ds_karaage',
    categoria_id: 'c_ds1',
    nombre: 'Pollo Karaage',
    descripcion: 'Alitas de pollo marinadas, fritas y glaseadas en salsa de soya y miel de ajos.',
    precio: 80.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  },
  // Casa D' Sofi - Bebidas
  {
    id: 'p_ds_te_helado',
    categoria_id: 'c_ds2',
    nombre: 'Té helado de Jazmín 600ml',
    descripcion: 'Refrescante té helado de jazmín natural de la casa.',
    precio: 25.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  },
  {
    id: 'p_ds_refresco',
    categoria_id: 'c_ds2',
    nombre: 'Refresco 600ml',
    descripcion: 'El clásico refresco frío de tu elección.',
    precio: 30.00,
    disponible: true,
    imagen_url: '/casa_d_sofi_cover.png'
  }
];

// PROGRAMMATIC GENERATION OF GRUPOS OPCIONES AND EXTRAS:

const classicalPizzaIds = ['p_mp1', 'p_mp2', 'p_mp3', 'p_mp4', 'p_mp5'];
const specialPizzaIds = ['p_mp6', 'p_mp7', 'p_mp8', 'p_mp9', 'p_mp10'];
const vipPizzaIds = ['p_mp11', 'p_mp12', 'p_mp13'];
const burgerIds = ['p_mp22', 'p_mp23', 'p_mp24', 'p_mp25', 'p_mp26', 'p_mp27'];

// Base Lists
const initialGruposOpciones: GrupoOpciones[] = [

  // Refrescos (Flavor selection is now MANDATORY as per updated spec)
  { id: 'g_sabor_600', producto_id: 'p_mp29', nombre: 'Sabor 600 ML', seleccion_multiple: false, obligatorio: true },
  { id: 'g_sabor_2l', producto_id: 'p_mp30', nombre: 'Sabor 2 Litros', seleccion_multiple: false, obligatorio: true },

  // Nutri Deli Options
  { id: 'g_nd_lic_sab', producto_id: 'p_nd35', nombre: 'Elige el Sabor', seleccion_multiple: false, obligatorio: true },
  { id: 'g_nd_lic_lec', producto_id: 'p_nd35', nombre: 'Tipo de Leche', seleccion_multiple: false, obligatorio: true },
  { id: 'g_nd_choco_lec', producto_id: 'p_nd36', nombre: 'Tipo de Leche', seleccion_multiple: false, obligatorio: true },
  { id: 'g_nd_agua_sab', producto_id: 'p_nd37', nombre: 'Elige el Sabor', seleccion_multiple: false, obligatorio: true },
  { id: 'g_nd_agua_end', producto_id: 'p_nd37', nombre: 'Elige el Endulzante', seleccion_multiple: false, obligatorio: true },
  { id: 'g_nd_hot_end', producto_id: 'p_nd17', nombre: 'Elige tu Endulzante (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_nd_fru_top', producto_id: 'p_nd33', nombre: 'Toppings (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_nd_pla_top', producto_id: 'p_nd34', nombre: 'Toppings (Opcional)', seleccion_multiple: true, obligatorio: false },

  // Don Chicho Options
  { id: 'g_dc_sabor_nieve', producto_id: 'p_dc24', nombre: 'Elige el Sabor de la Nieve', seleccion_multiple: false, obligatorio: true },
  { id: 'g_dc_sabor_nieve_cono', producto_id: 'p_dc25', nombre: 'Elige el Sabor de la Nieve', seleccion_multiple: false, obligatorio: true },

  // California Burger
  { id: 'g_cb_style1', producto_id: 'p_cb1', nombre: 'Elige tu estilo (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_cb_style2', producto_id: 'p_cb2', nombre: 'Elige tu estilo (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_cb_style3', producto_id: 'p_cb3', nombre: 'Elige tu estilo (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_cb_sauce', producto_id: 'p_cb10', nombre: 'Elige tu salsa (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_cb_ref_size', producto_id: 'p_cb15', nombre: 'Elige el tamaño (Obligatorio)', seleccion_multiple: false, obligatorio: true },

  // Tortas Ahogadas El Chespi
  { id: 'g_chespi_chile1', producto_id: 'p_chespi_torta', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_chile2', producto_id: 'p_chespi_paq1', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_chile3', producto_id: 'p_chespi_paq2', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_chile4', producto_id: 'p_chespi_paq3', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_chile5', producto_id: 'p_chespi_paq4', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_chile6', producto_id: 'p_chespi_paq5', nombre: 'Nivel de chile (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  
  { id: 'g_chespi_relleno1', producto_id: 'p_chespi_taco_s', nombre: 'Relleno del taco (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno2', producto_id: 'p_chespi_taco_c', nombre: 'Relleno del taco (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno_paq1', producto_id: 'p_chespi_paq1', nombre: 'Relleno de los tacos (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno_paq2', producto_id: 'p_chespi_paq2', nombre: 'Relleno de los tacos (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno_paq3', producto_id: 'p_chespi_paq3', nombre: 'Relleno de los tacos (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno_paq4', producto_id: 'p_chespi_paq4', nombre: 'Relleno de los tacos (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_chespi_relleno_paq5', producto_id: 'p_chespi_paq5', nombre: 'Relleno de los tacos (Obligatorio)', seleccion_multiple: false, obligatorio: true },

  // El Antojito option groups
  // 1. Tipo de Elote (Blanco o Amarillo)
  { id: 'g_ea_tipo_rev', producto_id: 'p_ea_revolcado', nombre: 'Elige tu elote (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_ea_tipo_vaso', producto_id: 'p_ea_vaso', nombre: 'Elige tu elote (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_ea_tipo_sabri', producto_id: 'p_ea_sabrielotes', nombre: 'Elige tu elote (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  
  // 2. Extra para Revolcado
  { id: 'g_ea_ext_rev', producto_id: 'p_ea_revolcado', nombre: '¿Deseas empanizado especial? (Opcional)', seleccion_multiple: true, obligatorio: false },
  
  // 3. Salsas para Costillitas
  { id: 'g_ea_salsa_cost', producto_id: 'p_ea_costillitas', nombre: 'Elige tu salsa (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_ea_ext_cost', producto_id: 'p_ea_costillitas', nombre: '¿Agregar Sabritas? (Opcional)', seleccion_multiple: true, obligatorio: false },
  
  // 4. Sabritas para Sabrielotes / Especial
  { id: 'g_ea_sabri_sabri', producto_id: 'p_ea_sabrielotes', nombre: 'Elige tus Sabritas (Obligatorio)', seleccion_multiple: false, obligatorio: true },
  { id: 'g_ea_sabri_esp', producto_id: 'p_ea_especial', nombre: 'Elige tus Sabritas (Obligatorio)', seleccion_multiple: false, obligatorio: true },

  // 5. Base de aderezos para todos los elotes
  { id: 'g_ea_aderezo_rev', producto_id: 'p_ea_revolcado', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_ea_aderezo_vaso', producto_id: 'p_ea_vaso', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_ea_aderezo_sabri', producto_id: 'p_ea_sabrielotes', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_ea_aderezo_tachos', producto_id: 'p_ea_elotachos', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_ea_aderezo_esp', producto_id: 'p_ea_especial', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false },
  { id: 'g_ea_aderezo_maru', producto_id: 'p_ea_maruelote', nombre: 'Base de aderezos (Opcional)', seleccion_multiple: true, obligatorio: false }
];

const initialOpcionesExtras: OpcionExtra[] = [

  // Refrescos flavors
  { id: 'o_ref1', grupo_id: 'g_sabor_600', nombre: 'Coca Cola', precio_adicional: 0 },
  { id: 'o_ref2', grupo_id: 'g_sabor_600', nombre: 'Sprite', precio_adicional: 0 },
  { id: 'o_ref3', grupo_id: 'g_sabor_600', nombre: 'Fresca', precio_adicional: 0 },
  { id: 'o_ref4', grupo_id: 'g_sabor_600', nombre: 'Fanta', precio_adicional: 0 },

  { id: 'o_ref5', grupo_id: 'g_sabor_2l', nombre: 'Coca Cola', precio_adicional: 0 },
  { id: 'o_ref6', grupo_id: 'g_sabor_2l', nombre: 'Fresca', precio_adicional: 0 },
  { id: 'o_ref7', grupo_id: 'g_sabor_2l', nombre: 'Sidral Mundet', precio_adicional: 0 },

  // Nutri Deli option details
  { id: 'o_nd_l1', grupo_id: 'g_nd_lic_sab', nombre: 'Fresa', precio_adicional: 0 },
  { id: 'o_nd_l2', grupo_id: 'g_nd_lic_sab', nombre: 'Plátano', precio_adicional: 0 },
  { id: 'o_nd_l3', grupo_id: 'g_nd_lic_sab', nombre: 'Papaya', precio_adicional: 0 },
  { id: 'o_nd_l4', grupo_id: 'g_nd_lic_lec', nombre: 'Entera', precio_adicional: 0 },
  { id: 'o_nd_l5', grupo_id: 'g_nd_lic_lec', nombre: 'Deslactosada', precio_adicional: 0 },
  { id: 'o_nd_c1', grupo_id: 'g_nd_choco_lec', nombre: 'Entera', precio_adicional: 0 },
  { id: 'o_nd_c2', grupo_id: 'g_nd_choco_lec', nombre: 'Deslactosada', precio_adicional: 0 },
  { id: 'o_nd_a1', grupo_id: 'g_nd_agua_sab', nombre: 'Fresa con menta', precio_adicional: 0 },
  { id: 'o_nd_a2', grupo_id: 'g_nd_agua_sab', nombre: 'Piña con menta', precio_adicional: 0 },
  { id: 'o_nd_a3', grupo_id: 'g_nd_agua_sab', nombre: 'Papaya', precio_adicional: 0 },
  { id: 'o_nd_a4', grupo_id: 'g_nd_agua_end', nombre: 'Esplenda', precio_adicional: 0 },
  { id: 'o_nd_a5', grupo_id: 'g_nd_agua_end', nombre: 'Stevia', precio_adicional: 0 },
  { id: 'o_nd_a6', grupo_id: 'g_nd_agua_end', nombre: 'Azúcar regular', precio_adicional: 0 },
  { id: 'o_nd_h1', grupo_id: 'g_nd_hot_end', nombre: 'Maple', precio_adicional: 0 },
  { id: 'o_nd_h2', grupo_id: 'g_nd_hot_end', nombre: 'Lechera', precio_adicional: 0 },
  { id: 'o_nd_h3', grupo_id: 'g_nd_hot_end', nombre: 'Nutella', precio_adicional: 10.00 },
  { id: 'o_nd_h4', grupo_id: 'g_nd_hot_end', nombre: 'Crema de Cacahuate', precio_adicional: 10.00 },
  { id: 'o_nd_t1', grupo_id: 'g_nd_fru_top', nombre: 'Granola mixta', precio_adicional: 0 },
  { id: 'o_nd_t2', grupo_id: 'g_nd_fru_top', nombre: 'Coco Tostado', precio_adicional: 0 },
  { id: 'o_nd_t3', grupo_id: 'g_nd_pla_top', nombre: 'Granola mixta', precio_adicional: 0 },
  { id: 'o_nd_t4', grupo_id: 'g_nd_pla_top', nombre: 'Coco Tostado', precio_adicional: 0 },

  // Don Chicho options details (Sabores de nieve de garrafa)
  { id: 'o_dc_n1', grupo_id: 'g_dc_sabor_nieve', nombre: 'Vainilla', precio_adicional: 0 },
  { id: 'o_dc_n2', grupo_id: 'g_dc_sabor_nieve', nombre: 'Chocolate', precio_adicional: 0 },
  { id: 'o_dc_n3', grupo_id: 'g_dc_sabor_nieve', nombre: 'Fresa', precio_adicional: 0 },
  { id: 'o_dc_n4', grupo_id: 'g_dc_sabor_nieve', nombre: 'Pistache', precio_adicional: 0 },
  { id: 'o_dc_n5', grupo_id: 'g_dc_sabor_nieve', nombre: 'Café', precio_adicional: 0 },
  { id: 'o_dc_n6', grupo_id: 'g_dc_sabor_nieve', nombre: 'Limón', precio_adicional: 0 },
  { id: 'o_dc_n7', grupo_id: 'g_dc_sabor_nieve', nombre: 'Galleta Oreo', precio_adicional: 0 },
  { id: 'o_dc_n8', grupo_id: 'g_dc_sabor_nieve', nombre: 'Coco', precio_adicional: 0 },
  { id: 'o_dc_n9', grupo_id: 'g_dc_sabor_nieve', nombre: 'Frutos Secos', precio_adicional: 0 },
  { id: 'o_dc_n10', grupo_id: 'g_dc_sabor_nieve', nombre: 'Fresa de Agua', precio_adicional: 0 },
  { id: 'o_dc_n11', grupo_id: 'g_dc_sabor_nieve', nombre: 'Chongos', precio_adicional: 0 },
  { id: 'o_dc_n12', grupo_id: 'g_dc_sabor_nieve', nombre: 'Chicle', precio_adicional: 0 },
  { id: 'o_dc_n13', grupo_id: 'g_dc_sabor_nieve', nombre: 'Nuez', precio_adicional: 0 },
  { id: 'o_dc_n14', grupo_id: 'g_dc_sabor_nieve', nombre: 'Mango', precio_adicional: 0 },

  { id: 'o_dc_nc1', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Vainilla', precio_adicional: 0 },
  { id: 'o_dc_nc2', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Chocolate', precio_adicional: 0 },
  { id: 'o_dc_nc3', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Fresa', precio_adicional: 0 },
  { id: 'o_dc_nc4', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Pistache', precio_adicional: 0 },
  { id: 'o_dc_nc5', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Café', precio_adicional: 0 },
  { id: 'o_dc_nc6', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Limón', precio_adicional: 0 },
  { id: 'o_dc_nc7', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Galleta Oreo', precio_adicional: 0 },
  { id: 'o_dc_nc8', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Coco', precio_adicional: 0 },
  { id: 'o_dc_nc9', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Frutos Secos', precio_adicional: 0 },
  { id: 'o_dc_nc10', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Fresa de Agua', precio_adicional: 0 },
  { id: 'o_dc_nc11', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Chongos', precio_adicional: 0 },
  { id: 'o_dc_nc12', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Chicle', precio_adicional: 0 },
  { id: 'o_dc_nc13', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Nuez', precio_adicional: 0 },
  { id: 'o_dc_nc14', grupo_id: 'g_dc_sabor_nieve_cono', nombre: 'Mango', precio_adicional: 0 },

  // California Burger Style Options
  { id: 'o_cb_st1_1', grupo_id: 'g_cb_style1', nombre: 'Con papas a la Francesa', precio_adicional: 0.00 },
  { id: 'o_cb_st1_2', grupo_id: 'g_cb_style1', nombre: 'Con tocino', precio_adicional: 10.00 },
  { id: 'o_cb_st1_3', grupo_id: 'g_cb_style1', nombre: 'Doble carne', precio_adicional: 40.00 },

  { id: 'o_cb_st2_1', grupo_id: 'g_cb_style2', nombre: 'Con papas a la Francesa', precio_adicional: 0.00 },
  { id: 'o_cb_st2_2', grupo_id: 'g_cb_style2', nombre: 'Con tocino', precio_adicional: 10.00 },
  { id: 'o_cb_st2_3', grupo_id: 'g_cb_style2', nombre: 'Doble carne', precio_adicional: 40.00 },

  { id: 'o_cb_st3_1', grupo_id: 'g_cb_style3', nombre: 'Con papas a la Francesa', precio_adicional: 0.00 },
  { id: 'o_cb_st3_2', grupo_id: 'g_cb_style3', nombre: 'Con tocino', precio_adicional: 10.00 },
  { id: 'o_cb_st3_3', grupo_id: 'g_cb_style3', nombre: 'Doble carne', precio_adicional: 40.00 },

  // Boneless sauces
  { id: 'o_cb_sc1', grupo_id: 'g_cb_sauce', nombre: 'BBQ', precio_adicional: 0.00 },
  { id: 'o_cb_sc2', grupo_id: 'g_cb_sauce', nombre: 'Buffalo', precio_adicional: 0.00 },

  // Refrescos sizes
  { id: 'o_cb_ref3', grupo_id: 'g_cb_ref_size', nombre: 'Grande ($50)', precio_adicional: 30.00 },

  // Tortas Ahogadas El Chespi options details
  { id: 'o_chespi_ch1_1', grupo_id: 'g_chespi_chile1', nombre: 'Ahogada (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch1_2', grupo_id: 'g_chespi_chile1', nombre: 'Media Ahogada (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch1_3', grupo_id: 'g_chespi_chile1', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  { id: 'o_chespi_ch2_1', grupo_id: 'g_chespi_chile2', nombre: 'Ahogadas (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch2_2', grupo_id: 'g_chespi_chile2', nombre: 'Medias Ahogadas (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch2_3', grupo_id: 'g_chespi_chile2', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  { id: 'o_chespi_ch3_1', grupo_id: 'g_chespi_chile3', nombre: 'Ahogadas (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch3_2', grupo_id: 'g_chespi_chile3', nombre: 'Medias Ahogadas (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch3_3', grupo_id: 'g_chespi_chile3', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  { id: 'o_chespi_ch4_1', grupo_id: 'g_chespi_chile4', nombre: 'Ahogadas (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch4_2', grupo_id: 'g_chespi_chile4', nombre: 'Medias Ahogadas (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch4_3', grupo_id: 'g_chespi_chile4', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  { id: 'o_chespi_ch5_1', grupo_id: 'g_chespi_chile5', nombre: 'Ahogadas (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch5_2', grupo_id: 'g_chespi_chile5', nombre: 'Medias Ahogadas (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch5_3', grupo_id: 'g_chespi_chile5', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  { id: 'o_chespi_ch6_1', grupo_id: 'g_chespi_chile6', nombre: 'Ahogadas (Mucho chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch6_2', grupo_id: 'g_chespi_chile6', nombre: 'Medias Ahogadas (Medio chile)', precio_adicional: 0.00 },
  { id: 'o_chespi_ch6_3', grupo_id: 'g_chespi_chile6', nombre: 'Sin Chile (Solo salsa dulce)', precio_adicional: 0.00 },

  // Taco Fillings (Papa, Frijol, Requesón)
  { id: 'o_chespi_rf1_1', grupo_id: 'g_chespi_relleno1', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rf1_2', grupo_id: 'g_chespi_relleno1', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rf1_3', grupo_id: 'g_chespi_relleno1', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rf2_1', grupo_id: 'g_chespi_relleno2', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rf2_2', grupo_id: 'g_chespi_relleno2', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rf2_3', grupo_id: 'g_chespi_relleno2', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rfp1_1', grupo_id: 'g_chespi_relleno_paq1', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp1_2', grupo_id: 'g_chespi_relleno_paq1', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp1_3', grupo_id: 'g_chespi_relleno_paq1', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rfp2_1', grupo_id: 'g_chespi_relleno_paq2', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp2_2', grupo_id: 'g_chespi_relleno_paq2', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp2_3', grupo_id: 'g_chespi_relleno_paq2', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rfp3_1', grupo_id: 'g_chespi_relleno_paq3', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp3_2', grupo_id: 'g_chespi_relleno_paq3', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp3_3', grupo_id: 'g_chespi_relleno_paq3', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rfp4_1', grupo_id: 'g_chespi_relleno_paq4', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp4_2', grupo_id: 'g_chespi_relleno_paq4', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp4_3', grupo_id: 'g_chespi_relleno_paq4', nombre: 'Requesón', precio_adicional: 0.00 },

  { id: 'o_chespi_rfp5_1', grupo_id: 'g_chespi_relleno_paq5', nombre: 'Papa', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp5_2', grupo_id: 'g_chespi_relleno_paq5', nombre: 'Frijol', precio_adicional: 0.00 },
  { id: 'o_chespi_rfp5_3', grupo_id: 'g_chespi_relleno_paq5', nombre: 'Requesón', precio_adicional: 0.00 },

  // El Antojito Options
  // Blanco o Amarillo
  { id: 'o_ea_el_b1', grupo_id: 'g_ea_tipo_rev', nombre: 'Elote Blanco', precio_adicional: 0.00 },
  { id: 'o_ea_el_y1', grupo_id: 'g_ea_tipo_rev', nombre: 'Elote Amarillo', precio_adicional: 0.00 },
  
  { id: 'o_ea_el_b2', grupo_id: 'g_ea_tipo_vaso', nombre: 'Elote Blanco', precio_adicional: 0.00 },
  { id: 'o_ea_el_y2', grupo_id: 'g_ea_tipo_vaso', nombre: 'Elote Amarillo', precio_adicional: 0.00 },
  
  { id: 'o_ea_el_b3', grupo_id: 'g_ea_tipo_sabri', nombre: 'Elote Blanco', precio_adicional: 0.00 },
  { id: 'o_ea_el_y3', grupo_id: 'g_ea_tipo_sabri', nombre: 'Elote Amarillo', precio_adicional: 0.00 },

  // Extra Revolcado
  { id: 'o_ea_rev_emp', grupo_id: 'g_ea_ext_rev', nombre: 'Empanizado con toppings y queso amarillo', precio_adicional: 10.00 },

  // Salsas Costillitas
  { id: 'o_ea_cost_mango', grupo_id: 'g_ea_salsa_cost', nombre: 'Mango Habanero', precio_adicional: 0.00 },
  { id: 'o_ea_cost_bufalo', grupo_id: 'g_ea_salsa_cost', nombre: 'Búfalo', precio_adicional: 0.00 },
  { id: 'o_ea_cost_bbq', grupo_id: 'g_ea_salsa_cost', nombre: 'BBQ', precio_adicional: 0.00 },
  
  { id: 'o_ea_cost_sab', grupo_id: 'g_ea_ext_cost', nombre: 'Agregar Sabritas', precio_adicional: 15.00 },

  // Sabritas options
  { id: 'o_ea_sab_tost', grupo_id: 'g_ea_sabri_sabri', nombre: 'Tostitos Verdes', precio_adicional: 0.00 },
  { id: 'o_ea_sab_dor', grupo_id: 'g_ea_sabri_sabri', nombre: 'Doritos Nachos', precio_adicional: 0.00 },
  { id: 'o_ea_sab_rufl', grupo_id: 'g_ea_sabri_sabri', nombre: 'Ruffles Queso', precio_adicional: 0.00 },
  { id: 'o_ea_sab_cheet', grupo_id: 'g_ea_sabri_sabri', nombre: 'Cheetos Torciditos', precio_adicional: 0.00 },

  { id: 'o_ea_esp_tost', grupo_id: 'g_ea_sabri_esp', nombre: 'Tostitos Verdes', precio_adicional: 0.00 },
  { id: 'o_ea_esp_dor', grupo_id: 'g_ea_sabri_esp', nombre: 'Doritos Nachos', precio_adicional: 0.00 },
  { id: 'o_ea_esp_rufl', grupo_id: 'g_ea_sabri_esp', nombre: 'Ruffles Queso', precio_adicional: 0.00 },
  { id: 'o_ea_esp_cheet', grupo_id: 'g_ea_sabri_esp', nombre: 'Cheetos Torciditos', precio_adicional: 0.00 },

  // Base de aderezos (common for all elotes, value = 0.00)
  { id: 'o_ea_ad_mayo1', grupo_id: 'g_ea_aderezo_rev', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso1', grupo_id: 'g_ea_aderezo_rev', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal1', grupo_id: 'g_ea_aderezo_rev', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon1', grupo_id: 'g_ea_aderezo_rev', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile1', grupo_id: 'g_ea_aderezo_rev', nombre: 'Chile al gusto', precio_adicional: 0.00 },

  { id: 'o_ea_ad_mayo2', grupo_id: 'g_ea_aderezo_vaso', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso2', grupo_id: 'g_ea_aderezo_vaso', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal2', grupo_id: 'g_ea_aderezo_vaso', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon2', grupo_id: 'g_ea_aderezo_vaso', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile2', grupo_id: 'g_ea_aderezo_vaso', nombre: 'Chile al gusto', precio_adicional: 0.00 },

  { id: 'o_ea_ad_mayo3', grupo_id: 'g_ea_aderezo_sabri', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso3', grupo_id: 'g_ea_aderezo_sabri', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal3', grupo_id: 'g_ea_aderezo_sabri', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon3', grupo_id: 'g_ea_aderezo_sabri', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile3', grupo_id: 'g_ea_aderezo_sabri', nombre: 'Chile al gusto', precio_adicional: 0.00 },

  { id: 'o_ea_ad_mayo4', grupo_id: 'g_ea_aderezo_tachos', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso4', grupo_id: 'g_ea_aderezo_tachos', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal4', grupo_id: 'g_ea_aderezo_tachos', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon4', grupo_id: 'g_ea_aderezo_tachos', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile4', grupo_id: 'g_ea_aderezo_tachos', nombre: 'Chile al gusto', precio_adicional: 0.00 },

  { id: 'o_ea_ad_mayo5', grupo_id: 'g_ea_aderezo_esp', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso5', grupo_id: 'g_ea_aderezo_esp', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal5', grupo_id: 'g_ea_aderezo_esp', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon5', grupo_id: 'g_ea_aderezo_esp', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile5', grupo_id: 'g_ea_aderezo_esp', nombre: 'Chile al gusto', precio_adicional: 0.00 },

  { id: 'o_ea_ad_mayo6', grupo_id: 'g_ea_aderezo_maru', nombre: 'Mayonesa', precio_adicional: 0.00 },
  { id: 'o_ea_ad_queso6', grupo_id: 'g_ea_aderezo_maru', nombre: 'Queso (blanco)', precio_adicional: 0.00 },
  { id: 'o_ea_ad_sal6', grupo_id: 'g_ea_aderezo_maru', nombre: 'Sal', precio_adicional: 0.00 },
  { id: 'o_ea_ad_limon6', grupo_id: 'g_ea_aderezo_maru', nombre: 'Limón', precio_adicional: 0.00 },
  { id: 'o_ea_ad_chile6', grupo_id: 'g_ea_aderezo_maru', nombre: 'Chile al gusto', precio_adicional: 0.00 }
];

const dynamicGrupos: GrupoOpciones[] = [];
const dynamicExtras: OpcionExtra[] = [];

// Helper to generate options
const registerPizzaOptions = (prodId: string, sizePrices: number[]) => {
  const sizeGroupId = `g_size_${prodId}`;
  const crustGroupId = `g_crust_${prodId}`;

  // Groups
  dynamicGrupos.push({
    id: sizeGroupId,
    producto_id: prodId,
    nombre: 'Selecciona el Tamaño',
    seleccion_multiple: false,
    obligatorio: true
  });

  dynamicGrupos.push({
    id: crustGroupId,
    producto_id: prodId,
    nombre: 'Orilla de Queso o Doble Queso',
    seleccion_multiple: false,
    obligatorio: false
  });

  // Sizes Extras (Chica has 0 additional cost now as it matches base_precio)
  const sizes = ['Chica', 'Mediana', 'Grande', 'XG', 'Jumbo'];
  sizes.forEach((size, idx) => {
    dynamicExtras.push({
      id: `o_size_${prodId}_${idx}`,
      grupo_id: sizeGroupId,
      nombre: size,
      precio_adicional: sizePrices[idx]
    });
  });

  // Crust Extras
  const crustPrices = [35, 50, 60, 75, 100];
  const crustLabels = [
    'Para Pizza Chica',
    'Para Pizza Mediana',
    'Para Pizza Grande',
    'Para Pizza XG',
    'Para Pizza Jumbo'
  ];
  crustLabels.forEach((label, idx) => {
    dynamicExtras.push({
      id: `o_crust_${prodId}_${idx}`,
      grupo_id: crustGroupId,
      nombre: label,
      precio_adicional: crustPrices[idx]
    });
  });
};

// 1. Classical Pizzas: Base price 100, Mediana +75, Grande +90, XG +170, Jumbo +260
classicalPizzaIds.forEach(id => {
  registerPizzaOptions(id, [0, 75, 90, 170, 260]);
});

// 2. Special Pizzas: Base price 110, Mediana +75, Grande +95, XG +190, Jumbo +290
specialPizzaIds.forEach(id => {
  registerPizzaOptions(id, [0, 75, 95, 190, 290]);
});

// 3. VIP Pizzas: Base price 120, Mediana +85, Grande +105, XG +200, Jumbo +310
vipPizzaIds.forEach(id => {
  registerPizzaOptions(id, [0, 85, 105, 200, 310]);
});

// 4. Burgers Extras (Group name: "¿Agregar extras?")
burgerIds.forEach(id => {
  const gId = `g_extra_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: '¿Agregar extras?',
    seleccion_multiple: true,
    obligatorio: false
  });

  dynamicExtras.push({
    id: `o_extra_${id}_carne`,
    grupo_id: gId,
    nombre: 'Carne Extra',
    precio_adicional: 40.00
  });
});

// Helper for Don Chicho sizes
const registerDonChichoSizes = (prodId: string, sizes: string[], priceDiffs: number[]) => {
  const gId = `g_size_${prodId}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: prodId,
    nombre: 'Selecciona el Tamaño',
    seleccion_multiple: false,
    obligatorio: true
  });

  sizes.forEach((size, idx) => {
    dynamicExtras.push({
      id: `o_size_${prodId}_${idx}`,
      grupo_id: gId,
      nombre: size,
      precio_adicional: priceDiffs[idx]
    });
  });
};

// 1. Capuchinos (p_dc1 to p_dc15): Chica (base), Grande (+10)
for (let i = 1; i <= 15; i++) {
  registerDonChichoSizes(`p_dc${i}`, ['Chica', 'Grande'], [0, 10]);
}

// 2. Frappes (Standard: p_dc26, p_dc27, p_dc28, p_dc30 to p_dc36): Chica (base), Grande (+10), Venti (+15)
const stdFrappes = ['p_dc26', 'p_dc27', 'p_dc28', 'p_dc30', 'p_dc31', 'p_dc32', 'p_dc33', 'p_dc34', 'p_dc35', 'p_dc36'];
stdFrappes.forEach(id => {
  registerDonChichoSizes(id, ['Chica', 'Grande', 'Venti'], [0, 10, 15]);
});

// 3. Frappe Moka con Menta (p_dc29): Chica (75), Grande (+5), Venti (+10)
registerDonChichoSizes('p_dc29', ['Chica', 'Grande', 'Venti'], [0, 5, 10]);

// 4. Frappes Gourmet Standard (p_dc37, p_dc38): Chica (80), Grande (+10), Venti (+15)
registerDonChichoSizes('p_dc37', ['Chica', 'Grande', 'Venti'], [0, 10, 15]);
registerDonChichoSizes('p_dc38', ['Chica', 'Grande', 'Venti'], [0, 10, 15]);

// 5. Frappes Gourmet Mid (p_dc39, p_dc40): Chica (75), Grande (+5), Venti (+10)
registerDonChichoSizes('p_dc39', ['Chica', 'Grande', 'Venti'], [0, 5, 10]);
registerDonChichoSizes('p_dc40', ['Chica', 'Grande', 'Venti'], [0, 5, 10]);

// 6. Frappes Gourmet Premium (p_dc41, p_dc42): Grande (95), Venti (+15)
registerDonChichoSizes('p_dc41', ['Grande', 'Venti'], [0, 15]);
registerDonChichoSizes('p_dc42', ['Grande', 'Venti'], [0, 15]);

// 7. Malteadas (p_dc43 to p_dc49): Chica (60), Grande (+10), Venti (+20)
for (let i = 43; i <= 49; i++) {
  registerDonChichoSizes(`p_dc${i}`, ['Chica', 'Grande', 'Venti'], [0, 10, 20]);
}

// 8. Smoothies (p_dc50 to p_dc52): Grande (85), Venti (+5)
for (let i = 50; i <= 52; i++) {
  registerDonChichoSizes(`p_dc${i}`, ['Grande', 'Venti'], [0, 5]);
}

// 9. Ice Latte (p_dc56 to p_dc67): Grande (base), Venti (+10)
for (let i = 56; i <= 67; i++) {
  registerDonChichoSizes(`p_dc${i}`, ['Grande', 'Venti'], [0, 10]);
}

// 10. Nieve de Garrafa (Vaso) (p_dc24): Chico (35), Mediano (+15), Grande (+30), Medio Litro (+60), Litro (+135)
registerDonChichoSizes('p_dc24', ['Chico', 'Mediano', 'Grande', 'Medio Litro', 'Litro'], [0, 15, 30, 60, 135]);

// 11. Nieve de Garrafa (Cono) (p_dc25): Sencillo (35), Doble (+15), Canasta (+35)
registerDonChichoSizes('p_dc25', ['Sencillo', 'Doble', 'Canasta'], [0, 15, 35]);

// --- POLLOS JEZ OPTIONS ---
const polloJezIds = ['p_pj1', 'p_pj2'];
polloJezIds.forEach(id => {
  const gId = `g_sauce_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: '¿Deseas bañar tu pollo en salsa? (+$10)',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_sauce_${id}_0`, grupo_id: gId, nombre: 'Sin bañar (Al natural)', precio_adicional: 0 },
    { id: `o_sauce_${id}_1`, grupo_id: gId, nombre: 'Bañado en BBQ', precio_adicional: 10 },
    { id: `o_sauce_${id}_2`, grupo_id: gId, nombre: 'Bañado en Mango Habanero', precio_adicional: 10 },
    { id: `o_sauce_${id}_3`, grupo_id: gId, nombre: 'Bañado en Búfalo', precio_adicional: 10 }
  );
});

// --- EL NUEVO CALAMAR OPTIONS ---
const registerSeafoodSizes = (prodId: string, sizes: string[], priceDiffs: number[]) => {
  const gId = `g_size_${prodId}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: prodId,
    nombre: 'Selecciona la presentación',
    seleccion_multiple: false,
    obligatorio: true
  });
  sizes.forEach((size, idx) => {
    dynamicExtras.push({
      id: `o_size_${prodId}_${idx}`,
      grupo_id: gId,
      nombre: size,
      precio_adicional: priceDiffs[idx]
    });
  });
};

registerSeafoodSizes('p_nc1', ['Tostada', 'Medio Litro', '1 Litro'], [0, 60, 190]); // Aguachile Verde: 60, 120, 250
registerSeafoodSizes('p_nc2', ['Tostada', 'Medio Litro', '1 Litro'], [0, 65, 165]); // Ceviche Pescado: 35, 100, 200
registerSeafoodSizes('p_nc3', ['Tostada', 'Medio Litro', '1 Litro'], [0, 90, 240]); // Ceviche Camarón: 60, 150, 300
registerSeafoodSizes('p_nc4', ['Tostada', 'Medio Litro', '1 Litro'], [0, 65, 165]); // Marlin: 35, 100, 200
registerSeafoodSizes('p_nc5', ['Mediano', 'Grande'], [0, 25]); // Coctel: 175, 200
registerSeafoodSizes('p_nc6', ['Chica', 'Grande'], [0, 30]); // Sopa: 170, 200
registerSeafoodSizes('p_nc15', ['Mediana', 'Grande'], [0, 100]); // Charola: 700, 800

// --- PIZZAS LIBERTAD OPTIONS ---
dynamicGrupos.push({
  id: 'g_pl5_sauce',
  producto_id: 'p_pl5',
  nombre: 'Selecciona la base de salsa',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_pl5_sauce_0', grupo_id: 'g_pl5_sauce', nombre: 'Salsa de Jitomate clásica', precio_adicional: 0 },
  { id: 'o_pl5_sauce_1', grupo_id: 'g_pl5_sauce', nombre: 'Salsa Alfredo cremosa', precio_adicional: 0 }
);

dynamicGrupos.push({
  id: 'g_pl5_ingredients',
  producto_id: 'p_pl5',
  nombre: 'Elige hasta 4 ingredientes del menú (Opcional)',
  seleccion_multiple: true,
  obligatorio: false
});
const pl5Ingredients = [
  'Pollo', 'Champiñones', 'Salami', 'Jamón', 'Tocino', 'Pepperoni', 
  'Salchicha Italiana', 'Aceitunas Negras', 'Pimiento Morrón', 'Albahaca', 
  'Higo', 'Queso de Cabra', 'Queso Crema', 'Jamón Serrano'
];
pl5Ingredients.forEach((ing, idx) => {
  dynamicExtras.push({
    id: `o_pl5_ing_${idx}`,
    grupo_id: 'g_pl5_ingredients',
    nombre: ing,
    precio_adicional: 0
  });
});

// --- CAFE CALI DYNAMIC OPTIONS & GROUPS ---

// 1. Chilaquiles Protein choice
const chilaquilesProds = ['p_cc1', 'p_cc2', 'p_cc3'];
chilaquilesProds.forEach(id => {
  const gId = `g_chil_prot_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Añadir Proteína',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_chil_prot_${id}_0`, grupo_id: gId, nombre: 'Sencillos (Sin proteína extra)', precio_adicional: 0 },
    { id: `o_chil_prot_${id}_1`, grupo_id: gId, nombre: 'Con Pollo', precio_adicional: 25 },
    { id: `o_chil_prot_${id}_2`, grupo_id: gId, nombre: 'Con Arrachera', precio_adicional: 25 },
    { id: `o_chil_prot_${id}_3`, grupo_id: gId, nombre: 'Con Huevo', precio_adicional: 20 }
  );
});

// 2. Crepas, Waffles & Hotcakes ingredients selectors
const sweetDishes = [
  { id: 'p_cc12', max: 1 }, // Wafle 1 Ing
  { id: 'p_cc13', max: 2 }, // Wafle 2 Ing
  { id: 'p_cc14', max: 1 }, // Hotcakes 1 Ing
  { id: 'p_cc15', max: 2 }, // Hotcakes 2 Ing
  { id: 'p_cc16', max: 1 }, // Crepa 1 Ing
  { id: 'p_cc17', max: 2 }, // Crepa 2 Ing
  { id: 'p_cc18', max: 3 }  // Crepa 3 Ing
];

const sweetIngredients = [
  // Rellenos y Untables
  'Nutella', 'Cajeta', 'Queso Crema', 'Mermelada de Fresa', 'Lechera',
  // Frutas
  'Fresa (Fruta)', 'Plátano (Fruta)', 'Durazno (Fruta)',
  // Toppings
  'Topping Chocolate', 'Topping Caramelo', 'Topping Lechera', 'Topping Mapple', 'Topping Cajeta'
];

sweetDishes.forEach(dish => {
  const gId = `g_sweet_ing_${dish.id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: dish.id,
    nombre: `Elige ${dish.max} ingrediente(s)`,
    seleccion_multiple: dish.max > 1,
    obligatorio: true
  });
  sweetIngredients.forEach((ing, idx) => {
    dynamicExtras.push({
      id: `o_sweet_ing_${dish.id}_${idx}`,
      grupo_id: gId,
      nombre: ing,
      precio_adicional: 0
    });
  });

  // Ice Cream / Helado Option
  const iceCreamGId = `g_sweet_ice_${dish.id}`;
  dynamicGrupos.push({
    id: iceCreamGId,
    producto_id: dish.id,
    nombre: '¿Agregar Helado? (Opcional)',
    seleccion_multiple: false,
    obligatorio: false
  });
  dynamicExtras.push(
    { id: `o_sweet_ice_${dish.id}_1`, grupo_id: iceCreamGId, nombre: 'Helado de Chocolate', precio_adicional: 20 },
    { id: `o_sweet_ice_${dish.id}_2`, grupo_id: iceCreamGId, nombre: 'Helado de Fresa', precio_adicional: 20 }
  );

  // Extras
  const extraGId = `g_sweet_extra_${dish.id}`;
  dynamicGrupos.push({
    id: extraGId,
    producto_id: dish.id,
    nombre: 'Ingrediente Extra (+$20, Opcional)',
    seleccion_multiple: true,
    obligatorio: false
  });
  sweetIngredients.forEach((ing, idx) => {
    dynamicExtras.push({
      id: `o_sweet_extra_${dish.id}_${idx}`,
      grupo_id: extraGId,
      nombre: `Extra: ${ing}`,
      precio_adicional: 20
    });
  });
});

// 3. Costillas sauce choice
dynamicGrupos.push({
  id: 'g_ribs_sauce',
  producto_id: 'p_cc23',
  nombre: 'Selecciona la Salsa',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_ribs_sauce_0', grupo_id: 'g_ribs_sauce', nombre: 'BBQ', precio_adicional: 0 },
  { id: 'o_ribs_sauce_1', grupo_id: 'g_ribs_sauce', nombre: 'Búfalo', precio_adicional: 0 },
  { id: 'o_ribs_sauce_2', grupo_id: 'g_ribs_sauce', nombre: 'Mango Habanero', precio_adicional: 0 }
);

// 4. Alitas sauce choice
dynamicGrupos.push({
  id: 'g_wings_sauce',
  producto_id: 'p_cc33',
  nombre: 'Selecciona la Salsa',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_wings_sauce_0', grupo_id: 'g_wings_sauce', nombre: 'BBQ', precio_adicional: 0 },
  { id: 'o_wings_sauce_1', grupo_id: 'g_wings_sauce', nombre: 'Búfalo', precio_adicional: 0 },
  { id: 'o_wings_sauce_2', grupo_id: 'g_wings_sauce', nombre: 'Mango Habanero', precio_adicional: 0 }
);

// 5. Ensalada Cali Builders
const sizesEnsalada = [
  { name: 'Chica 32oz (3 barra, 1 prot, 1 ader, 1 top)', diff: 0, items: 3, top: 1 },
  { name: 'Mediana 36oz (3-4 barra, 1 prot, 1 ader, 2 top)', diff: 15, items: 4, top: 2 },
  { name: 'Grande 48oz (4 barra, 1 prot, 2 ader, 2 top)', diff: 40, items: 4, top: 2 }
];
// Sizes
dynamicGrupos.push({
  id: 'g_ens_size',
  producto_id: 'p_cc34',
  nombre: 'Elige el tamaño',
  seleccion_multiple: false,
  obligatorio: true
});
sizesEnsalada.forEach((size, idx) => {
  dynamicExtras.push({
    id: `o_ens_size_${idx}`,
    grupo_id: 'g_ens_size',
    nombre: size.name,
    precio_adicional: size.diff
  });
});

// Barra Fría options
dynamicGrupos.push({
  id: 'g_ens_barra',
  producto_id: 'p_cc34',
  nombre: 'Elige ingredientes de la Barra Fría (Hasta 4)',
  seleccion_multiple: true,
  obligatorio: true
});
const barraIngredients = [
  'Pepino', 'Morrón', 'Germinado de Alfalfa', 'Zanahoria', 'Betabel', 
  'Brócoli', 'Champiñones', 'Jitomate', 'Pasta', 'Jícama', 
  'Jamón', 'Fresas', 'Tomate Cherry'
];
barraIngredients.forEach((ing, idx) => {
  dynamicExtras.push({
    id: `o_ens_bar_${idx}`,
    grupo_id: 'g_ens_barra',
    nombre: ing,
    precio_adicional: 0
  });
});

// Proteínas
dynamicGrupos.push({
  id: 'g_ens_prot',
  producto_id: 'p_cc34',
  nombre: 'Selecciona tu Proteína (1 Incluida)',
  seleccion_multiple: false,
  obligatorio: true
});
const proteinas = ['Pollo a la plancha', 'Pollo finas hierbas', 'Pollo empanizado', 'Pollo BBQ', 'Surimi'];
proteinas.forEach((prot, idx) => {
  dynamicExtras.push({
    id: `o_ens_prot_${idx}`,
    grupo_id: 'g_ens_prot',
    nombre: prot,
    precio_adicional: 0
  });
});
// Extra Protein
dynamicGrupos.push({
  id: 'g_ens_prot_extra',
  producto_id: 'p_cc34',
  nombre: '¿Proteína Extra? (+90gr por $35, Opcional)',
  seleccion_multiple: true,
  obligatorio: false
});
proteinas.forEach((prot, idx) => {
  dynamicExtras.push({
    id: `o_ens_prot_ext_${idx}`,
    grupo_id: 'g_ens_prot_extra',
    nombre: `Extra: ${prot}`,
    precio_adicional: 35
  });
});

// Aderezos
dynamicGrupos.push({
  id: 'g_ens_ader',
  producto_id: 'p_cc34',
  nombre: 'Selecciona tu Aderezo',
  seleccion_multiple: true,
  obligatorio: true
});
const aderezos = ['Ranch', 'Mil Islas', 'Vinagreta Italiana', 'Chipotle', 'Cesar', 'Aceite de Oliva', 'Aceite Balsámico'];
aderezos.forEach((ader, idx) => {
  dynamicExtras.push({
    id: `o_ens_ader_${idx}`,
    grupo_id: 'g_ens_ader',
    nombre: ader,
    precio_adicional: 0
  });
});
// Extra Aderezo
dynamicGrupos.push({
  id: 'g_ens_ader_extra',
  producto_id: 'p_cc34',
  nombre: '¿Aderezo Extra? (+$20, Opcional)',
  seleccion_multiple: true,
  obligatorio: false
});
aderezos.forEach((ader, idx) => {
  dynamicExtras.push({
    id: `o_ens_ader_ext_${idx}`,
    grupo_id: 'g_ens_ader_extra',
    nombre: `Extra Aderezo: ${ader}`,
    precio_adicional: 20
  });
});

// Toppings
dynamicGrupos.push({
  id: 'g_ens_top',
  producto_id: 'p_cc34',
  nombre: 'Elige tus Toppings',
  seleccion_multiple: true,
  obligatorio: true
});
const toppings = ['Crutón', 'Tiras Fritas', 'Cacahuates', 'Arándanos'];
toppings.forEach((top, idx) => {
  dynamicExtras.push({
    id: `o_ens_top_${idx}`,
    grupo_id: 'g_ens_top',
    nombre: top,
    precio_adicional: 0
  });
});

// Extra Toppings
dynamicGrupos.push({
  id: 'g_ens_top_extra',
  producto_id: 'p_cc34',
  nombre: '¿Ingrediente/Topping Extra? (+$10, Opcional)',
  seleccion_multiple: true,
  obligatorio: false
});
toppings.forEach((top, idx) => {
  dynamicExtras.push({
    id: `o_ens_top_ext_${idx}`,
    grupo_id: 'g_ens_top_extra',
    nombre: `Extra Topping: ${top}`,
    precio_adicional: 10
  });
});

// 6. Sushi choices
const sushisSurimiCamarón = ['p_cc35', 'p_cc38', 'p_cc39', 'p_cc40'];
sushisSurimiCamarón.forEach(id => {
  const gId = `g_sush_fill_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Selecciona el relleno',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_sush_fill_${id}_0`, grupo_id: gId, nombre: 'Relleno de Surimi', precio_adicional: 0 },
    { id: `o_sush_fill_${id}_1`, grupo_id: gId, nombre: 'Relleno de Camarón', precio_adicional: 0 }
  );
});

// Sushi Cilantro Sauce Option for p_cc39
dynamicGrupos.push({
  id: 'g_sush_sauce_39',
  producto_id: 'p_cc39',
  nombre: 'Aderezo Opcional',
  seleccion_multiple: false,
  obligatorio: false
});
dynamicExtras.push(
  { id: 'o_sush_sauce_39_0', grupo_id: 'g_sush_sauce_39', nombre: 'Aderezo de Cilantro y Surimi Capeado', precio_adicional: 0 }
);

// 7. Capuchinos & Lattes Sabor and Leche
const capuFlavors = [
  'Caramelo', 'Moka', 'Chocolate Blanco', 'Vainilla Francesa', 
  'Crema Irlandesa', 'Baileys (+$11)', 'Nutella (+$9)', 'Avellana', 
  'Capuchino Clásico (-$24)', 'Capuchino Italiano (-$24)', 'Capuchino Menta (-$9)'
];
dynamicGrupos.push({
  id: 'g_cc_capu_flav',
  producto_id: 'p_cc42',
  nombre: 'Selecciona el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
capuFlavors.forEach((flav, idx) => {
  let diff = 0;
  if (flav.includes('Baileys')) diff = 11;
  else if (flav.includes('Nutella')) diff = -11; // Base price is 89. Nutella is 78. So diff is -11
  else if (flav.includes('Clásico') || flav.includes('Italiano')) diff = -24; // Base is 89, Capuchino classico is 65.
  else if (flav.includes('Menta')) diff = 0; // Capuchino menta is 89.
  
  dynamicExtras.push({
    id: `o_cc_capu_flav_${idx}`,
    grupo_id: 'g_cc_capu_flav',
    nombre: flav.split(' (')[0],
    precio_adicional: diff
  });
});
dynamicGrupos.push({
  id: 'g_cc_capu_milk',
  producto_id: 'p_cc42',
  nombre: 'Tipo de Leche',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_capu_milk_0', grupo_id: 'g_cc_capu_milk', nombre: 'Entera', precio_adicional: 0 },
  { id: 'o_cc_capu_milk_1', grupo_id: 'g_cc_capu_milk', nombre: 'Deslactosada', precio_adicional: 0 },
  { id: 'o_cc_capu_milk_2', grupo_id: 'g_cc_capu_milk', nombre: 'Leche de Almendras', precio_adicional: 15 }
);

// 8. Frapuchino sabores
const frapFlavors = [
  'Moka', 'Chocolate Blanco', 'Caramelo', 'Cookies and Cream', 
  'Clásico', 'Crema Irlandesa', 'Nutella (+$7)', 'Ferrero (+$34)', 'Baileys (+$8)'
];
dynamicGrupos.push({
  id: 'g_cc_frap_flav',
  producto_id: 'p_cc48',
  nombre: 'Selecciona el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
frapFlavors.forEach((flav, idx) => {
  let diff = 0;
  if (flav.includes('Nutella')) diff = 7;
  else if (flav.includes('Ferrero')) diff = 34;
  else if (flav.includes('Baileys')) diff = 8;
  
  dynamicExtras.push({
    id: `o_cc_frap_flav_${idx}`,
    grupo_id: 'g_cc_frap_flav',
    nombre: flav.split(' (')[0],
    precio_adicional: diff
  });
});

// 9. Lattes Fríos
const coldLatteFlavors = [
  'Vainilla Francesa', 'Menta', 'Crema Irlandesa', 'Avellana', 
  'Caramelo', 'Chocolate Blanco', 'Americano Frío'
];
dynamicGrupos.push({
  id: 'g_cc_clatte_flav',
  producto_id: 'p_cc49',
  nombre: 'Selecciona el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
coldLatteFlavors.forEach((flav, idx) => {
  dynamicExtras.push({
    id: `o_cc_clatte_flav_${idx}`,
    grupo_id: 'g_cc_clatte_flav',
    nombre: flav,
    precio_adicional: 0
  });
});

// 10. Tisanas choices
dynamicGrupos.push({
  id: 'g_cc_tisa_flav',
  producto_id: 'p_cc50',
  nombre: 'Elige el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_tisa_flav_0', grupo_id: 'g_cc_tisa_flav', nombre: 'Kiwi-Maracuyá', precio_adicional: 0 },
  { id: 'o_cc_tisa_flav_1', grupo_id: 'g_cc_tisa_flav', nombre: 'Frutas de la Pasión', precio_adicional: 0 }
);
dynamicGrupos.push({
  id: 'g_cc_tisa_temp',
  producto_id: 'p_cc50',
  nombre: 'Presentación',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_tisa_temp_0', grupo_id: 'g_cc_tisa_temp', nombre: 'Caliente', precio_adicional: 0 },
  { id: 'o_cc_tisa_temp_1', grupo_id: 'g_cc_tisa_temp', nombre: 'Frappe (+$5)', precio_adicional: 5 }
);

// 11. Té Gourmet choices
dynamicGrupos.push({
  id: 'g_cc_tea_flav',
  producto_id: 'p_cc51',
  nombre: 'Elige el té',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_tea_flav_0', grupo_id: 'g_cc_tea_flav', nombre: 'Durazno', precio_adicional: 0 },
  { id: 'o_cc_tea_flav_1', grupo_id: 'g_cc_tea_flav', nombre: 'Manzanilla', precio_adicional: 0 },
  { id: 'o_cc_tea_flav_2', grupo_id: 'g_cc_tea_flav', nombre: 'Menta', precio_adicional: 0 }
);
dynamicGrupos.push({
  id: 'g_cc_tea_temp',
  producto_id: 'p_cc51',
  nombre: 'Temperatura',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_tea_temp_0', grupo_id: 'g_cc_tea_temp', nombre: 'Caliente', precio_adicional: 0 },
  { id: 'o_cc_tea_temp_1', grupo_id: 'g_cc_tea_temp', nombre: 'Frío (+$7)', precio_adicional: 7 }
);

// 12. Chai Rio flavours
dynamicGrupos.push({
  id: 'g_cc_chai_flav',
  producto_id: 'p_cc52',
  nombre: 'Sabor de Chai',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_chai_flav_0', grupo_id: 'g_cc_chai_flav', nombre: 'Manzana-Canela', precio_adicional: 0 },
  { id: 'o_cc_chai_flav_1', grupo_id: 'g_cc_chai_flav', nombre: 'Vainilla', precio_adicional: 0 }
);

// 13. Sodas Italianas flavours
dynamicGrupos.push({
  id: 'g_cc_soda_flav',
  producto_id: 'p_cc53',
  nombre: 'Elige sabor de Jarabe',
  seleccion_multiple: false,
  obligatorio: true
});
const sodaFlavors = ['Frutas de la Pasión', 'Blue Curacao', 'Kiwi', 'Manzana Verde'];
sodaFlavors.forEach((flav, idx) => {
  dynamicExtras.push({
    id: `o_cc_soda_flav_${idx}`,
    grupo_id: 'g_cc_soda_flav',
    nombre: flav,
    precio_adicional: 0
  });
});

// 14. Smoothies Sin Café flavours
dynamicGrupos.push({
  id: 'g_cc_sm_flav',
  producto_id: 'p_cc54',
  nombre: 'Selecciona el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_sm_flav_0', grupo_id: 'g_cc_sm_flav', nombre: 'Piña Colada (+$5)', precio_adicional: 5 },
  { id: 'o_cc_sm_flav_1', grupo_id: 'g_cc_sm_flav', nombre: 'Mango Chamoy', precio_adicional: 0 },
  { id: 'o_cc_sm_flav_2', grupo_id: 'g_cc_sm_flav', nombre: 'Zarzamora Cremoso', precio_adicional: 0 }
);

// 15. Frappe sin Cafe flavors
dynamicGrupos.push({
  id: 'g_cc_frapnocf_flav',
  producto_id: 'p_cc55',
  nombre: 'Selecciona el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_frapnocf_flav_0', grupo_id: 'g_cc_frapnocf_flav', nombre: 'Fresas con Crema', precio_adicional: 0 },
  { id: 'o_cc_frapnocf_flav_1', grupo_id: 'g_cc_frapnocf_flav', nombre: 'Matcha (+$5)', precio_adicional: 5 }
);

// 16. Frappe Especial flavors
dynamicGrupos.push({
  id: 'g_cc_frapes_flav',
  producto_id: 'p_cc56',
  nombre: 'Selecciona sabor',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_cc_frapes_flav_0', grupo_id: 'g_cc_frapes_flav', nombre: 'Gansito', precio_adicional: 0 },
  { id: 'o_cc_frapes_flav_1', grupo_id: 'g_cc_frapes_flav', nombre: 'Pingüino', precio_adicional: 0 }
);

// --- EL TROMPO DYNAMIC OPTIONS & GROUPS ---

// 1. Meat Choice for Lonche Norteño
dynamicGrupos.push({
  id: 'g_et_norteño_meat',
  producto_id: 'p_et5',
  nombre: 'Elige tu carne',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_norteño_meat_0', grupo_id: 'g_et_norteño_meat', nombre: 'Carne al Pastor', precio_adicional: 0 },
  { id: 'o_et_norteño_meat_1', grupo_id: 'g_et_norteño_meat', nombre: 'Carne Asada', precio_adicional: 0 },
  { id: 'o_et_norteño_meat_2', grupo_id: 'g_et_norteño_meat', nombre: 'Arrachera', precio_adicional: 0 }
);

// 2. Meat Choice for Tacos Clásicos & Costras
const meatTacoProds = ['p_et10', 'p_et12'];
meatTacoProds.forEach(id => {
  const gId = `g_et_taco_meat_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Elige tu carne',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_et_taco_meat_${id}_0`, grupo_id: gId, nombre: 'Carne Asada', precio_adicional: 0 },
    { id: `o_et_taco_meat_${id}_1`, grupo_id: gId, nombre: 'Birria de Cazuela', precio_adicional: 0 },
    { id: `o_et_taco_meat_${id}_2`, grupo_id: gId, nombre: 'Pastor', precio_adicional: 0 },
    { id: `o_et_taco_meat_${id}_3`, grupo_id: gId, nombre: 'Arrachera', precio_adicional: 0 }
  );
});

// 3. Protein for Gringas
dynamicGrupos.push({
  id: 'g_et_gringa_meat',
  producto_id: 'p_et13',
  nombre: 'Elige tu carne',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_gringa_meat_0', grupo_id: 'g_et_gringa_meat', nombre: 'Asada', precio_adicional: 0 },
  { id: 'o_et_gringa_meat_1', grupo_id: 'g_et_gringa_meat', nombre: 'Pastor', precio_adicional: 0 },
  { id: 'o_et_gringa_meat_2', grupo_id: 'g_et_gringa_meat', nombre: 'Arrachera', precio_adicional: 0 },
  { id: 'o_et_gringa_meat_3', grupo_id: 'g_et_gringa_meat', nombre: 'Lomo Adobado', precio_adicional: 0 }
);

// 4. Protein for Burritos
dynamicGrupos.push({
  id: 'g_et_burr_meat',
  producto_id: 'p_et15',
  nombre: 'Elige tu proteína',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_burr_meat_0', grupo_id: 'g_et_burr_meat', nombre: 'Lomo Adobado', precio_adicional: 0 },
  { id: 'o_et_burr_meat_1', grupo_id: 'g_et_burr_meat', nombre: 'Pastor', precio_adicional: 0 },
  { id: 'o_et_burr_meat_2', grupo_id: 'g_et_burr_meat', nombre: 'Arrachera', precio_adicional: 0 },
  { id: 'o_et_burr_meat_3', grupo_id: 'g_et_burr_meat', nombre: 'Carne Asada', precio_adicional: 0 },
  { id: 'o_et_burr_meat_4', grupo_id: 'g_et_burr_meat', nombre: 'Huevo', precio_adicional: 0 }
);

// 5. Ensaladas Toppings & Aderezos
const ensaladaTrompoProds = ['p_et17', 'p_et18', 'p_et19', 'p_et20'];
ensaladaTrompoProds.forEach(id => {
  // Toppings (max 3)
  const gTopId = `g_et_ens_top_${id}`;
  dynamicGrupos.push({
    id: gTopId,
    producto_id: id,
    nombre: 'Agrega tus Toppings (Elige hasta 3)',
    seleccion_multiple: true,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_et_ens_top_${id}_0`, grupo_id: gTopId, nombre: 'Cacahuate tostado', precio_adicional: 0 },
    { id: `o_et_ens_top_${id}_1`, grupo_id: gTopId, nombre: 'Pepita de calabaza', precio_adicional: 0 },
    { id: `o_et_ens_top_${id}_2`, grupo_id: gTopId, nombre: 'Arándanos', precio_adicional: 0 },
    { id: `o_et_ens_top_${id}_3`, grupo_id: gTopId, nombre: 'Crotones', precio_adicional: 0 },
    { id: `o_et_ens_top_${id}_4`, grupo_id: gTopId, nombre: 'Tiras de tortilla frita', precio_adicional: 0 }
  );

  // Premium extras
  const gPremId = `g_et_ens_prem_${id}`;
  dynamicGrupos.push({
    id: gPremId,
    producto_id: id,
    nombre: 'Extras Premium (Opcional)',
    seleccion_multiple: true,
    obligatorio: false
  });
  dynamicExtras.push(
    { id: `o_et_ens_prem_${id}_0`, grupo_id: gPremId, nombre: 'Pasta Extra', precio_adicional: 10 },
    { id: `o_et_ens_prem_${id}_1`, grupo_id: gPremId, nombre: 'Queso Parmesano Extra', precio_adicional: 10 }
  );

  // Aderezo
  const gAderId = `g_et_ens_ader_${id}`;
  dynamicGrupos.push({
    id: gAderId,
    producto_id: id,
    nombre: 'Elige tu Aderezo',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_et_ens_ader_${id}_0`, grupo_id: gAderId, nombre: 'Ranch', precio_adicional: 0 },
    { id: `o_et_ens_ader_${id}_1`, grupo_id: gAderId, nombre: 'Chipotle', precio_adicional: 0 },
    { id: `o_et_ens_ader_${id}_2`, grupo_id: gAderId, nombre: 'Vinagreta de temporada', precio_adicional: 0 }
  );
});

// Ensalada Norteña specific meat choice
dynamicGrupos.push({
  id: 'g_et_ens_nor_meat',
  producto_id: 'p_et20',
  nombre: 'Selecciona tu carne',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_ens_nor_meat_0', grupo_id: 'g_et_ens_nor_meat', nombre: 'Carne Asada', precio_adicional: 0 },
  { id: 'o_et_ens_nor_meat_1', grupo_id: 'g_et_ens_nor_meat', nombre: 'Arrachera', precio_adicional: 0 }
);

// 6. Crea tus Chilaquiles (p_et28)
dynamicGrupos.push({
  id: 'g_et_crea_chil_salsa',
  producto_id: 'p_et28',
  nombre: 'Elige tu Salsa',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_crea_chil_salsa_0', grupo_id: 'g_et_crea_chil_salsa', nombre: 'Salsa Verde', precio_adicional: 0 },
  { id: 'o_et_crea_chil_salsa_1', grupo_id: 'g_et_crea_chil_salsa', nombre: 'Salsa Roja', precio_adicional: 0 },
  { id: 'o_et_crea_chil_salsa_2', grupo_id: 'g_et_crea_chil_salsa', nombre: 'Salsa Mixta', precio_adicional: 0 }
);
dynamicGrupos.push({
  id: 'g_et_crea_chil_prot',
  producto_id: 'p_et28',
  nombre: 'Elige tu Proteína',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_crea_chil_prot_0', grupo_id: 'g_et_crea_chil_prot', nombre: 'Sencillos (Sin proteína)', precio_adicional: 0 },
  { id: 'o_et_crea_chil_prot_1', grupo_id: 'g_et_crea_chil_prot', nombre: 'Huevos al Gusto', precio_adicional: 15 },
  { id: 'o_et_crea_chil_prot_2', grupo_id: 'g_et_crea_chil_prot', nombre: 'Cuadritos de Pollo', precio_adicional: 25 },
  { id: 'o_et_crea_chil_prot_3', grupo_id: 'g_et_crea_chil_prot', nombre: 'Cuadritos de Carne Asada', precio_adicional: 25 },
  { id: 'o_et_crea_chil_prot_4', grupo_id: 'g_et_crea_chil_prot', nombre: 'Cuadritos de Arrachera', precio_adicional: 25 }
);
dynamicGrupos.push({
  id: 'g_et_crea_chil_extras',
  producto_id: 'p_et28',
  nombre: 'Extras (Opcional)',
  seleccion_multiple: true,
  obligatorio: false
});
dynamicExtras.push(
  { id: 'o_et_crea_chil_ext_0', grupo_id: 'g_et_crea_chil_extras', nombre: 'Queso Gratinado', precio_adicional: 20 }
);

// 7. Omelette al Gusto (p_et29)
dynamicGrupos.push({
  id: 'g_et_omelette_ing',
  producto_id: 'p_et29',
  nombre: 'Elige 3 Ingredientes',
  seleccion_multiple: true,
  obligatorio: true
});
const omeletteIngs = ['Queso Oaxaca', 'Pimiento', 'Jamón', 'Tocino', 'Chorizo', 'Mexicana', 'Salchicha', 'Champiñón', 'Elote'];
omeletteIngs.forEach((ing, idx) => {
  dynamicExtras.push({
    id: `o_et_ome_ing_${idx}`,
    grupo_id: 'g_et_omelette_ing',
    nombre: ing,
    precio_adicional: 0
  });
});

// Omelette de Chilaquiles Sauce
dynamicGrupos.push({
  id: 'g_et_ome_chil_salsa',
  producto_id: 'p_et32',
  nombre: 'Elige la salsa de los chilaquiles',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_ome_chil_salsa_0', grupo_id: 'g_et_ome_chil_salsa', nombre: 'Salsa Verde', precio_adicional: 0 },
  { id: 'o_et_ome_chil_salsa_1', grupo_id: 'g_et_ome_chil_salsa', nombre: 'Salsa Roja', precio_adicional: 0 }
);

// 8. Baguettes
dynamicGrupos.push({
  id: 'g_et_bag_arma_prot',
  producto_id: 'p_et36',
  nombre: 'Elige tu proteína',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_et_bag_arma_prot_0', grupo_id: 'g_et_bag_arma_prot', nombre: 'Pollo Empanizado o Asado', precio_adicional: 25 },
  { id: 'o_et_bag_arma_prot_1', grupo_id: 'g_et_bag_arma_prot', nombre: 'Arrachera', precio_adicional: 25 },
  { id: 'o_et_bag_arma_prot_2', grupo_id: 'g_et_bag_arma_prot', nombre: 'Queso Oaxaca Extra', precio_adicional: 15 }
);

// 9. Hamburguesas
const burgerTrompoProds = ['p_et37', 'p_et38', 'p_et39'];
burgerTrompoProds.forEach(id => {
  const gId = `g_et_burg_prot_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Elige la carne',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_et_burg_prot_${id}_0`, grupo_id: gId, nombre: 'Carne de Res', precio_adicional: 0 },
    { id: `o_et_burg_prot_${id}_1`, grupo_id: gId, nombre: 'Pechuga de Pollo Crujiente', precio_adicional: 0 }
  );
});

// 10. Menudo
const menudoProds = ['p_et40', 'p_et41'];
menudoProds.forEach(id => {
  const gId = `g_et_men_style_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Selecciona estilo',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_et_men_style_${id}_0`, grupo_id: gId, nombre: 'Surtido', precio_adicional: 0 },
    { id: `o_et_men_style_${id}_1`, grupo_id: gId, nombre: 'Sólo Panza', precio_adicional: 0 },
    { id: `o_et_men_style_${id}_2`, grupo_id: gId, nombre: 'Sólo Pata', precio_adicional: 0 }
  );
});

// 11. El Senador Seafood & Drink Sizes
const registerSenadorSizes = (prodId: string, sizes: string[], prices: number[]) => {
  const gId = `g_es_size_${prodId}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: prodId,
    nombre: 'Elige tu porción o tamaño',
    seleccion_multiple: false,
    obligatorio: true
  });
  sizes.forEach((size, idx) => {
    dynamicExtras.push({
      id: `o_es_size_${prodId}_${idx}`,
      grupo_id: gId,
      nombre: size,
      precio_adicional: prices[idx]
    });
  });
};

// Cocktails: chico (base), grande (+50/+60)
registerSenadorSizes('p_es11', ['Chico', 'Grande'], [0, 50]);
registerSenadorSizes('p_es12', ['Chico', 'Grande'], [0, 60]);
registerSenadorSizes('p_es13', ['Chico', 'Grande'], [0, 50]);
registerSenadorSizes('p_es14', ['Chico', 'Grande'], [0, 60]);
registerSenadorSizes('p_es15', ['Chico', 'Grande'], [0, 65]);

// Ceviches & Aguachiles: chico (base), grande (+75/+85/+90)
registerSenadorSizes('p_es21', ['Chico', 'Grande'], [0, 75]);
registerSenadorSizes('p_es22', ['Chico', 'Grande'], [0, 90]);
registerSenadorSizes('p_es23', ['Chico', 'Grande'], [0, 90]);
registerSenadorSizes('p_es24', ['Chico', 'Grande'], [0, 85]);
registerSenadorSizes('p_es25', ['Chico', 'Grande'], [0, 85]);
registerSenadorSizes('p_es26', ['Chico', 'Grande'], [0, 90]);

// Ostiones (media docena base, docena +130)
registerSenadorSizes('p_es27', ['Media Docena', 'Docena'], [0, 130]);

// Quesadillas: sencillas (base), con camaron (+50)
registerSenadorSizes('p_es34', ['Sencillas', 'Con Camarón'], [0, 50]);

// Hamburguesa: sencilla (base), doble (+30)
registerSenadorSizes('p_es40', ['Sencilla', 'Doble Carne y Queso'], [0, 30]);

// Limonada/Naranjada & Agua de sabor: vaso (base), jarra (+85)
registerSenadorSizes('p_es51', ['Vaso', 'Jarra'], [0, 85]);
registerSenadorSizes('p_es52', ['Vaso', 'Jarra'], [0, 85]);

// ==========================================
// DYNAMIC OPTIONS FOR ASADOR LA LIEBRE (n16)
// ==========================================
const libreMeatProds = ['p_libre_papa_rellena', 'p_libre_taco', 'p_libre_queca', 'p_libre_esp_lonche'];
libreMeatProds.forEach(id => {
  const gId = `g_libre_meat_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Elige tu carne',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_libre_meat_${id}_0`, grupo_id: gId, nombre: 'Asada', precio_adicional: 0 },
    { id: `o_libre_meat_${id}_1`, grupo_id: gId, nombre: 'Adobada (de cerdo)', precio_adicional: 0 },
    { id: `o_libre_meat_${id}_2`, grupo_id: gId, nombre: 'Chorizo', precio_adicional: 0 },
    { id: `o_libre_meat_${id}_3`, grupo_id: gId, nombre: 'Pollo', precio_adicional: 0 },
    { id: `o_libre_meat_${id}_4`, grupo_id: gId, nombre: 'Cecina', precio_adicional: 0 },
    { id: `o_libre_meat_${id}_5`, grupo_id: gId, nombre: 'Arrachera (de cerdo)', precio_adicional: 0 }
  );
});

// Refresco flavors
dynamicGrupos.push({
  id: 'g_libre_refresco_flavor',
  producto_id: 'p_libre_refresco',
  nombre: 'Elige tu refresco',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_libre_ref_0', grupo_id: 'g_libre_refresco_flavor', nombre: 'Coca Cola', precio_adicional: 0 },
  { id: 'o_libre_ref_1', grupo_id: 'g_libre_refresco_flavor', nombre: 'Coca Cola Light', precio_adicional: 0 },
  { id: 'o_libre_ref_2', grupo_id: 'g_libre_refresco_flavor', nombre: 'Sprite', precio_adicional: 0 }
);

// Agua fresca flavors
dynamicGrupos.push({
  id: 'g_libre_agua_flavor',
  producto_id: 'p_libre_agua_fresca',
  nombre: 'Elige el sabor',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_libre_agua_0', grupo_id: 'g_libre_agua_flavor', nombre: 'Lima', precio_adicional: 0 },
  { id: 'o_libre_agua_1', grupo_id: 'g_libre_agua_flavor', nombre: 'Horchata', precio_adicional: 0 }
);

// Cerveza types
dynamicGrupos.push({
  id: 'g_libre_cerveza_type',
  producto_id: 'p_libre_cerveza',
  nombre: 'Elige tipo de cerveza',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_libre_cerveza_0', grupo_id: 'g_libre_cerveza_type', nombre: 'Corona Clara', precio_adicional: 0 },
  { id: 'o_libre_cerveza_1', grupo_id: 'g_libre_cerveza_type', nombre: 'Corona Oscura', precio_adicional: 0 }
);

// =====================================
// DYNAMIC OPTIONS FOR PUNTO 21 (n17)
// =====================================
const puntoHambProds = [
  'p_punto_hamb_sencilla',
  'p_punto_hamb_especial',
  'p_punto_hamb_suprema',
  'p_punto_hamb_arrachera',
  'p_punto_hamb_pollo_crujiente',
  'p_punto_hamb_boneless',
  'p_punto_hamb_pollo_extreme'
];
puntoHambProds.forEach(id => {
  const gId = `g_punto_hamb_extras_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Extras (Opcional)',
    seleccion_multiple: true,
    obligatorio: false
  });
  dynamicExtras.push(
    { id: `o_punto_hamb_ext_${id}_0`, grupo_id: gId, nombre: 'Tocino', precio_adicional: 20 },
    { id: `o_punto_hamb_ext_${id}_1`, grupo_id: gId, nombre: 'Jamón', precio_adicional: 20 },
    { id: `o_punto_hamb_ext_${id}_2`, grupo_id: gId, nombre: 'Piña', precio_adicional: 15 },
    { id: `o_punto_hamb_ext_${id}_3`, grupo_id: gId, nombre: 'Salsa', precio_adicional: 15 }
  );
});

const puntoSauceProds = [
  'p_punto_snack_alitas_10',
  'p_punto_snack_alitas_1k',
  'p_punto_snack_boneless_200',
  'p_punto_snack_boneless_350'
];
puntoSauceProds.forEach(id => {
  const gId = `g_punto_sauce_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Selecciona tu Salsa/Sabor',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_punto_sauce_${id}_0`, grupo_id: gId, nombre: 'Mango Habanero', precio_adicional: 0 },
    { id: `o_punto_sauce_${id}_1`, grupo_id: gId, nombre: 'BBQ Habanero', precio_adicional: 0 },
    { id: `o_punto_sauce_${id}_2`, grupo_id: gId, nombre: 'Búfalo', precio_adicional: 0 },
    { id: `o_punto_sauce_${id}_3`, grupo_id: gId, nombre: 'BBQ', precio_adicional: 0 },
    { id: `o_punto_sauce_${id}_4`, grupo_id: gId, nombre: 'Ranch Habanero', precio_adicional: 0 }
  );
});

// La Barra 63 - Programmatic Options Generation
// 1. Sauces for Alitas and Boneless
const barra63SauceProds = ['p_lb_alitas_450', 'p_lb_alitas_900', 'p_lb_boneless_7', 'p_lb_boneless_14'];
const barra63Sauces = [
  'Naturales', 'BBQ', 'Mango Habanero', 'Búfalo', 'BBQ Diabla', 
  'Lemon Pepper', 'Búfalo Limón', 'Chipotle', 'Búfalo Extremo (11 niveles)', 
  'Parmesano', 'Chamoy'
];
barra63SauceProds.forEach(id => {
  const gId = `g_lb_sauce_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Selecciona tu Salsa/Sabor',
    seleccion_multiple: false,
    obligatorio: true
  });
  barra63Sauces.forEach((sauce, idx) => {
    dynamicExtras.push({
      id: `o_lb_sauce_${id}_${idx}`,
      grupo_id: gId,
      nombre: sauce,
      precio_adicional: 0
    });
  });
});

// 2. Papas Gajo Styles
const gGajoId = 'g_lb_papas_gajo_style';
dynamicGrupos.push({
  id: gGajoId,
  producto_id: 'p_lb_papas_gajo',
  nombre: 'Estilo de Papas Gajo',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_lb_papas_gajo_style_0', grupo_id: gGajoId, nombre: 'Sencillas', precio_adicional: 0 },
  { id: 'o_lb_papas_gajo_style_1', grupo_id: gGajoId, nombre: 'Cheddar Tocino', precio_adicional: 15 },
  { id: 'o_lb_papas_gajo_style_2', grupo_id: gGajoId, nombre: 'Parmesano', precio_adicional: 10 },
  { id: 'o_lb_papas_gajo_style_3', grupo_id: gGajoId, nombre: 'Ajo', precio_adicional: 10 }
);

// 3. Burger Styles and Addons
const barra63Burgers = [
  'p_lb_burger_res',
  'p_lb_burger_pollo',
  'p_lb_burger_kfc',
  'p_lb_burger_arrachera',
  'p_lb_burger_seloin'
];
barra63Burgers.forEach(id => {
  const gStyleId = `g_lb_burger_style_${id}`;
  dynamicGrupos.push({
    id: gStyleId,
    producto_id: id,
    nombre: 'Selecciona el Estilo',
    seleccion_multiple: false,
    obligatorio: true
  });
  dynamicExtras.push(
    { id: `o_lb_burger_style_${id}_0`, grupo_id: gStyleId, nombre: 'Sencilla', precio_adicional: 0 },
    { id: `o_lb_burger_style_${id}_1`, grupo_id: gStyleId, nombre: 'Tuta (Doble carne, doble vegetal y doble queso)', precio_adicional: 20 },
    { id: `o_lb_burger_style_${id}_2`, grupo_id: gStyleId, nombre: 'Arrolladora (Doble carne, doble vegetal, aros de cebolla y doble queso)', precio_adicional: 30 }
  );

  const gPapasId = `g_lb_burger_papas_${id}`;
  dynamicGrupos.push({
    id: gPapasId,
    producto_id: id,
    nombre: '¿Deseas agregar Papas?',
    seleccion_multiple: false,
    obligatorio: false
  });
  dynamicExtras.push(
    { id: `o_lb_burger_papas_${id}_0`, grupo_id: gPapasId, nombre: 'Con Papas Fritas', precio_adicional: 30 }
  );
});

// Casa D' Sofi - Programmatic Options Generation
// 1. Ramen Extras (Shoyu and Camarón)
const dsRamenProds = ['p_ds_shoyu', 'p_ds_camaron'];
dsRamenProds.forEach(id => {
  const gId = `g_ds_ramen_extras_${id}`;
  dynamicGrupos.push({
    id: gId,
    producto_id: id,
    nombre: 'Agrega Extras (Opcional)',
    seleccion_multiple: true,
    obligatorio: false
  });
  dynamicExtras.push(
    { id: `o_ds_ramen_ext_${id}_0`, grupo_id: gId, nombre: 'Tamaño Grande (Doble Fideo y Caldo)', precio_adicional: 45 },
    { id: `o_ds_ramen_ext_${id}_1`, grupo_id: gId, nombre: 'Más Panceta Glaseada', precio_adicional: 25 },
    { id: `o_ds_ramen_ext_${id}_2`, grupo_id: gId, nombre: 'Más Huevo Ajitama', precio_adicional: 10 }
  );
});

// 2. Quesadilla Glaseada Proteins
const gQuesadillaId = 'g_ds_quesadilla_protein';
dynamicGrupos.push({
  id: gQuesadillaId,
  producto_id: 'p_ds_quesadilla',
  nombre: 'Elige tu Proteína (Requerido)',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_ds_quesadilla_prot_0', grupo_id: gQuesadillaId, nombre: 'Marlín Ahumado', precio_adicional: 0 },
  { id: 'o_ds_quesadilla_prot_1', grupo_id: gQuesadillaId, nombre: 'Camarones', precio_adicional: 5 }
);

// 3. Pollo Karaage Portion Size
const gKaraageId = 'g_ds_karaage_portion';
dynamicGrupos.push({
  id: gKaraageId,
  producto_id: 'p_ds_karaage',
  nombre: 'Tamaño de la Porción (Requerido)',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_ds_karaage_port_0', grupo_id: gKaraageId, nombre: '4 Piezas', precio_adicional: 0 },
  { id: 'o_ds_karaage_port_1', grupo_id: gKaraageId, nombre: '6 Piezas', precio_adicional: 40 },
  { id: 'o_ds_karaage_port_2', grupo_id: gKaraageId, nombre: '8 Piezas', precio_adicional: 80 }
);

// 4. Refresco 600ml Flavors
const gRefrescoId = 'g_ds_refresco_flavor';
dynamicGrupos.push({
  id: gRefrescoId,
  producto_id: 'p_ds_refresco',
  nombre: 'Elige el Sabor (Requerido)',
  seleccion_multiple: false,
  obligatorio: true
});
dynamicExtras.push(
  { id: 'o_ds_refresco_flav_0', grupo_id: gRefrescoId, nombre: 'Coca Cola', precio_adicional: 0 },
  { id: 'o_ds_refresco_flav_1', grupo_id: gRefrescoId, nombre: 'Coca Cola Sin Azúcar', precio_adicional: 0 },
  { id: 'o_ds_refresco_flav_2', grupo_id: gRefrescoId, nombre: 'Sprite', precio_adicional: 0 },
  { id: 'o_ds_refresco_flav_3', grupo_id: gRefrescoId, nombre: 'Fresca', precio_adicional: 0 }
);

export const mockGruposOpciones: GrupoOpciones[] = [...initialGruposOpciones, ...dynamicGrupos];
export const mockOpcionesExtras: OpcionExtra[] = [...initialOpcionesExtras, ...dynamicExtras];
export const mockRefrescosSabores600 = ['Coca Cola', 'Sprite', 'Fresca', 'Fanta'];
export const mockRefrescosSabores2L = ['Coca Cola', 'Fresca', 'Sidral Mundet'];

export const mockPromociones: Promocion[] = [
  {
    id: 'promo-1',
    imagen_url: '/foto portada mazter pizza.jpg',
    titulo: '¡Mazter Pizza!',
    descripcion: 'Pizzas al horno de piedra con ingredientes premium y sabor único. ¡Haz tu pedido por WhatsApp hoy mismo!',
    negocio_slug: 'mazter-pizza',
    activo: true
  },
  {
    id: 'promo-2',
    imagen_url: '/foto portada el senador.png',
    titulo: 'Restaurante Bar El Senador',
    descripcion: 'Lo mejor en mariscos y filetes de la región de Jamay. Sabores tradicionales que deleitan.',
    negocio_slug: 'el-senador',
    activo: true
  },
  {
    id: 'promo-3',
    imagen_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    titulo: 'Envío Gratis',
    descripcion: 'Descubre los locales participantes en Jamay con costo de envío gratis. ¡Aprovecha ya!',
    activo: true
  }
];
