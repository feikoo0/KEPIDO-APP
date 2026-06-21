import { mockNegocios } from '../lib/mockData';

// List of category chips from page.tsx
const categoryChips = [
  { id: 'tacos', label: 'Tacos' },
  { id: 'hamburguesas', label: 'Hamburguesas' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'postres', label: 'Postres' },
  { id: 'mariscos', label: 'Mariscos' },
  { id: 'tortas', label: 'Tortas' },
  { id: 'cafe', label: 'Café y Bebidas' },
  { id: 'alitas', label: 'Alitas y Snacks' },
  { id: 'pollo', label: 'Pollo' },
  { id: 'carnes', label: 'Carnes y Asados' },
  { id: 'sushi', label: 'Sushi' }
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

// Mappings of keywords to recommended category IDs
const rules = [
  { keywords: ['taco', 'quesadilla', 'pastor', 'barbacoa', 'birria'], categoryId: 'tacos' },
  { keywords: ['hamburguesa', 'burger'], categoryId: 'hamburguesas' },
  { keywords: ['pizza'], categoryId: 'pizza' },
  { keywords: ['postre', 'nieve', 'helado', 'crepa', 'dulce', 'pastel', 'malteada', 'frappe'], categoryId: 'postres' },
  { keywords: ['marisco', 'camarón', 'camaron', 'pescado', 'ceviche', 'aguachile', 'tostada de'], categoryId: 'mariscos' },
  { keywords: ['torta', 'lonche', 'baguette', 'ahogada'], categoryId: 'tortas' },
  { keywords: ['café', 'cafe', 'licuado', 'bebida', 'té', 'te', 'jugo', 'smoothie', 'latte', 'tisana'], categoryId: 'cafe' },
  { keywords: ['alita', 'boneless', 'snack', 'papas preparadas', 'dedos de queso', 'esquite', 'elote'], categoryId: 'alitas' },
  { keywords: ['pollo'], categoryId: 'pollo' },
  { keywords: ['carne', 'asado', 'asada', 'corte', 'leña', 'carbon', 'carbón', 'arrachera', 'costilla'], categoryId: 'carnes' },
  { keywords: ['sushi', 'roll', 'maki'], categoryId: 'sushi' }
];

console.log('=== AUDITORÍA DE CATEGORIZACIÓN Y TAGS DE NEGOCIOS ===\n');

let warningsCount = 0;
let errorsCount = 0;

mockNegocios.forEach(negocio => {
  const tagsLower = (negocio.tags || []).map(t => t.toLowerCase());
  
  // Check which category chips this business matches
  const matchedCategories = categoryChips.filter(chip => {
    const matchedTagsForCategory = categoryTagMap[chip.id] || [chip.id];
    const isPrincipalMatch = matchedTagsForCategory.some(mt => negocio.categoria_principal.toLowerCase().includes(mt.toLowerCase()));
    const isTagMatch = tagsLower.some(t => matchedTagsForCategory.some(mt => t.includes(mt.toLowerCase())));
    return isPrincipalMatch || isTagMatch;
  });

  if (matchedCategories.length === 0) {
    console.error(`❌ ERROR: El negocio "${negocio.nombre}" (${negocio.slug}) no coincide con NINGÚN chip de filtro en el Home.`);
    console.error(`   Categoría Principal: "${negocio.categoria_principal}"`);
    console.error(`   Tags actuales: [${negocio.tags?.join(', ') || ''}]`);
    errorsCount++;
  } else {
    console.log(`✅ "${negocio.nombre}" coincide con: ${matchedCategories.map(c => c.label).join(', ')}`);
  }

  // Content analysis for suggesting tags
  const textToAnalyze = `${negocio.nombre} ${negocio.categoria_principal} ${negocio.descripcion || ''}`.toLowerCase();
  
  rules.forEach(rule => {
    // If text matches any keyword of this category
    const hasKeyword = rule.keywords.some(kw => textToAnalyze.includes(kw));
    
    // Check if the business already matches this category
    const alreadyMatches = matchedCategories.some(c => c.id === rule.categoryId);

    if (hasKeyword && !alreadyMatches) {
      console.warn(`   ⚠️ ADVERTENCIA: Se detectaron palabras clave de "${categoryChips.find(c => c.id === rule.categoryId)?.label}" en "${negocio.nombre}".`);
      console.warn(`      Considera agregar "${rule.categoryId}" a los tags o categoría principal.`);
      warningsCount++;
    }
  });
});

console.log('\n=== RESUMEN ===');
if (errorsCount > 0) {
  console.log(`Errores encontrados: ${errorsCount} (¡Deben corregirse para evitar negocios huérfanos!)`);
} else {
  console.log('¡No se encontraron negocios huérfanos!');
}
console.log(`Advertencias (sugerencias de tags): ${warningsCount}`);

if (errorsCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
