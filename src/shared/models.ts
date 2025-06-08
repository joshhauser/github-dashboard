export interface LanguageUsage {
  language: string;
  usage: number;
}

export class Color {
  r: number;
  g: number;
  b: number;
  a?: number;

  constructor(r: number, g: number, b: number, a?: number = 0.5) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  toStringWithTransparency() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a}})`;
  }
}
