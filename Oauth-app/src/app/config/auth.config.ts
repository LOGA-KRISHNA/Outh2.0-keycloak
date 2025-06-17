import { config } from "rxjs";

export const authConfig = {
    config: {
        authority: 'http://localhost:8181/realms/Demo',
        redirectUrl: window.location.origin,
        clientId: 'oauth-demo',
        scope: 'openid profile offline_access',
        responseType: 'code',
        useRefreshToken: true,
        secureRoutes: ['http://localhost:8080/api/v1'],
        postLogoutRedirectUri: 'http://localhost:4200',  // Add this for logout redirect
        // endpoints: {
        //     authorization: 'http://localhost:8181/realms/Demo/protocol/openid-connect/auth',
        //     token: 'http://localhost:8181/realms/Demo/protocol/openid-connect/token',
        //     userinfo: 'http://localhost:8181/realms/Demo/protocol/openid-connect/userinfo',
        //     endSession: 'http://localhost:8181/realms/Demo/protocol/openid-connect/logout'
        // }
    }
};