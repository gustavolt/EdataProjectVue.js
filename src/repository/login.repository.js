import api from "../helpers/api.service";
import endpoints from "../models/api/api.endpoints";

export default {
    async Login(login, password) {
        const data = {
            email: login,
            password: password
        }

        const loginResult = await api.login(endpoints.Login_Login, data);
        return loginResult;
    },
}