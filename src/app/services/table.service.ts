import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private http: HttpClient,
  ) { }

  getGoogleSpreadSheet(id: string, listNumber: number): Observable<any> {
    return this.http.get(`https://spreadsheets.google.com/feeds/list/${id}/${listNumber}/public/full?alt=json`)
      .pipe(
        map(x => this.extractData(x)));
  }

  private extractData(rawData) {
    // https://itnext.io/read-data-from-google-spreadsheet-in-angular-209ee74b6cb4
    const tableName = rawData.feed.title.$t;
    const result: any[] = [];
    const data = rawData.feed.entry;
    if (data && data.length > 0) {
      data.forEach(entry => {
        const obj = {};
        for (const x in entry) {
          if (x.includes('gsx$') && entry[x].$t) {
            obj[x.split('$')[1]] = entry[x].$t;
          }
        }
        result.push(obj);
      });
    }
    const columns = Object.keys(result[0]);
    return {tableName, columns, result};
  }
}
