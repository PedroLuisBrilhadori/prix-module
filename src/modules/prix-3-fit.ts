import { SerialPort } from "serialport";
import timeout from "../utils/timeout";

export default class Prix3Fit {
  private connection: SerialPort;

  private data: string[] = [];

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

  private soh = "\x01";

  /**
   * send [ENQ] to recive [STX]PPPPPP[ETX] from scale
   * @returns a promise of weigth
   */
  async getWeigth(): Promise<number> {
    this.connection.write(this.enq, "ascii", (error) => {
      if (error) this.prixError(error);
    });

    await timeout(200);

    const weigth = this.santinizeWeight(this.data.pop());

    return weigth;
  }

  /**
   * send [STX]PPPPPP[ETX] to set price in scale
   * @param price a price to set in scale
   */
  async setPrice(price: number) {
    const value = this.santinizePrice(price);

    this.connection.write(value, "ascii", (error) => {
      if (error) this.prixError(error);
    });

    await timeout(200);

    const response = this.data.pop();

    if (response === this.nak) {
      this.prixError(`Um erro ocorreu ao enviar o preço`);
    }
  }

  /**
   * send [SOH]WWWWWW[ETX] to set tare in scale
   * @param tare a tare to set in scale
   */
  async setTare(tare: number) {
    const value = this.santinizeTare(tare);

    this.connection.write(value, "ascii", (error) => {
      if (error) this.prixError(error);
    });

    await timeout(300);

    const response = this.data.pop();

    if (response === this.nak) {
      this.prixError(`Um erro ocorreu ao enviar a tara`);
    }
  }

  /** clean response [STX]000000[ETX] to number */
  private santinizeWeight(value: string): number {
    return Number(value.replace(this.stx, "").replace(this.etx, ""));
  }

  /** transform price 3.5 to [STX]000350[ETX] */
  private santinizePrice(value: number): string {
    let price = this.decimalToString(value);

    price = this.addLeftZeros(price);

    return `${this.stx}${price}${this.etx}`;
  }

  /** transform tare 3.5 to [SOH]000350[ETX] */
  private santinizeTare(value: number): string {
    let tare = this.decimalToString(value);
    tare = this.addLeftZeros(tare);

    return `${this.soh}${tare}${this.etx}`;
  }

  /** add left zeros in number string */
  private addLeftZeros(value: string): string {
    let zero = "";

    for (let i = 0; i < 6 - value.length; i++) {
      zero += "0";
    }

    return zero + value;
  }

  /** transform 3.5 to 350 */
  private decimalToString(value: number): string {
    let number: string = String(value);

    if (number.includes(".")) {
      if (number.split(".")[1].length < 2) number += "0";
      number = number.replace(".", "");
    }

    return number;
  }

  private prixError(error: Error | string) {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw new Error(`Error [name ${error.name}]: \n${error.message}`);
  }
}
