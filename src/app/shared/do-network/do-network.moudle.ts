import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoNetworkComponent } from './do-network.component';
import { DoEChartsModule } from '../do-echarts/do-echarts.module';
import { DialogModule, TreeModule } from 'primeng/primeng';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modals/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { DoServiceModule } from 'app/shared/do-service/do-service.module';

@NgModule({
  imports: [
    CommonModule, DoEChartsModule, DialogModule, NgbModule, FormsModule, TreeModule, DoServiceModule,
  ],
  exports: [DoNetworkComponent],
  declarations: [DoNetworkComponent, ModalComponent],
  entryComponents: [
    ModalComponent,
  ],
})
export class DoNetworkMoudle { }
