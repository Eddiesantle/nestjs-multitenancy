import { User } from "@prisma/client";

export class UserPresenter {
    constructor(readonly user: User){}

    toJSON(){
        return{
            id: this.user.id,
            email: this.user.email,
            roles: this.user.roles,
            createAt: this.user.createdAt,
            updateAt: this.user.updatedAt
        }
    }

}