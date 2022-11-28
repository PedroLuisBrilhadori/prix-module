import { SerialPort } from "serialport";
import timeout from "../utils/timeout";

export default class Prix3Fit {
  connection: SerialPort;

  data: string[] = [];

  constructor(connection: SerialPort) {
    this.connection = connection;

    this.connection.on("data", (data) => {
      this.data.push(data?.toString());
    });
  }

  private enq = "\x05";

  private stx = "\x02";

  private etx = "\x03";

  private ack = "\x06";

  private nak = "\x15";

  async getWeigth(): Promise<number> {
    this.connection.write(this.enq, "ascii", (error) => {
      if (error)
        throw new Error(`Error [name: ${error?.name}]: \n${error?.message}`);
    });

    await timeout(200);

    const weigth: string = this.data[this.data.length - 1]
      .replace(this.stx, "")
      .replace(this.etx, "");

    return Number(weigth);
  }

  setPrice(price: number) {}

  setTare(tare: number) {}
}
