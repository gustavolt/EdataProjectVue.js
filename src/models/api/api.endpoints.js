const APIBaseEndpoints = {
    LoginController: 'Token',
    DataController: 'Clients'
}

const APIEndpoints = {
    Login_Login: APIBaseEndpoints.LoginController + '/LoginUser',
    Data_GetData: APIBaseEndpoints.DataController,
    Data_SendData: APIBaseEndpoints.DataController,
}

export default APIEndpoints;