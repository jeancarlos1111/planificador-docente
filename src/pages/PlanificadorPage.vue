<template>
  <q-page class="q-pa-xs q-pa-sm-sm q-pa-md-md pagina-planificador">
    <!-- BARRA SUPERIOR MOBILE-FIRST -->
    <div class="row items-center justify-between q-mb-sm bar-superior bg-surface q-pa-xs q-px-sm rounded-borders shadow-1">
      <div class="col-auto row items-center q-gutter-xs">
        <q-avatar size="36px" color="primary" text-color="white" icon="history_edu" />
        <div>
          <div class="row items-center q-gutter-xs">
            <span class="text-subtitle2 text-weight-bolder text-primary">Planificador MPPE</span>
            <q-badge color="amber-9" class="text-weight-bold" size="xs">v{{ plan.version || 1 }}</q-badge>
            <q-badge :color="badgeColorEstado" size="xs" class="cursor-pointer" @click="dialogBorradores = true">
              {{ etiquetaEstado }}
            </q-badge>
          </div>
          <div class="text-caption text-grey-7 dark-grey-3 ellipsis" style="max-width: 220px; font-size: 11px;">
            {{ plan.contextoEscolar.gradoAnio || 'Grado' }} • {{ plan.contextoEscolar.areaFormacion || 'Área' }}
          </div>
        </div>
      </div>

      <!-- BOTONES DE ACCIÓN RÁPIDA -->
      <div class="col-auto row items-center q-gutter-xs">
        <!-- Plantillas rápidas -->
        <q-btn-dropdown
          outline
          color="primary"
          icon="auto_awesome"
          dense
          no-caps
          size="sm"
          class="q-px-xs"
        >
          <q-list dense>
            <q-item clickable v-close-popup @click="abrirPlantilla('media_general')">
              <q-item-section avatar><q-icon name="school" color="primary" size="xs" /></q-item-section>
              <q-item-section>Media General (3er Año)</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="abrirPlantilla('primaria')">
              <q-item-section avatar><q-icon name="auto_stories" color="teal" size="xs" /></q-item-section>
              <q-item-section>Primaria (4to Grado P.A.)</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- Borradores (Dexie IndexedDB) -->
        <q-btn
          flat
          dense
          color="secondary"
          icon="folder_open"
          no-caps
          size="sm"
          class="q-px-xs"
          @click="dialogBorradores = true"
        >
          <q-badge floating color="secondary" rounded>{{ borradores.length }}</q-badge>
          <q-tooltip>Mis planificaciones guardadas (Dexie DB)</q-tooltip>
        </q-btn>

        <!-- Guardar -->
        <q-btn
          color="positive"
          icon="save"
          dense
          no-caps
          size="sm"
          class="q-px-sm"
          @click="ejecutarGuardar"
        >
          <span class="gt-xs q-ml-xs">Guardar</span>
        </q-btn>

        <!-- PDF Oficial -->
        <q-btn
          color="primary"
          icon="picture_as_pdf"
          dense
          no-caps
          size="sm"
          class="q-px-sm text-weight-bold"
          @click="dialogPdf = true"
        >
          <span class="gt-xs q-ml-xs">PDF</span>
        </q-btn>
      </div>
    </div>

    <!-- PESTAÑAS RESPONSIVE (SCROLLABLE EN MÓVIL) -->
    <q-tabs
      v-model="tabActiva"
      dense
      outside-arrows
      mobile-arrows
      class="text-grey-7 bg-surface rounded-borders shadow-1 q-mb-sm"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="identificacion" icon="domain" label="1. Datos" no-caps />
      <q-tab name="lapso_macro" icon="calendar_view_month" label="2. Lapso (Macro)" no-caps />
      <q-tab name="semanal_micro" icon="view_timeline" label="3. Semanal (Micro)" no-caps>
        <q-badge color="primary" floating rounded>{{ totalClasesPlanificadas }}</q-badge>
      </q-tab>
      <q-tab name="evaluacion_cronograma" icon="fact_check" label="4. Evaluación" no-caps>
        <q-badge :color="esPonderacionValida ? 'positive' : 'warning'" floating rounded>
          {{ totalPonderacion }}%
        </q-badge>
      </q-tab>
      <q-tab name="plan_accion" icon="bolt" label="5. P. Acción" no-caps />
      <q-tab name="correcciones" icon="edit_note" label="Correcciones" no-caps>
        <q-badge v-if="correccionesPendientes.length > 0" color="negative" floating rounded>
          {{ correccionesPendientes.length }}
        </q-badge>
      </q-tab>
    </q-tabs>

    <!-- PANELES MODULARES -->
    <q-tab-panels v-model="tabActiva" animated class="bg-transparent">
      <!-- 1. IDENTIFICACIÓN Y PLANTEL -->
      <q-tab-panel name="identificacion" class="q-pa-none">
        <IdentificacionForm @siguiente="tabActiva = 'lapso_macro'" />
      </q-tab-panel>

      <!-- 2. PLAN DE LAPSO (MACRO) -->
      <q-tab-panel name="lapso_macro" class="q-pa-none">
        <PlanLapsoMacro
          @anterior="tabActiva = 'identificacion'"
          @siguiente="tabActiva = 'semanal_micro'"
        />
      </q-tab-panel>

      <!-- 3. PLAN SEMANAL (MICRO) -->
      <q-tab-panel name="semanal_micro" class="q-pa-none">
        <PlanSemanalMicro
          @anterior="tabActiva = 'lapso_macro'"
          @siguiente="tabActiva = 'evaluacion_cronograma'"
          @abrir-generador="dialogGenerador = true"
        />
      </q-tab-panel>

      <!-- 4. PLAN DE EVALUACIÓN OFICIAL -->
      <q-tab-panel name="evaluacion_cronograma" class="q-pa-none">
        <CronogramaEvaluacion
          @anterior="tabActiva = 'semanal_micro'"
          @siguiente="tabActiva = 'plan_accion'"
        />
      </q-tab-panel>

      <!-- 5. PLAN DE ACCIÓN (PROYECTOS CORTOS) -->
      <q-tab-panel name="plan_accion" class="q-pa-none">
        <PlanAccionForm
          @anterior="tabActiva = 'evaluacion_cronograma'"
          @abrir-pdf="dialogPdf = true"
        />
      </q-tab-panel>

      <!-- 6. CORRECCIONES DE COORDINACIÓN -->
      <q-tab-panel name="correcciones" class="q-pa-none">
        <BandejaCorrecciones />
      </q-tab-panel>
    </q-tab-panels>

    <!-- MODALES MODULARES -->
    <GeneradorClasesModal v-model="dialogGenerador" @generado="onClasesGeneradas" />
    <BorradoresModal v-model="dialogBorradores" />
    <PdfPreviewModal v-model="dialogPdf" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../stores/usePlanificacionStore';

