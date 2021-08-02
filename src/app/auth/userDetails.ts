export class UserDetails{
    constructor(
            public email:string, 
            public roleName:string, 
            public firstName:string, 
            public lastName:string, 
            public isActive:boolean,
            public userId: string
        ){}
}