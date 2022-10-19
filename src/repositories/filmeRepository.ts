import { AppDataSource } from "../data-source";
import { Filme } from "../entities/Filme";

export const filmeRepository = AppDataSource.getRepository(Filme)