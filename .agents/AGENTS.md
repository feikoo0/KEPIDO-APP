# Reglas del Proyecto (Kepido - Jamay)

Este documento contiene las reglas de desarrollo y guías de comportamiento específicas para este workspace. La IA (Antigravity) las leerá y aplicará automáticamente en cada sesión.

---

## 1. Guía de Alta e Integración de Nuevos Negocios

Para garantizar consistencia y precisión al dar de alta nuevos negocios en el catálogo local (`src/lib/mockData.ts`), sigue estrictamente los siguientes pasos:

### Paso 1: Comprensión del Menú Real
- **Análisis Previo**: Antes de catalogar productos o asignar categorías, lee detalladamente la carta o imagen del menú suministrada para entender el enfoque culinario principal (ej. si es una carnicería/asador de cortes, no debe asociarse con pollos).
- **Categorización Precisa**: Define el campo `categoria_principal` del negocio de acuerdo con su identidad gastronómica real (ej. `'Cortes y Asados'`, `'Sushi'`, `'Cafetería'`), evitando forzar términos solo para encajar en filtros preexistentes.

### Paso 2: Asociación a Filtros de Inicio (Tags)
- **Mapeo por Tags**: Los filtros de la página de inicio se resuelven inspeccionando tanto la categoría como el arreglo de `tags` de los negocios. Utiliza este arreglo para asociar el negocio a los filtros correctos (ej. `['carnes', 'asados', 'tacos']` para un asador).
- **Consistencia de Filtros**: Si un nuevo negocio introduce una especialidad que no encaja en ningún chip de filtro del Home (ej. *Sushi* o *Cortes*), propone crear un nuevo chip de filtro con su respectivo icono 3D en lugar de clasificarlo incorrectamente.

### Paso 3: Estructura del Menú en Código
- **Categorías y Productos**: Define ids descriptivos y claros de forma secuencial (ej. `c_libre1`, `p_libre_taco`).
- **Opciones Programáticas**: Para mantener ordenado el archivo `mockData.ts`, declara los grupos de opciones repetitivas (como la selección de carnes para múltiples tacos o ingredientes extras de hamburguesas) usando bucles o funciones programáticas al final del archivo antes del statement de exportación.

### Paso 4: Validación Automatizada
- **Ejecución del Auditor**: Siempre que agregues, elimines o modifiques un negocio en `src/lib/mockData.ts`, ejecuta el script de validación local mediante el comando:
  ```bash
  npm run validate:negocios
  ```
- **Cero Negocios Huérfanos**: Asegúrate de que todos los negocios coincidan con al menos un chip de filtro del Home (cero errores) y evalúa las advertencias para sugerir tags relevantes que enriquezcan la búsqueda.

---

## 2. Flujo de Entrega (Split Checkout)
- Mantén la diferenciación de flujo para negocios con servicio a domicilio propio (`delivery_propio: true`) vs consolidado con Mandaditos.
- Asegura que el selector de dirección en el panel de resumen de pago siempre apunte al modal interactivo y realice las validaciones de dirección antes de proceder.
