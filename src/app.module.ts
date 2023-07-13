import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ // Habilitamos contenido estático de la carpeta public
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Se deben instalar los paquetes @nestjs/mongoose mongoose
    MongooseModule.forRoot("mongodb://localhost:27017/nest-pokemon"), // Conectamos a la base de datos de mongo
    PokemonModule, CommonModule, SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
