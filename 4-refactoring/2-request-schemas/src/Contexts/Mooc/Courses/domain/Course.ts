export class Course {
  readonly id: string;
  readonly name: string;
  readonly duration: string;

  constructor(params: { id: string, name: string, duration: string }) {
    this.id = params.id;
    this.name = params.name;
    this.duration = params.duration;
  }
}
