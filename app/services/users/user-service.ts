import { toast } from "react-toastify";
import { HttpService, serverURL } from "../http-service";

class UserService extends HttpService {
  save(data: any) {
    this.post(
      `${serverURL}/api/users`,
      data,
      () =>
        toast.success("Usuário criado com sucesso!", {
          position: "bottom-center",
        }),
      (err: any) =>
        toast.error("Ocorreu um erro", { position: "bottom-center" })
    );
  }
}

export default new UserService();
