import { RouteCacheService } from './../do-service/route-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoFrameService } from '../do-service/do-frame.service';
import { NgZone } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { DoTreeService } from 'app/shared/do-service/do-tree.service';

@Component({
  selector: 'do-frame',
  templateUrl: 'do-frame.component.html',
  styleUrls: ['do-frame.component.scss'],
})
export class DoFrameComponent implements OnInit {

  @Input() leftTitle: string;
  headerController: boolean;
  footController: Array<boolean> = new Array<boolean>(3);
  headerControllerText: string;

  constructor(private router: Router,
    private service: DoFrameService,
    private treeService: DoTreeService,
    private activeRoute: ActivatedRoute,
    private zone: NgZone,
    private routeCacheService: RouteCacheService) {
  }

  public ngOnInit() {
    this.headerController = this.service.headerController;
    this.footController = this.service.footController;
    this.headerControllerText = this.service.headerControllerText;
  }
  quitClicked() {
    const url = this.activeRoute.snapshot.url[0].path;
    let target: string = '';
    switch (url) {
      case 'mf1':
        target = 'pages/homepage';
        break;
      case 'mf2':
        target = 'pages/homepage';
        break;
      case 'mf3':
        target = 'pages/mf2';
        break;
      case 'mf4':
        target = 'pages/mf2';
        break;
      case 'mf5':
        target = 'pages/mf2';
        break;
      case 'mf6':
        target = 'pages/mf2';
        break;
      case 'mf7':
        target = 'pages/mf2';
        break;
      case 'mf8':
        target = 'pages/mf2';
        break;
      case 'mf9':
        target = 'pages/mf2';
        break;
      case 'mf10':
        target = 'pages/mf2';
        break;
      case 'mf11':
        target = 'pages/mf2';
        break;
      case 'mf12':
        target = 'pages/mf2';
        break;
      case 'mf13':
        target = 'pages/mf2';
        break;
      case 'nw1':
        target = 'pages/homepage';
        break;
      case 'nw2':
        target = 'pages/nw1';
        break;
      case 'nw3':
        target = 'pages/nw1';
        break;
      case 'nw4':
        target = 'pages/nw1';
        break;
      case 'nw5':
        target = 'pages/nw1';
        break;
      case 'nw6':
        target = 'pages/nw1';
        break;
      case 'nw7':
        target = 'pages/nw1';
        break;
      case 'nw8':
        target = 'pages/nw1';
        break;
      case 'nw9':
        target = 'pages/nw1';
        break;
      case 'nw10':
        target = 'pages/nw1';
        break;
      default:
        target = 'pages/homepage';
        break;
    }
    this.service.headerController = true;
    for (const iterator of this.treeService.treeNetWork) {
      if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
    }
    for (const iterator of this.treeService.treeNetWorkTwo) {
      if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
    }
    for (const iterator of this.treeService.treeContainer) {
      if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
    }
    for (const iterator of this.treeService.treeContainerTwo) {
      if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
      for (const iterator1 of iterator.children) {
        if (iterator1.styleClass === 'activeLi') {iterator1.styleClass = ''; }
      }
    }
    for (const iterator of this.treeService.treeContainerThree) {
      if (iterator.styleClass === 'activeLi') {iterator.styleClass = ''; }
      for (const iterator1 of iterator.children) {
        if (iterator1.styleClass === 'activeLi') {iterator1.styleClass = ''; }
      }
    }
    this.zone.run(() => this.router.navigate([target]));
  }
  dataClicked() {
    this.zone.run(() => this.router.navigate(['pages/datadecision']));
    this.service.selectIndex(0, this.service.footController);
    this.footController = this.service.footController;
    this.service.headerController = false;
    this.service.headerControllerText = '工信大数据库';
  }
  makeClicked() {
    this.zone.run(() => this.router.navigate(['pages/mf5']));
    this.service.selectIndex(1, this.service.footController);
    this.footController = this.service.footController;
    const name = '节能与新能源汽车';
    for (const iterator of this.treeService.treeContainer) {
      if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
      if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
    }
    for (const iterator of this.treeService.treeContainerTwo) {
      if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
      if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
      for (const iterator1 of iterator.children) {
        if (iterator1.styleClass === 'activeLi') { iterator1.styleClass = ''; }
        if ((iterator1.label === name)) { iterator1.styleClass = 'activeLi'; }
      }
    }
    for (const iterator of this.treeService.treeContainerThree) {
      if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
      if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
      for (const iterator1 of iterator.children) {
        if (iterator1.styleClass === 'activeLi') { iterator1.styleClass = ''; }
        if ((iterator1.label === name)) { iterator1.styleClass = 'activeLi'; }
      }
    }
    this.service.headerController = false;
    this.service.headerControllerText = name;
  }
  netClicked() {
    this.zone.run(() => this.router.navigate(['pages/nw4']));
    this.service.selectIndex(2, this.service.footController);
    this.footController = this.service.footController;
    const name = '提速降费';
    for (const iterator of this.treeService.treeNetWork) {
      if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
      if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
    }
    for (const iterator of this.treeService.treeNetWorkTwo) {
      if (iterator.styleClass === 'activeLi') { iterator.styleClass = ''; }
      if ((iterator.label === name)) { iterator.styleClass = 'activeLi'; }
    }
    this.service.headerController = false;
    this.service.headerControllerText = name;
  }
  homeClick() {
    this.zone.run(() => this.router.navigate(['pages/homePage']));
  }
}
