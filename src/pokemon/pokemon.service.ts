import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) // Hacemos la inyección de la entidad Pokemon el .name viene de los Documents de Mongoose
    private readonly pokemonModel: Model<Pokemon> // Inyectamos el modelo de mongoose con Model y pasamos la Entity como modelo
  ) { }
  async create(createPokemonDto: CreatePokemonDto) {

    try {

      createPokemonDto.name = createPokemonDto.name.toLowerCase(); // pasamos a minúsculas los nombres de los pokemon
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  findAll() {
    
    return this.pokemonModel.find();
  }

  async findOne(id: string) {
    let pokemon: Pokemon;

    if (!isNaN(+id)) pokemon = await this.pokemonModel.findOne({ no: id })

    if (!pokemon && isValidObjectId(id)) pokemon = await this.pokemonModel.findById(id);

    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase().trim() });

    // Verificamos si existe el pokemon
    if (!pokemon) throw new NotFoundException("No se encontro el pokemon")

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {

      const pokemon = await this.findOne(term);

      if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    
    // const result = this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    
    if( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id ${id} not found`)
    
    return;

  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException("Cant´t create pokemon - check serve logs")
  }
}