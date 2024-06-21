import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, count, delay, map, of, tap } from 'rxjs';
import { Params } from '@angular/router';
import { CacheStore } from '../interfaces/cache-store.interface';
import { ByCountryPageComponent } from '../pages/by-country-page/by-country-page.component';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    }
  }

  constructor(private http: HttpClient) {
    this.LoadFromLocalStorage();
   }

  private SaveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      )
  }

  searchCountrByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCapital = {
        term: capital,
        countries
      }),
      tap(() => this.SaveToLocalStorage())
    );
  }

  searchCountry(country: string): Observable<Country[]> {


    const url = `${this.apiUrl}/name/${country}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCountries = {
        term: country,
        countries
      }),
      tap(() => this.SaveToLocalStorage())
    );

  }

  searchRegion(region: Region): Observable<Country[]> {


    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap((regions) => this.cacheStore.byRegion = {
        region: region,
        countries: regions
      }),
      tap(() => this.SaveToLocalStorage())
    );

  }
}
