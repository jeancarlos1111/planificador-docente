<template>
  <q-card flat bordered class="bg-surface q-pa-sm q-pa-md-md">
    <!-- Header de Micro -->
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <div class="text-subtitle1 text-weight-bold text-primary">
          3. Plan Semanal (Micro-Planificación)
        </div>
        <div class="text-caption text-grey-7">
          Cada clase individual desglosada en Inicio, Desarrollo y Cierre.
        </div>
      </div>

      <div class="row q-gutter-xs">
        <q-btn
          color="indigo-9"
          outline
          icon="auto_fix_high"
          label="Generador Rápido"
          no-caps
          size="sm"
          @click="$emit('abrir-generador')"
        />
        <q-btn
          color="secondary"
          icon="add"
          label="Agregar Semana"
          no-caps
          size="sm"
          @click="planStore.agregarSemanaMicro"
        />
      </div>
    </div>

    <!-- Lista de Semanas Didácticas -->
    <div
      v-for="(semana, sIdx) in plan.semanasMicro"
      :key="semana.id"
      class="q-pa-xs q-pa-sm-sm q-mb-md rounded-borders bg-grey-1 dark-bg-grey-9 border-semana"
    >
      <div class="row items-center justify-between bg-primary text-white q-pa-xs q-px-sm rounded-borders q-mb-xs">
        <div class="row items-center q-gutter-xs">
          <q-icon name="date_range" />
          <span class="text-weight-bold text-caption text-weight-bolder">SEMANA {{ semana.numeroSemana }}</span>
          <q-input
            v-model="semana.rangoFechas"
            dark
            dense
            borderless
            class="q-ml-xs text-caption"
            style="min-width: 150px;"
            placeholder="Ej. 06/10 al 10/10"
            @update:model-value="guardar"
          />
        </div>

        <div class="row items-center q-gutter-xs">
          <q-btn
            flat
            dense
            color="white"
            icon="add"
            label="Añadir Clase"
            no-caps
            size="xs"
            @click="planStore.agregarClaseASemana(sIdx)"
          />
          <q-btn
            v-if="plan.semanasMicro.length > 1"
            flat
            round
            dense
            color="white"
            icon="delete"
            size="xs"
            @click="planStore.eliminarSemanaMicro(sIdx)"
          >
            <q-tooltip>Eliminar semana</q-tooltip>
          </q-btn>
        </div>
      </div>

      <!-- Componentes de cada clase -->
      <ClaseItemCard
        v-for="(clase, cIdx) in semana.clases"
        :key="clase.id"
        :clase="clase"
        :puede-eliminar="semana.clases.length > 1"
        @duplicar="planStore.duplicarClase(sIdx, cIdx)"
        @eliminar="planStore.eliminarClaseDeSemana(sIdx, cIdx)"
      />
    </div>

    <div class="row justify-between q-mt-md">
      <q-btn flat color="grey-8" label="Atrás" no-caps @click="$emit('anterior')" />
      <q-btn color="primary" label="Ir a Cronograma de Evaluación" icon-right="arrow_forward" no-caps @click="$emit('siguiente')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import ClaseItemCard from './ClaseItemCard.vue';

defineEmits<{
  (e: 'anterior'): void;
  (e: 'siguiente'): void;
  (e: 'abrir-generador'): void;
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
.border-semana {
  border: 1px solid #cbd5e1;
}
</style>
