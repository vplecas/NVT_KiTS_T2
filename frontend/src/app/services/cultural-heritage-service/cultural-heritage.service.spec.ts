import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { CulturalHeritageService } from './cultural-heritage.service';
import { User } from '../../models/user.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {fakeAsync, tick} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { CulturalHeritage } from 'src/app/models/cultural-heritage.model';

describe('CulturalHeritageService', () => {
  let injector;
  let chService: CulturalHeritageService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

	beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CulturalHeritageService]
    });

    injector = getTestBed();
    chService = TestBed.inject(CulturalHeritageService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
	}); 

  it('getOne(id: number) should return one cultural heritage with given id', fakeAsync(() => {
    let ch : CulturalHeritage;

    const mockCH: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ["12.327145", "45.438759"],
      description: "The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!",
      imageUri: "http://localhost:8080/api/files/1",
      locationID: 1,
      locationName: "Italy Venice",
      name: "Venice Carnival",
      totalRatings: 0
    }

    chService.getOne(1).subscribe(res => ch = res);
    
    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCH);

    tick();
    expect(ch).toBeDefined();
    expect(ch.id).toEqual(1);
    expect(ch.name).toEqual("Venice Carnival");
    expect(ch.locationName).toEqual("Italy Venice");
    expect(ch.imageUri).toEqual("http://localhost:8080/api/files/1");
    expect(ch.totalRatings).toEqual(0);
    expect(ch.coordinates).toEqual(["12.327145", "45.438759"]);
  }));
});