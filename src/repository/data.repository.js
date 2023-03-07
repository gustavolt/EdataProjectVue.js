import api from "../helpers/api.service";
import endpoints from "../models/api/api.endpoints";

export default {
    async registerClient(name, lastName, cpf, email,
        birthDate) {
        const data = {
            name: name,
            lastName : lastName,
            cpf: cpf,
            email : email,
            birthDate : birthDate
        }

        const url = `${endpoints.Data_SendData}`;

        const result = await api.post(url, data, false);
        return result;
    },
    async updateClient(clientId, name, lastName, cpf, email,
        birthDate) {
        const data = {
            id: clientId,
            name: name,
            lastName : lastName,
            cpf: cpf,
            email : email,
            birthDate : birthDate
        }

        const url = `${endpoints.Data_SendData}/${clientId}`;

        const result = await api.put(url, data, false);
        return result;
    },
    async deleteClient(clientId) {
        const url = `${endpoints.Data_SendData}/${clientId}`;
        const result = await api.delete(url, false);
        return result;
    },
    async getClients() {
        const url = `${endpoints.Data_GetData}`;

        const result = await api.get(url, false);
        return result;
    },
    async getClientById(clientId) {
        const url = `${endpoints.Data_GetData}/${clientId}`;

        const result = await api.get(url, false);
        return result;
    },
}