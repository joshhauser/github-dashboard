export class Utils {
  /**
   * Convert image buffer into a usable string for 'src' attribute of <img /> tag
   * @param buffer the buffer that contains image data
   */
  static convertImageBuffer(buffer: any) {
    return (
      'data:;base64,' +
      btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
    );
  }
}
