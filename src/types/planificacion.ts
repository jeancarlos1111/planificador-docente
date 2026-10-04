export type SubsistemaEducativo = 'primaria' | 'media_general' | 'media_tecnica';

export type MomentoPedagogico = 'I Momento' | 'II Momento' | 'III Momento';

export type FormaParticipacion = 'Autoevaluación' | 'Coevaluación' | 'Heteroevaluación';

export type TipoPlan = 'lapso_macro' | 'semanal_micro' | 'evaluacion_cronograma' | 'plan_accion';

/**
 * Contenido macro con fechas, sustento científico y aprendizajes esperados (lo que se aspira que aprendan)
 */
export interface ContenidoMacroLapso {
  id: string;
  tema: string;
  referenteTeoricoCientifico: string; // Sustento científico de la actividad
  prerrequisitosDiagnostico: string; // Dimensiones relacionadas con prerrequisitos
  loQueSeAspiraQueAprendan: string; // Aprendizajes esperados / dimensiones de logro
  fechaInicio: string;
  fechaFin: string;
  semanasEstimadas: number;
  clasesAsignadas: number; // Ej. 2 clases por semana
}

/**
 * Sesión de clase individual (Micro-planificación: Clase 1, Clase 2 por semana)
 */
export interface SesionClaseMicro {
  id: string;
  numeroClase: number; // Ej. Clase 1, Clase 2
  diaSemana: string; // Ej. Lunes, Miércoles
  fecha: string;
  horasAcademicas: number;
  contenidoSesion: string;
  inicio: string; // Exploración de saberes previos, motivación
  desarrollo: string; // Construcción social del conocimiento, ejercitación
  cierre: string; // Sistematización, retroalimentación, verificación
  recursos: string[];
  recursosDetalle: string;
}

/**
 * Semana didáctica que agrupa múltiples clases
 */
export interface SemanaDidactica {
  id: string;
  numeroSemana: number;
  rangoFechas: string;
  clases: SesionClaseMicro[];
}

/**
 * Cronograma de Evaluación oficial con columnas del MPPE
 */
export interface EvaluacionActividad {
  id: string;
  tema: string; // Tema curricular
  referenteTeorico: string; // Sustento científico de la actividad
  estrategiaEvaluacion: string; // Actividad: debate, taller, informe, maqueta
  tecnicaEvaluacion: string; // Técnica: observación, análisis de producción oral/escrita
  instrumentoEvaluacion: string; // Instrumento: escala de estimación, rúbrica, lista de cotejo
  formaParticipacion: FormaParticipacion;
  ponderacionPorcentaje: number;
  puntaje: number; // Escala 1 a 20 puntos
  fechaEstimada: string;
  criteriosIndicadores?: string;
}

/**
 * Proyecto corto / Plan de acción
 */
export interface PlanDeAccion {
  titulo: string;
  justificacion: string;
  objetivoAccion: string;
  meta: string;
  acciones: Array<{
    id: string;
    tarea: string;
    responsables: string;
    tiempo: string;
    recursos: string;
  }>;
}

/**
 * Registro de correcciones pedagógicas de coordinación
 */
export interface CorreccionCoordinacion {
  id: string;
  fecha: string;
  origen: string; // Ej. Coordinador Pedagógico, Director, Supervisor CDCE
  observacion: string;
  estado: 'pendiente' | 'corregido';
  ajustesRealizados?: string;
}

export interface MembreteOficial {
  republica: string;
  ministerio: string;
  cdceZonaEducativa: string;
  nombrePlantel: string;
  codigoDEA: string;
  codigoDependencia: string;
  estadoMunicipio: string;
}

export interface DocenteData {
  nombreCompleto: string;
  cedula: string;
  correo: string;
  telefono: string;
}

export interface ContextoEscolar {
  anioEscolar: string;
  momentoPedagogico: MomentoPedagogico;
  gradoAnio: string;
  seccion: string;
  turno: string;
  areaFormacion: string;
  peicNombre: string;
  peicProposito: string;
  clasesPorSemana: number; // Ej. 2 clases por semana
}

export interface DiagnosticoPlan {
  diagnosticoAula: string;
  tituloProyectoTema: string;
  fechaInicio: string;
  fechaCulminacion: string;
  duracionSemanas: number;
  totalHorasSemanales: number;
}

export interface ArticulacionCurricular {
  ejesIntegradores: string[];
  intencionalidades: string[];
  temaIndispensable: string;
  temaGenerador: string;
  tejidoTematico: string;
}

export interface FirmasDocumento {
  docenteAula: string;
  coordinacionPedagogica: string;
  direccionPlantel: string;
}

export type EstadoPlanificacion = 'borrador' | 'por_corregir' | 'corregida';

export interface PlanificacionDocente {
  id: string;
  version: number;
  estado: EstadoPlanificacion; // 'borrador' | 'por_corregir' | 'corregida'
  createdAt: string;
  updatedAt: string;
  tipoPlan: TipoPlan; // lapso_macro | semanal_micro | evaluacion_cronograma | plan_accion
  subsistema: SubsistemaEducativo;
  membrete: MembreteOficial;
  docente: DocenteData;
  contextoEscolar: ContextoEscolar;
  diagnostico: DiagnosticoPlan;
  articulacion: ArticulacionCurricular;

  // Plan de Lapso Macro: contenidos con fechas inicio/fin y prerrequisitos
  contenidosMacro: ContenidoMacroLapso[];

  // Plan Semanal Micro: semanas con cada clase desglosada (Inicio, Desarrollo, Cierre)
  semanasMicro: SemanaDidactica[];

  // Plan / Cronograma de Evaluación oficial
  planEvaluacion: EvaluacionActividad[];

  // Plan de Acción (Proyecto Corto)
  planAccion: PlanDeAccion;

  // Registro de correcciones pedagógicas exigidas por el colegio
  correcciones: CorreccionCoordinacion[];

  observacionesGenerales: string;
  firmas: FirmasDocumento;
}

export interface OpcionesExportacionPDF {
  formato: 'letter' | 'legal';
  orientacion: 'portrait' | 'landscape';
  incluirFirmas: boolean;
  tamanoFuente: 'pequena' | 'mediana';
  vistaExportar: TipoPlan | 'completo';
}
