import { EnvService } from "@src/services/env.service.ts";

export class BaseService {
  protected env: EnvService;
  constructor() {
    this.env = new EnvService();
  }
}
