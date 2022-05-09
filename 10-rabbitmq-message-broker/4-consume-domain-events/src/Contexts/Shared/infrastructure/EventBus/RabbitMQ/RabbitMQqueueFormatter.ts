export class RabbitMQqueueFormatter {
  constructor(private moduleName: string) {}

  format(value: string) {
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
    return `${this.moduleName}.${name}`;
  }
}
