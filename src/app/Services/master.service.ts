import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { addCity, fetchCountry, fetchState, fetchCity, editCity, updateCity } from "../common-constants";
import { Observable,throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  addCity (city: addCity): Observable<addCity> 
  {
    //const addCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/addcity`;
    const addCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/addcity`;

    return this.http.post<addCity>(addCityAPI, city);
  }

  fetchCountry(): Observable<fetchCountry[]>
  {
    //const fetchCountryAPI = `http://localhost/MohallaAPI/public/masters/countrymaster/fetchcountry`;
    const fetchCountryAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/countrymaster/fetchcountry`;

    return this.http.get<fetchCountry[]>(fetchCountryAPI);
  }

  fetchState (countryId: number): Observable<fetchState[]>
  {
    //const fetchStateAPI = `http://localhost/MohallaAPI/public/masters/statemaster/fetchallstate/${countryId}`;
    const fetchStateAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/statemaster/fetchallstate/${countryId}`;

    return this.http.get<fetchState[]>(fetchStateAPI);
  }

  fetchCity(): Observable<fetchCity[]>
  {
    //const fetchCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/fetchcity`;
    const fetchCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/fetchcity`;

    return this.http.get<fetchCity[]>(fetchCityAPI);
  }

  getCityDetails(cityId: number): Observable<editCity>
  {
    //const editCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/fetchcity/${cityId}`;
    const editCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/fetchcity/${cityId}`;

    return this.http.get<editCity>(editCityAPI);
  }

  updateCity(city: updateCity): Observable<updateCity> 
  {
    //const updateCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/updatecity`;
    const updateCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/updatecity`;

    return this.http.put<updateCity>(updateCityAPI, city);
  }

  cityDelete(cityId: number): Observable<{}>
  {
    //const deleteCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/deletecity/${cityId}`;
    const deleteCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/deletecity/${cityId}`;

    return this.http.delete<{}>(deleteCityAPI);
  }

  cityNameCheck(cityName: string): Observable<boolean>
  {
    //const checkCityAPI = `http://localhost/MohallaAPI/public/masters/citymaster/checkcity/${cityName}`;
    const checkCityAPI = `https://mohalla.igainapp.in/MohallaAPI/public/masters/citymaster/checkcity/${cityName}`;
    return this.http.get<boolean>(checkCityAPI);
  }
}
