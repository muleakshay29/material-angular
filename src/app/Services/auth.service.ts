import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { login } from '../common-constants';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private http: HttpClient) { }

  /** ****************Login***************** **/
    login(username: string, password: string): Observable<login> 
    {
      const loginCheckURL = `https://mohalla.igainapp.in/MohallaAPI/api/login.php`;

      return this.http.post<login>(loginCheckURL, {username: username, password: password} )
            .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    /*if (user) 
                    {
                      this.loggedIn.next(true);
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user));
                    }*/

                    return user;
                  })
            );
    }
  /** ****************Login***************** **/

  /** ****************Logout***************** **/
    logout() 
    {
      this.loggedIn.next(false);
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }
  /** ****************Logout***************** **/

  private handleError(error: HttpErrorResponse) 
  {
    if (error.error instanceof ErrorEvent) 
    {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } 
    else 
    {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
