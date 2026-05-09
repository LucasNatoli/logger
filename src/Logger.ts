import fs from "node:fs";
import path from "path";

type SeverityType = "info" | "warn" | "error";

function ensureFolder(folder: string) {
  try {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  } catch (error) {
    throw new Error("Folder doesn't exist.");
  }
}

export default class Logger {
  private readonly files: Record<SeverityType, string>;

  /**
   * Crea una instancia de Logger.
   *
   * @constructor
   * @param {string} baseName Base del nombre del archivo de log.
   * `Logger` agregará los sufijos (`_info`, `_warn` y `_error`) a la base según el tipo de log.
   *  Por ej:
   * ````js
   * new Logger("http")
   * ````
   * creará los archivos `http_info.log`, `http_warn.log`, `http_error.log`
   */
  constructor(baseName: string) {
    const logDir: string = process.env.LOG_FOLDER || path.resolve(".", "logs");
    ensureFolder(logDir);

    this.files = {
      info: path.join(logDir, `${baseName}_info.log`),
      warn: path.join(logDir, `${baseName}_warn.log`),
      error: path.join(logDir, `${baseName}_error.log`),
    };
  }

  /**
   * Escribe los datos `process` y `message` en el log que corresponda segun el parámetro `severity`.
   *
   * @param {SeverityType} severity tipo de mensaje que se escribira `info`, `warn`, `error`.
   * @param {string} process nombre del proceso que origina el mensaje.
   * @param {string} message descripción del evento que se agrega al log.
   */
  private _writeLog(severity: SeverityType, process: string, message: string) {
    const timestamp = Math.floor(Date.now());
    const line = `${timestamp} [${process}] ${message}\n`;
    const filePath = path.resolve(this.files[severity]);

    fs.appendFile(filePath, line, (err) => {
      if (err) console.error(`Error writing ${severity} log:`, err);
    });
  }

  /**
   * Agregar un mensaje al log de infomación
   *
   * @public
   * @param {string} process nombre del proceso que origina el mensaje.
   * @param {string} message descripción del evento que se agrega al log.
   */
  public info(process: string, message: string) {
    this._writeLog("info", process, message);
  }

  /**
   * Agregar un mensaje al log de alertas
   *
   * @public
   * @param {string} process nombre del proceso que origina el mensaje.
   * @param {string} message descripción del evento que se agrega al log.
   */
  public warn(process: string, message: string) {
    this._writeLog("warn", process, message);
  }

  /**
   * Agregar un mensaje al log de errores
   *
   * @public
   * @param {string} process nombre del proceso que origina el mensaje.
   * @param {string} message descripción del evento que se agrega al log.
   */
  public error(process: string, message: string) {
    this._writeLog("error", process, message);
  }
}
