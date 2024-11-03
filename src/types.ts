import { FC } from 'react';
import { Vector3 } from 'three';
import { RangeLimiter } from './utils/RangeLimiter.class';

export type NutrientsType = 'protein' | 'carbohydrates' | 'fats';

export type EntityType = 'bioPlant' | 'harvester' | 'storage' | 'processor';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  position: Vector3;
  health: number;
  maxHealth: number;

  renderModel: FC;
  renderMenu: FC;
}

export interface HasEnergy {
  energy: RangeLimiter;
}

export interface IPCF extends Map<NutrientsType, RangeLimiter> {
  merge(map: IPCF): void;
}

export interface HasNutrients {
  pcf: IPCF;
}

export type FullEntity = Entity & Partial<HasEnergy & HasNutrients>;

export interface IBioPlant extends Entity, HasEnergy, HasNutrients {
  type: 'bioPlant';
  growthStage: number;
}

export interface IHarvester extends Entity {
  type: 'harvester';
  harvestRate: number;
  capacity: number;
  currentLoad: Partial<Record<NutrientsType, number>>;
}

export interface IStorage extends Entity {
  type: 'storage';
  capacity: number;
  currentStorage: Partial<Record<NutrientsType, number>>;
}

export interface IProcessor extends Entity {
  type: 'processor';
  inputRate: Partial<Record<NutrientsType, number>>;
  outputRate: Partial<Record<NutrientsType, number>>;
}

export type GameEntity = IBioPlant | IHarvester | IStorage | IProcessor;

export interface GameState {
  entities: GameEntity[];
  resources: Record<NutrientsType, number>;
  selectedEntity: GameEntity | null;
  gameTime: number;
}

export interface BaseEntityTypeProps<E extends Entity = Entity> {
  entity: E;
}

export enum PlayerKeys {
  North = 'north',
  South = 'south',
  West = 'west',
  East = 'east',
  Escape = 'escape',
}

export type ActionOnFinishEvents = 'restart' | 'stop';

export interface IAction {
  titile: string;
  atpCost: number;
  onFinish: ActionOnFinishEvents;
}
