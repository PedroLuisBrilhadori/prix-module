import * as dotenv from "dotenv";

import { Prix3Fit, Prix3FitMock } from "../index";

dotenv.config();

const { SERIAL_PATH, SERIAL_BAUDRATE } = process.env;

if (!SERIAL_PATH || !SERIAL_BAUDRATE)
  throw new Error(`Preencha as váriaveis de ambiente ""`);

const scale = new Prix3Fit(new Prix3FitMock());

scale.getWeigth().then((weigth) => console.log(weigth));
