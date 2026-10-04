import Dexie, { type EntityTable } from 'dexie';
import type { PlanificacionDocente, EstadoPlanificacion } from '../types/planificacion';

export class PlanificadorDatabase extends Dexie {
  planificaciones!: EntityTable<PlanificacionDocente, 'id'>;

  constructor() {
    super('PlanificadorDocenteMPPE_DB');
    this.version(1).stores({
      planificaciones: 'id, estado, subsistema, updatedAt, version, tipoPlan'
    });
  }
}

export const db = new PlanificadorDatabase();

// Métodos auxiliares para consultas rápidas
export async function dbGuardarPlan(plan: PlanificacionDocente): Promise<string> {
  const planClone = JSON.parse(JSON.stringify(plan));
  planClone.updatedAt = new Date().toISOString();
  await db.planificaciones.put(planClone);
  return planClone.id;
}

export async function dbObtenerTodos(): Promise<PlanificacionDocente[]> {
  return await db.planificaciones.orderBy('updatedAt').reverse().toArray();
}

export async function dbObtenerPorEstado(estado: EstadoPlanificacion): Promise<PlanificacionDocente[]> {
  return await db.planificaciones.where('estado').equals(estado).reverse().sortBy('updatedAt');
}

export async function dbObtenerPlan(id: string): Promise<PlanificacionDocente | undefined> {
  return await db.planificaciones.get(id);
}

export async function dbEliminarPlan(id: string): Promise<void> {
  await db.planificaciones.delete(id);
}

export async function dbContarEstados(): Promise<{ borrador: number; por_corregir: number; corregida: number }> {
  const todos = await db.planificaciones.toArray();
  return {
    borrador: todos.filter(p => p.estado === 'borrador').length,
    por_corregir: todos.filter(p => p.estado === 'por_corregir').length,
    corregida: todos.filter(p => p.estado === 'corregida').length
  };
}
