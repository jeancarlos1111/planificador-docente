<template>
  <q-dialog :model-value="modelValue" max-width="950px" full-width full-height @update:model-value="$emit('update:modelValue', $event)">
    <q-card class="column no-wrap" style="max-height: 98vh;">
      <!-- Header del Modal -->
      <q-card-section class="bg-primary text-white row items-center justify-between q-py-sm">
        <div class="row items-center q-gutter-xs">
          <q-icon name="picture_as_pdf" size="20px" />
          <span class="text-subtitle1 text-weight-bold">Vista Previa y Descarga Oficial MPPE</span>
        </div>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <!-- Barra de Configuración de Impresión / PDF -->
      <q-card-section class="bg-grey-2 dark-bg-grey-9 q-py-xs row items-center justify-between q-gutter-xs">
        <div class="row items-center q-gutter-xs">
          <!-- Documento a exportar -->
          <q-select
            v-model="opcionesPDF.vistaExportar"
            :options="[
              { label: 'Formato: Planificación Semanal (Micro)', value: 'semanal_micro' },
              { label: 'Formato: Plan de Lapso (Macro)', value: 'lapso_macro' },
              { label: 'Formato: Cronograma de Evaluación', value: 'evaluacion_cronograma' },
              { label: 'Formato: Plan de Acción', value: 'plan_accion' },
              { label: 'Dossier Completo (Todos los Formatos)', value: 'completo' }
            ]"
            emit-value
            map-options
            dense
            outlined
            label="Formato Oficial"
            style="min-width: 250px;"
            @update:model-value="planStore.guardarConfigPDF"
          />

          <!-- Filtro de semana para Formato Semanal -->
          <q-select
            v-if="opcionesPDF.vistaExportar === 'semanal_micro' && plan.semanasMicro.length > 1"
            v-model="filtroSemana"
            :options="opcionesSemanas"
            emit-value
            map-options
            dense
            outlined
            label="Semana"
            style="min-width: 140px;"
          />

          <!-- Formato Legal / Letter -->
          <q-btn-toggle
            v-model="opcionesPDF.formato"
            toggle-color="primary"
            flat
            dense
            no-caps
            :options="[
              { label: 'Oficio', value: 'legal' },
              { label: 'Carta', value: 'letter' }
            ]"
            @update:model-value="planStore.guardarConfigPDF"
          />

          <q-toggle
            v-model="opcionesPDF.incluirFirmas"
            label="Firmas"
            dense
            color="primary"
            @update:model-value="planStore.guardarConfigPDF"
          />
        </div>

        <div class="row items-center q-gutter-xs">
          <q-btn color="grey-8" flat dense icon="print" label="Imprimir" no-caps @click="imprimirDirecto" />
          <q-btn
            color="primary"
            icon="download"
            label="Descargar PDF"
            no-caps
            :loading="exportando"
            class="text-weight-bold"
            @click="descargarPDF"
          />
        </div>
      </q-card-section>

      <!-- Contenedor del documento imprimible -->
      <q-card-section class="col scroll q-pa-none bg-grey-3" style="overflow-y: auto;">
        <div class="documento-scroll-wrapper q-pa-xs q-pa-sm-md">
          <PlanificacionPdfPreview
            ref="pdfComponenteRef"
            :plan="plan"
            :opciones="opcionesPDF"
            :semana-index="filtroSemana === 'todas' ? null : Number(filtroSemana)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import PlanificacionPdfPreview from '../PlanificacionPdfPreview.vue';
import { exportarPlanificacionPDF, normalizarNombreArchivo } from '../../utils/pdfGenerator';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const $q = useQuasar();
const planStore = usePlanificacionStore();
const { plan, opcionesPDF } = storeToRefs(planStore);

const pdfComponenteRef = ref();
const exportando = ref(false);
const filtroSemana = ref<number | 'todas'>('todas');

const opcionesSemanas = computed(() => {
  const lista: Array<{ label: string; value: number | 'todas' }> = [
    { label: 'Todas las Semanas', value: 'todas' }
  ];
  plan.value.semanasMicro.forEach((s, idx) => {
    lista.push({
      label: `Semana ${s.numeroSemana}`,
      value: idx
    });
  });
  return lista;
});

async function descargarPDF() {
  const el = pdfComponenteRef.value?.documentoImpresionRef;
  if (!el) return;

  exportando.value = true;
  $q.loading.show({ message: 'Generando formato oficial MPPE...' });

  try {
    const grado = normalizarNombreArchivo(plan.value.contextoEscolar.gradoAnio || 'Grado');
    const area = normalizarNombreArchivo(plan.value.contextoEscolar.areaFormacion || 'Area');
    const tipo = opcionesPDF.value.vistaExportar;
    const semStr = (tipo === 'semanal_micro' && filtroSemana.value !== 'todas') ? `_Sem${Number(filtroSemana.value) + 1}` : '';
    const nombreArchivo = `Formato_${tipo}_${grado}_${area}${semStr}_v${plan.value.version || 1}`;

    await exportarPlanificacionPDF({
      elemento: el,
      nombreArchivo,
      opciones: opcionesPDF.value
    });

    $q.notify({
      type: 'positive',
      message: 'PDF generado y descargado exitosamente',
      position: 'top-right'
    });
  } catch (e) {
    console.error(e);
  } finally {
    exportando.value = false;
    $q.loading.hide();
  }
}

function imprimirDirecto() {
  window.print();
}
</script>

<style scoped>
.documento-scroll-wrapper {
  display: flex;
  justify-content: center;
}
</style>
