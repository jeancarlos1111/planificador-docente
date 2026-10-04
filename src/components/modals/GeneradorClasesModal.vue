<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card style="min-width: 320px; max-width: 480px;">
      <q-card-section class="bg-primary text-white row items-center justify-between q-py-sm">
        <div class="row items-center q-gutter-xs">
          <q-icon name="auto_fix_high" size="20px" />
          <span class="text-subtitle1 text-weight-bold">Asistente Rápido de Clases</span>
        </div>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <p class="text-caption text-grey-8">
          Configura la cantidad de semanas y clases por semana (ej. 2 clases: Lunes y Miércoles). El sistema creará los esqueletos de <strong>Inicio, Desarrollo y Cierre</strong> automáticamente.
        </p>

        <div class="row q-col-gutter-sm q-my-xs">
          <div class="col-6">
            <q-input v-model.number="semanas" label="Total Semanas" type="number" outlined dense min="1" max="20" />
          </div>
          <div class="col-6">
            <q-input v-model.number="clasesPorSemana" label="Clases / Semana" type="number" outlined dense min="1" max="10" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
        <q-btn color="primary" label="Generar Estructura" no-caps @click="ejecutar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
  (e: 'generado', total: number): void;
}>();

const planStore = usePlanificacionStore();
const semanas = ref(8);
const clasesPorSemana = ref(2);

function ejecutar() {
  planStore.autogenerarEstructuraSemanas(semanas.value, clasesPorSemana.value);
  emit('generado', semanas.value * clasesPorSemana.value);
  emit('update:modelValue', false);
}
</script>
