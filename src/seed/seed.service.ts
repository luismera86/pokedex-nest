import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {



  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: FetchAdapter
  ) { }

  async executeSeed() {
    
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");


    data.results.forEach(async ({ name, url }) => {

      const segments = url.split("/"); // Separamos en string por los / transformando un array
      const no: number = +segments[segments.length - 2];
      const newPokemon = {
        name,
        no
      }
      await this.pokemonService.create(newPokemon);
      console.log(newPokemon)

    })
    return (await data).results;
  }
}
