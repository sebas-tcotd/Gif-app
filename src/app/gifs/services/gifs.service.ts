import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //resultados
    this.resultados = JSON.parse(localStorage.getItem('imagenes')!) || [];
  }

  private _historial: string[] = [];
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private API: string = 'vImcsAN1dGaeYAt5NWEHnPbIT0WMtsh3';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGif(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams()
      .set('api_key', this.API)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('imagenes', JSON.stringify(this.resultados));
      });
  }
}
