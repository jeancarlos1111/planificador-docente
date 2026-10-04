<template>
  <q-card flat bordered class="bg-surface q-pa-sm q-pa-md-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-subtitle1 text-weight-bold text-negative row items-center">
          <q-icon name="rate_review" class="q-mr-xs" />
          Bandeja de Correcciones y Observaciones Pedagógicas
        </div>
        <div class="text-caption text-grey-7">
          Registra las correcciones que te pide Coordinación para resolverlas sin perder tu versión anterior.
        </div>
      </div>

      <div class="row q-gutter-xs">
        <q-btn
          color="secondary"
          icon="difference"
          :label="'Crear Versión v' + ((plan.version || 1) + 1)"
          no-caps
          size="sm"
          @click="crearVersion"
        >
          <q-tooltip>Duplica la planificación conservando la versión previa como respaldo</q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          icon="add"
          label="Anotar Corrección"
          no-caps
          size="sm"
          @click="abrirModalCorreccion"
        />
      </div>
    </div>

    <!-- Lista de Correcciones -->
    <q-list separator class="rounded-borders border-box">
      <q-item v-for="cor in plan.correcciones" :key="cor.id" class="q-py-sm">
        <q-item-section avatar>
          <q-icon
            :name="cor.estado === 'corregido' ? 'check_circle' : 'pending_actions'"
            :color="cor.estado === 'corregido' ? 'positive' : 'warning'"
            size="28px"
          />
        </q-item-section>
        <q-item-section>
          <div class="row items-center q-gutter-xs">
            <span class="text-weight-bold text-caption">{{ cor.origen }}</span>
            <q-badge :color="cor.estado === 'corregido' ? 'positive' : 'negative'" size="xs">
              {{ cor.estado === 'corregido' ? 'Corregido' : 'Pendiente' }}
            </q-badge>
            <span class="text-caption text-grey-6">{{ cor.fecha }}</span>
          </div>
          <div class="q-mt-xs text-body2">{{ cor.observacion }}</div>
          <div v-if="cor.ajustesRealizados" class="text-caption text-positive q-mt-xs">
            <em>Ajuste hecho:</em> {{ cor.ajustesRealizados }}
          </div>
        </q-item-section>
        <q-item-section side>
          <div class="row items-center q-gutter-xs">
            <q-btn
              v-if="cor.estado === 'pendiente'"
              color="positive"
              flat
              dense
              icon="check"
              label="Resolver"
              no-caps
              size="sm"
              @click="marcarResuelto(cor.id)"
            />
            <q-btn
              flat
              round
              dense
              color="negative"
              icon="delete"
              size="xs"
              @click="planStore.eliminarCorreccion(cor.id)"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-item v-if="!plan.correcciones.length">
        <q-item-section class="text-center text-grey-6 q-pa-md">
          No tienes correcciones registradas para este plan.
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';

const $q = useQuasar();
const planStore = usePlanificacionStore();
const { plan } = storeToRefs(planStore);

function crearVersion() {
  planStore.crearVersionCorregida();
  $q.notify({
    type: 'positive',
    message: `Versión v${plan.value.version} creada con respaldo de la anterior`,
    icon: 'difference',
    position: 'top-right'
  });
}

function abrirModalCorreccion() {
  $q.dialog({
    title: 'Anotar Observación / Corrección',
    message: 'Escribe lo que solicitó la Coordinación Pedagógica o Dirección:',
    prompt: {
      model: '',
      type: 'textarea',
      isValid: val => val.length > 2
    },
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Guardar Observación', color: 'primary' }
  }).onOk((texto: string) => {
    planStore.agregarCorreccion(texto, 'Coordinación Pedagógica');
  });
}

function marcarResuelto(id: string) {
  $q.dialog({
    title: 'Marcar como Corregida',
    message: 'Breve nota de los ajustes que realizaste:',
    prompt: {
      model: 'Ajustes implementados según indicación pedagógica.',
      type: 'text'
    },
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Marcar Corregida', color: 'positive' }
  }).onOk((nota: string) => {
    planStore.marcarCorreccionResuelta(id, nota);
  });
}
</script>

<style scoped>
.bg-surface {
  background-color: #ffffff;
}
body.body--dark .bg-surface {
  background-color: #1e1e2d;
}
.border-box {
  border: 1px dashed #cbd5e1;
}
</style>
