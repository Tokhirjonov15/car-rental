import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { LoginInput, User, UserInput } from "../libs/types/user";
import UserModel from "../schemas/User.model";

class UserService {
    private readonly userModel;

    constructor () {
        this.userModel = UserModel;
    }
    
    public async processSignup(input: UserInput): Promise<User> {
        const exist = await this.userModel
          .findOne({userType: UserType.COMPANY})
          .exec();
        console.log("exist:", exist);
        if (exist) throw new Errors (HttpCode.NOT_MODIFIED, Message.USED_NICK_PHONE);
        
        try {
            const result = await this.userModel.create(input);
            result.userPassword = "";
            return result;
        } catch (err) {
            throw new Errors (HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    public async processLogin(input: LoginInput): Promise<User> {
        const user = await this.userModel
          .findOne(
            {userId: input.userId},
            {userId: 1, userPassword: 1}
          )
          .exec();
        if (!user) 
            throw new Errors (HttpCode.UNAUTHORIZED, Message.NO_MEMBER_NICK);

        const isMatch = input.userPassword === user.userPassword;
        console.log("isMatch:", isMatch);
        if (!isMatch) 
            throw new Errors (HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

        const result = await this.userModel.findById(user._id).exec();

        if (!result) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        }

        return result;
    }
}

export default UserService;