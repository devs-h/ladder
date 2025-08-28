import type { IBar, IPole } from "../types";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function polesToPixel(poles: IPole[], gap: number) {
  return poles.map((_, index) => ({ x: index * gap }));
}

export function barsToPixel(bars: IBar[], maxY: number) {
  return bars.map((bar) => ({ y: bar.y.map((y) => y * maxY) }));
}