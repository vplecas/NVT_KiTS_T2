
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CHSubtype } from 'src/app/models/ch-subtype.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CulturalHeritage } from 'src/app/models/cultural-heritage.model';
import { Location } from 'src/app/models/location.model';
import { CHSubtypeService } from 'src/app/services/ch-subtype-service/ch-subtype.service';
import { CulturalHeritageService } from 'src/app/services/cultural-heritage-service/cultural-heritage.service';
import { LocationService } from 'src/app/services/location/location.service';
@Component({
  selector: 'app-update-ch',
  templateUrl: './update-ch.component.html',
  styleUrls: ['./update-ch.component.css']
})
export class UpdateChComponent implements OnInit {

  url: File;

  name = '';
  description = '';

  isLocationChosen = false;
  isSubtypeChosen = false;
  isFileChosen = false;

  location: Location;

  subtypes: Array<CHSubtype> = [];

  subtype: CHSubtype;  // selected value - subtype

  chid: number;

  culturalHeritage: CulturalHeritage;


  constructor(
    private chService: CulturalHeritageService,
    private locationService: LocationService,
    private subtypeService: CHSubtypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.chid = +params.get('chid');

      this.chService.getOne(this.chid)
        .subscribe(async response => {

          // set CH based
          this.culturalHeritage = response;

          // set location
          this.locationService
            .getOne(this.culturalHeritage.locationID)
            .subscribe(loc => {
              this.location = loc;
            });

          // get all subtypes
          this.subtypeService.getAll().subscribe(
            data => {
              this.subtypes = data;
              // set this.subtype
              this.subtype = this.subtypes.find(subtype =>
                subtype.id === this.culturalHeritage.chsubtypeID);
            }
          );
        });
    });
  }

  /**
   *
   */
  updateCH(): void {


    this.locationService.post(this.location).subscribe(response => {

      const location: Location = response;
      this.culturalHeritage.locationID = location.id;
      this.culturalHeritage.chsubtypeID = this.subtype.id;

      // if new file hasn't been chosen then create file from existing image
      if (!this.url) {
        fetch(this.culturalHeritage.imageUri)
          .then(r => r.blob())
          .then(blobFile => new File([blobFile], 'slika.png', { type: 'image/png' }))
          .then(file => {
            this.chService.put(this.culturalHeritage, file).subscribe(chResponse => {
              this.router.navigate(['/cultural-heritages']);
              this.openSnackBar(`Successfuly updated ${chResponse.name}.`);
            });
          })
          .catch(() => {
            this.openSnackBar(`Cannot updated cultural heritage.`);
            this.router.navigate(['/cultural-heritages']);
          });
      }
      else {
        const file = this.url;
        this.chService.put(this.culturalHeritage, file).subscribe(chResponse => {
          this.router.navigate(['/cultural-heritages']);
          this.openSnackBar(`Successfuly updated ${chResponse.name}.`);
        },
          () => {
            this.openSnackBar(`Cannot updated cultural heritage.`);
            this.router.navigate(['/cultural-heritages']);
          });
      }

    },
      () => {
        this.openSnackBar(`Cannot updated cultural heritage.`);
        this.router.navigate(['/cultural-heritages']);
      });
  }

  /**
   * Take url of choosen image.
   *
   * @param event file selected
   */
  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];
      // console.log(this.url)
      this.isFileChosen = true;
    }
  }

  /**
   *
   * @param location location is passed from map component
   * after geocoder search
   */
  setLocation(location: Location): void {
    console.log(location);
    this.location = location;
    // console.log(location);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
    });
  }
}
