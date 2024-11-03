import { IPCF, NutrientsType } from '../types';
import { RangeLimiter } from './RangeLimiter.class';

export class PCF extends Map<NutrientsType, RangeLimiter> implements IPCF {
  public merge(map: IPCF): void {
    for (const [key, newValue] of map.entries()) {
      const thisValue = this.get(key);
      if (thisValue) {
        thisValue.add(newValue.current);
      }
    }
  }
}
