export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract update(id: string, dto: object): Promise<any>;
  abstract delete(id: string): Promise<any>;
  abstract findByEmail(email: string): Promise<any>;
  abstract findById(id: string): Promise<any>;
}
