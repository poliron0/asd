export default class IdGenerator {
  public static generateId() {
      return Math.random().toString(36).substring(7)
  }
}