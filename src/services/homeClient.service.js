import dataRepository from "../repository/data.repository";
import Helper from "../helpers/helper.service";
import ServiceResponseCode from "../models/service.response.code";
 
export default {
    async getClients() {
        try {
            const result = await dataRepository.getClients();    
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
    async deleteClient(clientId) {
        try {
            const result = await dataRepository.deleteClient(clientId);    
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
}