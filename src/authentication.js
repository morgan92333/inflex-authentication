import passport from 'passport';

import loginWithApi from './middleware/login-with-api';
import defendWithJwt from './middleware/defend-with-jwt';

import {
    loginRoute,
    logoutRoute,
    refreshTokenRoute
} from './route';
import {
    getConfig,
    setConfig
} from './config';

/**
 * Set authentication module's config or get value from config
 */
export function authConfig (configOrKey) {
    let type = typeof configOrKey;

    if (type === 'string') {
        return getConfig(configOrKey);
    } else if (type === 'object') { console.log(type);
        setConfig(configOrKey);
    }
}

/**
 * Add passport to express middleware
 */
export function authExpress (app) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
}

/**
 * Create default routes for login if we are lazy
 */
export function authRoutes (app) {
    loginRoute(app);

    logoutRoute(app);

    refreshTokenRoute(app);
}

export function authMiddleware (type, options, middleware) {
    switch (type) {
        case 'auth.api':
            return loginWithApi(options, middleware);
        case 'defend.jwt':
            return defendWithJwt(options, middleware);
    }
}