import { ActionOnFinishEvents, IAction } from './types';

export class Action implements IAction {
  constructor(
    public readonly titile: string,
    public readonly atpCost: number,
    public readonly onFinish: ActionOnFinishEvents,
  ) {}

  run() {}
}
