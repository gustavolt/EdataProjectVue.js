import loginRepository from "../repository/login.repository";
import Helper from "../helpers/helper.service";
import ServiceResponseCode from "../models/service.response.code";
import userService from "../helpers/user.service";

export default {
    async Login(login, password) {
        try {
            const result = await loginRepository.Login(login, password);

            if(!result.error) {
                await userService.saveUser(result);
            } else if(userService.getUser()) {
                userService.destroyUser();
            }
            
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
    async Logoff() {
        try{
            userService.destroyUser();                
            return {
                Code: 0,
                Title: "Success",
                Message: 'Ok',
                Success: true,
                Warning: false
            };
        } catch(e) {
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    }
}