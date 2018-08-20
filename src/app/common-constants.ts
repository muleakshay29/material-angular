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

export interface fetchCity {
  City_id: number;
  City_name: string;
}