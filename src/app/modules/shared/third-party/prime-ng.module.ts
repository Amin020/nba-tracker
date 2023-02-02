import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

const primeModules = [
    CommonModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule
];
@NgModule({
  declarations: [],
  imports: primeModules,
  exports: primeModules,
  providers: [
  ],
})
export class PrimeNGModule {}
