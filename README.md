# Rappi Jamay - Guía de Desarrollo y Funcionamiento

Bienvenido a la documentación oficial de **Rappi Jamay**, una aplicación web moderna diseñada para facilitar el pedido de comida local a domicilio o para llevar en Jamay, Jalisco.

Esta guía sirve como registro histórico y manual de desarrollo para futuros entendimientos, modificaciones visuales y gestión de los negocios.

---

## 📌 Visión General de la Aplicación

El objetivo de Rappi Jamay es ofrecer a los usuarios una interfaz rápida, limpia y atractiva para explorar los menús locales de Jamay, consolidar sus antojos en un único carrito y enviar la orden de manera simplificada al repartidor de mandados.

### Características Principales:
1. **Carrito Consolidado (Multilocal)**: Los usuarios pueden añadir productos de distintos restaurantes al mismo carrito a la vez sin restricciones de exclusividad.
2. **Ruta de Reparto Única (WhatsApp)**: Todos los pedidos acumulados se formatean organizados bajo el nombre de cada local y se envían en un único mensaje de WhatsApp al número central de mandaditos (`523921102874`).
3. **Filtro de Domicilio / Recoger**: Un interruptor deslizante con transiciones animadas para elegir el tipo de entrega. Al seleccionar "Recoger", los costos de envío cambian a Gratis automáticamente.
4. **Diseño Autodeslizable (Sticky) con Sync**: Al bajar en el perfil de un negocio, el header se vuelve blanco y muestra con suavidad el nombre del negocio junto con la barra pegajosa de categorías.
5. **Calificaciones Interactivas**: Sistema interactivo con corazones para calificar locales y productos que se almacena localmente (`localStorage`).
6. **Modales de Información**: Acceso inmediato a la dirección y horario de atención de los locales mediante el botón flotante de información `(i)`.

---

## 🛠️ Arquitectura del Sistema

La aplicación está construida sobre **Next.js (App Router)** utilizando **React**, **TypeScript** y estilos con **Tailwind CSS / CSS Vanilla**.

### 1. Estructura de Datos
Todos los datos de la aplicación están separados del diseño en la carpeta `src/lib`:
* **Definición de Tipos** ([types.ts](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/lib/types.ts)): Contiene las interfaces TypeScript para `Negocio`, `CategoriaMenu`, `Producto`, `GrupoOpciones`, `OpcionExtra` y los estados del carrito.
* **Base de Datos Local** ([mockData.ts](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/lib/mockData.ts)): Archivo centralizado que actúa como base de datos estática local para desarrollo y fallback rápido. Contiene todos los perfiles de los restaurantes (12 actualmente) y sus productos asociados.
* **Cliente de Base de Datos** ([supabase.ts](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/lib/supabase.ts)): Realiza las consultas a la base de datos cloud. Si no hay credenciales en `.env.local`, el sistema entra automáticamente en modo fallback y consume `mockData.ts` de forma transparente.

---

## 🎨 Guía de Estilos y Tipografía (Múltiplos de 4)

Para mantener la consistencia estética premium de la aplicación, seguimos una escala tipográfica estricta basada en **múltiplos de 4**:

* **Títulos de Secciones / Categorías del Menú**: `24px` (usar `text-[24px]` en Tailwind).
* **Nombres de Negocios en Cabecera / Tarjetas**: `20px` (usar `text-[20px]`).
* **Nombres de Productos**: `16px` (usar `text-[16px]`).
* **Textos Descriptivos / Direcciones / Precios**: `12px` (usar `text-[12px]`).
* **Etiquetas secundarias / Rating / Insignias**: `8px` (usar `text-[8px]`).

> [!IMPORTANT]
> Se deben evitar clases genéricas de fuentes que no se alineen con esta cuadrícula (como `text-sm` o `text-lg`) para mantener la alineación matemática y el aspecto limpio del diseño.

---

## 🚀 Cómo hacer modificaciones futuras

### A. Para Añadir o Modificar un Restaurante
No necesitas editar código de interfaz. Solo abre [mockData.ts](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/lib/mockData.ts):
1. **Añadir el Perfil**: Agrega un objeto a la constante `mockNegocios` con un `id` único (ej. `n12`), coordenadas, dirección, horarios y slug.
2. **Añadir las Categorías**: Agrega los identificadores de categorías en `mockCategoriasMenu` apuntando al `negocio_id` creado.
3. **Añadir los Productos**: Agrega las entradas del menú a la constante `mockProductos`.
4. **Registrar Tamaños o Extras**: Si el producto cuenta con variantes de tamaño (chico, grande, jarra, etc.), regístralo al final del archivo usando `registerSenadorSizes` u otros helpers.

### B. Para Hacer Cambios Estéticos
El diseño principal reside en:
* [page.tsx](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/app/page.tsx) (Página de Inicio / Buscador).
* [BusinessMenuClient.tsx](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/components/BusinessMenuClient.tsx) (Perfil y Menú del Negocio).
* [CartDrawer.tsx](file:///Users/macbookair/Documents/RAPPI%20JAMAY/src/components/CartDrawer.tsx) (Carrito de compras y formato de mensaje WhatsApp).

---

## 💻 Comandos Útiles en la Terminal

* **Iniciar Servidor de Desarrollo**: `npm run dev`
* **Compilar para Producción y Verificar Tipos**: `npm run build`
* **Iniciar Servidor en Puerto Alterno** (si el puerto 3000 está ocupado): `PORT=3001 npm run dev`
