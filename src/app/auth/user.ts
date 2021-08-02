export class User
{
    constructor(public token:string)
    {
    }

    getToken()
    {
     return this.token;
    }
}