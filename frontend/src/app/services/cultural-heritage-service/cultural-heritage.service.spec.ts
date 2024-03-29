import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { CulturalHeritageService } from './cultural-heritage.service';
import { User } from '../../models/user.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {fakeAsync, tick} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { CulturalHeritage } from 'src/app/models/cultural-heritage.model';
import { Page } from 'src/app/models/page.model';
import { CulturalHeritageToAdd } from 'src/app/models/cultural-heritage-to-add.model';

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
    let ch: CulturalHeritage;

    const mockCH: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ['12.327145', '45.438759'],
      description: 'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!',
      imageUri: 'http://localhost:8080/api/files/1',
      locationID: 1,
      locationName: 'Italy Venice',
      name: 'Venice Carnival',
      totalRatings: 0
    };

    chService.getOne(1).subscribe(res => ch = res);

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCH);

    tick();
    expect(ch).toBeDefined();
    expect(ch.id).toEqual(1);
    expect(ch.name).toEqual('Venice Carnival');
    expect(ch.locationName).toEqual('Italy Venice');
    expect(ch.imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(ch.totalRatings).toEqual(0);
    expect(ch.coordinates).toEqual(['12.327145', '45.438759']);
  }));

  it('addNew(ch: CulturalHeritageToAdd) should send and return one cultural heritage', fakeAsync(() => {
    const ch: CulturalHeritageToAdd = {
      name: 'Venice Carnival',
      chsubtypeID: 1,
      description: 'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!',
      locationID: 1,
    };

    let chAdded: CulturalHeritage;

    const mockCH: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ['12.327145', '45.438759'],
      description: 'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!',
      imageUri: 'http://localhost:8080/api/files/1',
      locationID: 1,
      locationName: 'Italy Venice',
      name: 'Venice Carnival',
      totalRatings: 0
    };

    chService.addNew(ch).subscribe(res => chAdded = res);

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages');
    expect(req.request.method).toBe('POST');
    req.flush(mockCH);

    tick();
    expect(ch).toBeDefined();
    expect(chAdded.id).toEqual(1);
    expect(chAdded.name).toEqual('Venice Carnival');
    expect(chAdded.locationName).toEqual('Italy Venice');
    expect(chAdded.imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(chAdded.totalRatings).toEqual(0);
    expect(chAdded.coordinates).toEqual(['12.327145', '45.438759']);
  }));

  it('post(name: string, description: string, locationID: number, chsubtypeID: number, image: string) should send and return one cultural heritage', fakeAsync(() => {
    const ch: CulturalHeritageToAdd = {
      name: 'Venice Carnival',
      chsubtypeID: 1,
      description: 'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!',
      locationID: 1,
    };
    const name = 'Venice Carnival';
    const description = 'desc1';
    const locationId = 1;
    const chsubtypeID = 1;
    const image = 'neka/putanja';

    let chAdded: CulturalHeritage;

    const mockCH: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ['12.327145', '45.438759'],
      description: 'desc1',
      imageUri: 'http://localhost:8080/api/files/1',
      locationID: 1,
      locationName: 'Italy Venice',
      name: 'Venice Carnival',
      totalRatings: 0
    };

    chService.post(name, description, locationId, chsubtypeID, image).subscribe(res => chAdded = res);

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages');
    expect(req.request.method).toBe('POST');
    req.flush(mockCH);

    tick();
    expect(ch).toBeDefined();
    expect(chAdded.id).toEqual(1);
    expect(chAdded.name).toEqual('Venice Carnival');
    expect(chAdded.locationName).toEqual('Italy Venice');
    expect(chAdded.imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(chAdded.totalRatings).toEqual(0);
    expect(chAdded.coordinates).toEqual(['12.327145', '45.438759']);
  }));

  it('subscribe() should query url and delete comment', fakeAsync(() => {
    chService.subscribe(1).subscribe(res => { });

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/subscribe/1');
    expect(req.request.method).toBe('POST');
    req.flush({});

}));

  it('unsubscribe() should query url and delete comment', fakeAsync(() => {
  chService.unsubscribe(1).subscribe(res => { });

  const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/unsubscribe/1');
  expect(req.request.method).toBe('DELETE');
  req.flush({});

}));

  it('subscribe() should query url and delete comment', fakeAsync(() => {
  chService.delete(1).subscribe(res => { });

  const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/1');
  expect(req.request.method).toBe('DELETE');
  req.flush({});

}));

  it('put(ch: CulturalHeritage, image: any) should subscribe to cultural heritage with chID', fakeAsync(() => {

    const image = 'neki/url';

    let chUpdated: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ['12.327145', '45.438759'],
      description: 'desc1',
      imageUri: 'http://localhost:8080/api/files/1',
      locationID: 1,
      locationName: 'Italy Venice',
      name: 'Venice Carnival',
      totalRatings: 0
    };

    const mockCH: CulturalHeritage = {
      id: 1,
      avgRating: 0,
      chsubtypeID: 1,
      coordinates:  ['12.327145', '45.438759'],
      description: 'desc1',
      imageUri: 'http://localhost:8080/api/files/1',
      locationID: 1,
      locationName: 'Italy Venice',
      name: 'Venice Carnival',
      totalRatings: 0
    };

    chService.put(chUpdated, null).subscribe(res => chUpdated = res);

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockCH);

    tick();
    expect(chUpdated).toBeDefined();
    expect(chUpdated.id).toEqual(1);
    expect(chUpdated.name).toEqual('Venice Carnival');
    expect(chUpdated.locationName).toEqual('Italy Venice');
    expect(chUpdated.imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(chUpdated.totalRatings).toEqual(0);
    expect(chUpdated.coordinates).toEqual(['12.327145', '45.438759']);
  }));

  it('filterCulturalHeritages() should return cultural heritages that match the filter', fakeAsync(() => {

    let CHs: CulturalHeritage[];
    let last: boolean;
    let totalElements: number;
    let totalPages: number;
    let numberOfElements: number;
    let size: number;

    const mockResponse: Page<CulturalHeritage> = {
      id: 1,
      empty: false,
      number: 0,
      numberOfElements: 3,
      size: 3,
      totalElements: 12,
      totalPages: 6,
      last: false,
      content: [{
          id: 1,
          avgRating: 0,
          chsubtypeID: 1,
          coordinates:  ['12.327145', '45.438759'],
          description: 'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or MartedÃ¬ Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!',
          imageUri: 'http://localhost:8080/api/files/1',
          locationID: 1,
          locationName: 'Italy Venice',
          name: 'Venice Carnival',
          totalRatings: 0
        },
        {
          id: 2,
          avgRating: 3,
          chsubtypeID: 1,
          coordinates:  ['2.327145', '6.3259'],
          description: 'some description',
          imageUri: 'http://localhost:8080/api/files/1',
          locationID: 1,
          locationName: 'Germany Swechen',
          name: 'Venikarman Museum',
          totalRatings: 0
        }]
  };

    chService.filterCulturalHeritages({type: 'name', value: 'veni'}, 0).subscribe(res => {
      CHs = res.content;
      numberOfElements = res.numberOfElements;
      size = res.size;
      totalElements = res.totalElements;
      totalPages = res.totalPages;
      last = res.last;
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cultural-heritages/filtered/?page=0&size=10');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();
    expect(CHs).toBeDefined();
    expect(CHs[0].id).toEqual(1);
    expect(CHs[0].name).toEqual('Venice Carnival');
    expect(CHs[0].locationName).toEqual('Italy Venice');
    expect(CHs[0].imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(CHs[0].totalRatings).toEqual(0);
    expect(CHs[0].coordinates).toEqual(['12.327145', '45.438759']);

    expect(CHs[1].id).toEqual(2);
    expect(CHs[1].name).toEqual('Venikarman Museum');
    expect(CHs[1].locationName).toEqual('Germany Swechen');
    expect(CHs[1].imageUri).toEqual('http://localhost:8080/api/files/1');
    expect(CHs[1].totalRatings).toEqual(0);
    expect(CHs[1].coordinates).toEqual(['2.327145', '6.3259']);

  }));
});
