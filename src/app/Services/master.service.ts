import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { addCity, fetchCountry, fetchState, fetchCity } from "../common-constants";
import { Observable,throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  addCity (city: addCity): Observable<addCity> 
  {
    const addCityAPI = `http://localhost/react-crud/api/insert_city.php`;

    return this.http.post<addCity>(addCityAPI, city);
  }

  fetchCountry(): Observable<fetchCountry[]>
  {
    const fetchCountryAPI = `http://localhost/react-crud/api/read_country.php`;

    return this.http.get<fetchCountry[]>(fetchCountryAPI);
  }

  fetchState (countryId: number): Observable<fetchState[]>
  {
    const fetchStateAPI = `http://localhost/react-crud/api/read_state.php?Country_id=${countryId}`;

    return this.http.get<fetchState[]>(fetchStateAPI);
  }

  fetchCity(): Observable<fetchCity[]>
  {
    const fetchCityAPI = `http://localhost/react-crud/api/read_city.php`;

    return this.http.get<fetchCity[]>(fetchCityAPI);
  }
}
