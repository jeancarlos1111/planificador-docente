<template>
  <div class="q-pa-sm q-mb-sm rounded-borders bg-surface card-clase shadow-1">
    <!-- Header de la Clase -->
    <div class="row items-center justify-between q-mb-xs">
      <div class="row items-center q-gutter-xs">
        <q-badge color="indigo-7" class="q-pa-xs text-weight-bold">Clase #{{ clase.numeroClase }}</q-badge>
        <q-select
          v-model="clase.diaSemana"
          :options="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']"
          dense
          outlined
          style="width: 110px;"
          @update:model-value="guardar"
        />
        <q-input
          v-model="clase.fecha"
          type="date"
          stack-label
          dense
          outlined
          style="width: 130px;"
          @update:model-value="guardar"
        />
        <q-input
          v-model.number="clase.horasAcademicas"
          label="Horas"
          type="number"
          dense
          outlined
          style="width: 70px;"
          @update:model-value="guardar"
        />
      </div>

      <div class="row items-center q-gutter-xs">
        <q-btn flat round dense color="primary" icon="content_copy" size="sm" @click="$emit('duplicar')">
          <q-tooltip>Duplicar estructura de esta clase</q-tooltip>
        </q-btn>
        <q-btn v-if="puedeEliminar" flat round dense color="negative" icon="delete" size="sm" @click="$emit('eliminar')">
          <q-tooltip>Eliminar clase</q-tooltip>
        </q-btn>
      </div>
    </div>

    <!-- Contenido específico de la sesión -->
    <div class="q-mb-xs">
      <q-input
        v-model="clase.contenidoSesion"
        label="Contenido Específico de la Sesión *"
        placeholder="Ej. Postulados de la teoría celular y manejo de microscopio..."
        outlined
        dense
        @update:model-value="guardar"
      />
    </div>

    <!-- Momentos didácticos: Inicio, Desarrollo y Cierre -->
    <div class="row q-col-gutter-xs q-mb-xs">
      <div class="col-12 col-md-4">
        <div class="momento-bloque bg-blue-1 dark-bg-blue-10 q-pa-xs rounded-borders">
          <div class="text-caption text-weight-bold text-blue-9 dark-text-blue-2 q-mb-xs row items-center">
            <q-icon name="wb_sunny" class="q-mr-xs" size="14px" />
            <span>INICIO (Saberes previos y motivación)</span>
          </div>
          <q-input
            v-model="clase.inicio"
            type="textarea"
            rows="2"
            outlined
            dense
            bg-color="white"
            @update:model-value="guardar"
          />
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="momento-bloque bg-indigo-1 dark-bg-indigo-10 q-pa-xs rounded-borders">
          <div class="text-caption text-weight-bold text-indigo-9 dark-text-indigo-2 q-mb-xs row items-center">
            <q-icon name="engineering" class="q-mr-xs" size="14px" />
            <span>DESARROLLO (Construcción y práctica)</span>
          </div>
          <q-input
            v-model="clase.desarrollo"
            type="textarea"
            rows="2"
            outlined
            dense
            bg-color="white"
            @update:model-value="guardar"
          />
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="momento-bloque bg-teal-1 dark-bg-teal-10 q-pa-xs rounded-borders">
          <div class="text-caption text-weight-bold text-teal-9 dark-text-teal-2 q-mb-xs row items-center">
            <q-icon name="task_alt" class="q-mr-xs" size="14px" />
            <span>CIERRE (Sistematización y verificación)</span>
          </div>
          <q-input
            v-model="clase.cierre"
            type="textarea"
            rows="2"
            outlined
            dense
            bg-color="white"
            @update:model-value="guardar"
          />
        </div>
      </div>
    </div>

    <!-- Recursos de la clase -->
    <div class="row q-col-gutter-xs">
      <div class="col-12 col-md-6">
        <q-select
          v-model="clase.recursos"
          :options="RECURSOS_APRENDIZAJE_MPPE"
          label="Recursos Didácticos"
          multiple
          use-chips
          dense
          outlined
          @update:model-value="guardar"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="clase.recursosDetalle"
          label="Detalle de Materiales"
          placeholder="Ej. Microscopio, láminas de cebolla..."
          dense
          outlined
          @update:model-value="guardar"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SesionClaseMicro } from '../../types/planificacion';
import { RECURSOS_APRENDIZAJE_MPPE } from '../../constants/mppeCatalogos';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';

const props = defineProps<{
  clase: SesionClaseMicro;
  puedeEliminar: boolean;
}>();

defineEmits<{
  (e: 'duplicar'): void;
  (e: 'eliminar'): void;
}>();

const planStore = usePlanificacionStore();

function guardar() {
  planStore.guardarEnLocalStorage();
}
</script>

<style scoped>
.card-clase {
  border: 1px solid #e2e8f0;
}
body.body--dark .card-clase {
  border-color: #334155;
  background-color: #1e1e2d;
}
.momento-bloque {
  border: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
