import { container } from "tsyringe"
import Logger from "../ports/logger.port"
import { UserRepository } from "../ports/database.port";
import { NotExistingUser } from "../entities/user.entity";

type SignupUserInput = {
  login: string,
  password: string
}

class SignUpUser {
  private logger: Logger;
  private userRepository: UserRepository;

  constructor() {
    this.logger = container.resolve<Logger>("Logger")
    this.userRepository = container.resolve<UserRepository>("UserRepository")
  }
  async execute({
    login, password
  }: SignupUserInput): Promise<{accessToken : string } | "USER_ALREADY_EXISTS"> {
    this.logger.debug('create user usecase start');

    const notExistingUser = new NotExistingUser()
    const existingUser = await this.userRepository.create({
      login, 
      password: notExistingUser.hashPassword(password)
    })

    if (existingUser === "USER_ALREADY_EXISTS") {
      return existingUser
    } 

    return {
      accessToken: existingUser.signAndEncodeUserAccessToken()
    }
  }
}

export default SignUpUser;