import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoDataComponent } from './do-data.component';
import { DoEChartsModule } from '../do-echarts/do-echarts.module';
import { DialogModule, TreeModule } from 'primeng/primeng';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DoServiceModule } from 'app/shared/do-service/do-service.module';

@NgModule({
  imports: [
    CommonModule, DoEChartsModule, DialogModule, NgbModule, FormsModule, TreeModule, DoServiceModule,
  ],
  exports: [DoDataComponent],
  declarations: [DoDataComponent],
  entryComponents: [
  ],
})
export class DoDataMoudle { }
