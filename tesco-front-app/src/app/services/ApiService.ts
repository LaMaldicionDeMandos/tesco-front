import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export class ApiService {

  private accountsCache = {};

  constructor(private http: HttpClient) {}
  public findAccounts(): Observable<any[]> {
    let result:Observable<any> = this.http.get(BASE_URL, HTTP_OPTIONS);
    result.subscribe((accounts) => accounts.forEach((account) => this.accountsCache[account.id] = account));
    return result;
  }

  public newAccount(account): Observable<any> {
    return this.http.post(BASE_URL, account, HTTP_OPTIONS);
  }

  public deleteAccount(account): Observable<any> {
    return this.http.delete(BASE_URL + `/${account.id}` , HTTP_OPTIONS);
  }

  public getOrders(accountId):Observable<any> {
    return this.http.get(BASE_URL + `/${accountId}/order`, HTTP_OPTIONS);
  }

  public newOrder(accountId, order): Observable<any> {
    return this.http.post(BASE_URL + `/${accountId}/order`, order, HTTP_OPTIONS);
  }

  public getAccount(id):any {
    return this.accountsCache[id];
  }
}
