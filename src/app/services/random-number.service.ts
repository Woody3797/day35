import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, map, tap } from "rxjs";
import { RandomData } from "../RandomData";

const URL_API_RANDOM = ''
interface ApiResponse {
    numbers: number[]
    timestamp: string
}

@Injectable()
export class RandomNumberService {
    
    http = inject(HttpClient)
    onRequest = new Subject<ApiResponse>()

    getRandomNumber(count = 1): Observable<number[]> {
        const params = new HttpParams().set('count', count)
        .set('min', 0)
        .set('max', 100)

        return this.http.get<ApiResponse>(URL_API_RANDOM, { params: params })
        .pipe(
            map(resp => resp.numbers)
        )
    }

    postRandomNumbersAsJson(data: RandomData): Observable<number[]> {
        // Accept: application/json
        // Content-Type: application/json
        return this.http.post<ApiResponse>(URL_API_RANDOM, data)
        .pipe(
            tap(resp => this.onRequest.next(resp)),
            map(resp => resp.numbers)
        )
    }

    postRandomNumbersAsForm(data: RandomData): Observable<number[]> {
        // Accept: application/json
        // Content-Type: application/x-www-form-urlencoded
        const form = new HttpParams()
        .set("min", data.min)
        .set('max', data.max)
        .set('count', data.count)

        const headers = new HttpHeaders()
        .set("Content-Type", 'application/x-www-form-urlencoded')

        return this.http.post<ApiResponse>(URL_API_RANDOM, form.toString(), { headers })
        .pipe(
            map(resp => resp.numbers)
        )
    }

}