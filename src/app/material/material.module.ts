import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatListModule
];


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
