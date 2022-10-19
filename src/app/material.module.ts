import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports:
        [MatButtonModule,
            MatCheckboxModule,
            MatInputModule,
            MatFormFieldModule,
            MatToolbarModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatSelectModule,
            MatCardModule,
            MatTooltipModule,
            MatTabsModule,
            MatDatepickerModule,
            MatRadioModule,
            ReactiveFormsModule,
            MatNativeDateModule,
            MatListModule,
            MatBadgeModule,
            ScrollingModule,
            MatProgressSpinnerModule,
            MatExpansionModule
        ],
    exports:
        [MatButtonModule,
            MatCheckboxModule,
            MatInputModule,
            MatFormFieldModule,
            MatToolbarModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatSelectModule,
            MatCardModule,
            MatTooltipModule,
            MatTabsModule,
            MatDatepickerModule,
            MatRadioModule,
            ReactiveFormsModule,
            MatNativeDateModule,
            MatListModule,
            MatBadgeModule,
            ScrollingModule,
            MatProgressSpinnerModule,
            MatExpansionModule
        ],
})
export class MaterialModule { }
