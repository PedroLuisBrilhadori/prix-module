export default abstract class SerialPort {
  on(event: "data", listener: (chunk: any) => void) {}
  write(
    chunk: any,
    encoding?: BufferEncoding,
    cb?: (error: Error | null | undefined) => void
  ) {}
}
