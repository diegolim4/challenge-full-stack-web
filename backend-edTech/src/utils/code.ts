export class CodeGeneratorService {
  
  public static generate(): number {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000)
    return Number(`${year}${random}`);
  }
}