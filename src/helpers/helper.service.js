export default {
    getServiceResponse(response) {
        if(!response) {
            return {
                Code: -1,
                Title: "Not Found",
                Message: "Response not found",
                Success: false,
                Warning: false
            };
        }

        if(!response.error) {
            return {
                Code: 0,
                Title: "Success",
                Message: response.message ?? 'OK',
                Success: true,
                Warning: false,
                Data: response
            };
        } else {
            return {
                Code: 1,
                Title: "Error",
                Message: response.error,
                Success: false,
                Warning: false,
                Data: response
            };
        }
    },
    async getHttpErrror(response) {
        if(response.status == 200 || response.status == 201 || response.status == 202 || response.status == 206) {
            return null;
        }

        const text = await response.text();

        if(text) {
            try {
                return JSON.parse(text);
            } catch(e) {
                return text;
            }
        }

        switch(response.status) {
            case 401:
                if(response.type == "cors") {
                    return "URL não liberada pelo CORS para acesso ao sistema" + (text ? " (" + text + ")" : "") + ".";
                } else {
                    return "Acesso não autorizado" + (text ? " (" + text + ")" : "") + "."
                }
            default:
                return ("Status: " + response.status + " - Type: " + response.type + ".");

        }
    },
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    isResponsive() {
        return window.innerWidth <= 992;
    },
    getURLParams(params = []) {
        if(!params) {
            return '';
        }

        params = params.filter(p => p.Name && p.Value);

        if(params.length == 0) {
            return '';
        }

        let queryString = '?';

        params.forEach(param => {
            queryString += (queryString == '?' ? '' : '&') + param.Name + '=' + encodeURI(param.Value);
        });

        return queryString;
    },
    validateMail(email) {
        if(!email) {
            return false;
        }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validarCPFExistente(cpf) {
        if (this.validarCPF(cpf)) {
        } else {
            return false;
        }
        return true;
    },
    validarCPF(CPF) {
        const { cpf } = require("cpf-cnpj-validator");

        CPF = CPF != null ? CPF.replaceAll(".", "").replaceAll("-", "") : CPF;

        if (cpf.isValid(CPF)) {
            return true;
        } else {
            return false;
        }
    },
}