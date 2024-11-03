import { useState } from 'react';

export class RangeLimiter {
  public current: number;
  public max: number;

  constructor(initial: number, max: number) {
    this.current = initial;
    this.max = max;
  }

  add(value: number) {
    this.current = Math.min(this.current + value, this.max);
  }

  // Optionally, a method to check percentage
  percentage(): number {
    return (this.current / this.max) * 100;
  }
}