// Subcomponentes modulares
import IdentificacionForm from '../components/identificacion/IdentificacionForm.vue';
import PlanLapsoMacro from '../components/macro/PlanLapsoMacro.vue';
import PlanSemanalMicro from '../components/micro/PlanSemanalMicro.vue';
import CronogramaEvaluacion from '../components/evaluacion/CronogramaEvaluacion.vue';
import PlanAccionForm from '../components/accion/PlanAccionForm.vue';
import BandejaCorrecciones from '../components/correcciones/BandejaCorrecciones.vue';

// Modales modulares
import GeneradorClasesModal from '../components/modals/GeneradorClasesModal.vue';
import BorradoresModal from '../components/modals/BorradoresModal.vue';
import PdfPreviewModal from '../components/modals/PdfPreviewModal.vue';

const $q = useQuasar();
const planStore = usePlanificacionStore();

const {
  plan,
  borradores,
  totalPonderacion,
  totalClasesPlanificadas,
  esPonderacionValida,
  correccionesPendientes
} = storeToRefs(planStore);

const tabActiva = ref('lapso_macro');
const dialogGenerador = ref(false);
const dialogBorradores = ref(false);
const dialogPdf = ref(false);

const badgeColorEstado = computed(() => {
  if (plan.value.estado === 'por_corregir') return 'negative';
  if (plan.value.estado === 'corregida') return 'positive';
  return 'primary';
});

const etiquetaEstado = computed(() => {
  if (plan.value.estado === 'por_corregir') return 'Por Corregir';
  if (plan.value.estado === 'corregida') return 'Corregida';
  return 'Borrador';
});

async function ejecutarGuardar() {
  await planStore.guardarBorrador();
  $q.notify({
    type: 'positive',
    message: 'Plan guardado en Dexie DB (IndexedDB)',
    icon: 'cloud_done',
    position: 'top-right'
  });
}

function abrirPlantilla(tipo: 'media_general' | 'primaria') {
  $q.dialog({
    title: 'Cargar Plantilla MPPE',
    message: `¿Desea cargar la plantilla oficial de ejemplo para ${tipo === 'media_general' ? 'Media General' : 'Primaria'}?`,
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Sí, Cargar', color: 'primary' }
  }).onOk(() => {
    planStore.cargarPlantilla(tipo);
  });
}

function onClasesGeneradas(total: number) {
  tabActiva.value = 'semanal_micro';
  $q.notify({
    type: 'positive',
    message: `Estructura de ${total} clases creada exitosamente`,
    icon: 'auto_fix_high',
    position: 'top-right'
  });
}

onMounted(() => {
  // Sincronizar almacenamiento Dexie en IndexedDB
  planStore.sincronizarConDexie();
});
</script>

<style scoped>
.pagina-planificador {
  max-width: 1200px;
  margin: 0 auto;
}
.bar-superior {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.bg-surface {
  background-color: #ffffff;
}
body.body--dark .bg-surface {
  background-color: #1e1e2d;
}
body.body--dark .bar-superior {
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
