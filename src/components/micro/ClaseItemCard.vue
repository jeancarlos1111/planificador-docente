<template>
  <div class="q-mb-sm rounded-borders bg-surface card-clase shadow-1">
    <!-- Header de la Clase (Barra compacta táctil) -->
    <div
      class="row items-center justify-between q-pa-sm cursor-pointer clase-barra-header"
      @click="expandido = !expandido"
    >
      <div class="row items-center q-gutter-xs">
        <q-btn
          flat
          dense
          round
          size="sm"
          :icon="expandido ? 'expand_less' : 'expand_more'"
          color="primary"
          @click.stop="expandido = !expandido"
        />
        <q-badge color="primary" class="q-px-sm q-py-xs text-weight-bold badge-clase">
          Clase #{{ clase.numeroClase }}
        </q-badge>
        <span class="text-caption text-weight-bold text-grey-9 dark-text-grey-2">
          {{ clase.diaSemana || 'Día' }}
        </span>
        <span v-if="clase.fecha" class="text-caption text-grey-6 gt-xs">
          • {{ clase.fecha }}
        </span>
        <span v-if="clase.horasAcademicas" class="text-caption text-grey-6">
          ({{ clase.horasAcademicas }}h)
        </span>
      </div>

      <div class="row items-center q-gutter-xs" @click.stop>
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="content_copy"
          size="sm"
          @click="$emit('duplicar')"
        >
          <q-tooltip>Duplicar clase</q-tooltip>
        </q-btn>
        <q-btn
          v-if="puedeEliminar"
          flat
          round
          dense
          color="negative"
          icon="delete_outline"
          size="sm"
          @click="$emit('eliminar')"
        >
          <q-tooltip>Eliminar clase</q-tooltip>
        </q-btn>
      </div>
    </div>

    <!-- Contenido expandible de la clase -->
    <q-slide-transition>
      <div v-show="expandido" class="q-pa-sm q-pt-none">
        <!-- Fila de Organización: Día, Fecha y Horas -->
        <div class="row q-col-gutter-xs q-mb-sm">
          <div class="col-5 col-sm-4">
            <q-select
              v-model="clase.diaSemana"
              :options="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']"
              label="Día"
              dense
              outlined
              @update:model-value="guardar"
            />
          </div>
          <div class="col-4 col-sm-5">
            <q-input
              v-model="clase.fecha"
              type="date"
              label="Fecha"
              stack-label
              dense
              outlined
              @update:model-value="guardar"
            />
          </div>
          <div class="col-3 col-sm-3">
            <q-input
              v-model.number="clase.horasAcademicas"
              label="Horas"
              type="number"
              dense
              outlined
              @update:model-value="guardar"
            />
          </div>
        </div>

        <!-- Contenido específico de la sesión -->
        <div class="q-mb-sm">
          <q-input
            v-model="clase.contenidoSesion"
            label="Contenido Específico de la Sesión *"
            placeholder="Ej. Postulados de la teoría celular y manejo de microscopio..."
            outlined
            dense
            autogrow
            @update:model-value="guardar"
          >
            <template #prepend>
              <q-icon name="edit_note" color="primary" size="20px" />
            </template>
          </q-input>
        </div>

        <!-- Momentos didácticos: Inicio, Desarrollo y Cierre (Mobile Cards) -->
        <div class="row q-col-gutter-xs q-mb-sm">
          <!-- INICIO -->
          <div class="col-12 col-md-4">
            <div class="momento-card bg-inicio-card q-pa-xs rounded-borders">
              <div class="row items-center justify-between q-mb-xs q-px-xs">
                <div class="row items-center q-gutter-xs text-blue-9 dark-text-blue-2 text-weight-bolder text-caption">
                  <q-icon name="wb_sunny" size="16px" color="amber-9" />
                  <span>INICIO</span>
                </div>
                <span class="text-caption text-grey-7" style="font-size: 10px;">Saberes previos</span>
              </div>
              <q-input
                v-model="clase.inicio"
                type="textarea"
                rows="2"
                outlined
                dense
                autogrow
                placeholder="Exploración de saberes previos y motivación dialogada..."
                bg-color="white"
                class="campo-momento"
                @update:model-value="guardar"
              />
            </div>
          </div>

          <!-- DESARROLLO -->
          <div class="col-12 col-md-4">
            <div class="momento-card bg-desarrollo-card q-pa-xs rounded-borders">
              <div class="row items-center justify-between q-mb-xs q-px-xs">
                <div class="row items-center q-gutter-xs text-indigo-9 dark-text-indigo-2 text-weight-bolder text-caption">
                  <q-icon name="psychology" size="16px" color="indigo-7" />
                  <span>DESARROLLO</span>
                </div>
                <span class="text-caption text-grey-7" style="font-size: 10px;">Construcción</span>
              </div>
              <q-input
                v-model="clase.desarrollo"
                type="textarea"
                rows="2"
                outlined
                dense
                autogrow
                placeholder="Construcción social del conocimiento y actividades prácticas guiadas..."
                bg-color="white"
                class="campo-momento"
                @update:model-value="guardar"
              />
            </div>
          </div>

          <!-- CIERRE -->
          <div class="col-12 col-md-4">
            <div class="momento-card bg-cierre-card q-pa-xs rounded-borders">
              <div class="row items-center justify-between q-mb-xs q-px-xs">
                <div class="row items-center q-gutter-xs text-teal-9 dark-text-teal-2 text-weight-bolder text-caption">
                  <q-icon name="task_alt" size="16px" color="teal-7" />
                  <span>CIERRE</span>
                </div>
                <span class="text-caption text-grey-7" style="font-size: 10px;">Sistematización</span>
              </div>
              <q-input
                v-model="clase.cierre"
                type="textarea"
                rows="2"
                outlined
                dense
                autogrow
                placeholder="Sistematización de aprendizajes y conclusiones en plenaria..."
                bg-color="white"
                class="campo-momento"
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
            >
              <template #prepend>
                <q-icon name="menu_book" size="18px" color="primary" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="clase.recursosDetalle"
              label="Detalle de Materiales"
              placeholder="Ej. Microscopio, láminas de cebolla, reglas..."
              dense
              outlined
              @update:model-value="guardar"
            >
              <template #prepend>
                <q-icon name="backpack" size="18px" color="secondary" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
const expandido = ref(true);

function guardar() {
  planStore.guardarEnLocalStorage();
}
</script>

<style scoped>
.card-clase {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
}

body.body--dark .card-clase {
  border-color: #334155;
  background-color: #1e293b;
}

.clase-barra-header {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.15s ease;
}

body.body--dark .clase-barra-header {
  background-color: #0f172a;
  border-bottom-color: #334155;
}

.badge-clase {
  border-radius: 6px;
  font-size: 11px;
}

.momento-card {
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.bg-inicio-card {
  background-color: #eff6ff;
}
body.body--dark .bg-inicio-card {
  background-color: rgba(30, 58, 138, 0.25);
  border-color: rgba(59, 130, 246, 0.2);
}

.bg-desarrollo-card {
  background-color: #eef2ff;
}
body.body--dark .bg-desarrollo-card {
  background-color: rgba(67, 56, 202, 0.25);
  border-color: rgba(99, 102, 241, 0.2);
}

.bg-cierre-card {
  background-color: #f0fdfa;
}
body.body--dark .bg-cierre-card {
  background-color: rgba(19, 78, 74, 0.25);
  border-color: rgba(20, 184, 166, 0.2);
}

body.body--dark .campo-momento :deep(.q-field__control) {
  background-color: #1e293b !important;
}
</style>
