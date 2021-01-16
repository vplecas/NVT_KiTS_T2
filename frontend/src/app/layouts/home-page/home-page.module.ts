import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MapsComponent } from 'src/app/components/maps/maps.component';
import { MyProfileComponent } from 'src/app/components/my-profile/my-profile.component';
import { RegisterComponent } from '../../components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VerificationPageComponent } from '../../components/verification-page/verification-page.component';
import { CulturalHeritageComponent  } from '../../components/cultural-heritage/cultural-heritage.component';
import { DashboardComponent  } from '../../components/dashboard/dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from 'src/app/components/login/login.component';


import { CommentsComponent } from '../../components/comments/comments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTabsModule} from '@angular/material/tabs';
import { CHTypesComponent } from 'src/app/components/ch-types/ch-types.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        NgxPaginationModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
    ],
    declarations: [
        HomePageComponent,
        NotificationsComponent,
        MapsComponent,
        MyProfileComponent,
        CHTypesComponent,
        RegisterComponent,
        DashboardComponent,
        VerificationPageComponent,
        CulturalHeritageComponent,
        LoginComponent,
        CommentsComponent
    ]
})

export class HomePageModule { }
