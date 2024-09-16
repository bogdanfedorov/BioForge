import { Vector3 } from 'three';

export type EntityType = 'unit' | 'base';
export class Entity {
  constructor(
    public readonly type: EntityType,
    public position: Vector3,
    private readonly rawName: string,
  ) {}

  get name() {
    return `${this.type}_${this.rawName}`;
  }
}

export enum PlayerKeys {
  // Player movment controll
  North = 'north',
  South = 'south',
  West = 'west',
  East = 'east',
}
