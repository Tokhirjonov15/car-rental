import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { LoginInput, User, UserInput } from "../libs/types/user";
import UserModel from "../schemas/User.model";
import * as bcrypt from "bcryptjs";

class UserService {
    private readonly userModel;

    constructor () {
        this.userModel = UserModel;
    }

    public async signup(input: UserInput): Promise<User> {
        const salt = await bcrypt.genSalt();
        input.userPassword = await bcrypt.hash(input.userPassword, salt);

        try {
            const result = await this.userModel.create(input);
            result.userPassword = "";
            return result.toJSON() as any as User;
        } catch (err) {
            console.log("ERROR, model:signup", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
        }
    }

    public async login(input: LoginInput): Promise<User> {
        const user = await this.userModel
          .findOne(
            {userId: input.userId},
            {userId: 1, userPassword: 1}
          )
          .exec();
        if (!user) 
            throw new Errors (HttpCode.UNAUTHORIZED, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(
            input.userPassword,
            user.userPassword
        );
        if (!isMatch) 
            throw new Errors (HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

        const result = await this.userModel.findById(user._id).exec();

        if (!result) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        }

        return result;
    }
    
    public async processSignup(input: UserInput): Promise<User> {
        const exist = await this.userModel
          .findOne({userType: UserType.COMPANY})
          .exec();
        console.log("exist:", exist);
        if (exist) throw new Errors (HttpCode.NOT_MODIFIED, Message.USED_NICK_PHONE);
        
        const salt = await bcrypt.genSalt();
        input.userPassword = await bcrypt.hash(input.userPassword, salt);

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

        const isMatch = await bcrypt.compare(
            input.userPassword,
            user.userPassword
        );
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