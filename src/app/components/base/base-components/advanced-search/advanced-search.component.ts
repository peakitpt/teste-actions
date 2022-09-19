import { RequestPostSearch } from './../../reducers/base.actions';
import { getSearch } from './../../reducers/base.selectors';
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/base.reducer';
import { getSideNav } from '../../reducers/base.selectors';
import { MenuHelperService } from '../../services/menu-helper.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() largeSize = true;

  subs: Subscription[] = [];
  searchStringControl = new FormControl();
  dynamicFormValues: any;

  sidenavData$: Observable<any>;
  sidenavData: any;

  canSearch = false;
  searchData$: Observable<any>;
  searchData: any;

  @ViewChild('target', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private resolver: ComponentFactoryResolver,
    private menuHelperService: MenuHelperService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      // Gets Template
      this.sidenavData$ = this.store.select(getSideNav);
      this.subs.push(
        this.sidenavData$.subscribe(r => {
          if (r) {
            this.sidenavData = r;
            this.searchStringControl.setValue('');
            if (r.searchFormTemplate) {
              this.createComponent(r.searchFormTemplate);
            } else {
              if (this.entry) {
                this.entry.clear();
              }
              this.canSearch = false;
            }
          }
        })
      );

      this.searchData$ = this.store.select(getSearch);
      this.subs.push(
        this.searchData$.subscribe(r => {
          if (r) {
            this.dynamicFormValues = r;
            this.fillTopSearch(this.dynamicFormValues.searchWord);
          }
        })
      );
    });
  }

  createComponent(searchComponent: any) {
    const component = this.menuHelperService.getSearchForm(searchComponent);

    if (this.entry) {
      this.entry.clear();
    }
    if (component) {
      this.canSearch = true;
      const factory = this.resolver.resolveComponentFactory(component);
      const componentRef = this.entry.createComponent(factory);
    }
  }

  search() {
    const search = {
      searchWord: this.searchStringControl.value
    };
    this.store.dispatch(new RequestPostSearch(search));
  }

  fillTopSearch(data: string = '') {
    this.searchStringControl.setValue(data);
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  clearSearch() {
    this.searchStringControl.setValue('');
    this.search();
  }
}
