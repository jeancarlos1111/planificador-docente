import type { PlanificacionDocente } from '../types/planificacion';

export const PLANTILLA_MEDIA_GENERAL: PlanificacionDocente = {
  id: 'ejemplo-media-general-01',
  version: 1,
  estado: 'corregida',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tipoPlan: 'lapso_macro',
  subsistema: 'media_general',
  membrete: {
    republica: 'REPÚBLICA BOLIVARIANA DE VENEZUELA',
    ministerio: 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN',
    cdceZonaEducativa: 'CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA ESTADAL (CDCE)',
    nombrePlantel: 'LICEO NACIONAL BOLIVARIANO "GRAN MARISCAL DE AYACUCHO"',
    codigoDEA: 'OD03450102',
    codigoDependencia: '007932145',
    estadoMunicipio: 'MUNICIPIO LIBERTADOR, DISTRITO CAPITAL'
  },
  docente: {
    nombreCompleto: 'Prof. Carlos Eduardo Mendoza Silva',
    cedula: 'V-18.452.981',
    correo: 'carlos.mendoza.docente@educacion.gob.ve',
    telefono: '0414-1234567'
  },
  contextoEscolar: {
    anioEscolar: '2025 - 2026',
    momentoPedagogico: 'I Momento',
    gradoAnio: '3er Año',
    seccion: 'A',
    turno: 'Mañana',
    areaFormacion: 'Ciencias Naturales (Biología)',
    peicNombre: 'La escuela como epicentro de desarrollo científico, productivo y preservación ambiental',
    peicProposito: 'Consolidar espacios ecológicos y productivos mediante la investigación escolar y el trabajo liberador con la comunidad educativa.',
    clasesPorSemana: 2
  },
  diagnostico: {
    diagnosticoAula: 'Grupo conformado por 32 estudiantes (18 hembras, 14 varones). Muestran alto interés por el trabajo colaborativo, actividades experimentales de laboratorio y manejo de herramientas tecnológicas. Se requiere reforzar técnicas de síntesis de lectura científica y el seguimiento ordenado de registros de campo.',
    tituloProyectoTema: 'La Célula como Unidad Funcional y el Impacto de la Biodiversidad en la Salud Integral',
    fechaInicio: '2025-10-06',
    fechaCulminacion: '2025-11-28',
    duracionSemanas: 8,
    totalHorasSemanales: 4
  },
  articulacion: {
    ejesIntegradores: [
      'Ambiente y Salud Integral',
      'Tecnología de la Información y Comunicación (TIC)',
      'Trabajo Liberador'
    ],
    intencionalidades: [
      'Aprender a Crear',
      'Aprender a Reflexionar',
      'Aprender a Convivir y Participar'
    ],
    temaIndispensable: 'Preservación de la vida en el planeta, salud y buen vivir',
    temaGenerador: 'El agua y los componentes celulares: bases biomoleculares para el equilibrio ecosistémico',
    tejidoTematico: 'Estructura celular procariota y eucariota. Microscopía básica. La importancia de la hidratación y hábitos de vida saludable.'
  },
  contenidosMacro: [
    {
      id: 'macro-1',
      tema: 'Tema 1: La Teoría Celular y los Organelos Citoplasmáticos',
      referenteTeoricoCientifico: 'Postulados de Schleiden, Schwann y Virchow. Ultraestructura celular: membrana, núcleo, mitocondria y ribosomas.',
      prerrequisitosDiagnostico: 'Niveles de organización biológica (átomo, molécula, célula) y noción básica de ser vivo.',
      loQueSeAspiraQueAprendan: 'Comprender que la célula es la unidad vital, estructural y funcional de los seres vivos, identificando sus organelos y funciones vitales.',
      fechaInicio: '2025-10-06',
      fechaFin: '2025-10-24',
      semanasEstimadas: 3,
      clasesAsignadas: 6
    },
    {
      id: 'macro-2',
      tema: 'Tema 2: Transporte a Través de la Membrana y Ósmosis',
      referenteTeoricoCientifico: 'Mecanismos biofísicos de transporte pasivo (difusión simple, facilitada) y activo. Equilibrio osmótico y turgencia celular.',
      prerrequisitosDiagnostico: 'Concepto de soluciones, soluto, solvente y concentración química elemental.',
      loQueSeAspiraQueAprendan: 'Explicar cómo la membrana regula el paso de sustancias y relacionar los procesos osmóticos con la hidratación del cuerpo humano.',
      fechaInicio: '2025-10-27',
      fechaFin: '2025-11-14',
      semanasEstimadas: 3,
      clasesAsignadas: 6
    },
    {
      id: 'macro-3',
      tema: 'Tema 3: Metabolismo Celular y Respiración Aeróbica',
      referenteTeoricoCientifico: 'Bioenergética celular: ATP, glucólisis y respiración mitocondrial como fuentes de energía biológica.',
      prerrequisitosDiagnostico: 'Diferenciación entre organismos autótrofos y heterótrofos, fotosíntesis básica.',
      loQueSeAspiraQueAprendan: 'Valorar la nutrición adecuada como base molecular de la energía vital para el desempeño escolar y deportivo.',
      fechaInicio: '2025-11-17',
      fechaFin: '2025-11-28',
      semanasEstimadas: 2,
      clasesAsignadas: 4
    }
  ],
  semanasMicro: [
    {
      id: 'sem-1',
      numeroSemana: 1,
      rangoFechas: '06/10/2025 al 10/10/2025',
      clases: [
        {
          id: 'sem-1-c1',
          numeroClase: 1,
          diaSemana: 'Lunes',
          fecha: '2025-10-06',
          horasAcademicas: 2,
          contenidoSesion: 'Historia de la microscopía y formulación de la teoría celular',
          inicio: 'Dinámica de exploración: "¿Cómo sabemos que estamos hechos de células si no las vemos a simple vista?" Lluvia de ideas guiada y motivación mediante la historia de Robert Hooke y Leeuwenhoek.',
          desarrollo: 'Lectura comentada de la Colección Bicentenario (Capítulo: El microcosmos de la vida). Explicación interactiva con apoyo de imágenes aumentadas. Análisis conjunto de los 3 postulados de la teoría celular.',
          cierre: 'Sistematización en el pizarrón mediante cuadro sinóptico de los postulados. Verificación de dudas y asignación de lectura diagnóstica para la siguiente sesión.',
          recursos: ['Libros de la Colección Bicentenario', 'Pizarra acrílica / Marcadores', 'Láminas ilustrativas'],
          recursosDetalle: 'Láminas impresas con esquemas de células vegetales y microscopio antiguo.'
        },
        {
          id: 'sem-1-c2',
          numeroClase: 2,
          diaSemana: 'Miércoles',
          fecha: '2025-10-08',
          horasAcademicas: 2,
          contenidoSesion: 'Práctica guiada: Partes y manejo adecuado del microscopio óptico',
          inicio: 'Activación de saberes de la clase anterior. Presentación del equipo óptico y normas indispensables de bioseguridad en el laboratorio escolar.',
          desarrollo: 'Demostración paso a paso del enfoque micrométrico y micrométrico. Práctica por mesas de trabajo: observación de letras impresas de periódicos para constatar inversión óptica.',
          cierre: 'Puesta en común de hallazgos. Registro individual de conclusiones en el cuaderno pedagógico y orientaciones para la práctica con muestras biológicas.',
          recursos: ['Laboratorio de Ciencias / Computación', 'Cuaderno del estudiante y guías pedagógicas'],
          recursosDetalle: 'Microscopios escolares, papel de periódico, portaobjetos y goteros con agua destilada.'
        }
      ]
    },
    {
      id: 'sem-2',
      numeroSemana: 2,
      rangoFechas: '13/10/2025 al 17/10/2025',
      clases: [
        {
          id: 'sem-2-c1',
          numeroClase: 1,
          diaSemana: 'Lunes',
          fecha: '2025-10-13',
          horasAcademicas: 2,
          contenidoSesion: 'Célula procariota vs Célula eucariota: modelos y diferencias funcionales',
          inicio: 'Pregunta problematizadora: "¿Una bacteria tiene el mismo tipo de núcleo que nuestras células musculares?" Registro de hipótesis estudiantiles.',
          desarrollo: 'Construcción conceptual de las diferencias anatómicas: presencia de membrana nuclear, ADN circular vs lineal, y presencia de organelos membranosos.',
          cierre: 'Elaboración individual en el cuaderno de una tabla comparativa procariota vs eucariota. Retroalimentación grupal.',
          recursos: ['Pizarra acrílica / Marcadores', 'Colección Bicentenario'],
          recursosDetalle: 'Modelos didácticos tridimensionales de bacterias y protozoarios.'
        },
        {
          id: 'sem-2-c2',
          numeroClase: 2,
          diaSemana: 'Miércoles',
          fecha: '2025-10-15',
          horasAcademicas: 2,
          contenidoSesion: 'Laboratorio: Observación de células de catáfilo de cebolla y mucosa bucal',
          inicio: 'Revisión del pre-laboratorio y preparación del área de trabajo con normas de asepsia.',
          desarrollo: 'Tinción con azul de metileno y lugol. Enfoque a 10x y 40x. Esquematización ordenada de pared celular, membrana, citoplasma y núcleo evidente.',
          cierre: 'Discusión guiada sobre las diferencias observadas entre el tejido vegetal (cebolla) y el tejido animal (mucosa). Firma de registros de observación.',
          recursos: ['Laboratorio de Ciencias / Computación', 'Material de provecho / reactivos'],
          recursosDetalle: 'Azul de metileno, cebollas frescas, hisopos estériles y cubreobjetos.'
        }
      ]
    }
  ],
  planEvaluacion: [
    {
      id: 'eva-1',
      tema: 'Tema 1: Teoría Celular y Manejo del Microscopio',
      referenteTeorico: 'Óptica de aumento, ultraestructura celular y normas de bioseguridad en el laboratorio.',
      estrategiaEvaluacion: 'Práctica de laboratorio con informe técnico experimental grupal',
      tecnicaEvaluacion: 'Demostración práctica / Práctica de laboratorio',
      instrumentoEvaluacion: 'Rúbrica analítica por criterios',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 25,
      puntaje: 5,
      fechaEstimada: '2025-10-20',
      criteriosIndicadores: 'Manejo técnico del microscopio, destreza en la preparación de muestras, orden en la mesa de laboratorio y conclusiones fundamentadas.'
    },
    {
      id: 'eva-2',
      tema: 'Tema 2: Mecanismos de Osmosis y Transporte Celular',
      referenteTeorico: 'Permeabilidad diferencial de la membrana plasmática, soluciones hipotónicas, hipertónicas e isotónicas.',
      estrategiaEvaluacion: 'Experimento casero de ósmosis en rodajas de papa y reporte analítico',
      tecnicaEvaluacion: 'Análisis de producción escrita (informes, ensayos, resúmenes)',
      instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 25,
      puntaje: 5,
      fechaEstimada: '2025-11-03',
      criteriosIndicadores: 'Presentación de hipótesis, tabulación de datos de masa y volumen, explicación científica del cambio osmótico.'
    },
    {
      id: 'eva-3',
      tema: 'Tema 1 y 2: Modelos Tridimensionales de Organelos Celulares',
      referenteTeorico: 'Morfología y función de mitocondrias, cloroplastos, retículo endoplasmático y aparato de Golgi.',
      estrategiaEvaluacion: 'Exposición y defensa de maqueta didáctica elaborada con material de reciclaje',
      tecnicaEvaluacion: 'Producción plástica / Mapa conceptual / Infografía',
      instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
      formaParticipacion: 'Coevaluación',
      ponderacionPorcentaje: 30,
      puntaje: 6,
      fechaEstimada: '2025-11-17',
      criteriosIndicadores: 'Uso de material reciclable, fidelidad anatómica de organelos, dominio conceptual durante la defensa y trabajo en equipo.'
    },
    {
      id: 'eva-4',
      tema: 'Integral: Desempeño Actitudinal, Hábitos y Ética Científica',
      referenteTeorico: 'Responsabilidad ciudadana, cuidado del material común y hábitos de vida saludable.',
      estrategiaEvaluacion: 'Registro de seguimiento formativo y autoevaluación reflexiva',
      tecnicaEvaluacion: 'Observación sistemática y participativa',
      instrumentoEvaluacion: 'Lista de cotejo',
      formaParticipacion: 'Autoevaluación',
      ponderacionPorcentaje: 20,
      puntaje: 4,
      fechaEstimada: '2025-11-26',
      criteriosIndicadores: 'Puntualidad en entregas, respeto a los acuerdos de convivencia en el aula, honestidad en los informes y participación proactiva.'
    }
  ],
  planAccion: {
    titulo: 'Proyecto Corto: "Guardianes Celulares del Agua y la Salud Escolar"',
    justificacion: 'Fomentar en las y los estudiantes de 3er año hábitos de hidratación correcta y conservación del agua en el plantel, aplicando los conocimientos celulares de homeostasis.',
    objetivoAccion: 'Diseñar e instalar puntos de información y filtros higiénicos en los pasillos del liceo durante el primer momento pedagógico.',
    meta: 'Alcanzar el 100% de las secciones de educación media informadas sobre la importancia de la hidratación celular y el cuidado del agua.',
    acciones: [
      {
        id: 'acc-1',
        tarea: 'Taller de carteleras informativas sobre ósmosis e hidratación',
        responsables: 'Estudiantes de 3er Año A y Docente de Biología',
        tiempo: 'Semana 3 (Octubre)',
        recursos: 'Cartulinas, marcadores, material reciclable'
      },
      {
        id: 'acc-2',
        tarea: 'Jornada de limpieza y adecuación del bebedero escolar',
        responsables: 'Comité de Ambiente del PEIC y Estudiantes',
        tiempo: 'Semana 6 (Noviembre)',
        recursos: 'Herramientas de limpieza, filtros donados por la comunidad'
      }
    ]
  },
  correcciones: [
    {
      id: 'cor-1',
      fecha: '2025-10-02',
      origen: 'Coordinación Pedagógica',
      observacion: 'Especificar la fecha de finalización exacta del Tema 1 y cambiar el instrumento de la actividad 1 a Rúbrica analítica por criterios.',
      estado: 'corregido',
      ajustesRealizados: 'Se delimitó el Tema 1 del 06/10/25 al 24/10/25 y se asignó rúbrica analítica detallada con 4 criterios de logro.'
    }
  ],
  observacionesGenerales: 'Planificación articulada con el Proyecto de Manos a la Siembra y el Comité de Salud Integral del plantel.',
  firmas: {
    docenteAula: 'Prof. Carlos Mendoza Silva',
    coordinacionPedagogica: 'Prof. Elena Rangel',
    direccionPlantel: 'Msc. Roberto Gómez'
  }
};

