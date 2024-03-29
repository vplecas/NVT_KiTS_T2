import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { Page } from 'src/app/models/page.model';
import { environment } from 'src/environments/environment';
import { NEWS_PER_PAGE } from '../../utils/constants';


const REST_ENDPOINT = {
    GET: '/news/by-page/',
    GET_ONE: '/news/',
    ADD_ONE: '/news',
    DELETE: '/news/',
};

@Injectable({ providedIn: 'root' })
export class NewsService {
    constructor(private httpClient: HttpClient) { }

    getNews(chID: number, page: number): Observable<Page<News>> {
        // return this.httpClient.get<Page>(`${environment.apiUrl}${REST_ENDPOINT.GET}${chID}/?page=${page}&size=${NEWS_PER_PAGE}`);
        return this.httpClient.get<Page<News>>(`${environment.apiUrl}${REST_ENDPOINT.GET}${chID}/?page=${page}&size=${NEWS_PER_PAGE}&sort=id,ASC`);
    }

    getOne(chID: number): Observable<News>  {
        return this.httpClient.get<News>(`${environment.apiUrl}${REST_ENDPOINT.GET_ONE}${chID}`);
    }

    deleteNews(id: number): Observable<object> {
        return this.httpClient.delete(`${environment.apiUrl}${REST_ENDPOINT.DELETE}${id}`);
    }

    update(news: News, file: File): Observable<News> {

        const id = news.id;
        const heading = news.heading;
        const content = news.content;
        const culturalHeritageID = news.culturalHeritageID;
        const adminID = news.adminID;

        const ch = { heading, content, culturalHeritageID, adminID };
        const formData = new FormData();
        formData.append('news', new Blob([JSON.stringify(ch)], {
            type: 'application/json'
        }));
        if (file) {
            formData.append('file', file);
        }

        return this.httpClient.put<News>(`${environment.apiUrl}${REST_ENDPOINT.GET_ONE}${id}`, formData);
    }

    add(news: News): Observable<News> {
        const imageUri = news.imageUri;
        const heading = news.heading;
        const content = news.content;
        const culturalHeritageID = news.culturalHeritageID;
        const adminID = news.adminID;

        const ch = { heading, content, culturalHeritageID, adminID };
        const formData = new FormData();
        formData.append('news', new Blob([JSON.stringify(ch)], {
            type: 'application/json'
        }));
        if (imageUri) {
            formData.append('file', imageUri);
        }

        return this.httpClient.post<News>(`${environment.apiUrl}${REST_ENDPOINT.ADD_ONE}`, formData);
    }

}
