import passport from 'passport'
// import User from '../model/User.model'

const handleJWT = (req, res, next, roles) => {
  return async (err, user, info) => {
    const error = err || info

    if (error || !user) return next(new Error('UnauthorizedError'))
    await req.logIn(user, { session: false })
    console.log(user.role, roles)

    if (!roles.reduce((acc, rec) => acc && user.role.some((t) => t === rec), true)) {
      return next(new Error('UnauthorizedError'))
    }
    req.user = user
    return next()
  }
}

const auth = (roles = []) => (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: true
    },
    handleJWT(req, res, next, roles)
  )(req, res, next)
}

export default auth
