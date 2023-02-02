import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

let primeModules = [
    CommonModule,
    DropdownModule,
    ButtonModule,
    ToastModule
];
@NgModule({
  declarations: [],
  imports: primeModules,
  exports: primeModules,
  providers: [
  ],
})
export class PrimeNGModule {}
