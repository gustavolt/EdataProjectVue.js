const USER = "user";
const PROFILE = "profile"
import Router from '../router';

export default {
    getUser() {
        if(window.localStorage.getItem(USER) != 'undefined') {
            return JSON.parse(window.localStorage.getItem(USER));
        } else {
            window.localStorage.removeItem(USER);
            Router.push("/autenticacao/login");
            throw new Error("Usuário não logado. Por favor efeturar o login.")
        }
    },

    saveUser(user) {
        window.localStorage.setItem(USER, JSON.stringify(user));
    },

    saveProfile(user) {
        window.localStorage.setItem(PROFILE, JSON.stringify(user));
        this.getUser();
    },

    destroyUser() {
        window.localStorage.removeItem(USER);
        window.localStorage.removeItem(PROFILE);
    },

    isAuthenticated() {
        return window.localStorage.getItem(USER) && window.localStorage.getItem(USER) != 'undefined'
    },

    getTokenSession() {
        const user = getUser();

        if(!user) {
            throw new Error("Usuário não logado. Necessário efetuar o login.");
        }

        return {
            SessionID: user.SessionID,
            Token: user.Token
        }
    }
};