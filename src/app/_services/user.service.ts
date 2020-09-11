import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Person } from '../_models/person';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getUsers(page?, itemPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult <User[]>();

  let params = new HttpParams();
  if (page != null && itemPerPage != null) {
  params = params.append('pageNumber', page);
  params = params.append('pageSize', itemPerPage);
}
  return this.http.get<User[]>(this.baseUrl + 'User',{observe: 'response'})
.pipe(
  map(response => {
    paginatedResult.result = response.body;
    if(response.headers.get('Pagination')!=null){
      paginatedResult.pagination =JSON.parse(response.headers.get('Pagination'));
    }
    return paginatedResult;
  })
);
}
getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'User/' + id);
}
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'User/' + id, user);
}
getperson() {
  return this.http.get<Person[]>(this.baseUrl + 'Person/');
}
}
