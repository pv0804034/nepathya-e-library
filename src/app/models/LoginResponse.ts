export interface LoginResponse
{
    responseObject:ResponseObject;
}

interface ResponseObject{
    token:string,
    email:string,
    roleName: string,
    isActive: boolean,
    firstName: string
}