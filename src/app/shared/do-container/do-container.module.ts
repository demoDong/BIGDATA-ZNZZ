import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoContainerComponent } from './do-container.component';
import { DoEChartsModule } from '../do-echarts/do-echarts.module';
import { DialogModule, TreeModule } from 'primeng/primeng';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DoServiceModule } from 'app/shared/do-service/do-service.module';

@NgModule({
  imports: [
    CommonModule, DoEChartsModule, DialogModule, NgbModule, FormsModule, TreeModule, DoServiceModule,
  ],
  exports: [DoContainerComponent],
  declarations: [DoContainerComponent],
})
export class DoContainerModule { }
