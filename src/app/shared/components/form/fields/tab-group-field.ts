import { AfterViewInit, TemplateRef } from '@angular/core';
import { TabField } from './tab-field';


export class TabGroupField {
  type: string = 'tab-group';
  fields: TabField[] = [];

  public constructor(init?:Partial<TabGroupField>) {
    Object.assign(this, init);
  }

  getTabsFor(tabs: { [id: string]: { textLabel: string, templateContent: TemplateRef<any> } }) {
    let groupTabs = [];
    for (const tab of this.fields) {
      if (tab.name in tabs) {
        groupTabs.push(tabs[tab.name]);
      }
    }
    return groupTabs;
  }
}