import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AddNewCulturalHeritageComponent } from './add-new-cultural-heritage/add-new-cultural-heritage.component';
import { CommentsComponent } from './comments/comments.component';
import { CulturalHeritageComponent } from './cultural-heritage/cultural-heritage.component';
import { CulturalHeritagesComponent } from './cultural-heritages/cultural-heritages.component';
import { RatingComponent } from './rating/rating.component';
import { UpdateChComponent } from './update-ch/update-ch.component';

@NgModule({
    imports: [SharedModule, MaterialModule],
    exports: [
        CulturalHeritagesComponent,
        CulturalHeritageComponent,
        AddNewCulturalHeritageComponent,
        RatingComponent,
        CommentsComponent,
        UpdateChComponent
    ],
    declarations: [
        CulturalHeritagesComponent,
        CulturalHeritageComponent,
        AddNewCulturalHeritageComponent,
        RatingComponent,
        CommentsComponent,
        UpdateChComponent
    ]
})
export class CulturalHeritageModule { }
