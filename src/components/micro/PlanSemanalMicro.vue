<template>
  <q-card flat bordered class="bg-surface q-pa-xs q-pa-sm-sm q-pa-md-md mobile-card">
    <!-- Header de Micro (Adaptable a Teléfonos) -->
    <div class="row items-center justify-between q-mb-sm q-px-xs">
      <div>
        <div class="text-subtitle1 text-weight-bolder text-primary row items-center q-gutter-xs">
          <q-icon name="view_timeline" color="primary" size="22px" />
          <span>3. Plan Semanal</span>
        </div>
        <div class="text-caption text-grey-7" style="font-size: 11px;">
          Clases con Inicio, Desarrollo, Cierre y Recursos.
        </div>
      </div>

      <!-- Botones de Acción (Scroll Horizontal Suave en Móvil) -->
      <div class="row q-gutter-xs q-mt-xs">
        <q-btn
          color="primary"
          icon="picture_as_pdf"
          label="Ver PDF"
          dense
          no-caps
          size="sm"
          class="q-px-sm"
          @click="$emit('ver-formato-semanal')"
        >
          <q-tooltip>Ver e imprimir el Formato Oficial de Planificación Semanal</q-tooltip>
        </q-btn>
        <q-btn
          color="indigo-9"
          outline
          icon="auto_fix_high"
          dense
          label="Generador"
          no-caps
          size="sm"
          class="q-px-sm"
          @click="$emit('abrir-generador')"
        />
        <q-btn
          color="secondary"
          icon="add"
          dense
          label="Semana"
          no-caps
          size="sm"
          class="q-px-sm"
          @click="planStore.agregarSemanaMicro"
        />
      </div>
    </div>

    <!-- Lista de Semanas Didácticas -->
    <div
      v-for="(semana, sIdx) in plan.semanasMicro"
      :key="semana.id"
      class="q-mb-md rounded-borders bg-grey-1 dark-bg-grey-9 border-semana shadow-1"
      style="border-radius: 14px; overflow: hidden;"
    >
      <!-- Barra de la Semana -->
      <div class="row items-center justify-between semana-barra-header q-pa-xs q-px-sm text-white">
        <div class="row items-center q-gutter-xs">
          <q-icon name="date_range" size="18px" />
          <span class="text-weight-bolder text-caption">SEMANA {{ semana.numeroSemana }}</span>
          <q-input
            v-model="semana.rangoFechas"
            dark
            dense
            borderless
            class="q-ml-xs text-caption"
            style="min-width: 130px; font-size: 12px;"
            placeholder="06/10 al 10/10"
            @update:model-value="guardar"
          />
        </div>

        <div class="row items-center q-gutter-xs">
          <q-btn
            flat
            dense
            color="white"
            icon="add"
            label="Clase"
            no-caps
            size="xs"
            class="q-px-xs bg-white-10"
            @click="planStore.agregarClaseASemana(sIdx)"
          />
          <q-btn
            v-if="plan.semanasMicro.length > 1"
            flat
            round
            dense
            color="white"
            icon="delete_outline"
            size="xs"
            @click="planStore.eliminarSemanaMicro(sIdx)"
          >
            <q-tooltip>Eliminar semana</q-tooltip>
          </q-btn>
        </div>
      </div>

      <div class="q-pa-xs q-pa-sm-sm">
        <!-- CUADRO CURRICULAR DE LA SEMANA (Colapsable en Móvil) -->
        <q-card flat bordered class="q-mb-sm bg-white dark-bg-grey-10 card-cuadro-curricular">
          <div
            class="row items-center justify-between q-px-sm q-py-xs bg-blue-1 dark-bg-blue-10 text-primary dark-text-blue-1 cursor-pointer"
            @click="alternarCuadro(sIdx)"
          >
            <div class="row items-center q-gutter-xs">
              <q-icon
                :name="estaColapsado(sIdx) ? 'expand_more' : 'expand_less'"
                size="18px"
              />
              <q-icon name="view_module" size="16px" />
              <span class="text-caption text-weight-bolder">CUADRO CURRICULAR OFICIAL</span>
            </div>
            <q-btn
              flat
              dense
              size="xs"
              color="primary"
              icon="sync"
              label="Sincronizar"
              no-caps
              @click.stop="planStore.sincronizarCurriculoSemana(sIdx)"
            >
              <q-tooltip>Copiar datos de Identificación, Lapso y Articulación</q-tooltip>
            </q-btn>
          </div>

          <q-slide-transition>
            <div v-show="!estaColapsado(sIdx)" class="q-pa-xs q-pa-sm-sm">
              <!-- Fila 1: Grado, Sección, Área -->
              <div class="row q-col-gutter-xs q-mb-xs">
                <div class="col-12 col-sm-4">
                  <q-input
                    v-model="semana.gradoAnio"
                    :placeholder="plan.contextoEscolar.gradoAnio || 'Ej. 3er Año'"
                    label="Grado / Año *"
                    dense
                    outlined
                    @update:model-value="guardar"
                  />
                </div>
                <div class="col-12 col-sm-3">
                  <q-input
                    v-model="semana.seccion"
                    :placeholder="plan.contextoEscolar.seccion || 'Ej. A'"
                    label="Sección *"
                    dense
                    outlined
                    @update:model-value="guardar"
                  />
                </div>
                <div class="col-12 col-sm-5">
                  <q-input
                    v-model="semana.areaFormacion"
                    :placeholder="plan.contextoEscolar.areaFormacion || 'Ej. Ciencias Naturales'"
                    label="Área de Formación *"
                    dense
                    outlined
                    @update:model-value="guardar"
                  />
                </div>
              </div>

              <!-- Fila 2: Referente Teórico y Competencia -->
              <div class="row q-col-gutter-xs q-mb-xs">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="semana.referenteTeorico"
                    label="Referente Teórico - Práctico *"
                    placeholder="Ej. Postulados de la teoría celular, ultraestructura y uso de microscopio..."
                    type="textarea"
                    rows="2"
                    dense
                    outlined
                    autogrow
                    @update:model-value="guardar"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="semana.competencia"
                    label="Competencia a Desarrollar *"
                    placeholder="Ej. Analiza los postulados de la teoría celular y compara estructuras celulares..."
                    type="textarea"
                    rows="2"
                    dense
                    outlined
                    autogrow
                    @update:model-value="guardar"
                  />
                </div>
              </div>

              <!-- Fila 3: Tema Generador y Tejido Temático -->
              <div class="row q-col-gutter-xs">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="semana.temaGenerador"
                    label="Tema Generador *"
                    placeholder="Ej. El agua y los componentes celulares: bases biomoleculares..."
                    type="textarea"
                    rows="2"
                    dense
                    outlined
                    autogrow
                    @update:model-value="guardar"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="semana.tejidoTematico"
                    label="Tejido Temático *"
                    placeholder="Ej. Estructura celular procariota y eucariota..."
                    type="textarea"
                    rows="2"
                    dense
                    outlined
                    autogrow
                    @update:model-value="guardar"
                  />
                </div>
              </div>
            </div>
          </q-slide-transition>
        </q-card>

        <!-- Titular de Momentos -->
        <div class="text-caption text-weight-bolder text-grey-8 dark-text-grey-3 q-my-xs q-px-xs row items-center">
          <q-icon name="schedule" class="q-mr-xs text-primary" size="16px" />
          <span>CLASES PLANIFICADAS ({{ semana.clases.length }})</span>
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
    </div>

    <!-- Navegación inferior entre pestañas -->
    <div class="row justify-between q-mt-md q-px-xs">
      <q-btn flat color="grey-8" label="Atrás" icon="arrow_back" no-caps @click="$emit('anterior')" />
      <q-btn color="primary" label="Evaluación" icon-right="arrow_forward" no-caps @click="$emit('siguiente')" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlanificacionStore } from '../../stores/usePlanificacionStore';
import ClaseItemCard from './ClaseItemCard.vue';

defineEmits<{
  (e: 'anterior'): void;
  (e: 'siguiente'): void;
  (e: 'abrir-generador'): void;
  (e: 'ver-formato-semanal'): void;
}>();

const planStore = usePlanificacionStore();
const { plan } = storeToRefs(planStore);

// Estado de colapso del cuadro curricular por cada semana (por defecto abierto)
const cuadrosColapsados = ref<Record<number, boolean>>({});

function alternarCuadro(idx: number) {
  cuadrosColapsados.value[idx] = !cuadrosColapsados.value[idx];
}

function estaColapsado(idx: number): boolean {
  return !!cuadrosColapsados.value[idx];
}

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

.semana-barra-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
}

.border-semana {
  border: 1px solid #cbd5e1;
}
body.body--dark .border-semana {
  border-color: #334155;
}

.card-cuadro-curricular {
  border-radius: 10px;
  overflow: hidden;
  border-color: #bfdbfe;
}
body.body--dark .card-cuadro-curricular {
  border-color: #1e3a8a;
}

.bg-white-10 {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}
</style>
