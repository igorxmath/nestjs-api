import { AccessTokenGuard } from './AccessTokenGuard.guard';

describe('AccessTokenGuard', () => {
  it('should be defined', () => {
    expect(new AccessTokenGuard()).toBeDefined();
  });
});
