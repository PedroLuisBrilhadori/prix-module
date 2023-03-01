import { EventEmitter } from "stream";
import SerialPort from "../models/serial.model";

export default class Prix3FitMock extends EventEmitter implements SerialPort {
  private enq = "\x05";

  private stx = "\x02";

  private etx = "\x03";

  private ack = "\x06";

  private nak = "\x15";

  private soh = "\x01";

  private _serialPath = "COM7";

  private _baudRate = 4800;

  private weight = `${this.stx}000500${this.etx}`;

  private price = "000350";

  private tare = "000000";

  private changeWeight() {
    const weights = [
      `${this.stx}001000${this.etx}`,
      `${this.stx}000000${this.etx}`,
      `${this.stx}002000${this.etx}`,
      `${this.stx}000300${this.etx}`,
      `${this.stx}000500${this.etx}`,
    ];

    return weights[Math.floor(Math.random() * weights.length)];
  }

  write(
    chunk: any,
    encoding?: BufferEncoding | undefined,
    cb?: ((error: Error | null | undefined) => void) | undefined
  ): void {
    if (!chunk) {
      this.emit("data", `${this.nak}`);
      return;
    }

    if (typeof chunk !== "string") return;

    if (chunk.includes(this.enq)) {
      const weight = this.getWeight();
      this.emit("data", weight);
      return;
    }

    if (chunk.includes(this.stx)) {
      const response = this.setPrice(chunk);
      this.emit("data", response);
      return;
    }

    if (chunk.includes(this.soh)) {
      const response = this.setTare(chunk);
      this.emit("data", response);
      return;
    }

    this.emit("data", `${this.stx}000500${this.etx}`);
  }

  private getWeight(): string {
    return this.changeWeight();
  }

  // TODO: criar verificação do preço recebido e retornar erros
  private setPrice(price: string): string {
    return this.ack;
  }

  // TODO: criar verificação do tare recebido e retornar erros
  private setTare(tare: string): string {
    return this.ack;
  }
}
