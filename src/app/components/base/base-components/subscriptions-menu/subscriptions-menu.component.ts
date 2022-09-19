import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../../reducers/base.reducer';
import {
  getSubscriptions,
  changeSubscriptions,
  getAllSubscriptions,
  getUserInfo,
} from '../../reducers/base.selectors';
import {
  RequestGetSubscriptions,
  RequestUserInfo,
  RequestChangeSubscriptions,
  SuccessChangeSubscriptions,
  RequestGetAllSubscriptions,
  RequestPredefineSubscription,
  SideNavActionTypes,
} from '../../reducers/base.actions';
import { FormControl } from '@angular/forms';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '@peakitpt/ui-material';
import {
  UserSubscription,
  UserSubscriptionsResponse,
} from './subscription-menu.model';
import { ofType } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'kyr-subscriptions-menu',
  templateUrl: './subscriptions-menu.component.html',
  styleUrls: ['./subscriptions-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionsMenuComponent implements OnInit, OnDestroy {
  subscriptions: any;
  shownSubscriptions: any;
  currentSubscription: any = { id: localStorage.getItem('subscriptionId') };
  subscriptions$: Observable<any>;
  subs: Subscription[] = [];
  changeSub$: Observable<any>;
  changeSubService: Subscription;

  subscriptionSearchForm = new FormControl();

  // Modal Variables
  @ViewChild('modal') modal: DialogComponent;
  allSubscriptions$: Observable<any>;
  allSubscriptions = [];
  shownAllSubscriptions = [];
  allSubscriptionSearchForm = new FormControl();
  isSuperUser = false;

  constructor(
    private store: Store<State>,
    private _service: SubscriptionsService,
    public actionSubject: ActionsSubject,
    private sharedModel: SharedModule,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('currentSubscription')) {
      this.currentSubscription = JSON.parse(
        localStorage.getItem('currentSubscription')
      );
    }
    this.setSubscriptions();
    this.setChangeSubscription();
    this.setSubscriptionSearch();
    this.setPredefineChange();
  }

  setSubscriptions() {
    this.subscriptions$ = this.store.select(getSubscriptions);

    const subscriptionPayload = {
      userId: localStorage.getItem('userId'),
      ekklesiaId: localStorage.getItem('subscriptionId'),
    };
    this.store.dispatch(new RequestGetSubscriptions(subscriptionPayload));
    this.store.dispatch(new RequestUserInfo(null));

    this.subs.push(
      this.subscriptions$.subscribe((r) => {
        if (r?.payload) {
          this.subscriptions = r.payload;
          this.shownSubscriptions = this.subscriptions.subscriptions;

          if (+this.currentSubscription.id === this.subscriptions.default.id) {
            this.currentSubscription = this.subscriptions.default;
          } else {
            for (const sub of this.subscriptions.subscriptions) {
              if (+this.currentSubscription.id === sub.id) {
                this.currentSubscription = sub;
                break;
              }
            }
          }
        }
      })
    );

    this.subs.push(
      this.store.select(getUserInfo).subscribe((user: any) => {
        if (user) {
          localStorage.setItem('userEntityId', user.payload.user.entity.id);
          this.isSuperUser = this.sharedModel.checkIfEntityType(
            SharedModule.USER_SUPERUSERS,
            user.payload.user.entity
          );
        }
      })
    );
  }

  setChangeSubscription() {
    this.changeSub$ = this.store.select(changeSubscriptions);

    this.subs.push(
      this.changeSub$.subscribe((r: SuccessChangeSubscriptions) => {
        if (r?.payload) {
          this.changeSubService = this._service
            .changeSubscription(r.payload.id.toString())
            .subscribe(() => {
              localStorage.setItem('subscriptionId', r.payload.id);
              localStorage.setItem(
                'subscriptionTypeId',
                r.payload.entity_type.id
              );
              localStorage.setItem(
                'currentSubscription',
                JSON.stringify(r.payload)
              );
              location.href =
                environment.railsAppUrl +
                '/entitys_access/' +
                r.payload.id +
                '/login';
              this.changeSubService.unsubscribe();
            });
        }
      })
    );
  }

  changeSubscription(subscription: any) {
    localStorage.setItem('currentSubscription', JSON.stringify(subscription));
    this.store.dispatch(new RequestChangeSubscriptions(subscription));
  }

  setSubscriptionSearch() {
    this.subs.push(
      this.subscriptionSearchForm.valueChanges.subscribe((value: string) => {
        this.shownSubscriptions = this.subscriptions.subscriptions.filter(
          (elem) => {
            const searchWord = value
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
            const name = elem.name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
            return name.includes(searchWord);
          }
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  // Modal Functions

  openSubscriptionsModal() {
    this.getAllSubscriptions();
    this.setAllSubscriptionsSearch();
    this.modal.open();
  }

  onModalClose() {}

  getAllSubscriptions() {
    this.allSubscriptions$ = this.store.select(getAllSubscriptions);

    const subscriptionPayload = {
      userId: localStorage.getItem('userId'),
      ekklesiaId: localStorage.getItem('subscriptionId'),
      limit: 'all',
    };
    this.store.dispatch(new RequestGetAllSubscriptions(subscriptionPayload));

    this.subs.push(
      this.allSubscriptions$.subscribe((r: UserSubscriptionsResponse) => {
        this.allSubscriptions = [];
        this.shownAllSubscriptions = [];
        if (r) {
          r.subscriptions.forEach((subscription: UserSubscription) => {
            this.allSubscriptions.push({
              entity_type: {
                id: subscription.entity_type.id,
                name_translate: subscription.entity_type.name_translate,
              },
              id: subscription.id,
              name: subscription.name,
              fullName: `${subscription.entity_type.name_translate} | ${subscription.name}`,
            });
          });
          this.shownAllSubscriptions = this.allSubscriptions;
        }
      })
    );
  }

  setAllSubscriptionsSearch() {
    this.subs.push(
      this.allSubscriptionSearchForm.valueChanges.subscribe((value) => {
        this.shownAllSubscriptions = this.allSubscriptions.filter((elem) => {
          const searchWord = value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          const name = elem.fullName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          return name.includes(searchWord);
        });
      })
    );
  }

  setPredefineChange() {
    this.subs.push(
      this.actionSubject
        .pipe(ofType(SideNavActionTypes.SuccessPredefineSubscription))
        .subscribe(() => {
          this.allSubscriptionSearchForm.setValue('');
          const subscriptionPayload = {
            userId: localStorage.getItem('userId'),
            ekklesiaId: localStorage.getItem('subscriptionId'),
          };
          this.store.dispatch(new RequestGetSubscriptions(subscriptionPayload));
          const subscriptionPayloadAll = {
            userId: localStorage.getItem('userId'),
            ekklesiaId: localStorage.getItem('subscriptionId'),
            limit: 'all',
          };
          this.store.dispatch(
            new RequestGetAllSubscriptions(subscriptionPayloadAll)
          );
        })
    );
  }

  predefineSubscription(id: number) {
    this.store.dispatch(new RequestPredefineSubscription(id));
  }

  goToEntitysAccess() {
    this.modal.close();
    this.router.navigate(['entitys-access']);
  }

  addSubscription() {
    this.router.navigate(['subscriptions', 'new']);
  }
}
