import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@/app-routing.module';
import { provideHttpClient } from '@angular/common/http';

import { LogsModule } from '@logs/logs.module';

import { AppComponent } from '@/app.component';
import { AuthModule } from '@auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LogsModule, AuthModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
