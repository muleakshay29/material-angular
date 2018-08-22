import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { addCity, fetchCountry, fetchState, fetchCity, editCity, updateCity } from "../common-constants";
import { Observable,throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  addCity (city: addCity): Observable<addCity> 
  {
    const addCityAPI = `https://mohalla.igainapp.in/MohallaAPI/api/insert_city.php`;

    return this.http.post<addCity>(addCityAPI, city);
  }

  fetchCountry(): Observable<fetchCountry[]>
  {
    //const fetchCountryAPI = `http://localhost/react-crud/api/read_country.php`;
    const fetchCountryAPI = `https://mohalla.igainapp.in/MohallaAPI/api/read_country.php`;

    return this.http.get<fetchCountry[]>(fetchCountryAPI);
  }

  fetchState (countryId: number): Observable<fetchState[]>
  {
    //const fetchStateAPI = `http://localhost/react-crud/api/read_state.php?Country_id=${countryId}`;
    const fetchStateAPI = `https://mohalla.igainapp.in/MohallaAPI/api/read_state.php?Country_id=${countryId}`;

    return this.http.get<fetchState[]>(fetchStateAPI);
  }

  fetchCity(): Observable<fetchCity[]>
  {
    //const fetchCityAPI = `http://localhost/react-crud/api/read_city.php`;
    const fetchCityAPI = `https://mohalla.igainapp.in/MohallaAPI/api/read_city.php`;

    return this.http.get<fetchCity[]>(fetchCityAPI);
  }

  getCityDetails(cityId: number): Observable<editCity>
  {
    //const editCityAPI = `http://localhost/react-crud/api/edit_city.php/?City_id=${cityId}`;
    const editCityAPI = `https://mohalla.igainapp.in/MohallaAPI/api/edit_city.php/?City_id=${cityId}`;

    return this.http.get<editCity>(editCityAPI);
  }

  updateCity(city: updateCity): Observable<updateCity> 
  {
    //const updateCityAPI = `http://localhost/react-crud/api/update_city.php`;
    const updateCityAPI = `https://mohalla.igainapp.in/MohallaAPI/api/update_city.php`;

    return this.http.post<updateCity>(updateCityAPI, city);
  }

  cityDelete(cityId: number): Observable<{}>
  {
    //const deleteCityAPI = `http://localhost/react-crud/api/delete_city.php/?City_id=${cityId}`;
    const deleteCityAPI = `https://mohalla.igainapp.in/MohallaAPI/api/delete_city.php/?City_id=${cityId}`;

    return this.http.delete<{}>(deleteCityAPI);
  }
}
