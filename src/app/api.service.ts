import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://rojiguru.com:8080'
  // url = 'http://localhost:8080'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getData() {
    const headers = new HttpHeaders(
      {
        // 'authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFjMjE4MzViNjE4MjgwMDAyMzk0NWYiLCJuYW1lIjoiSGltYW5zaHUiLCJlbWFpbCI6ImhpbWFuc2h1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpMVHJPQTlwd1lidExXUXhNYXNVeXVCNlFlaUR6VC5CNGcvNUltQWp3dkFrRk5KZDZFM1lLIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIxLTAyLTA0VDE2OjMyOjAzLjk5N1oiLCJ1cGRhdGVkQXQiOiIyMDIxLTAyLTA0VDE2OjMyOjAzLjk5N1oiLCJfX3YiOjAsImlhdCI6MTYxMjk1MzIyNiwiZXhwIjoxNjEyOTU2ODI2fQ.M1w8ks87VrHtURLRJUGQBuMLVakRtAHTYsX8l6g3NJE`
        'authorization': localStorage.getItem('token')
      });
    return this.http.get(`${this.url}/api/users`, { headers });
  }

  getByID(id) {
    const headers = new HttpHeaders(
      {
        // 'authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFjMjE4MzViNjE4MjgwMDAyMzk0NWYiLCJuYW1lIjoiSGltYW5zaHUiLCJlbWFpbCI6ImhpbWFuc2h1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpMVHJPQTlwd1lidExXUXhNYXNVeXVCNlFlaUR6VC5CNGcvNUltQWp3dkFrRk5KZDZFM1lLIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIxLTAyLTA0VDE2OjMyOjAzLjk5N1oiLCJ1cGRhdGVkQXQiOiIyMDIxLTAyLTA0VDE2OjMyOjAzLjk5N1oiLCJfX3YiOjAsImlhdCI6MTYxMjUzMDExMCwiZXhwIjoxNjEyNTMzNzEwfQ._2KeMqtYTmVbNhf6lWTHn6YOtghTIAOxcVz41G0sJoo`
        'authorization': localStorage.getItem('token')
      });

    // return this.http.put(`http://rojiguru.com:8080/api/users/5fe8c851032e190bbc118de1`, {
    //   "education": JSON.stringify([{ 'course': 'qweqwe', 'passingYear': 'qwe', 'cpa': 'qew', 'university': 'qwe' }, { 'course': 'qweqwe', 'passingYear': 'qwe', 'cpa': 'qew', 'university': 'qwe' }, { 'course': 'qweqwe', 'passingYear': 'qwe', 'cpa': 'qew', 'university': 'qwe' }, { 'course': 'qweqwe', 'passingYear': 'qwe', 'cpa': 'qew', 'university': 'qwe' }])
    // }, { headers })
    return this.http.get(`${this.url}/api/users/${id}`, { headers });
  }

  getCV(id) {
    const headers = new HttpHeaders(
      {
        'authorization': localStorage.getItem('token')
      }
    );
    return this.http.get(
      `${this.url}/api/candidate/${id}`,
      {
        responseType: 'arraybuffer',
        headers
      }
    );
  }

  downLoadFile(data: any, filename: string) {
    let blob = new Blob([data], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
    let anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }

  login(user?: object) {
    return this.http.post<any>(`${this.url}/api/users/login`, user);
  }

  deleteCandidate(id) {
    const headers = new HttpHeaders(
      {
        'authorization': localStorage.getItem('token')
      }
    );
    return this.http.delete<any>(`${this.url}/api/candidate/${id}`, { headers });
  }

  /*
  intercept(req, next) {
    let token = localStorage.getItem('token');
    if (token) {
      let tokenizedReq = req.clone({
        setHeaders: {
          'authorization': `${token}`
        }
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
  */

}
