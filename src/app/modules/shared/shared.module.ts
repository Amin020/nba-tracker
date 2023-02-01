import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './third-party/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/interceptors/http.interceptor';


let SharedModules: any[] = [
  CommonModule,
  PrimeNGModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [],
  imports: SharedModules,
  exports: SharedModules,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ]
})
export class SharedModule { }
