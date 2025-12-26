import Errors, { HttpCode, Message } from "../libs/Error";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schemas/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    public async checkViewExistance (input: ViewInput): Promise<View | null> {
        return await this.viewModel
          .findOne({ userId: input.userId, viewRefId: input.viewRefId })
          .lean<View>()
          .exec();
    }

    public async insertUserView(input: ViewInput): Promise<View> {
        try {
            const doc = await this.viewModel.create(input);
            return doc.toObject() as View;
        } catch (err) {
            console.log("ERROR, ViewService: insertUserView", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default ViewService;