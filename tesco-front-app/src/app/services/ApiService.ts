import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";

const BASE_URL = environment.base_url;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export class ApiService {
  constructor(private http: HttpClient) {}
  public findAccounts():Observable<any> {
    return this.http.get(BASE_URL, HTTP_OPTIONS);
  }

  public newAccount(account):Observable<any> {
    return this.http.post(BASE_URL, account, HTTP_OPTIONS);
  }
}
