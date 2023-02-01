export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract update(id: string, dto: object): Promise<any>;
  abstract delete(id: string): Promise<any>;
  abstract findOneByEmail(email: string): Promise<any>;
  abstract findOneById(id: string): Promise<any>;
}
