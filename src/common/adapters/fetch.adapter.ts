import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable() // Decorador que nos sirve para poder inyectarlo como dependencia en los servicios
export class FetchAdapter implements HttpAdapter {


  async get<T>(url: string): Promise<T> {

    try {
      const resp = await fetch(url);
      const data = await resp.json() as Promise<T>
      return data;
    } catch (error) {
      throw new Error("This is an error - Check logs");
    }
  }

}