<template>
  <q-card flat bordered class="bg-surface q-pa-sm q-pa-md-md">
    <div class="text-subtitle1 text-weight-bold text-primary q-mb-xs">
      5. Plan de Acción Pedagógico (Proyectos Cortos)
    </div>
    <div class="text-caption text-grey-7 q-mb-md">
      Proyectos de nivelación, efemérides, semanas especiales o actividades comunitarias cortas.
    </div>

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12">
        <q-input v-model="plan.planAccion.titulo" label="Título del Plan de Acción *" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="plan.planAccion.justificacion" label="Justificación Breve" type="textarea" rows="2" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="plan.planAccion.objetivoAccion" label="Objetivo General y Meta" type="textarea" rows="2" outlined dense @update:model-value="guardar" />
      </div>
    </div>

    <!-- Tareas específicas -->
    <div class="text-subtitle2 text-weight-bold text-primary q-mb-xs">Acciones y Tareas Específicas</div>
    <div v-for="acc in plan.planAccion.acciones" :key="acc.id" class="row q-col-gutter-xs q-mb-xs items-center">
      <div class="col-12 col-md-4">
        <q-input v-model="acc.tarea" label="Tarea o Actividad" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-3">
        <q-input v-model="acc.responsables" label="Responsables" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-2">
        <q-input v-model="acc.tiempo" label="Tiempo / Semana" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-3">
        <q-input v-model="acc.recursos" label="Recursos" outlined dense @update:model-value="guardar" />
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <q-btn flat color="grey-8" label="Atrás" no-caps @click="$emit('anterior')" />
      <q-btn color="primary" label="Ver y Exportar PDF" icon="picture_as_pdf" no-caps class="text-weight-bold" @click="$emit('abrir-pdf')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';

defineEmits<{
  (e: 'anterior'): void;
  (e: 'abrir-pdf'): void;
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
</style>
