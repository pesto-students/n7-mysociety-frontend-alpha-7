import { BaseService } from "../base.service";
class Authentication extends BaseService {
    loginUser() {
        return this.http.get();
    }

    registerUser() {
        return this.http.get();
    }
}

export default new Authentication();
