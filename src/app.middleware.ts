import type { INestApplication } from '@nestjs/common';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';

export function middleware(app: INestApplication): INestApplication {
  app.use(cors());
  app.use(helmet());
  app.use(session({
    // Requires 'store' setup for production
    secret: 'tEsTeD',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
}
