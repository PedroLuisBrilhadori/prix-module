import * as dotenv from "dotenv";
import { SerialPort } from "serialport";

import Prix3Fit from "./modules/prix-3-fit";

dotenv.config();

const balance = new Prix3Fit(
  new SerialPort({
    path: process.env.SERIAL_PORT,
    baudRate: Number(process.env.SERIAL_BAUDRATE),
  })
);

// balance.getWeigth().then((weigth) => console.log(weigth));

balance.setPrice(0);
