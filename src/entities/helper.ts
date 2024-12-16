export class HelperDTO {
  public data() {
    return Object.keys(this).reduce((acc, key) => {
      acc[key] = (this as any)[key];
      return acc;
    }, {} as any);
  }
}
