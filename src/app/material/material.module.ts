import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';





const materialModules = [
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatBadgeModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule
];


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
