import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Appmodule (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3001);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('Authenticate', () => {
    const name = 'teste';
    const data = { email: 'teste@igor.com', password: 'QXD*ver3jwy3ndr*pwg' };

    describe('SignUp', () => {
      it('/auth/signup (POST)', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({ ...data, name })
          .expect(201);
      });
    });

    describe('SignIn', () => {
      it('/auth/signin (POST)', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send(data)
          .expect(200)
          .then(({ body }) => {
            accessToken = body.access_token;
            refreshToken = body.refresh_token;
          });
      });
    });

    describe('RefreshToken', () => {
      it('/auth/refresh (GET)', () => {
        return request(app.getHttpServer())
          .get('/auth/refresh')
          .set('Authorization', `Bearer ${refreshToken}`)
          .expect(200)
          .then(({ body }) => {
            accessToken = body.access_token;
            refreshToken = body.refresh_token;
          });
      });
    });

    // describe('Logout', () => {
    //   it('/auth/logout (GET)', () => {
    //     return request(app.getHttpServer())
    //       .get('/auth/logout')
    //       .set('Authorization', `Bearer ${accessToken}`)
    //       .expect(200);
    //   });
    // });
  });

  describe('User', () => {
    describe('GetUser', () => {
      it('/user (GET)', () => {
        return request(app.getHttpServer())
          .get('/user')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });

    describe('UpdateUser', () => {
      it('/user (PATCH)', () => {
        return request(app.getHttpServer())
          .patch('/user')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ name: 'teste2' })
          .expect(200);
      });
    });

    describe('DeleteUser', () => {
      it('/user (DELETE)', () => {
        return request(app.getHttpServer())
          .delete('/user')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });
  });
});
