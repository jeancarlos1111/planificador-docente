<template>
  <div
    ref="documentoImpresionRef"
    class="documento-mppe"
    :class="[
      `tamano-${opciones.formato}`,
      `orientacion-${opciones.orientacion}`,
      `fuente-${opciones.tamanoFuente}`
    ]"
  >
    <!-- CINTILLO INSTITUCIONAL OFICIAL MPPE -->
    <header class="cintillo-oficial no-split">
      <div class="cintillo-contenido">
        <div class="escudo-container">
          <svg class="escudo-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L85 20 V65 C85 90 50 115 50 115 C50 115 15 90 15 65 V20 L50 5 Z" fill="#1e3a8a" stroke="#d97706" stroke-width="3"/>
            <path d="M50 15 L78 27 V63 C78 84 50 105 50 105 C50 105 22 84 22 63 V27 L50 15 Z" fill="#ffffff"/>
            <path d="M22 35 H78 V47 H22 Z" fill="#fbbf24"/>
            <path d="M22 47 H78 V59 H22 Z" fill="#2563eb"/>
            <path d="M22 59 H78 V71 H22 Z" fill="#dc2626"/>
            <circle cx="38" cy="53" r="1.5" fill="#ffffff"/>
            <circle cx="44" cy="51" r="1.5" fill="#ffffff"/>
            <circle cx="50" cy="50.5" r="1.5" fill="#ffffff"/>
            <circle cx="56" cy="51" r="1.5" fill="#ffffff"/>
            <circle cx="62" cy="53" r="1.5" fill="#ffffff"/>
          </svg>
        </div>

        <div class="membrete-texto">
          <p class="linea-republica">{{ plan.membrete.republica || 'REPÚBLICA BOLIVARIANA DE VENEZUELA' }}</p>
          <p class="linea-ministerio">{{ plan.membrete.ministerio || 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN' }}</p>
          <p class="linea-cdce">{{ plan.membrete.cdceZonaEducativa || 'CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA (CDCE)' }}</p>
          <p class="linea-plantel">{{ plan.membrete.nombrePlantel || 'NOMBRE DE LA INSTITUCIÓN EDUCATIVA' }}</p>
          <p class="linea-codigos">
            <span><strong>CÓDIGO DEA:</strong> {{ plan.membrete.codigoDEA || 'S/N' }}</span>
            <span v-if="plan.membrete.codigoDependencia"> | <strong>DEP:</strong> {{ plan.membrete.codigoDependencia }}</span>
            <span v-if="plan.membrete.estadoMunicipio"> | {{ plan.membrete.estadoMunicipio }}</span>
          </p>
        </div>
      </div>

      <div class="titulo-planificacion">
        <h1 class="documento-titulo">
          {{ tituloDocumento }}
        </h1>
        <div class="subtitulo-datos">
          <span><strong>AÑO ESCOLAR:</strong> {{ plan.contextoEscolar.anioEscolar }}</span>
          <span><strong>MOMENTO:</strong> {{ plan.contextoEscolar.momentoPedagogico }}</span>
          <span><strong>VERSIÓN:</strong> v{{ plan.version || 1 }}</span>
          <span><strong>FECHA:</strong> {{ fechaFormateada }}</span>
        </div>
      </div>
    </header>

    <!-- BLOQUE: IDENTIFICACIÓN Y CONTEXTO PEDAGÓGICO SEGÚN FORMATO SELECCIONADO -->
    <!-- Formato Semanal Exclusivo: datos compactos del docente y período -->
    <section v-if="opciones.vistaExportar === 'semanal_micro'" class="seccion-bloque no-split">
      <table class="tabla-mppe tabla-identificacion-semanal">
        <tbody>
          <tr>
            <td class="bg-label" style="width: 15%;">Docente:</td>
            <td style="width: 38%;"><strong>{{ plan.docente.nombreCompleto || 'No especificado' }}</strong></td>
            <td class="bg-label" style="width: 15%;">C.I. / Correo:</td>
            <td style="width: 32%;">{{ plan.docente.cedula }} <span v-if="plan.docente.correo">({{ plan.docente.correo }})</span></td>
          </tr>
          <tr>
            <td class="bg-label">Año Escolar:</td>
            <td><strong>{{ plan.contextoEscolar.anioEscolar }}</strong></td>
            <td class="bg-label">Momento / Turno:</td>
            <td><strong>{{ plan.contextoEscolar.momentoPedagogico }}</strong> (Turno: {{ plan.contextoEscolar.turno }})</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Formato Completo o Plan de Lapso Macro: ficha institucional completa con PEIC -->
    <section v-else-if="opciones.vistaExportar === 'completo' || opciones.vistaExportar === 'lapso_macro'" class="seccion-bloque no-split">
      <div class="seccion-header">
        <span class="seccion-num">I.</span> DATOS DE IDENTIFICACIÓN Y CONTEXTO ESCOLAR
      </div>
      <table class="tabla-mppe">
        <tbody>
          <tr>
            <td class="bg-label" style="width: 18%;">Docente:</td>
            <td style="width: 42%;"><strong>{{ plan.docente.nombreCompleto || 'No especificado' }}</strong></td>
            <td class="bg-label" style="width: 15%;">C.I. / Correo:</td>
            <td style="width: 25%;">{{ plan.docente.cedula }} <span v-if="plan.docente.correo">({{ plan.docente.correo }})</span></td>
          </tr>
          <tr>
            <td class="bg-label">Grado / Año y Secc:</td>
            <td><strong>{{ plan.contextoEscolar.gradoAnio || 'S/E' }}</strong> - Sección "{{ plan.contextoEscolar.seccion }}" (Turno: {{ plan.contextoEscolar.turno }})</td>
            <td class="bg-label">Área Formación:</td>
            <td><strong>{{ plan.contextoEscolar.areaFormacion || 'General' }}</strong></td>
          </tr>
          <tr>
            <td class="bg-label">Tiempo / Clases:</td>
            <td>
              {{ plan.diagnostico.duracionSemanas }} Semanas • {{ plan.contextoEscolar.clasesPorSemana }} Clases semanales
              ({{ plan.diagnostico.totalHorasSemanales }} Horas Pedagógicas)
            </td>
            <td class="bg-label">Lapso de Ejecución:</td>
            <td>Desde {{ plan.diagnostico.fechaInicio || '---' }} hasta {{ plan.diagnostico.fechaCulminacion || '---' }}</td>
          </tr>
          <tr>
            <td class="bg-label">PEIC del Plantel:</td>
            <td colspan="3">
              <strong>"{{ plan.contextoEscolar.peicNombre || 'Sin especificar' }}"</strong>
              <div v-if="plan.contextoEscolar.peicProposito" class="texto-secundario">
                <em>Propósito:</em> {{ plan.contextoEscolar.peicProposito }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Formato Evaluación o Plan de Acción -->
    <section v-else class="seccion-bloque no-split">
      <table class="tabla-mppe">
        <tbody>
          <tr>
            <td class="bg-label" style="width: 16%;">Docente:</td>
            <td style="width: 40%;"><strong>{{ plan.docente.nombreCompleto || 'No especificado' }}</strong> (C.I.: {{ plan.docente.cedula }})</td>
            <td class="bg-label" style="width: 16%;">Año Escolar:</td>
            <td style="width: 28%;">{{ plan.contextoEscolar.anioEscolar }} - {{ plan.contextoEscolar.momentoPedagogico }}</td>
          </tr>
          <tr>
            <td class="bg-label">Grado y Sección:</td>
            <td><strong>{{ plan.contextoEscolar.gradoAnio || 'S/E' }}</strong> - Sección "{{ plan.contextoEscolar.seccion }}"</td>
            <td class="bg-label">Área de Formación:</td>
            <td><strong>{{ plan.contextoEscolar.areaFormacion || 'General' }}</strong></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ================= SECCIÓN 1: PLAN DE LAPSO (MACRO) ================= -->
    <section v-if="mostrarSeccion('lapso_macro')" class="seccion-bloque">
      <div class="seccion-header">
        <span class="seccion-num">{{ opciones.vistaExportar === 'lapso_macro' ? '' : 'II.' }}</span>
        FORMATO DE PLAN DE LAPSO (MACRO) - CRONOGRAMA DE CONTENIDOS Y DIMENSIONES
      </div>

      <div class="texto-diagnostico no-split">
        <div class="subtitulo-caja">Diagnóstico de Aula y Prerrequisitos Globales:</div>
        <p class="texto-justificado">{{ plan.diagnostico.diagnosticoAula || 'Sin diagnóstico registrado.' }}</p>
      </div>

      <table class="tabla-mppe tabla-macro">
        <thead>
          <tr>
            <th style="width: 24%;">Tema y Contenido</th>
            <th style="width: 26%;">Referente Teórico (Sustento Científico)</th>
            <th style="width: 25%;">Prerrequisitos / Dimensiones Previas</th>
            <th style="width: 25%;">Lo que se Aspira que Aprendan</th>
            <th style="width: 14%;">Fechas y Clases</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(macro, mIdx) in plan.contenidosMacro" :key="macro.id || mIdx" class="no-split">
            <td>
              <strong>{{ macro.tema }}</strong>
            </td>
            <td class="celda-contenido">
              {{ macro.referenteTeoricoCientifico || '---' }}
            </td>
            <td class="celda-contenido">
              {{ macro.prerrequisitosDiagnostico || '---' }}
            </td>
            <td class="celda-contenido">
              {{ macro.loQueSeAspiraQueAprendan || '---' }}
            </td>
            <td class="text-center font-sm">
              <div><strong>Inicio:</strong> {{ macro.fechaInicio || '---' }}</div>
              <div><strong>Fin:</strong> {{ macro.fechaFin || '---' }}</div>
              <div class="texto-secundario">{{ macro.clasesAsignadas }} clases ({{ macro.semanasEstimadas }} sem)</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ================= SECCIÓN 2: FORMATO DE PLANIFICACIÓN SEMANAL (MICRO) ================= -->
    <section v-if="mostrarSeccion('semanal_micro')" class="seccion-bloque">
      <div v-if="opciones.vistaExportar === 'completo'" class="seccion-header">
        <span class="seccion-num">III.</span> FORMATO DE PLANIFICACIÓN SEMANAL (MICRO-PLANIFICACIÓN)
      </div>

      <div
        v-for="(semana, sIdx) in semanasVisibles"
        :key="semana.id || sIdx"
        class="semana-bloque q-mb-md"
        :class="{ 'salto-pagina': sIdx > 0 && opciones.vistaExportar === 'semanal_micro' }"
      >
        <div class="semana-titulo-barra no-split">
          <strong>SEMANA {{ semana.numeroSemana }}</strong>: {{ semana.rangoFechas }} ({{ semana.clases.length }} Clases planificadas)
        </div>

        <!-- CUADRO CURRICULAR EXIGIDO: Grado, sección, área, referente teórico, competencia, tema generador, tejido temático -->
        <table class="tabla-mppe tabla-cuadro-curricular no-split">
          <tbody>
            <tr>
              <td class="bg-label" style="width: 14%;">Grado / Año:</td>
              <td style="width: 20%;"><strong>{{ semana.gradoAnio || plan.contextoEscolar.gradoAnio || '---' }}</strong></td>
              <td class="bg-label" style="width: 11%;">Sección:</td>
              <td style="width: 15%;"><strong>{{ semana.seccion || plan.contextoEscolar.seccion || '---' }}</strong></td>
              <td class="bg-label" style="width: 12%;">Área:</td>
              <td style="width: 28%;"><strong>{{ semana.areaFormacion || plan.contextoEscolar.areaFormacion || '---' }}</strong></td>
            </tr>
            <tr>
              <td class="bg-label">Referente Teórico:</td>
              <td colspan="5">{{ semana.referenteTeorico || obtenerReferenteSugerido(sIdx) || '---' }}</td>
            </tr>
            <tr>
              <td class="bg-label">Competencia:</td>
              <td colspan="5"><strong>{{ semana.competencia || plan.articulacion.competencia || '---' }}</strong></td>
            </tr>
            <tr>
              <td class="bg-label">Tema Generador:</td>
              <td colspan="5">{{ semana.temaGenerador || plan.articulacion.temaGenerador || '---' }}</td>
            </tr>
            <tr>
              <td class="bg-label">Tejido Temático:</td>
              <td colspan="5">{{ semana.tejidoTematico || plan.articulacion.tejidoTematico || '---' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- ABAJO DEBE ESTAR: INICIO, DESARROLLO, CIERRE Y RECURSOS A UTILIZAR -->
        <div v-for="clase in semana.clases" :key="clase.id" class="clase-tarjeta no-split q-mt-xs q-mb-sm">
          <div class="clase-header-barra">
            <span class="clase-badge">CLASE {{ clase.numeroClase }}</span>
            <span class="clase-dia"><strong>{{ clase.diaSemana }}</strong> {{ clase.fecha ? '(' + clase.fecha + ')' : '' }} - {{ clase.horasAcademicas }} Horas pedagógicas</span>
            <span v-if="clase.contenidoSesion" class="clase-contenido-titulo">— <strong>Contenido de la Sesión:</strong> {{ clase.contenidoSesion }}</span>
          </div>

          <table class="tabla-mppe tabla-momentos">
            <tbody>
              <tr>
                <td class="bg-label-momento bg-inicio" style="width: 16%;">
                  <strong>INICIO</strong>
                  <div class="texto-secundario">Saberes previos y motivación</div>
                </td>
                <td class="celda-contenido">{{ clase.inicio || 'No detallado' }}</td>
              </tr>
              <tr>
                <td class="bg-label-momento bg-desarrollo">
                  <strong>DESARROLLO</strong>
                  <div class="texto-secundario">Construcción y profundización</div>
                </td>
                <td class="celda-contenido">{{ clase.desarrollo || 'No detallado' }}</td>
              </tr>
              <tr>
                <td class="bg-label-momento bg-cierre">
                  <strong>CIERRE</strong>
                  <div class="texto-secundario">Sistematización y retroalimentación</div>
                </td>
                <td class="celda-contenido">{{ clase.cierre || 'No detallado' }}</td>
              </tr>
              <tr>
                <td class="bg-label">
                  <strong>RECURSOS A UTILIZAR</strong>
                </td>
                <td class="celda-contenido font-sm">
                  <span v-for="(rec, rIdx) in clase.recursos" :key="rIdx" class="recurso-tag">• {{ rec }} </span>
                  <span v-if="clase.recursosDetalle"> | <em>Detalle:</em> {{ clase.recursosDetalle }}</span>
                  <span v-if="(!clase.recursos || !clase.recursos.length) && !clase.recursosDetalle" class="text-grey-6">Sin especificar</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= SECCIÓN 3: PLAN DE EVALUACIÓN OFICIAL (CRONOGRAMA) ================= -->
    <section v-if="mostrarSeccion('evaluacion_cronograma')" class="seccion-bloque no-split">
      <div class="seccion-header">
        <span class="seccion-num">IV.</span> CRONOGRAMA OFICIAL DEL PLAN DE EVALUACIÓN
      </div>

      <table class="tabla-mppe table-evaluation">
        <thead>
          <tr>
            <th style="width: 4%;">N°</th>
            <th style="width: 18%;">Tema</th>
            <th style="width: 22%;">Referente Teórico (Sustento Científico)</th>
            <th style="width: 20%;">Estrategia (Actividad)</th>
            <th style="width: 16%;">Técnica e Instrumento</th>
            <th style="width: 10%;">Participación</th>
            <th style="width: 5%;">%</th>
            <th style="width: 5%;">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(act, aIdx) in plan.planEvaluacion" :key="act.id || aIdx">
            <td class="text-center font-bold">{{ aIdx + 1 }}</td>
            <td>
              <strong>{{ act.tema }}</strong>
              <div v-if="act.fechaEstimada" class="texto-secundario">
                <em>Fecha: {{ act.fechaEstimada }}</em>
              </div>
            </td>
            <td>
              {{ act.referenteTeorico || '---' }}
              <div v-if="act.criteriosIndicadores" class="texto-criterio">
                <em>Criterios:</em> {{ act.criteriosIndicadores }}
              </div>
            </td>
            <td>{{ act.estrategiaEvaluacion }}</td>
            <td>
              <div><strong>Téc:</strong> {{ act.tecnicaEvaluacion }}</div>
              <div><strong>Inst:</strong> {{ act.instrumentoEvaluacion }}</div>
            </td>
            <td class="text-center">{{ act.formaParticipacion }}</td>
            <td class="text-center font-bold">{{ act.ponderacionPorcentaje }}%</td>
            <td class="text-center font-bold">{{ act.puntaje }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="fila-totales">
            <td colspan="6" class="text-right font-bold">TOTALES GENERALES:</td>
            <td class="text-center font-bold" :class="totalPonderacion === 100 ? 'text-success' : 'text-danger'">
              {{ totalPonderacion }}%
            </td>
            <td class="text-center font-bold" :class="totalPuntaje === 20 ? 'text-success' : 'text-danger'">
              {{ totalPuntaje }} pts
            </td>
          </tr>
        </tfoot>
      </table>
    </section>

    <!-- ================= SECCIÓN 4: PLAN DE ACCIÓN (PROYECTO CORTO) ================= -->
    <section v-if="mostrarSeccion('plan_accion') && plan.planAccion.titulo" class="seccion-bloque no-split">
      <div class="seccion-header">
        <span class="seccion-num">V.</span> PLAN DE ACCIÓN PEDAGÓGICO (PROYECTO CORTO)
      </div>

      <table class="tabla-mppe">
        <tbody>
          <tr>
            <td class="bg-label" style="width: 20%;">Título del Plan de Acción:</td>
            <td colspan="3"><strong>{{ plan.planAccion.titulo }}</strong></td>
          </tr>
          <tr>
            <td class="bg-label">Objetivo y Meta:</td>
            <td colspan="3">
              <div><strong>Objetivo:</strong> {{ plan.planAccion.objetivoAccion || '---' }}</div>
              <div v-if="plan.planAccion.meta"><strong>Meta:</strong> {{ plan.planAccion.meta }}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="tabla-mppe q-mt-xs">
        <thead>
          <tr>
            <th style="width: 40%;">Tarea o Acción Específica</th>
            <th style="width: 25%;">Responsables</th>
            <th style="width: 15%;">Tiempo / Semana</th>
            <th style="width: 20%;">Recursos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acc in plan.planAccion.acciones" :key="acc.id">
            <td>{{ acc.tarea }}</td>
            <td>{{ acc.responsables }}</td>
            <td class="text-center">{{ acc.tiempo }}</td>
            <td>{{ acc.recursos }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- OBSERVACIONES -->
    <div v-if="plan.observacionesGenerales" class="observaciones-caja no-split">
      <strong>Observaciones de la Coordinación Pedagógica / Docente:</strong> {{ plan.observacionesGenerales }}
    </div>

    <!-- SECCIÓN DE FIRMAS Y SELLOS -->
    <section v-if="opciones.incluirFirmas" class="firmas-contenedor no-split">
      <div class="firmas-grid">
        <div class="firma-caja">
          <div class="linea-firma"></div>
          <div class="nombre-firmante">{{ plan.firmas.docenteAula || plan.docente.nombreCompleto || 'Docente de Aula' }}</div>
          <div class="cargo-firmante">DOCENTE DE AULA</div>
          <div class="cedula-firmante">C.I.: {{ plan.docente.cedula }}</div>
        </div>

        <div class="firma-caja">
          <div class="linea-firma"></div>
          <div class="nombre-firmante">{{ plan.firmas.coordinacionPedagogica || 'Coordinación Pedagógica' }}</div>
          <div class="cargo-firmante">COORD. PEDAGÓGICA / EVALUACIÓN</div>
          <div class="espacio-sello">[ SELLO HÚMEDO ]</div>
        </div>

        <div class="firma-caja">
          <div class="linea-firma"></div>
          <div class="nombre-firmante">{{ plan.firmas.direccionPlantel || 'Dirección del Plantel' }}</div>
          <div class="cargo-firmante">DIRECCIÓN DEL PLANTEL</div>
          <div class="espacio-sello">[ SELLO HÚMEDO ]</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PlanificacionDocente, OpcionesExportacionPDF } from '../types/planificacion';

const props = withDefaults(
  defineProps<{
    plan: PlanificacionDocente;
    opciones?: OpcionesExportacionPDF;
    semanaIndex?: number | null;
  }>(),
  {
    opciones: () => ({
      formato: 'legal',
      orientacion: 'portrait',
      incluirFirmas: true,
      tamanoFuente: 'pequena',
      vistaExportar: 'completo'
    }),
    semanaIndex: null
  }
);

const documentoImpresionRef = ref<HTMLElement | null>(null);

const semanasVisibles = computed(() => {
  if (props.semanaIndex !== undefined && props.semanaIndex !== null && props.semanaIndex >= 0) {
    const sel = props.plan.semanasMicro[props.semanaIndex];
    return sel ? [sel] : props.plan.semanasMicro;
  }
  return props.plan.semanasMicro;
});

function obtenerReferenteSugerido(sIdx: number): string {
  const macro = props.plan.contenidosMacro[Math.min(sIdx, props.plan.contenidosMacro.length - 1)];
  return macro?.referenteTeoricoCientifico || '';
}

const totalPonderacion = computed(() => {
  return props.plan.planEvaluacion.reduce((acum, act) => acum + (Number(act.ponderacionPorcentaje) || 0), 0);
});

const totalPuntaje = computed(() => {
  return props.plan.planEvaluacion.reduce((acum, act) => acum + (Number(act.puntaje) || 0), 0);
});

function mostrarSeccion(tipo: string): boolean {
  if (props.opciones.vistaExportar === 'completo') return true;
  return props.opciones.vistaExportar === tipo;
}

const tituloDocumento = computed(() => {
  if (props.opciones.vistaExportar === 'semanal_micro') {
    return 'FORMATO OFICIAL DE PLANIFICACIÓN SEMANAL (MICRO-PLANIFICACIÓN)';
  } else if (props.opciones.vistaExportar === 'lapso_macro') {
    return 'FORMATO OFICIAL DE PLAN DE LAPSO (MACRO-PLANIFICACIÓN)';
  } else if (props.opciones.vistaExportar === 'evaluacion_cronograma') {
    return 'FORMATO OFICIAL DEL PLAN Y CRONOGRAMA DE EVALUACIÓN (MPPE)';
  } else if (props.opciones.vistaExportar === 'plan_accion') {
    return 'FORMATO OFICIAL DE PLAN DE ACCIÓN PEDAGÓGICO (PROYECTO CORTO)';
  }
  return 'PLANIFICACIÓN CURRICULAR DOCENTE INTEGRAL (MPPE - VENEZUELA)';
});

const fechaFormateada = computed(() => {
  const d = new Date();
  return d.toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
});

defineExpose({
  documentoImpresionRef
});
</script>

<style scoped>
.documento-mppe {
  background-color: #ffffff;
  color: #0f172a;
  font-family: 'Roboto', 'Arial', sans-serif;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 920px;
  padding: 16px 20px;
}

.tamano-legal { min-height: 1200px; }
.tamano-letter { min-height: 1000px; }

.fuente-pequena { font-size: 10px; }
.fuente-pequena .tabla-mppe th,
.fuente-pequena .tabla-mppe td { padding: 3px 5px; font-size: 9.5px; }

.fuente-mediana { font-size: 11.5px; }
.fuente-mediana .tabla-mppe th,
.fuente-mediana .tabla-mppe td { padding: 5px 6px; font-size: 11px; }

.cintillo-oficial {
  border-bottom: 2px solid #1e3a8a;
  padding-bottom: 6px;
  margin-bottom: 10px;
}

.cintillo-contenido {
  display: flex;
  align-items: center;
  gap: 14px;
}

.escudo-container {
  width: 48px;
  height: 56px;
  flex-shrink: 0;
}

.escudo-svg {
  width: 100%;
  height: 100%;
}

.membrete-texto {
  flex-grow: 1;
  text-align: center;
  line-height: 1.15;
}

.linea-republica {
  font-size: 11px;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
}

.linea-ministerio {
  font-size: 10px;
  font-weight: 700;
  margin: 1px 0;
  color: #1e3a8a;
}

.linea-cdce {
  font-size: 9px;
  font-weight: 600;
  margin: 1px 0;
  color: #334155;
}

.linea-plantel {
  font-size: 11px;
  font-weight: 800;
  margin: 2px 0 1px 0;
  color: #000000;
  text-transform: uppercase;
}

.linea-codigos {
  font-size: 8.5px;
  color: #475569;
  margin: 1px 0 0 0;
}

.titulo-planificacion {
  text-align: center;
  margin-top: 6px;
  padding-top: 4px;
  border-top: 1px dashed #cbd5e1;
}

.documento-titulo {
  font-size: 11.5px;
  font-weight: 900;
  color: #1e3a8a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.subtitulo-datos {
  display: flex;
  justify-content: center;
  gap: 14px;
  font-size: 9px;
  margin-top: 3px;
  color: #334155;
}

.seccion-bloque {
  margin-bottom: 12px;
}

.seccion-header {
  background-color: #1e3a8a;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border-radius: 2px 2px 0 0;
}

.seccion-num {
  color: #fbbf24;
  margin-right: 4px;
}

.tabla-mppe {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0;
  border: 1px solid #1e3a8a;
  background-color: #ffffff;
}

.tabla-mppe th,
.tabla-mppe td {
  border: 1px solid #94a3b8;
  vertical-align: top;
  line-height: 1.2;
}

.tabla-mppe th {
  background-color: #f1f5f9;
  color: #0f172a;
  font-weight: 700;
  text-align: center;
  font-size: 9px;
}

.bg-label {
  background-color: #f8fafc;
  color: #334155;
  font-weight: 700;
}

.bg-label-momento {
  text-align: center;
  vertical-align: middle !important;
}

.bg-inicio { background-color: #eff6ff; }
.bg-desarrollo { background-color: #eef2ff; }
.bg-cierre { background-color: #f0fdfa; }

.texto-diagnostico {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 6px 8px;
  margin-bottom: 6px;
  font-size: 9.5px;
}

.subtitulo-caja {
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 3px;
  text-transform: uppercase;
  font-size: 9px;
}

.texto-justificado {
  text-align: justify;
  margin: 0;
}

.texto-secundario {
  font-size: 8px;
  color: #64748b;
  margin-top: 1px;
}

.texto-criterio {
  font-size: 8px;
  color: #475569;
  margin-top: 2px;
}

.font-sm {
  font-size: 8.5px;
}

.recurso-tag {
  display: inline-block;
  margin-right: 4px;
}

.semana-titulo-barra {
  background-color: #334155;
  color: #ffffff;
  padding: 3px 8px;
  font-size: 9.5px;
  font-weight: bold;
}

.clase-header-barra {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f1f5f9;
  border: 1px solid #94a3b8;
  border-bottom: none;
  padding: 3px 8px;
}

.clase-badge {
  background-color: #2563eb;
  color: #ffffff;
  font-size: 8.5px;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 3px;
}

.clase-dia {
  font-size: 9px;
  color: #1e293b;
}

.fila-totales {
  background-color: #f8fafc;
  border-top: 2px solid #1e3a8a;
}

.text-success { color: #15803d; }
.text-danger { color: #b91c1c; }

.observaciones-caja {
  font-size: 9px;
  margin-top: 6px;
  padding: 5px 8px;
  background-color: #f8fafc;
  border-left: 3px solid #1e3a8a;
  border: 1px solid #e2e8f0;
}

.firmas-contenedor {
  margin-top: 20px;
  padding-top: 8px;
}

.firmas-grid {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  text-align: center;
}

.firma-caja {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.linea-firma {
  width: 80%;
  border-top: 1px solid #0f172a;
  margin-bottom: 5px;
  margin-top: 32px;
}

.nombre-firmante {
  font-weight: 700;
  font-size: 9px;
  color: #0f172a;
}

.cargo-firmante {
  font-size: 8px;
  font-weight: 600;
  color: #475569;
}

.cedula-firmante,
.espacio-sello {
  font-size: 7.5px;
  color: #64748b;
  margin-top: 1px;
}

/* FORMATO DE PLANIFICACIÓN SEMANAL (CUADRO Y MOMENTOS) */
.tabla-cuadro-curricular {
  margin-top: 4px;
  margin-bottom: 6px;
  border: 1.5px solid #1e3a8a;
}

.tabla-cuadro-curricular td {
  padding: 4px 6px;
}

.tabla-identificacion-semanal {
  margin-bottom: 6px;
}

.tabla-momentos {
  margin-top: 0;
  margin-bottom: 8px;
  border-top: none;
}

.clase-contenido-titulo {
  font-size: 8.5px;
  color: #1e3a8a;
}

.salto-pagina {
  page-break-before: always;
  break-before: page;
  margin-top: 16px;
  padding-top: 8px;
}

.no-split {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

@media print {
  body { background: #ffffff; }
  .documento-mppe { max-width: 100% !important; padding: 0 !important; }
  .no-split { page-break-inside: avoid !important; }
  .salto-pagina { page-break-before: always; break-before: page; }
}
</style>
