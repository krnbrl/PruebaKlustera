import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { GLOBAL } from './services/golbal';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './AppRoutingModule';


@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
if(message_err != null){
  this.message_err = error;
localStorage.setItem('token', null);
}
*/