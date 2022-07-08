import passport from 'passport';
import client from '../utils/redis';

export default {
  initialize: (app) => {
    app.use((req, res, next) => {
      try {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({
              message: 'Unauthorized',
            });
          }
          const token = req.cookies['api-auth'];

          client
            .get(String(user.id))
            .then((redisUser) => {
              if (!redisUser) return next(null);

              let parsedUserData = JSON.parse(redisUser);
              parsedUserData = parsedUserData[String(user.id)];

              if (parsedUserData && parsedUserData.includes(token)) {
                res.clearCookie('api-auth');
                return res.status(401).json({ message: 'Invalid Token!' });
              } else {
                return next();
              }
            })
            .catch((err) => {
              console.log('Error', err);
              return next(err);
            });
        })(req, res, next);
      } catch (err) {
        console.log(err);
        next(err);
      }
    });
  },
};
