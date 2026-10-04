import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  PlanificacionDocente,
  ContenidoMacroLapso,
  SemanaDidactica,
  SesionClaseMicro,
  EvaluacionActividad,
  CorreccionCoordinacion,
  OpcionesExportacionPDF,
  SubsistemaEducativo,
  TipoPlan,
  EstadoPlanificacion
} from '../types/planificacion';
import { PLANTILLA_MEDIA_GENERAL, PLANTILLA_PRIMARIA } from '../constants/plantillasEjemplo';
import { dbGuardarPlan, dbObtenerTodos, dbEliminarPlan } from '../database/db';

const STORAGE_KEY_ACTIVO = 'mppe_planificacion_activa';
const STORAGE_KEY_BORRADORES = 'mppe_planificaciones_borradores';
const STORAGE_KEY_CONFIG = 'mppe_config_pdf';

function crearPlanVacio(subsistema: SubsistemaEducativo = 'media_general'): PlanificacionDocente {
  const anioActual = new Date().getFullYear();
  return {
    id: `plan-${Date.now()}`,
    version: 1,
    estado: 'borrador',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tipoPlan: 'lapso_macro',
    subsistema,
    membrete: {
      republica: 'REPÚBLICA BOLIVARIANA DE VENEZUELA',
      ministerio: 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN',
      cdceZonaEducativa: 'CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA (CDCE)',
      nombrePlantel: '',
      codigoDEA: '',
      codigoDependencia: '',
      estadoMunicipio: ''
    },
    docente: {
      nombreCompleto: '',
      cedula: 'V-',
      correo: '',
      telefono: ''
    },
    contextoEscolar: {
      anioEscolar: `${anioActual} - ${anioActual + 1}`,
      momentoPedagogico: 'I Momento',
      gradoAnio: '',
      seccion: 'A',
      turno: 'Mañana',
      areaFormacion: '',
      peicNombre: '',
      peicProposito: '',
      clasesPorSemana: 2
    },
    diagnostico: {
      diagnosticoAula: '',
      tituloProyectoTema: '',
      fechaInicio: new Date().toISOString().substring(0, 10),
      fechaCulminacion: '',
      duracionSemanas: 8,
      totalHorasSemanales: 4
    },
    articulacion: {
      ejesIntegradores: ['Ambiente y Salud Integral'],
      intencionalidades: ['Aprender a Crear', 'Aprender a Convivir y Participar'],
      temaIndispensable: '',
      temaGenerador: '',
      tejidoTematico: '',
      competencia: ''
    },
    contenidosMacro: [
      {
        id: `macro-${Date.now()}-1`,
        tema: 'Tema 1: ',
        referenteTeoricoCientifico: '',
        prerrequisitosDiagnostico: '',
        loQueSeAspiraQueAprendan: '',
        fechaInicio: '',
        fechaFin: '',
        semanasEstimadas: 3,
        clasesAsignadas: 6
      }
    ],
    semanasMicro: [
      {
        id: `sem-${Date.now()}-1`,
        numeroSemana: 1,
        rangoFechas: 'Semana 1',
        gradoAnio: '',
        seccion: '',
        areaFormacion: '',
        referenteTeorico: '',
        competencia: '',
        temaGenerador: '',
        tejidoTematico: '',
        clases: [
          {
            id: `c-${Date.now()}-1`,
            numeroClase: 1,
            diaSemana: 'Lunes',
            fecha: '',
            horasAcademicas: 2,
            contenidoSesion: '',
            inicio: 'Exploración de saberes previos y motivación...',
            desarrollo: 'Construcción social del conocimiento y actividades prácticas...',
            cierre: 'Sistematización de aprendizajes y conclusiones en plenaria...',
            recursos: ['Libros de la Colección Bicentenario', 'Pizarra acrílica / Marcadores'],
            recursosDetalle: ''
          },
          {
            id: `c-${Date.now()}-2`,
            numeroClase: 2,
            diaSemana: 'Miércoles',
            fecha: '',
            horasAcademicas: 2,
            contenidoSesion: '',
            inicio: 'Retroalimentación de la clase anterior...',
            desarrollo: 'Práctica guiada y trabajo cooperativo...',
            cierre: 'Verificación de aprendizajes y asignación formativa...',
            recursos: ['Pizarra acrílica / Marcadores'],
            recursosDetalle: ''
          }
        ]
      }
    ],
    planEvaluacion: [
      {
        id: `eva-${Date.now()}-1`,
        tema: 'Tema 1',
        referenteTeorico: '',
        estrategiaEvaluacion: 'Análisis de producción escrita (informe / taller)',
        tecnicaEvaluacion: 'Análisis de producción escrita (informes, ensayos, resúmenes)',
        instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
        formaParticipacion: 'Heteroevaluación',
        ponderacionPorcentaje: 25,
        puntaje: 5,
        fechaEstimada: '',
        criteriosIndicadores: ''
      },
      {
        id: `eva-${Date.now()}-2`,
        tema: 'Tema 1 y 2',
        referenteTeorico: '',
        estrategiaEvaluacion: 'Demostración práctica / Prueba de desempeño',
        tecnicaEvaluacion: 'Demostración práctica / Práctica de laboratorio',
        instrumentoEvaluacion: 'Rúbrica analítica por criterios',
        formaParticipacion: 'Heteroevaluación',
        ponderacionPorcentaje: 25,
        puntaje: 5,
        fechaEstimada: '',
        criteriosIndicadores: ''
      },
      {
        id: `eva-${Date.now()}-3`,
        tema: 'Tema 2',
        referenteTeorico: '',
        estrategiaEvaluacion: 'Exposición / Mapa conceptual / Infografía',
        tecnicaEvaluacion: 'Producción plástica / Mapa conceptual / Infografía',
        instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
        formaParticipacion: 'Coevaluación',
        ponderacionPorcentaje: 25,
        puntaje: 5,
        fechaEstimada: '',
        criteriosIndicadores: ''
      },
      {
        id: `eva-${Date.now()}-4`,
        tema: 'Integral',
        referenteTeorico: 'Responsabilidad y ética formativa',
        estrategiaEvaluacion: 'Autoevaluación reflexiva y registro de convivencia',
        tecnicaEvaluacion: 'Observación sistemática y participativa',
        instrumentoEvaluacion: 'Lista de cotejo',
        formaParticipacion: 'Autoevaluación',
        ponderacionPorcentaje: 25,
        puntaje: 5,
        fechaEstimada: '',
        criteriosIndicadores: ''
      }
    ],
    planAccion: {
      titulo: 'Plan de Acción Sociocomunitario',
      justificacion: '',
      objetivoAccion: '',
      meta: '',
      acciones: [
        {
          id: `acc-${Date.now()}-1`,
          tarea: '',
          responsables: '',
          tiempo: '',
          recursos: ''
        }
      ]
    },
    correcciones: [],
    observacionesGenerales: '',
    firmas: {
      docenteAula: '',
      coordinacionPedagogica: '',
      direccionPlantel: ''
    }
  };
}

