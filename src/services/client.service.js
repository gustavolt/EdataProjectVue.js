import dataRepository from "../repository/data.repository";
import Helper from "../helpers/helper.service";
import ServiceResponseCode from "../models/service.response.code";

export default {
    async registerClient(name, lastName, cpf, email, birthDate) {
        try {
            const result = await dataRepository.registerClient(name, lastName, cpf, email, birthDate);    
            return Helper.getServiceResponse(result);
        } catch(e) {    
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    },
    async updateClient(clientId, name, lastName, cpf, email, birthDate) {
        try {
            const result = await dataRepository.updateClient(clientId, name, lastName, cpf, email, birthDate);    
            return Helper.getServiceResponse(result);
        } catch(e) {    
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    },
    async getClientById(clientId) {
        try {
            const result = await dataRepository.getClientById(clientId);    
            return Helper.getServiceResponse(result);;
        } catch(e) {    
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    },
}
