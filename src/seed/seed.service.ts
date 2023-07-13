import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance;
  
  async executeSeed() {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await resp.json() as Promise<PokeResponse>;

    (await data).results.forEach(({ name, url }) => {
      
      const segments = url.split("/"); // Separamos en string por los / transformando un array
      const no: number = +segments[segments.length - 2];

    })
    return (await data).results;
  }
}
