import { CharacterDto } from "./character";

export interface ApiResponse {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string | null;
    };
    results: CharacterDto[];
  }