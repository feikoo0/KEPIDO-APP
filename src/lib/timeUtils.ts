import { Negocio } from './types';

// Time checker helper
export const checkOpen = (apertura: string, cierre: string, slug?: string): boolean => {
  const ahora = new Date();
  let actualApertura = apertura;
  let actualCierre = cierre;

  if (slug === 'el-senador') {
    const dia = ahora.getDay(); // 0 = Domingo, 5 = Viernes, 6 = Sábado
    actualApertura = '12:30:00';
    if (dia === 5 || dia === 6) {
      actualCierre = '23:30:00';
    } else {
      actualCierre = '18:30:00';
    }
  } else if (slug === 'casa-d-sofi') {
    const minutosActual = ahora.getHours() * 60 + ahora.getMinutes();
    // 1:00 PM to 5:00 PM (780 to 1020 mins)
    // 8:00 PM to 12:00 AM (1200 to 1440 mins)
    const isOpenShift1 = minutosActual >= 780 && minutosActual <= 1020;
    const isOpenShift2 = minutosActual >= 1200 && minutosActual <= 1440;
    return isOpenShift1 || isOpenShift2;
  } else if (slug === 'roshi-rosca-de-sushi') {
    const dia = ahora.getDay();
    const minutosActual = ahora.getHours() * 60 + ahora.getMinutes();
    if (dia === 1 || dia === 4) {
      // Lunes y Jueves: 5:00 PM a 10:00 PM (1020 a 1320 mins)
      return minutosActual >= 1020 && minutosActual <= 1320;
    } else if (dia === 5 || dia === 6 || dia === 0) {
      // Viernes a Domingo: 1:00 PM a 4:00 PM (780 a 960 mins) y 7:00 PM a 10:00 PM (1140 a 1320 mins)
      const shift1 = minutosActual >= 780 && minutosActual <= 960;
      const shift2 = minutosActual >= 1140 && minutosActual <= 1320;
      return shift1 || shift2;
    }
    return false;
  }

  const [hA, mA] = actualApertura.split(':').map(Number);
  const [hC, mC] = actualCierre.split(':').map(Number);
  const minutosActual = ahora.getHours() * 60 + ahora.getMinutes();
  const minutosApertura = hA * 60 + mA;
  const minutosCierre = hC * 60 + mC;

  if (minutosCierre >= minutosApertura) {
    return minutosActual >= minutosApertura && minutosActual <= minutosCierre;
  } else {
    // Over midnight (e.g. 18:00 to 02:00)
    return minutosActual >= minutosApertura || minutosActual <= minutosCierre;
  }
};

export const format12h = (timeStr: string): string => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const minStr = String(m).padStart(2, '0');
  return `${hour12}:${minStr} ${ampm}`;
};

export const getDisplayHours = (neg: { horario_apertura: string; horario_cierre: string; slug: string }): string => {
  const ahora = new Date();
  let apertura = neg.horario_apertura;
  let cierre = neg.horario_cierre;

  if (neg.slug === 'el-senador') {
    const dia = ahora.getDay();
    apertura = '12:30:00';
    if (dia === 5 || dia === 6) {
      cierre = '23:30:00';
    } else {
      cierre = '18:30:00';
    }
  } else if (neg.slug === 'casa-d-sofi') {
    return '1:00 PM a 5:00 PM y 8:00 PM a 12:00 AM';
  } else if (neg.slug === 'roshi-rosca-de-sushi') {
    const dia = ahora.getDay();
    if (dia === 1 || dia === 4) {
      return '5:00 PM a 10:00 PM';
    } else if (dia === 5 || dia === 6 || dia === 0) {
      return '1:00 PM a 4:00 PM y 7:00 PM a 10:00 PM';
    }
    return 'Cerrado hoy';
  }

  return `${format12h(apertura)} a ${format12h(cierre)}`;
};
