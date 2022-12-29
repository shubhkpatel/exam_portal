import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegisterComponent } from './pages/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
