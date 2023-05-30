import { User } from "../models/user";

export class DataResponse {
    Success: boolean;
    Message: string;
    MessageType: number;
    ResponseCode: number;
    Result: any;
  }

  export class UserResponse {
    access_token: string;
    error: string;
    error_description: string;
    expires_in:  number;
    token_type: string;
    user: User;
  }