export const usePlanificacionStore = defineStore('planificacion', () => {
  const plan = ref<PlanificacionDocente>(cargarPlanInicial());
  const borradores = ref<PlanificacionDocente[]>(cargarBorradoresIniciales());
  const opcionesPDF = ref<OpcionesExportacionPDF>(cargarOpcionesPDF());

  // ===================== GETTERS =====================

  const totalPonderacion = computed(() => {
    return plan.value.planEvaluacion.reduce((acum, act) => acum + (Number(act.ponderacionPorcentaje) || 0), 0);
  });

  const totalPuntaje = computed(() => {
    return plan.value.planEvaluacion.reduce((acum, act) => acum + (Number(act.puntaje) || 0), 0);
  });

  const esPonderacionValida = computed(() => totalPonderacion.value === 100);
  const esPuntajeValido = computed(() => totalPuntaje.value === 20);

  const totalClasesPlanificadas = computed(() => {
    return plan.value.semanasMicro.reduce((total, sem) => total + sem.clases.length, 0);
  });

  const correccionesPendientes = computed(() => {
    return plan.value.correcciones.filter(c => c.estado === 'pendiente');
  });

  const progresoGeneral = computed(() => {
    let puntos = 0;
    const totalPosible = 8;
    if (plan.value.membrete.nombrePlantel && plan.value.membrete.codigoDEA) puntos++;
    if (plan.value.docente.nombreCompleto && plan.value.docente.cedula) puntos++;
    if (plan.value.contextoEscolar.gradoAnio && plan.value.contextoEscolar.areaFormacion) puntos++;
    if (plan.value.diagnostico.tituloProyectoTema && plan.value.diagnostico.diagnosticoAula) puntos++;
    if (plan.value.contenidosMacro.length > 0 && plan.value.contenidosMacro[0]?.tema) puntos++;
    if (plan.value.semanasMicro.length > 0 && (plan.value.semanasMicro[0]?.clases.length ?? 0) > 0) puntos++;
    if (plan.value.planEvaluacion.length > 0 && esPonderacionValida.value) puntos++;
    if (plan.value.firmas.docenteAula || plan.value.docente.nombreCompleto) puntos++;
    return Math.round((puntos / totalPosible) * 100);
  });

  // ===================== ACCIONES MACRO =====================

  function agregarContenidoMacro() {
    plan.value.contenidosMacro.push({
      id: `macro-${Date.now()}`,
      tema: `Tema ${plan.value.contenidosMacro.length + 1}: `,
      referenteTeoricoCientifico: '',
      prerrequisitosDiagnostico: '',
      loQueSeAspiraQueAprendan: '',
      fechaInicio: '',
      fechaFin: '',
      semanasEstimadas: 2,
      clasesAsignadas: plan.value.contextoEscolar.clasesPorSemana * 2
    });
    guardarEnLocalStorage();
  }

  function eliminarContenidoMacro(index: number) {
    if (plan.value.contenidosMacro.length > 1) {
      plan.value.contenidosMacro.splice(index, 1);
      guardarEnLocalStorage();
    }
  }

  // ===================== ACCIONES MICRO (SEMANAS Y CLASES) =====================

  function agregarSemanaMicro() {
    const numSem = plan.value.semanasMicro.length + 1;
    const numClases = plan.value.contextoEscolar.clasesPorSemana || 2;
    const nuevasClases: SesionClaseMicro[] = [];

    const diasSugeridos = ['Lunes', 'Miércoles', 'Martes', 'Jueves', 'Viernes'];

    for (let c = 1; c <= numClases; c++) {
      nuevasClases.push({
        id: `sem-${numSem}-c${c}-${Date.now()}`,
        numeroClase: c,
        diaSemana: diasSugeridos[(c - 1) % diasSugeridos.length] ?? 'Lunes',
        fecha: '',
        horasAcademicas: 2,
        contenidoSesion: '',
        inicio: 'Exploración de saberes previos y motivación dialogada.',
        desarrollo: 'Construcción social del conocimiento y actividades prácticas guiadas.',
        cierre: 'Sistematización de aprendizajes y conclusiones en plenaria.',
        recursos: ['Colección Bicentenario', 'Pizarra acrílica / Marcadores'],
        recursosDetalle: ''
      });
    }

    const macroIndex = Math.min(plan.value.semanasMicro.length, plan.value.contenidosMacro.length - 1);
    const referenteSugerido = macroIndex >= 0 ? plan.value.contenidosMacro[macroIndex]?.referenteTeoricoCientifico || '' : '';

    plan.value.semanasMicro.push({
      id: `sem-${Date.now()}`,
      numeroSemana: numSem,
      rangoFechas: `Semana ${numSem}`,
      gradoAnio: plan.value.contextoEscolar.gradoAnio || '',
      seccion: plan.value.contextoEscolar.seccion || '',
      areaFormacion: plan.value.contextoEscolar.areaFormacion || '',
      referenteTeorico: referenteSugerido,
      competencia: plan.value.articulacion?.competencia || '',
      temaGenerador: plan.value.articulacion?.temaGenerador || '',
      tejidoTematico: plan.value.articulacion?.tejidoTematico || '',
      clases: nuevasClases
    });

    guardarEnLocalStorage();
  }

  function sincronizarCurriculoSemana(semanaIndex: number) {
    const semana = plan.value.semanasMicro[semanaIndex];
    if (!semana) return;
    semana.gradoAnio = plan.value.contextoEscolar.gradoAnio || semana.gradoAnio || '';
    semana.seccion = plan.value.contextoEscolar.seccion || semana.seccion || '';
    semana.areaFormacion = plan.value.contextoEscolar.areaFormacion || semana.areaFormacion || '';
    if (!semana.competencia && plan.value.articulacion?.competencia) {
      semana.competencia = plan.value.articulacion.competencia;
    }
    if (!semana.temaGenerador && plan.value.articulacion?.temaGenerador) {
      semana.temaGenerador = plan.value.articulacion.temaGenerador;
    }
    if (!semana.tejidoTematico && plan.value.articulacion?.tejidoTematico) {
      semana.tejidoTematico = plan.value.articulacion.tejidoTematico;
    }
    const macroIndex = Math.min(semanaIndex, plan.value.contenidosMacro.length - 1);
    if (macroIndex >= 0 && !semana.referenteTeorico && plan.value.contenidosMacro[macroIndex]?.referenteTeoricoCientifico) {
      semana.referenteTeorico = plan.value.contenidosMacro[macroIndex].referenteTeoricoCientifico;
    }
    guardarEnLocalStorage();
  }

  function eliminarSemanaMicro(index: number) {
    if (plan.value.semanasMicro.length > 1) {
      plan.value.semanasMicro.splice(index, 1);
      // Renumerar
      plan.value.semanasMicro.forEach((s, idx) => {
        s.numeroSemana = idx + 1;
      });
      guardarEnLocalStorage();
    }
  }

  function agregarClaseASemana(semanaIndex: number) {
    const semana = plan.value.semanasMicro[semanaIndex];
    if (!semana) return;
    const numClase = semana.clases.length + 1;
    semana.clases.push({
      id: `c-${Date.now()}`,
      numeroClase: numClase,
      diaSemana: 'Lunes',
      fecha: '',
      horasAcademicas: 2,
      contenidoSesion: '',
      inicio: '',
      desarrollo: '',
      cierre: '',
      recursos: ['Pizarra acrílica / Marcadores'],
      recursosDetalle: ''
    });
    guardarEnLocalStorage();
  }

  function eliminarClaseDeSemana(semanaIndex: number, claseIndex: number) {
    const semana = plan.value.semanasMicro[semanaIndex];
    if (semana && semana.clases.length > 1) {
      semana.clases.splice(claseIndex, 1);
      semana.clases.forEach((c, idx) => {
        c.numeroClase = idx + 1;
      });
      guardarEnLocalStorage();
    }
  }

  function duplicarClase(semanaIndex: number, claseIndex: number) {
    const semana = plan.value.semanasMicro[semanaIndex];
    if (!semana) return;
    const original = semana.clases[claseIndex];
    const clon: SesionClaseMicro = JSON.parse(JSON.stringify(original));
    clon.id = `c-${Date.now()}`;
    clon.numeroClase = semana.clases.length + 1;
    clon.contenidoSesion = `${clon.contenidoSesion} (Continuación)`;
    semana.clases.push(clon);
    guardarEnLocalStorage();
  }

  // Generador masivo rápido: genera N semanas completas según las clases semanales del profesor
  function autogenerarEstructuraSemanas(totalSemanas: number, clasesPorSem: number) {
    plan.value.contextoEscolar.clasesPorSemana = clasesPorSem;
    plan.value.diagnostico.duracionSemanas = totalSemanas;
    const resultado: SemanaDidactica[] = [];
    const dias = ['Lunes', 'Miércoles', 'Martes', 'Jueves', 'Viernes'];

    for (let s = 1; s <= totalSemanas; s++) {
      const clases: SesionClaseMicro[] = [];
      for (let c = 1; c <= clasesPorSem; c++) {
        clases.push({
          id: `sem-${s}-c${c}-${Date.now()}`,
          numeroClase: c,
          diaSemana: dias[(c - 1) % dias.length] ?? 'Lunes',
          fecha: '',
          horasAcademicas: 2,
          contenidoSesion: '',
          inicio: 'Activación de saberes previos y exploración diagnóstica.',
          desarrollo: 'Desarrollo conceptual, problematización y actividades prácticas.',
          cierre: 'Sistematización grupal, aclaratoria de dudas y registro.',
          recursos: ['Libros de la Colección Bicentenario', 'Pizarra acrílica / Marcadores'],
          recursosDetalle: ''
        });
      }
      resultado.push({
        id: `sem-${s}-${Date.now()}`,
        numeroSemana: s,
        rangoFechas: `Semana ${s}`,
        clases
      });
    }

    plan.value.semanasMicro = resultado;
    guardarEnLocalStorage();
  }

  // ===================== ACCIONES DE EVALUACIÓN =====================

  function agregarEvaluacion() {
    plan.value.planEvaluacion.push({
      id: `eva-${Date.now()}`,
      tema: `Tema ${plan.value.planEvaluacion.length + 1}`,
      referenteTeorico: '',
      estrategiaEvaluacion: 'Análisis de producción escrita (taller / informe)',
      tecnicaEvaluacion: 'Análisis de producción escrita (informes, ensayos, resúmenes)',
      instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 20,
      puntaje: 4,
      fechaEstimada: '',
      criteriosIndicadores: ''
    });
    guardarEnLocalStorage();
  }

  function eliminarEvaluacion(index: number) {
    if (plan.value.planEvaluacion.length > 1) {
      plan.value.planEvaluacion.splice(index, 1);
      guardarEnLocalStorage();
    }
  }

  function autoAjustarPuntajes() {
    plan.value.planEvaluacion.forEach((act) => {
      const porcentaje = Number(act.ponderacionPorcentaje) || 0;
      act.puntaje = Number(((porcentaje * 20) / 100).toFixed(1));
    });
    guardarEnLocalStorage();
  }

  // ===================== GESTIÓN DE CORRECCIONES PEDAGÓGICAS =====================

  function agregarCorreccion(observacion: string, origen: string = 'Coordinación Pedagógica') {
    const nueva: CorreccionCoordinacion = {
      id: `cor-${Date.now()}`,
      fecha: new Date().toISOString().substring(0, 10),
      origen,
      observacion,
      estado: 'pendiente'
    };
    plan.value.correcciones.unshift(nueva);
    guardarEnLocalStorage();
  }

  function marcarCorreccionResuelta(id: string, ajustes: string = '') {
    const cor = plan.value.correcciones.find(c => c.id === id);
    if (cor) {
      cor.estado = 'corregido';
      cor.ajustesRealizados = ajustes || 'Ajustes implementados según directriz pedagógica.';
      guardarEnLocalStorage();
    }
  }

  function eliminarCorreccion(id: string) {
    plan.value.correcciones = plan.value.correcciones.filter(c => c.id !== id);
    guardarEnLocalStorage();
  }

  function crearVersionCorregida() {
    // Incrementa versión y crea un nuevo borrador conservando el anterior intacto
    const versionAnterior = plan.value.version || 1;
    const nuevaVersion = versionAnterior + 1;

    // Guardar versión anterior primero
    guardarBorrador();

    // Crear clon con nueva versión
    const clon: PlanificacionDocente = JSON.parse(JSON.stringify(plan.value));
    clon.id = `plan-${Date.now()}`;
    clon.version = nuevaVersion;
    clon.diagnostico.tituloProyectoTema = `${clon.diagnostico.tituloProyectoTema.replace(/ \(v\d+.*\)/, '')} (v${nuevaVersion} - Corregido)`;
    clon.createdAt = new Date().toISOString();
    clon.updatedAt = new Date().toISOString();

    plan.value = clon;
    borradores.value.unshift(JSON.parse(JSON.stringify(clon)));
    guardarEnLocalStorage();
    guardarBorradoresEnLocalStorage();
  }

  // ===================== BORRADORES Y PERSISTENCIA =====================

  function inicializarNuevoPlan(subsistema: SubsistemaEducativo = 'media_general') {
    plan.value = crearPlanVacio(subsistema);
    guardarEnLocalStorage();
  }

  function cargarPlantilla(tipo: 'media_general' | 'primaria') {
    plan.value = JSON.parse(JSON.stringify(tipo === 'media_general' ? PLANTILLA_MEDIA_GENERAL : PLANTILLA_PRIMARIA));
    plan.value.id = `plan-${Date.now()}`;
    plan.value.createdAt = new Date().toISOString();
    plan.value.updatedAt = new Date().toISOString();
    guardarEnLocalStorage();
  }

  async function guardarBorrador() {
    plan.value.updatedAt = new Date().toISOString();
    if (!plan.value.firmas.docenteAula && plan.value.docente.nombreCompleto) {
      plan.value.firmas.docenteAula = plan.value.docente.nombreCompleto;
    }
    const index = borradores.value.findIndex(b => b.id === plan.value.id);
    if (index >= 0) {
      borradores.value[index] = JSON.parse(JSON.stringify(plan.value));
    } else {
      borradores.value.unshift(JSON.parse(JSON.stringify(plan.value)));
    }
    guardarEnLocalStorage();
    guardarBorradoresEnLocalStorage();
    // Persistir en Dexie IndexedDB
    try {
      await dbGuardarPlan(plan.value);
    } catch (e) {
      console.warn('Error al guardar en Dexie:', e);
    }
  }

  function cargarBorrador(id: string) {
    const encontrado = borradores.value.find(b => b.id === id);
    if (encontrado) {
      plan.value = JSON.parse(JSON.stringify(encontrado));
      guardarEnLocalStorage();
    }
  }

  async function eliminarBorrador(id: string) {
    borradores.value = borradores.value.filter(b => b.id !== id);
    guardarBorradoresEnLocalStorage();
    try {
      await dbEliminarPlan(id);
    } catch (e) {
      console.warn('Error al eliminar de Dexie:', e);
    }
  }

  async function sincronizarConDexie() {
    try {
      const desdeDB = await dbObtenerTodos();
      if (desdeDB && desdeDB.length > 0) {
        borradores.value = desdeDB;
        guardarBorradoresEnLocalStorage();
      } else {
        // Inicializar Dexie con los borradores por defecto
        for (const b of borradores.value) {
          await dbGuardarPlan(b);
        }
      }
    } catch (e) {
      console.warn('No se pudo sincronizar con Dexie:', e);
    }
  }

  function guardarEnLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVO, JSON.stringify(plan.value));
    } catch (e) {
      console.warn('Error localStorage', e);
    }
  }

  function guardarBorradoresEnLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_BORRADORES, JSON.stringify(borradores.value));
    } catch (e) {
      console.warn('Error localStorage borradores', e);
    }
  }

  function guardarConfigPDF() {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(opcionesPDF.value));
    } catch (e) {
      console.warn('Error localStorage config PDF', e);
    }
  }

  function cargarPlanInicial(): PlanificacionDocente {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY_ACTIVO);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (parsed.contenidosMacro && parsed.semanasMicro) return parsed;
      }
    } catch (e) { /* fallback */ }
    return JSON.parse(JSON.stringify(PLANTILLA_MEDIA_GENERAL));
  }

  function cargarBorradoresIniciales(): PlanificacionDocente[] {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY_BORRADORES);
      if (guardados) return JSON.parse(guardados);
    } catch (e) { /* fallback */ }
    return [
      JSON.parse(JSON.stringify(PLANTILLA_MEDIA_GENERAL)),
      JSON.parse(JSON.stringify(PLANTILLA_PRIMARIA))
    ];
  }

  function cargarOpcionesPDF(): OpcionesExportacionPDF {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (guardado) return JSON.parse(guardado);
    } catch (e) { /* fallback */ }
    return {
      formato: 'legal',
      orientacion: 'portrait',
      incluirFirmas: true,
      tamanoFuente: 'pequena',
      vistaExportar: 'completo'
    };
  }

  return {
    plan,
    borradores,
    opcionesPDF,
    totalPonderacion,
    totalPuntaje,
    totalClasesPlanificadas,
    esPonderacionValida,
    esPuntajeValido,
    correccionesPendientes,
    progresoGeneral,
    // Macro
    agregarContenidoMacro,
    eliminarContenidoMacro,
    // Micro
    agregarSemanaMicro,
    eliminarSemanaMicro,
    agregarClaseASemana,
    eliminarClaseDeSemana,
    duplicarClase,
    sincronizarCurriculoSemana,
    autogenerarEstructuraSemanas,
    // Evaluacion
    agregarEvaluacion,
    eliminarEvaluacion,
    autoAjustarPuntajes,
    // Correcciones
    agregarCorreccion,
    marcarCorreccionResuelta,
    eliminarCorreccion,
    crearVersionCorregida,
    // Generales
    inicializarNuevoPlan,
    cargarPlantilla,
    guardarBorrador,
    cargarBorrador,
    eliminarBorrador,
    sincronizarConDexie,
    guardarEnLocalStorage,
    guardarConfigPDF
  };
});
