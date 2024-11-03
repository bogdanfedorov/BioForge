import { PCF } from './PCF';

interface BaseStr {
  psf: PCF;
  neurons: number; //this need for reserch
  bioAugmentation: []; // array of bioaugmentation
}
// atf - adinozite 3 fosfat (energy)
// Reserch: atf -> knolage points

// BurnShugar: shugar -> atf (speed 1, coficient 1)
// BurnFat: fat -> atf (speed 0.5, coficient 1)
// BurnProtein: protein -> atf (speed 0.5, coficient 0.5)

// StorageToFat: atf -> fat (speed 0.5, coficient 1)

// Create entity: atf + protein + ?fat -> entity

// Move: atf * massa -> new position

// Entitys
// 1. collector
// 2. basic medicant
//

class ReproductiveOrgan implements IOrgan {
  runAction(unit: IUnit): void {}
}

class Unit implements IUnit {
  constructor(
    public atp: number = 0,
    public pcf = new PCF(),
  ) {}
}
