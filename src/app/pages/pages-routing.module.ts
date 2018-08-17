import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomePageComponent } from './homepage/homepage.component';
import { DatadecisionComponent } from './datadecision/datadecision.component';

import { Mf1Component } from './fourandfour/mf1/mf1.component';
import { Mf2Component } from './fourandfour/mf2/mf2.component';
import { Mf3Component } from './fourandfour/mf3/mf3.component';
import { Mf4Component } from './fourandfour/mf4/mf4.component';
import { Mf5Component } from './fourandfour/mf5/mf5.component';
import { Mf6Component } from './fourandfour/mf6/mf6.component';
import { Mf7Component } from './fourandfour/mf7/mf7.component';
import { Mf8Component } from './fourandfour/mf8/mf8.component';
import { Mf9Component } from './fourandfour/mf9/mf9.component';
import { Mf10Component } from './fourandfour/mf10/mf10.component';
import { Mf11Component } from './fourandfour/mf11/mf11.component';
import { Mf12Component } from './fourandfour/mf12/mf12.component';
import { Mf13Component } from './fourandfour/mf13/mf13.component';


import { Nw1Component } from './network/nw1/nw1.component';
import { Nw2Component } from './network/nw2/nw2.component';
import { Nw3Component } from './network/nw3/nw3.component';
import { Nw4Component } from './network/nw4/nw4.component';
import { Nw5Component } from './network/nw5/nw5.component';
import { Nw6Component } from './network/nw6/nw6.component';
import { Nw7Component } from './network/nw7/nw7.component';
import { Nw8Component } from './network/nw8/nw8.component';
import { Nw9Component } from './network/nw9/nw9.component';
import { Nw10Component } from './network/nw10/nw10.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'homepage',
    component: HomePageComponent,
  }, {
    path: 'mf1',
    component: Mf1Component,
  }, {
    path: 'mf2',
    component: Mf2Component,
  },
  {
    path: 'mf3',
    component: Mf3Component,
  }, {
    path: 'mf4',
    component: Mf4Component,
  }, {
    path: 'mf5',
    component: Mf5Component,
  }, {
    path: 'mf6',
    component: Mf6Component,
  }, {
    path: 'mf7',
    component: Mf7Component,
  }, {
    path: 'mf8',
    component: Mf8Component,
  }, {
    path: 'mf9',
    component: Mf9Component,
  }, {
    path: 'mf10',
    component: Mf10Component,
  }, {
    path: 'mf11',
    component: Mf11Component,
  }, {
    path: 'mf12',
    component: Mf12Component,
  }, {
    path: 'mf13',
    component: Mf13Component,
  }, {
    path: 'nw1',
    component: Nw1Component,
  }, {
    path: 'nw2',
    component: Nw2Component,
  }, {
    path: 'nw3',
    component: Nw3Component,
  }, {
    path: 'nw4',
    component: Nw4Component,
  }, {
    path: 'nw5',
    component: Nw5Component,
  }, {
    path: 'nw6',
    component: Nw6Component,
  }, {
    path: 'nw7',
    component: Nw7Component,
  }, {
    path: 'nw8',
    component: Nw8Component,
  }, {
    path: 'nw9',
    component: Nw9Component,
  }, {
    path: 'nw10',
    component: Nw10Component,
  }, {
    path: 'datadecision',
    component: DatadecisionComponent,
  }, {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
