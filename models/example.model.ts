export class SomeClass {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: boolean;
  prop5: number;
  prop6?: AnotherClass[] = [];

  constructor(data?: SomeInterface) {
    if (data) {
      this.prop1 = data.prop1;
      this.prop2 = data.prop2;
      this.prop3 = data.prop3;
      this.prop4 = !!data.prop4;
      this.prop5 = Number(data.prop5);
      this.prop6 = data.prop6 && data.prop6.map(w => new SomeClass(w)) || [];
    }
  }
}


export class AnotherClass {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: boolean;
  prop5: number;

  constructor(data?: AnotherClassInterface) {
    if (data) {
      this.prop1 = data.prop1;
      this.prop2 = data.prop2;
      this.prop3 = data.prop3;
      this.prop4 = !!data.prop4;
      this.prop5 = Number(data.prop5);
    }
  }
}

export interface SomeInterface {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: boolean;
  prop5: number;
  prop6?: SomeInterface[];
}
export interface AnotherClassInterface {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: boolean;
  prop5: number;
}

