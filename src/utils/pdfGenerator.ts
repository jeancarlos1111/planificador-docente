import html2pdf from 'html2pdf.js';
import type { OpcionesExportacionPDF } from '../types/planificacion';

export interface ParametrosPDF {
  elemento: HTMLElement;
  nombreArchivo?: string;
  opciones?: Partial<OpcionesExportacionPDF>;
}

/**
 * Normaliza nombres de archivo para evitar caracteres no válidos en el SO
 */
export function normalizarNombreArchivo(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 60);
}

/**
 * Configuración estandarizada para documentos oficiales MPPE
 */
export function construirOpcionesHtml2Pdf(
  nombreArchivo: string,
  opciones?: Partial<OpcionesExportacionPDF>
) {
  const formato = opciones?.formato || 'legal';
  const orientacion = opciones?.orientacion || 'portrait';

  return {
    margin: [8, 8, 8, 8] as [number, number, number, number],
    filename: `${nombreArchivo}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: {
      unit: 'mm',
      format: formato,
      orientation: orientacion,
      compress: true
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['.no-split', '.firmas-contenedor', '.table-evaluation tr', '.seccion-bloque']
    }
  };
}

/**
 * Descarga directamente el archivo PDF
 */
export async function exportarPlanificacionPDF(parametros: ParametrosPDF): Promise<void> {
  const { elemento, nombreArchivo = 'Planificacion_Docente_MPPE', opciones } = parametros;
  const config = construirOpcionesHtml2Pdf(nombreArchivo, opciones);

  // Aseguramos que los estilos de impresión se apliquen
  elemento.classList.add('imprimiendo-pdf');

  try {
    await html2pdf().set(config).from(elemento).save();
  } finally {
    elemento.classList.remove('imprimiendo-pdf');
  }
}

/**
 * Genera un Blob URL para visualizar el PDF generado en un visor embebido (iframe / q-dialog)
 */
export async function generarBlobUrlPDF(parametros: ParametrosPDF): Promise<string> {
  const { elemento, nombreArchivo = 'VistaPrevia_MPPE', opciones } = parametros;
  const config = construirOpcionesHtml2Pdf(nombreArchivo, opciones);

  elemento.classList.add('imprimiendo-pdf');

  try {
    const worker = html2pdf().set(config).from(elemento).toPdf();
    const pdf = await worker.get('pdf');
    const blob = pdf.output('blob');
    return URL.createObjectURL(blob);
  } finally {
    elemento.classList.remove('imprimiendo-pdf');
  }
}
