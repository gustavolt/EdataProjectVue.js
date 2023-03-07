import store from "../../store";

export default {
    swalFromServiceResponse(serviceResponse, confirm = false, cancel = false, textConfirm = null, textCancel = null) {
        store.commit("addToaster", {
            title: serviceResponse.Title,
            text: serviceResponse.Message,
            type: serviceResponse.Success ? "success" : (serviceResponse.Warning ? "warning" : "error"),
            confirm: confirm,
            cancel: cancel,
            textConfirm: textConfirm,
            textCancel: textCancel,
        });
    }
}