import * as dotenv from "dotenv";
import { SerialPort } from "serialport";

import { Prix3Fit } from "./index";

dotenv.config();

const { SERIAL_PATH, SERIAL_BAUDRATE } = process.env;

if (!SERIAL_PATH || !SERIAL_BAUDRATE)
  throw new Error(`Preencha as váriaveis de ambiente ""`);

const scale = new Prix3Fit(
  new SerialPort({
    path: SERIAL_PATH,
    baudRate: Number(SERIAL_BAUDRATE),
  })
);

scale.getWeigth().then((weigth) => console.log(weigth));
