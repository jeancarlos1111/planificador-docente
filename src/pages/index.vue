<template>
  <q-layout view="hHh lpR fFf" class="bg-base">
    <!-- HEADER INSTITUCIONAL -->
    <q-header elevated class="bg-institucional text-white">
      <q-toolbar class="q-py-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div class="row items-center q-gutter-sm q-ml-xs">
          <q-avatar size="36px" square>
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5 L85 20 V65 C85 90 50 115 50 115 C50 115 15 90 15 65 V20 L50 5 Z" fill="#1e3a8a" stroke="#d97706" stroke-width="4"/>
              <path d="M22 35 H78 V47 H22 Z" fill="#fbbf24"/>
              <path d="M22 47 H78 V59 H22 Z" fill="#2563eb"/>
              <path d="M22 59 H78 V71 H22 Z" fill="#dc2626"/>
            </svg>
          </q-avatar>
          <div>
            <q-toolbar-title class="text-weight-bolder text-body1 q-pa-none" style="line-height: 1.2;">
              Planificador Docente MPPE
            </q-toolbar-title>
            <div class="text-caption text-blue-2 gt-xs" style="font-size: 11px;">
              República Bolivariana de Venezuela • Currículo Nacional Bolivariano
            </div>
          </div>
        </div>

        <q-space />

        <!-- ACCIONES RÁPIDAS -->
        <div class="row items-center q-gutter-xs">
          <!-- Toggle Modo Oscuro -->
          <q-btn
            flat
            round
            dense
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            :color="$q.dark.isActive ? 'amber' : 'white'"
            @click="alternarModoOscuro"
          >
            <q-tooltip>{{ $q.dark.isActive ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro' }}</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- DRAWER LATERAL: GUÍA Y NORMATIVA -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="300"
      class="bg-drawer"
    >
      <div class="q-pa-md bg-primary text-white">
        <div class="text-subtitle2 text-weight-bold">Orientaciones MPPE</div>
        <div class="text-caption text-blue-1">Marco Legal y Pedagógico</div>
      </div>

      <q-scroll-area style="height: calc(100% - 90px);">
        <q-list padding>
          <q-item-label header class="text-weight-bold text-uppercase text-grey-7">
            Directrices Pedagógicas
          </q-item-label>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="menu_book" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Currículo Nacional Bolivariano</q-item-label>
              <q-item-label caption>Ejes integradores e intencionalidades</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="apartment" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Articulación con el PEIC</q-item-label>
              <q-item-label caption>La escuela como epicentro comunitario</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="grade" color="amber-9" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Escala de Evaluación Oficial</q-item-label>
              <q-item-label caption>1 a 20 puntos y 100% ponderación</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-sm" />

          <q-item-label header class="text-weight-bold text-uppercase text-grey-7">
            Subsistemas Educativos
          </q-item-label>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="auto_stories" color="deep-purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Educación Primaria</q-item-label>
              <q-item-label caption>Proyectos de Aprendizaje (PA) y Planes Integrales</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="school" color="indigo" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Educación Media General</q-item-label>
              <q-item-label caption>Temas Generadores y Referentes Teórico-Prácticos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="precision_manufacturing" color="cyan-8" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Educación Media Técnica</q-item-label>
              <q-item-label caption>Proyectos socioproductivos y áreas técnicas</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-sm" />

          <div class="q-pa-md text-caption text-grey-6 text-center">
            Sistema Adaptado a la Ley Orgánica de Educación (LOE) de la República Bolivariana de Venezuela.
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- CONTENEDOR DE PÁGINAS -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function alternarModoOscuro() {
  $q.dark.toggle();
}
</script>

<style scoped>
.bg-institucional {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #172554 100%);
  border-bottom: 3px solid #d97706;
}

.bg-base {
  background-color: #f8fafc;
  min-height: 100vh;
}

body.body--dark .bg-base {
  background-color: #0f172a;
}

.bg-drawer {
  background-color: #ffffff;
}

body.body--dark .bg-drawer {
  background-color: #1e293b;
}
</style>
