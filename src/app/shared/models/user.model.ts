export class User {
  private _username: string;
  private _token: string;

  get username(): string {
    return this._username;
  }

  get token(): string {
    return this._token;
  }

  constructor(username: string, token: string) {
    this._username = username;
    this._token = token;
  }
}
