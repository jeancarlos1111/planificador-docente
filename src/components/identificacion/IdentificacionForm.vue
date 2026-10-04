<template>
  <q-card flat bordered class="bg-surface q-pa-sm q-pa-md-md">
    <div class="text-subtitle1 text-weight-bold text-primary q-mb-sm row items-center">
      <q-icon name="verified" class="q-mr-xs text-primary" size="20px" />
      <span>1. Membrete Oficial MPPE y Plantel</span>
    </div>

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-md-6">
        <q-input v-model="plan.membrete.republica" label="República" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="plan.membrete.ministerio" label="Ministerio" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="plan.membrete.cdceZonaEducativa" label="CDCE / Zona Educativa" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-5">
        <q-input v-model="plan.membrete.nombrePlantel" label="Nombre del Plantel *" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-3">
        <q-input v-model="plan.membrete.codigoDEA" label="Código DEA *" outlined dense @update:model-value="guardar" />
      </div>
    </div>

    <q-separator class="q-my-sm" />

    <div class="text-subtitle2 text-weight-bold text-primary q-mb-xs">Datos del Docente y Organización de Clases</div>
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-md-5">
        <q-input v-model="plan.docente.nombreCompleto" label="Docente de Aula *" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-4">
        <q-input v-model="plan.docente.cedula" label="Cédula de Identidad *" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-3">
        <q-input v-model="plan.contextoEscolar.anioEscolar" label="Año Escolar" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-3">
        <q-select v-model="plan.contextoEscolar.momentoPedagogico" :options="MOMENTOS_PEDAGOGICOS" label="Momento" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-3">
        <q-select
          v-if="plan.subsistema === 'primaria'"
          v-model="plan.contextoEscolar.gradoAnio"
          :options="GRADOS_PRIMARIA"
          label="Grado *"
          outlined
          dense
          @update:model-value="guardar"
        />
        <q-select
          v-else
          v-model="plan.contextoEscolar.gradoAnio"
          :options="ANIOS_MEDIA"
          label="Año *"
          outlined
          dense
          @update:model-value="guardar"
        />
      </div>
      <div class="col-6 col-md-3">
        <q-select v-model="plan.contextoEscolar.seccion" :options="SECCIONES" label="Sección" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-6 col-md-3">
        <q-input
          v-model.number="plan.contextoEscolar.clasesPorSemana"
          label="Clases / Sem *"
          type="number"
          hint="Ej. 2 clases"
          outlined
          dense
          @update:model-value="guardar"
        />
      </div>
      <div class="col-12">
        <q-select
          v-if="plan.subsistema === 'primaria'"
          v-model="plan.contextoEscolar.areaFormacion"
          :options="AREAS_FORMACION_PRIMARIA"
          label="Área de Aprendizaje *"
          use-input
          new-value-mode="add-unique"
          outlined
          dense
          @update:model-value="guardar"
        />
        <q-select
          v-else
          v-model="plan.contextoEscolar.areaFormacion"
          :options="AREAS_FORMACION_MEDIA"
          label="Área de Formación / Especialidad *"
          use-input
          new-value-mode="add-unique"
          outlined
          dense
          @update:model-value="guardar"
        />
      </div>
    </div>

    <q-separator class="q-my-sm" />

    <div class="text-subtitle2 text-weight-bold text-primary q-mb-xs">Proyecto Educativo Integral Comunitario (PEIC)</div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-input v-model="plan.contextoEscolar.peicNombre" label="Nombre del PEIC *" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="plan.contextoEscolar.peicProposito" label="Propósito articulado al aula" outlined dense autogrow @update:model-value="guardar" />
      </div>
    </div>

    <div class="row justify-end q-mt-md">
      <q-btn color="primary" label="Continuar a Plan Macro" icon-right="arrow_forward" no-caps @click="$emit('siguiente')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import {
  MOMENTOS_PEDAGOGICOS,
  AREAS_FORMACION_PRIMARIA,
  AREAS_FORMACION_MEDIA,
  GRADOS_PRIMARIA,
  ANIOS_MEDIA,
  SECCIONES
} from '../../constants/mppeCatalogos';

defineEmits<{
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
</style>
