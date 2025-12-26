import ViewModel from "../schemas/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }
}

export default ViewService;