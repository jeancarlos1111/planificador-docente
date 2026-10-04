<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card style="min-width: 340px; max-width: 650px;" class="column no-wrap">
      <q-card-section class="bg-secondary text-white row items-center justify-between q-py-sm">
        <div class="row items-center q-gutter-xs">
          <q-icon name="folder" size="20px" />
          <span class="text-subtitle1 text-weight-bold">Planificaciones Guardadas (Dexie DB)</span>
        </div>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <!-- Selector de Pestañas por Estado -->
      <q-tabs
        v-model="filtroEstado"
        dense
        class="text-grey-7 bg-grey-2"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="todos" label="Todas" no-caps>
          <q-badge color="grey-7" floating rounded>{{ todosLosPlanes.length }}</q-badge>
        </q-tab>
        <q-tab name="borrador" label="Borradores" no-caps>
          <q-badge color="primary" floating rounded>{{ planesBorrador.length }}</q-badge>
        </q-tab>
        <q-tab name="por_corregir" label="Por Corregir" no-caps>
          <q-badge color="negative" floating rounded>{{ planesPorCorregir.length }}</q-badge>
        </q-tab>
        <q-tab name="corregida" label="Corregidas" no-caps>
          <q-badge color="positive" floating rounded>{{ planesCorregidos.length }}</q-badge>
        </q-tab>
      </q-tabs>

      <!-- Lista de Planificaciones -->
      <q-card-section class="col scroll q-pa-none" style="max-height: 420px;">
        <q-list separator>
          <q-item
            v-for="item in planesFiltrados"
            :key="item.id"
            clickable
            @click="cargarPlan(item.id)"
          >
            <q-item-section avatar>
              <q-avatar
                :icon="item.subsistema === 'primaria' ? 'auto_stories' : 'school'"
                :color="item.subsistema === 'primaria' ? 'teal' : 'primary'"
                text-color="white"
                size="38px"
              />
            </q-item-section>

            <q-item-section>
              <div class="row items-center q-gutter-xs">
                <span class="text-weight-bold text-subtitle2">{{ item.diagnostico.tituloProyectoTema || 'Plan sin título' }}</span>
                <q-badge color="amber-9" size="xs">v{{ item.version || 1 }}</q-badge>
                <!-- Badge de Estado -->
                <q-badge :color="colorPorEstado(item.estado)" size="xs">
                  {{ etiquetaPorEstado(item.estado) }}
                </q-badge>
              </div>

              <q-item-label caption>
                {{ item.contextoEscolar.gradoAnio }} • {{ item.contextoEscolar.areaFormacion }}
                ({{ item.contextoEscolar.momentoPedagogico }})
              </q-item-label>
              <q-item-label caption class="text-grey-6">
                Modificado: {{ formatearFecha(item.updatedAt) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-xs">
                <!-- Cambiar Estado Rápido -->
                <q-btn-dropdown flat dense round icon="label" size="sm" @click.stop>
                  <q-list dense>
                    <q-item clickable v-close-popup @click="cambiarEstadoPlan(item, 'borrador')">
                      <q-item-section avatar><q-icon name="edit" color="primary" size="xs" /></q-item-section>
                      <q-item-section>Marcar Borrador</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="cambiarEstadoPlan(item, 'por_corregir')">
                      <q-item-section avatar><q-icon name="warning" color="negative" size="xs" /></q-item-section>
                      <q-item-section>Marcar Por Corregir</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="cambiarEstadoPlan(item, 'corregida')">
                      <q-item-section avatar><q-icon name="check_circle" color="positive" size="xs" /></q-item-section>
                      <q-item-section>Marcar Corregida</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  size="sm"
                  @click.stop="confirmarEliminar(item.id)"
                />
              </div>
            </q-item-section>
          </q-item>

          <q-item v-if="!planesFiltrados.length">
            <q-item-section class="text-center text-grey-6 q-pa-md">
              No hay planificaciones en esta categoría.
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-sm bg-grey-1">
        <q-btn flat label="Cerrar" color="grey-8" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import type { EstadoPlanificacion, PlanificacionDocente } from '../../types/planificacion';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const $q = useQuasar();
const planStore = usePlanificacionStore();
const { borradores: todosLosPlanes } = storeToRefs(planStore);

const filtroEstado = ref<string>('todos');

const planesBorrador = computed(() => todosLosPlanes.value.filter(p => (p.estado || 'borrador') === 'borrador'));
const planesPorCorregir = computed(() => todosLosPlanes.value.filter(p => p.estado === 'por_corregir'));
const planesCorregidos = computed(() => todosLosPlanes.value.filter(p => p.estado === 'corregida'));

const planesFiltrados = computed(() => {
  if (filtroEstado.value === 'borrador') return planesBorrador.value;
  if (filtroEstado.value === 'por_corregir') return planesPorCorregir.value;
  if (filtroEstado.value === 'corregida') return planesCorregidos.value;
  return todosLosPlanes.value;
});

function colorPorEstado(estado?: EstadoPlanificacion) {
  if (estado === 'por_corregir') return 'negative';
  if (estado === 'corregida') return 'positive';
  return 'primary';
}

function etiquetaPorEstado(estado?: EstadoPlanificacion) {
  if (estado === 'por_corregir') return 'Por Corregir';
  if (estado === 'corregida') return 'Corregida';
  return 'Borrador';
}

function cargarPlan(id: string) {
  planStore.cargarBorrador(id);
  emit('update:modelValue', false);
  $q.notify({
    type: 'info',
    message: 'Planificación cargada al editor',
    position: 'top-right'
  });
}

function cambiarEstadoPlan(planItem: PlanificacionDocente, nuevoEstado: EstadoPlanificacion) {
  planItem.estado = nuevoEstado;
  planStore.guardarBorrador();
  $q.notify({
    type: 'positive',
    message: `Plan marcado como ${etiquetaPorEstado(nuevoEstado)}`,
    position: 'top-right'
  });
}

function confirmarEliminar(id: string) {
  $q.dialog({
    title: 'Eliminar Planificación',
    message: '¿Está seguro de eliminar esta planificación?',
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Eliminar', color: 'negative' }
  }).onOk(() => {
    planStore.eliminarBorrador(id);
  });
}

function formatearFecha(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
</script>
