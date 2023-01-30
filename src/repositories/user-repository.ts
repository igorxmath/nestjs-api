export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract findByEmail(email: string): Promise<any>;
}
