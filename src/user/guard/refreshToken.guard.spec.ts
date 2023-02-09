import { RefreshTokenGuard } from './refreshToken.guard';

describe('RefreshTokenGuard', () => {
  it('should be defined', () => {
    expect(new RefreshTokenGuard()).toBeDefined();
  });
});
