import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MePage } from '../me/me';
// import { NewhomePage } from '../newhome/newhome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = NewhomePage;
  tab1Root = HomePage;


  tab2Root = MePage;


  constructor() {

  }
}
