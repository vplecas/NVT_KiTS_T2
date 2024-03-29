import { Overlay } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of, throwError } from 'rxjs';
import { CHSubtype } from 'src/app/models/ch-subtype.model';
import { CHType } from 'src/app/models/ch-type.model';
import { Page } from 'src/app/models/page.model';
import { CHSubtypeService } from 'src/app/services/ch-subtype-service/ch-subtype.service';
import { CHTypeService } from 'src/app/services/ch-type-service/ch-type.service';
import { CHTypesComponent } from './ch-types.component';


describe('CHTypesComponent', () => {
  let component: CHTypesComponent;
  let fixture: ComponentFixture<CHTypesComponent>;
  let service: CHTypeService;
  let serviceSubtypes: CHSubtypeService;


  beforeEach(() => {
    const chTypesService = {
      getTypes: jasmine.createSpy('getTypes').and
        .returnValue(of(new Page<CHType>(
          {
            content: [{
              id: 1,
              name: 'type1',
              subtypes: []
            },
            {
              id: 2,
              name: 'type2',
              subtypes: []
            },
            {
              id: 3,
              name: 'type3',
              subtypes: [new CHSubtype({
                id: 1,
                name: 'subtype',
                chTypeID: 3
              })]
            }],
            id: 1,
            empty: false,
            number: 0,
            numberOfElements: 3,
            size: 3,
            totalElements: 12,
            totalPages: 6,
            last: false
          }
        ))),
      editType: jasmine.createSpy('editType').and
        .returnValue(of(new CHType({
          id: 1,
          name: 'new name',
          subtypes: []
        }))),

      deleteType: jasmine.createSpy('editType').and
        .returnValue(of({}))
    };

    const subtypeServices = {
      deleteSubtype: jasmine.createSpy('deleteSubtype').and
        .returnValue(of(new Observable())),
      editSubtype: jasmine.createSpy('editSubtype').and
        .returnValue(of(new CHSubtype({
          id: 1,
          name: 'new subtype name'
        }))),
    };




    TestBed.configureTestingModule({
      declarations: [CHTypesComponent],
      imports: [NgxPaginationModule, MatDialogModule, MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: CHTypeService, useValue: chTypesService },
        { provide: CHSubtypeService, useValue: subtypeServices },
        MatSnackBar, Overlay, NgbModal,
      ]
    });

    fixture = TestBed.createComponent(CHTypesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CHTypeService);
    serviceSubtypes = TestBed.inject(CHSubtypeService);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch types on load', fakeAsync(() => {
    component.ngOnInit();
    expect(service.getTypes).toHaveBeenCalledWith(0);
    tick();

    expect(component.chTypes.length).toBe(3);
    expect(component.chTypes[0].id).toEqual(1);
    expect(component.chTypes[0].name).toEqual('type1');

    expect(component.chTypes[1].id).toEqual(2);
    expect(component.chTypes[1].name).toEqual('type2');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();


    const allCells: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr td'));
    expect(allCells[0].nativeElement.textContent).toContain('Type1');


  }));

  it('should call delete subtype', fakeAsync(() => {
    component.deleteSubtype(1);
    flush();
    expect(serviceSubtypes.deleteSubtype).toHaveBeenCalledWith(1); // brisanje s id-em 1
    expect(service.getTypes).toHaveBeenCalledWith(0);  // poziva za getTypes za page 0

  }));

  it('should call delete type', fakeAsync(() => {
    spyOn(component, 'openSnackBar');
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.deleteType(1);
    flush();
    expect(service.deleteType).toHaveBeenCalledWith(1); // brisanje s id-em 1
    fixture.detectChanges();

    expect(component.openSnackBar).toHaveBeenCalledWith('Successfuly deleted the type!');
    expect(component.chTypes.length).toEqual(2);

    const allCells: DebugElement[] = fixture.debugElement.queryAll(By.css('.type-name'));
    expect(allCells[0].nativeElement.textContent).not.toContain('Type1');

  }));

  it('should edit type successfully', fakeAsync(() => {
    spyOn(component, 'openSnackBar');
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.editType(component.chTypes[0], 'new name');
    flush();

    expect(service.editType).toHaveBeenCalledWith({ ...component.chTypes[0], name: 'new name' });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.openSnackBar).toHaveBeenCalledWith('Successfuly changed name of type!');
    const allCells: DebugElement[] = fixture.debugElement.queryAll(By.css('.type-name'));
    expect(allCells[0].nativeElement.textContent).toContain('New name');
    expect(allCells[0].nativeElement.textContent).not.toContain('Type1');
  }));

  it('should edit subtype successfully', fakeAsync(() => {
    spyOn(component, 'openSnackBar');
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.editSubtype(component.chTypes[2].subtypes[0], 'new subtype name');
    flush();

    expect(serviceSubtypes.editSubtype).toHaveBeenCalledWith({ ...component.chTypes[2].subtypes[0], name: 'new subtype name' });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  describe('toggleRow()', () => {
    it('should show subtype for a chosen type', fakeAsync(() => {
      component.ngOnInit();
      tick();
      const element: CHType = new CHType({
        id: 3,
        name: 'type3',
        subtypes: [new CHSubtype({ id: 1, name: 'subtype', chTypeID: 3 })]
      });

      component.toggleRow(element);
      expect(component.expandedElement).toEqual(element);

      const allCells: DebugElement[] = fixture.debugElement.queryAll(By.css('.subtype-name'));
      expect(allCells[0].nativeElement.textContent).toContain('Subtype');
    }));

    it('should not exists subtype for a chosen type', fakeAsync(() => {
      component.ngOnInit();
      tick();
      const element: CHType = new CHType(            {
        id: 2,
        name: 'type2',
        subtypes: []
      });

      component.toggleRow(element);
      expect(component.expandedElement).toEqual(element);

      const allCells: DebugElement[] = fixture.debugElement.queryAll(By.css('.subtype-name'));
      expect(allCells[1]).toBe(undefined);
    }));
  });
});





describe('CHTypesComponentFailure', () => {
  let component: CHTypesComponent;
  let fixture: ComponentFixture<CHTypesComponent>;
  let service: CHTypeService;
  let serviceSubtypes: CHSubtypeService;


  beforeEach(() => {
    const chTypesService = {
      getTypes: jasmine.createSpy('getTypes').and
        .returnValue(of(new Page<CHType>(
          {
            content: [{
              id: 1,
              name: 'type1',
              subtypes: []
            },
            {
              id: 2,
              name: 'type2',
              subtypes: []
            },
            {
              id: 3,
              name: 'type3',
              subtypes: [new CHSubtype({
                id: 1,
                name: 'subtype',
                chTypeID: 3
              })]
            }],
            id: 1,
            empty: false,
            number: 0,
            numberOfElements: 3,
            size: 3,
            totalElements: 12,
            totalPages: 6,
            last: false
          }
        ))),
      editType: jasmine.createSpy('editType').and
        .returnValue(throwError(new Error('error'))),

      deleteType: jasmine.createSpy('deleteType').and
        .returnValue(throwError(new Error('error')))
    };

    const subtypeServices = {
      deleteSubtype: jasmine.createSpy('deleteSubtype').and.returnValue(throwError(new Error('can\'t delete'))),

      editSubtype: jasmine.createSpy('editSubtype').and
        .returnValue(throwError(new Error('error'))),
    };




    TestBed.configureTestingModule({
      declarations: [CHTypesComponent],
      imports: [NgxPaginationModule, MatDialogModule, MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: CHTypeService, useValue: chTypesService },
        { provide: CHSubtypeService, useValue: subtypeServices },
        MatSnackBar, Overlay, NgbModal,
      ]
    });

    fixture = TestBed.createComponent(CHTypesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CHTypeService);
    serviceSubtypes = TestBed.inject(CHSubtypeService);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call delete subtype and display a message', fakeAsync(() => {
    spyOn(component, 'openSnackBar');

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.deleteSubtype(1);
    flush();

    expect(serviceSubtypes.deleteSubtype).toHaveBeenCalledWith(1); // brisanje s id-em 1
    fixture.detectChanges();

    expect(component.openSnackBar).toHaveBeenCalledWith('Can\'t delete that subtype. There are cultural heritages of that subtype.');

  }));

  it('should call delete type and display a message', fakeAsync(() => {
    spyOn(component, 'openErrorModal');

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.deleteType(1);
    flush();

    expect(service.deleteType).toHaveBeenCalledWith(1); // brisanje s id-em 1
    fixture.detectChanges();

    expect(component.openErrorModal).toHaveBeenCalledWith('You can\'t delete this type because there are cultural heritages of selected type. Please delete all data associated with this type first and try again.');

  }));


  it('should edit subtype unsuccessfully and display a message', fakeAsync(() => {
    spyOn(component, 'openSnackBar');
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.editSubtype(component.chTypes[2].subtypes[0], component.chTypes[2].subtypes[0].name);
    flush();

    expect(serviceSubtypes.editSubtype)
    .toHaveBeenCalledWith({ ...component.chTypes[2].subtypes[0], name: component.chTypes[2].subtypes[0].name });
    fixture.detectChanges();
    expect(component.openSnackBar).toHaveBeenCalledWith('Name already exist!');
  }));


  it('should edit type unsuccessfully and display a message', fakeAsync(() => {
    spyOn(component, 'openSnackBar');
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.editType(component.chTypes[0], component.chTypes[0].name);
    flush();

    expect(service.editType).toHaveBeenCalledWith({ ...component.chTypes[0], name: component.chTypes[0].name });
    fixture.detectChanges();
    expect(component.openSnackBar).toHaveBeenCalledWith('Name already exist!');
  }));

});
