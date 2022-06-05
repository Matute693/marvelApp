import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroes } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroes> {
    return this.http.get<Heroes>(`${this.baseUrl}/heroes/${ id }`);
  }

  getSuggestion( term: string ): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes/?q=${ term }&_limit=7`);
  }

  addHero( heroe: Heroes ): Observable<Heroes> {
    return this.http.post<Heroes>(`${this.baseUrl}/heroes`, heroe);
  }

  updatedHero( heroe: Heroes ): Observable<Heroes> {
    return this.http.put<Heroes>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  deletedHero(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${ id }`);
  } 
}
