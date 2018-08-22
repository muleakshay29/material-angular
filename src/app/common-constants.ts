export class login {
    username: string;
    password: string;
  }

export class addCity {
  Country_id: number;
  State_id: number;
  City_name: string;
}

export class fetchCountry {
  Country_id : number;
  Country_name: string;
}

export class fetchState {
  State_id : number;
  State_name : string;
}

export class fetchCity {
  City_id: number;
  City_name: string;
}

export class editCity {
  Country_id: number;
  State_id : number;
  City_id: number;
  City_name: string;
}

export class updateCity {
  cityId: number;
  cityName: string;
  countryId: number;
  stateId: number;
}