export const PLANTILLA_PRIMARIA: PlanificacionDocente = {
  id: 'ejemplo-primaria-01',
  version: 1,
  estado: 'borrador',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tipoPlan: 'lapso_macro',
  subsistema: 'primaria',
  membrete: {
    republica: 'REPÚBLICA BOLIVARIANA DE VENEZUELA',
    ministerio: 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN',
    cdceZonaEducativa: 'CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA (CDCE)',
    nombrePlantel: 'ESCUELA BÁSICA NACIONAL BOLIVARIANA "SIMÓN RODRÍGUEZ"',
    codigoDEA: 'OD09230211',
    codigoDependencia: '006123456',
    estadoMunicipio: 'VALENCIA, ESTADO CARABOBO'
  },
  docente: {
    nombreCompleto: 'Lcda. María Gabriela Parra',
    cedula: 'V-15.689.412',
    correo: 'mgabrielaparra@educacion.gob.ve',
    telefono: '0424-9876543'
  },
  contextoEscolar: {
    anioEscolar: '2025 - 2026',
    momentoPedagogico: 'I Momento',
    gradoAnio: '4to Grado',
    seccion: 'B',
    turno: 'Integral / Completo',
    areaFormacion: 'Lengua, Matemática y Ciencias Naturales (Integral)',
    peicNombre: 'El conuco escolar como herramienta integradora de saberes y seguridad agroalimentaria',
    peicProposito: 'Fomentar la cultura productiva y el cuidado del ambiente a través de la siembra y el rescate de áreas verdes del plantel.',
    clasesPorSemana: 5
  },
  diagnostico: {
    diagnosticoAula: 'Matrícula de 28 niños y niñas (15 niñas, 13 niños). Grupo dinámico con buena expresión verbal e imaginación. Se observa la necesidad de fortalecer la ortografía, la comprensión lectora de textos descriptivos y el razonamiento lógico-matemático en resolución de problemas cotidianos.',
    tituloProyectoTema: 'P.A.: "Manos a la Siembra y al Papel: Cuidemos la Naturaleza con Saberes y Palabras"',
    fechaInicio: '2025-10-13',
    fechaCulminacion: '2025-11-28',
    duracionSemanas: 7,
    totalHorasSemanales: 25
  },
  articulacion: {
    ejesIntegradores: [
      'Ambiente y Salud Integral',
      'Trabajo Liberador',
      'Soberanía y Defensa de la Nación'
    ],
    intencionalidades: [
      'Aprender a Crear',
      'Aprender a Convivir y Participar',
      'Aprender a Valorar'
    ],
    temaIndispensable: 'Seguridad y soberanía alimentaria',
    temaGenerador: 'El huerto escolar y la redacción creativa comunitaria',
    tejidoTematico: 'Las plantas y sus partes. Textos instructivos y narrativos. Operaciones matemáticas en el huerto.'
  },
  contenidosMacro: [
    {
      id: 'pri-macro-1',
      tema: 'Contenido 1: El Texto Instructivo y la Ficha Botánica',
      referenteTeoricoCientifico: 'Estructura textual instructiva: orden cronológico, verbos en infinitivo/imperativo. Botánica elemental escolar.',
      prerrequisitosDiagnostico: 'Reconocimiento de oraciones simples y noción de secuencias temporales (primero, luego, finalmente).',
      loQueSeAspiraQueAprendan: 'Redactar instrucciones claras paso a paso para la siembra de semillas y elaborar fichas informativas con ortografía adecuada.',
      fechaInicio: '2025-10-13',
      fechaFin: '2025-10-31',
      semanasEstimadas: 3,
      clasesAsignadas: 15
    },
    {
      id: 'pri-macro-2',
      tema: 'Contenido 2: Medidas de Longitud y Operaciones Básicas en el Huerto',
      referenteTeoricoCientifico: 'Unidades de medida métricas (centímetro, metro). Suma y multiplicación con números naturales aplicadas a distancias de siembra.',
      prerrequisitosDiagnostico: 'Manejo de sumas y restas con números de hasta tres cifras y uso de la regla graduada.',
      loQueSeAspiraQueAprendan: 'Resolver situaciones problemáticas cotidianas calculando áreas de surcos, distancias entre plantas y conteo de cosechas.',
      fechaInicio: '2025-11-03',
      fechaFin: '2025-11-28',
      semanasEstimadas: 4,
      clasesAsignadas: 20
    }
  ],
  semanasMicro: [
    {
      id: 'pri-sem-1',
      numeroSemana: 1,
      rangoFechas: '13/10/2025 al 17/10/2025',
      clases: [
        {
          id: 'pri-c1',
          numeroClase: 1,
          diaSemana: 'Lunes',
          fecha: '2025-10-13',
          horasAcademicas: 4,
          contenidoSesion: 'Introducción al Proyecto de Aprendizaje: La semilla viajera',
          inicio: 'Lectura compartida del cuento "La semilla que quería volar" de la revista Tricolor. Conversación guiada sobre qué necesita una semilla para germinar.',
          desarrollo: 'Recorrido exploratorio por el patio del colegio recolectando diferentes tipos de semillas (caraotas, maíz, lechosa). Clasificación en mesas según tamaño y color.',
          cierre: 'Elaboración en el cuaderno de un dibujo explicativo con las fases de germinación. Canto escolar campesino.',
          recursos: ['Libros de la Colección Bicentenario', 'Revistas Tricolor', 'Material de provecho'],
          recursosDetalle: 'Semillas variadas, vasos transparentes y algodón para germinadores.'
        }
      ]
    }
  ],
  planEvaluacion: [
    {
      id: 'eva-pri-1',
      tema: 'Contenido 1: El Texto Instructivo y la Ficha Botánica',
      referenteTeorico: 'Propiedades del texto instructivo y partes de una planta medicinal o comestible.',
      estrategiaEvaluacion: 'Elaboración individual de un díptico instructivo de siembra y ficha técnica',
      tecnicaEvaluacion: 'Análisis de producción escrita (informes, ensayos, resúmenes)',
      instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 30,
      puntaje: 6,
      fechaEstimada: '2025-10-31',
      criteriosIndicadores: 'Coherencia en las instrucciones, uso de verbos en infinitivo, orden y presentación ilustrada.'
    },
    {
      id: 'eva-pri-2',
      tema: 'Contenido 1: Trabajo Comunitario en el Conuco Escolar',
      referenteTeorico: 'Agroecología escolar, siembra directa y cuidado sustentable del suelo.',
      estrategiaEvaluacion: 'Jornada práctica de preparación de canteros y siembra colectiva',
      tecnicaEvaluacion: 'Observación sistemática y participativa',
      instrumentoEvaluacion: 'Lista de cotejo',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 35,
      puntaje: 7,
      fechaEstimada: '2025-11-14',
      criteriosIndicadores: 'Trabajo colaborativo, seguimiento de instrucciones de siembra, cuidado responsable del agua y las herramientas.'
    },
    {
      id: 'eva-pri-3',
      tema: 'Contenido 2: Resolución de Problemas Matemáticos Aplicados al Huerto',
      referenteTeorico: 'Adición, sustracción y multiplicación con cantidades asociadas a metros y gramos.',
      estrategiaEvaluacion: 'Resolución individual de guía práctica problematizada contextualizada en la siembra',
      tecnicaEvaluacion: 'Resolución de problemas / Ejercicios prácticos',
      instrumentoEvaluacion: 'Escala de estimación (Numérica / Descriptiva)',
      formaParticipacion: 'Heteroevaluación',
      ponderacionPorcentaje: 25,
      puntaje: 5,
      fechaEstimada: '2025-11-21',
      criteriosIndicadores: 'Planteamiento lógico del problema, precisión en los algoritmos matemáticos y redacción clara de la respuesta.'
    },
    {
      id: 'eva-pri-4',
      tema: 'Integral: Socialización y Exposición del Aprendizaje Logrado',
      referenteTeorico: 'Oralidad comunicativa, respeto mutuo y valoración del trabajo de los pares.',
      estrategiaEvaluacion: 'Defensa oral en ronda y coevaluación entre estudiantes de mesa',
      tecnicaEvaluacion: 'Análisis de producción oral (debates, exposiciones, defensas)',
      instrumentoEvaluacion: 'Registro descriptivo de desempeño',
      formaParticipacion: 'Coevaluación',
      ponderacionPorcentaje: 10,
      puntaje: 2,
      fechaEstimada: '2025-11-27',
      criteriosIndicadores: 'Fluidez verbal, respeto por la palabra del compañero y reflexión sobre lo aprendido en el proyecto.'
    }
  ],
  planAccion: {
    titulo: 'Plan de Acción: "Cosechando Sabores y Saberes en Nuestra Escuela"',
    justificacion: 'Integrar a las familias en la construcción de canteros elevados para optimizar la cosecha de ají y cilantro.',
    objetivoAccion: 'Construir 3 canteros ecológicos con madera reciclada con apoyo de los representantes.',
    meta: 'Lograr la participación del 80% de los padres y madres en la jornada sabatina de siembra.',
    acciones: [
      {
        id: 'pri-acc-1',
        tarea: 'Recolección de semillas criollas y abono vegetal en los hogares',
        responsables: 'Estudiantes y familias',
        tiempo: 'Semana 2',
        recursos: 'Envases reciclados'
      },
      {
        id: 'pri-acc-2',
        tarea: 'Jornada comunitaria de siembra y riego por goteo',
        responsables: 'Docente, Directora y Comité de Padres',
        tiempo: 'Semana 4',
        recursos: 'Mangueras perforadas, botellas plásticas'
      }
    ]
  },
  correcciones: [],
  observacionesGenerales: 'Se coordinará con el comedor escolar para el aprovechamiento pedagógico de los vegetales cosechados.',
  firmas: {
    docenteAula: 'Lcda. María Gabriela Parra',
    coordinacionPedagogica: 'Prof. Yelitza Colmenares',
    direccionPlantel: 'Prof. Marcos Andrade'
  }
};
