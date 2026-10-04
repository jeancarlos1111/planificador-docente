<template>
  <q-card flat bordered class="bg-surface q-pa-sm q-pa-md-md">
    <div class="row items-center justify-between q-mb-sm">
      <div>
        <div class="text-subtitle1 text-weight-bold text-primary">
          4. Plan de Evaluación Oficial (Cronograma de Evaluaciones)
        </div>
        <div class="text-caption text-grey-7">
          Tema, sustento científico, actividad, técnica, instrumento, ponderación (%) y escala 1-20 pts.
        </div>
      </div>

      <div class="row q-gutter-xs">
        <q-btn
          color="primary"
          flat
          dense
          no-caps
          icon="calculate"
          label="Ajustar Puntaje (1-20)"
          @click="planStore.autoAjustarPuntajes"
        />
        <q-btn
          color="secondary"
          icon="add"
          label="Agregar Actividad"
          no-caps
          size="sm"
          @click="planStore.agregarEvaluacion"
        />
      </div>
    </div>

    <!-- Barra de validación de sumatoria -->
    <div class="row items-center justify-between q-mb-sm q-pa-xs q-px-sm rounded-borders" :class="esPonderacionValida ? 'bg-positive-light' : 'bg-warning-light'">
      <div class="row items-center q-gutter-xs">
        <q-icon :name="esPonderacionValida ? 'check_circle' : 'warning'" :color="esPonderacionValida ? 'positive' : 'warning'" size="20px" />
        <span class="text-weight-bold text-caption">
          Ponderación: <span :class="esPonderacionValida ? 'text-positive' : 'text-negative'">{{ totalPonderacion }}% / 100%</span>
          • Puntaje: <span :class="esPuntajeValido ? 'text-positive' : 'text-negative'">{{ totalPuntaje }} / 20 Pts</span>
        </span>
      </div>
    </div>

    <!-- Actividades de evaluación -->
    <div
      v-for="(act, aIdx) in plan.planEvaluacion"
      :key="act.id || aIdx"
      class="q-pa-sm q-mb-sm rounded-borders card-evaluacion shadow-1"
    >
      <div class="row items-center justify-between q-mb-xs">
        <div class="row items-center q-gutter-xs">
          <q-badge color="primary" class="q-pa-xs text-weight-bold">Actividad #{{ aIdx + 1 }}</q-badge>
          <q-chip size="xs" outline color="blue-8">{{ act.formaParticipacion }}</q-chip>
        </div>
        <div class="row items-center q-gutter-xs">
          <span class="text-weight-bold text-caption text-primary">
            {{ act.ponderacionPorcentaje }}% ({{ act.puntaje }} pts)
          </span>
          <q-btn
            v-if="plan.planEvaluacion.length > 1"
            flat
            round
            dense
            color="negative"
            icon="delete"
            size="xs"
            @click="planStore.eliminarEvaluacion(aIdx)"
          />
        </div>
      </div>

      <div class="row q-col-gutter-xs">
        <div class="col-12 col-md-4">
          <q-input v-model="act.tema" label="Tema Curricular *" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-12 col-md-5">
          <q-input v-model="act.referenteTeorico" label="Referente Teórico (Sustento Científico) *" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-12 col-md-3">
          <q-input v-model="act.fechaEstimada" label="Fecha Estimada *" type="date" stack-label outlined dense @update:model-value="guardar" />
        </div>

        <div class="col-12 col-md-5">
          <q-input v-model="act.estrategiaEvaluacion" label="Estrategia (Actividad a Realizar) *" placeholder="Ej. Taller, debate, informe..." outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-12 col-md-4">
          <q-select v-model="act.tecnicaEvaluacion" :options="TECNICAS_EVALUACION" label="Técnica de Evaluación *" use-input new-value-mode="add-unique" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-12 col-md-3">
          <q-select v-model="act.instrumentoEvaluacion" :options="INSTRUMENTOS_EVALUACION" label="Instrumento de Registro *" use-input new-value-mode="add-unique" outlined dense @update:model-value="guardar" />
        </div>

        <div class="col-6 col-md-4">
          <q-select v-model="act.formaParticipacion" :options="FORMAS_PARTICIPACION" label="Participación" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-3 col-md-2">
          <q-input v-model.number="act.ponderacionPorcentaje" label="Pond (%)" type="number" outlined dense @update:model-value="alCambiarPorcentaje(act)" />
        </div>
        <div class="col-3 col-md-2">
          <q-input v-model.number="act.puntaje" label="Puntos (1-20)" type="number" step="0.5" outlined dense @update:model-value="guardar" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model="act.criteriosIndicadores" label="Criterios e Indicadores" placeholder="Criterios a considerar..." outlined dense @update:model-value="guardar" />
        </div>
      </div>
    </div>

    <!-- Firmas Oficiales -->
    <q-separator class="q-my-sm" />
    <div class="text-subtitle2 text-weight-bold text-primary q-mb-xs">Firmas Administrativas</div>
    <div class="row q-col-gutter-xs">
      <div class="col-12 col-md-4">
        <q-input v-model="plan.firmas.docenteAula" label="Docente de Aula (Firma)" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="plan.firmas.coordinacionPedagogica" label="Coordinación Pedagógica" outlined dense @update:model-value="guardar" />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="plan.firmas.direccionPlantel" label="Dirección del Plantel" outlined dense @update:model-value="guardar" />
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <q-btn flat color="grey-8" label="Atrás" no-caps @click="$emit('anterior')" />
      <q-btn color="primary" label="Ir a Plan de Acción" icon-right="arrow_forward" no-caps @click="$emit('siguiente')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import type { EvaluacionActividad } from '../../types/planificacion';
import {
  FORMAS_PARTICIPACION,
  TECNICAS_EVALUACION,
  INSTRUMENTOS_EVALUACION
} from '../../constants/mppeCatalogos';

defineEmits<{
  (e: 'anterior'): void;
  (e: 'siguiente'): void;
}>();

const planStore = usePlanificacionStore();
const { plan, totalPonderacion, totalPuntaje, esPonderacionValida, esPuntajeValido } = storeToRefs(planStore);

function guardar() {
  planStore.guardarEnLocalStorage();
}

function alCambiarPorcentaje(act: EvaluacionActividad) {
  const porcentaje = Number(act.ponderacionPorcentaje) || 0;
  act.puntaje = Number(((porcentaje * 20) / 100).toFixed(1));
  guardar();
}
</script>

<style scoped>
.bg-surface {
  background-color: #ffffff;
}
body.body--dark .bg-surface {
  background-color: #1e1e2d;
}
.card-evaluacion {
  border: 1px solid #e2e8f0;
}
body.body--dark .card-evaluacion {
  border-color: #334155;
}
.bg-positive-light {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
}
.bg-warning-light {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
}
</style>
