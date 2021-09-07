import { BaseService } from "../base.service";
class Authentication extends BaseService {
  loginUser(payload) {
    return this.http.get();
  }

  registerUser(payload) {
    return this.http.get();
  }
}

export default new Authentication();
