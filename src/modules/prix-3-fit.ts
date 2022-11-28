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

    const weigth = this.santinizeWeight(this.data.pop());

    return weigth;
  }

  async setPrice(price: number) {
    const value = this.santinizePrice(price);

    this.connection.write(value, "ascii", (error) => {
      if (error) {
        throw new Error(`Error [name: ${error?.name}]: \n${error?.message}`);
      }
    });

    await timeout(200);

    const response = this.data.pop();

    if (response === this.nak) {
      throw new Error(`Um erro ocorreu ao enviar o preço`);
    }
  }

  setTare(tare: number) {}

  /** clean response [STX]000000[ETX] to number */
  private santinizeWeight(value: string): number {
    return Number(value.replace(this.stx, "").replace(this.etx, ""));
  }

  /** transform price 3.50 to [STX]000350[ETX] */
  private santinizePrice(value: number): string {
    let price: string = String(value);

    if (price.includes(".")) {
      price = price.replace(".", "");
      if (price.length <= 2) price += "0";
    }

    let zero = "";

    for (let i = 0; i < 6 - price.length; i++) {
      zero += "0";
    }

    price = zero + price;

    console.log(price);

    return `${this.stx}${price}${this.etx}`;
  }
}
