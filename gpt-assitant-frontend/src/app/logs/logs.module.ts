import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsContainerComponent } from '@logs/components';
import { HomePageComponent } from '@logs/pages';

@NgModule({
  declarations: [HomePageComponent, LogsContainerComponent],
  imports: [CommonModule],
  exports: [HomePageComponent],
})
export class LogsModule {}
