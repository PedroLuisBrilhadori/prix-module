import * as dotenv from "dotenv";
import { SerialPort } from "serialport";

import Prix3Fit from "./modules/prix-3-fit";

dotenv.config();

const scale = new Prix3Fit(
  new SerialPort({
    path: process.env.SERIAL_PORT,
    baudRate: Number(process.env.SERIAL_BAUDRATE),
  })
);

// scale.getWeigth().then((weigth) => console.log(weigth));

scale.setPrice(0);
