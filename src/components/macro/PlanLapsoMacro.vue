<template>
  <q-card flat bordered class="bg-surface q-pa-xs q-pa-sm-sm q-pa-md-md mobile-card">
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <div class="text-subtitle1 text-weight-bolder text-primary row items-center q-gutter-xs">
          <q-icon name="calendar_view_month" color="primary" size="22px" />
          <span>2. Plan de Lapso</span>
        </div>
        <div class="text-caption text-grey-7">
          Fechas de inicio y fin por contenido, sustento científico y prerrequisitos.
        </div>
      </div>
      <q-btn color="secondary" icon="add" label="Agregar Tema" no-caps size="sm" @click="planStore.agregarContenidoMacro" />
    </div>

    <!-- Diagnóstico y Prerrequisitos Globales -->
    <div class="q-mb-md q-pa-sm rounded-borders bg-grey-1 dark-bg-grey-9 border-box">
      <div class="text-weight-bold text-caption text-primary q-mb-xs">
        <q-icon name="psychology" class="q-mr-xs" />
        Diagnóstico de Aula y Prerrequisitos Generales del Grupo
      </div>
      <q-input
        v-model="plan.diagnostico.diagnosticoAula"
        placeholder="Describa el diagnóstico de necesidades, fortalezas, estilos y ritmos de aprendizaje..."
        type="textarea"
        rows="2"
        outlined
        dense
        @update:model-value="guardar"
      />
    </div>

    <!-- Lista de Contenidos Macro -->
    <div
      v-for="(macro, mIdx) in plan.contenidosMacro"
      :key="macro.id || mIdx"
      class="q-pa-sm q-pa-md-md q-mb-sm rounded-borders card-macro shadow-1"
    >
      <div class="row items-center justify-between q-mb-xs">
        <div class="row items-center q-gutter-xs">
          <q-badge color="primary" class="text-weight-bold">Tema #{{ mIdx + 1 }}</q-badge>
          <span class="text-weight-bold text-caption text-primary ellipsis" style="max-width: 250px;">{{ macro.tema || 'Nuevo Tema' }}</span>
        </div>
        <q-btn
          v-if="plan.contenidosMacro.length > 1"
          flat
          round
          dense
          color="negative"
          icon="delete"
          size="sm"
          @click="planStore.eliminarContenidoMacro(mIdx)"
        >
          <q-tooltip>Eliminar este tema del lapso</q-tooltip>
        </q-btn>
      </div>

      <div class="row q-col-gutter-xs q-col-gutter-sm-sm">
        <div class="col-12 col-md-5">
          <q-input v-model="macro.tema" label="Tema / Contenido Curricular *" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-6 col-md-2">
          <q-input v-model="macro.fechaInicio" label="Fecha Inicio *" type="date" stack-label outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-6 col-md-2">
          <q-input v-model="macro.fechaFin" label="Fecha Fin *" type="date" stack-label outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-6 col-md-1">
          <q-input v-model.number="macro.semanasEstimadas" label="Semanas" type="number" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-6 col-md-2">
          <q-input v-model.number="macro.clasesAsignadas" label="N° Clases" type="number" outlined dense @update:model-value="guardar" />
        </div>

        <div class="col-12 col-md-4">
          <q-input
            v-model="macro.referenteTeoricoCientifico"
            label="Referente Teórico (Sustento Científico) *"
            type="textarea"
            rows="2"
            outlined
            dense
            @update:model-value="guardar"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="macro.prerrequisitosDiagnostico"
            label="Prerrequisitos / Dimensiones Previas *"
            type="textarea"
            rows="2"
            outlined
            dense
            @update:model-value="guardar"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="macro.loQueSeAspiraQueAprendan"
            label="Lo que se aspira que aprendan *"
            type="textarea"
            rows="2"
            outlined
            dense
            @update:model-value="guardar"
          />
        </div>
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <q-btn flat color="grey-8" label="Atrás" no-caps @click="$emit('anterior')" />
      <q-btn color="primary" label="Ir a Plan Semanal" icon-right="arrow_forward" no-caps @click="$emit('siguiente')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';

defineEmits<{
  (e: 'anterior'): void;
  (e: 'siguiente'): void;
}>();

const planStore = usePlanificacionStore();
const { plan } = storeToRefs(planStore);

function guardar() {
  planStore.guardarEnLocalStorage();
}
</script>

<style scoped>
.bg-surface {
  background-color: #ffffff;
}
body.body--dark .bg-surface {
  background-color: #1e1e2d;
}
.card-macro {
  border: 1px solid #e2e8f0;
}
body.body--dark .card-macro {
  border-color: #334155;
}
.border-box {
  border: 1px dashed #cbd5e1;
}
</style>
