import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfiguration], validationSchema: JoiValidationSchema }), // Instalar el @nestjs/config para que pueda interpretar las variables de entorno, debe ir siempre al inicioas
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
