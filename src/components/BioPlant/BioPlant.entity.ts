import { FC } from 'react';
import { Vector3 } from 'three';
import { IBioPlant } from '../../types';
import { PCF } from '../../utils/PCF.class';
import { RangeLimiter } from '../../utils/RangeLimiter.class';
import { BioPlant } from './BioPlant';
import { BioPlantMenu } from './BioPlant.menu';

export class BioPlantEntiry implements IBioPlant {
  public static _id: number = 0;

  id: string;
  renderModel: FC<any> = BioPlant;
  renderMenu: FC<any> = BioPlantMenu;
  pcf: PCF = new PCF([
    ['protein', new RangeLimiter(0, 100)],
    ['carbohydrates', new RangeLimiter(0, 100)],
    ['fats', new RangeLimiter(0, 100)],
  ]);
  type: 'bioPlant' = 'bioPlant';
  growthStage: number = 0;

  constructor(
    public name: string = 'Bio Plant',
    public position: Vector3 = new Vector3(0, 0, 0),
    public health: number = 100,
    public maxHealth: number = 100,
    public energy: RangeLimiter = new RangeLimiter(0, 100),
  ) {
    this.id = String(BioPlantEntiry._id++);
  }
}
