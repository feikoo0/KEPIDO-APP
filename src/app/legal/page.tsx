'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Info } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full max-w-md mx-auto shadow-xl relative border-x border-gray-100 pb-16">
      {/* Header */}
      <header className="bg-[#1947c7] text-white px-5 py-4 flex items-center gap-3 sticky top-0 z-30 shadow-sm">
        <Link href="/perfil" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">Información Legal</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 space-y-8 overflow-y-auto">
        
        {/* Intro */}
        <section className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-600">
            <Info size={18} />
            <h2 className="font-bold text-gray-800 text-[14px]">Información Transparente</h2>
          </div>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            Bienvenido a **Kepido Jamay**. Para nosotros es muy importante tu seguridad, confianza y la protección de tus datos personales. A continuación detallamos los términos del uso de nuestro directorio y el aviso de privacidad.
          </p>
        </section>

        {/* Términos y Condiciones */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-[#FF6B00]">
            <FileText size={18} />
            <h3 className="font-bold text-gray-800 text-[15px]">Términos y Condiciones</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs space-y-4 text-[12px] text-gray-600 leading-relaxed">
            <p>
              **1. Naturaleza del Servicio:** Kepido Jamay es una plataforma digital que actúa exclusivamente como un **directorio publicitario e intermediario tecnológico** facilitando el enlace directo entre restaurantes locales de Jamay, Jalisco, y los clientes finales.
            </p>
            <p>
              **2. Deslinde de Responsabilidad de Alimentos:** La preparación, higiene, calidad, empaque, ingredientes y estado físico de los alimentos son responsabilidad única y exclusiva del restaurante seleccionado. Kepido Jamay no cocina alimentos ni asume responsabilidad por alergias, intoxicaciones o calidad deficiente.
            </p>
            <p>
              **3. Deslinde de Reparto (Delivery):** La entrega a domicilio es coordinada mediante repartidores independientes (como Mandaditos o repartidores propios de cada restaurante). Kepido Jamay no se hace responsable por demoras, cobros de envío incorrectos, mal trato del repartidor o estado del producto durante el traslado.
            </p>
            <p>
              **4. Precios y Disponibilidad:** Los precios mostrados en el menú son provistos por los locales y están sujetos a variaciones sin previo aviso por parte de los comercios.
            </p>
          </div>
        </section>

        {/* Aviso de Privacidad */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Shield size={18} />
            <h3 className="font-bold text-gray-800 text-[15px]">Aviso de Privacidad Simplificado</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs space-y-4 text-[12px] text-gray-600 leading-relaxed">
            <p>
              **Responsable de los Datos:** Kepido Jamay (en adelante la Plataforma) es el responsable del uso y protección de sus datos personales.
            </p>
            <p>
              **Datos que se Recaban:** Recabamos su **nombre**, **dirección de entrega** y **número de teléfono celular**.
            </p>
            <p>
              **Finalidad del Tratamiento:** Estos datos son solicitados y procesados de manera local en su dispositivo únicamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Construir el mensaje de pedido estructurado que usted envía voluntariamente al restaurante o repartidor por WhatsApp.</li>
              <li>Recordar su dirección de entrega favorita localmente para sus próximas compras.</li>
            </ul>
            <p>
              **Transferencia de Datos:** Sus datos personales no son compartidos, vendidos ni transferidos a ningún tercero ajeno a la operación de envío. El único receptor de su información es el comercio al que usted decida realizar el pedido mediante WhatsApp.
            </p>
            <p>
              **Derechos ARCO:** Para ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición de sus datos personales, basta con limpiar la memoria caché de su navegador o ponerse en contacto con nuestro equipo de soporte técnico.
            </p>
          </div>
        </section>

        {/* Pie de página legal */}
        <p className="text-center text-[10px] text-gray-400">
          Última actualización: Junio de 2026. Jamay, Jalisco, México.
        </p>

      </main>
    </div>
  );
}
