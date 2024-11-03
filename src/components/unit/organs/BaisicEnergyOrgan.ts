import { Action } from '../Action';
import { EPCF, IAction, IOrgan, IUnit } from '../types';

export class BaisicEnergyOrgan implements IOrgan {
  avilableActions: IAction[] = [];
  currentAction: IAction | null = null;

  constructor() {
    this.avilableActions.push(new Action('Burn psf', 0, 'restart'));
    const actionTest = {
      title: 'Burn psf',
      time: 2500,
      func(unit: IUnit) {
        const randomSubstance = unit.pcf.getRandomKey();
        const substanceValue = unit.pcf.get(randomSubstance);

        unit.pcf.entries();
        unit.atp;
      },
    };
  }

  runCurrentAction(unit: IUnit): void {
    // for first time all PSF convert to ATF using specific organ but coficient  0.1 - 0.25 speed 0.25,
  }
}
