import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-change-subscription',
  template: '',
})
export class ChangeSubscriptionComponent implements OnInit, OnDestroy {
  subscriptionSub: Subscription;
  changeSubscriptionSub: Subscription;

  routeSub: Subscription;

  constructor(
    private _service: SubscriptionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.changeSubscription(params['id']);
    });
  }

  changeSubscription(id: number) {
    this.changeSubscriptionSub = this._service
      .changeSubscription(id.toString())
      .subscribe(
        (val: any) => {
          this._service.getSubscription(id).subscribe((sub: any) => {
            localStorage.setItem('subscriptionId', id.toString());
            localStorage.setItem(
              'subscriptionTypeId',
              JSON.stringify(sub.subscription.entity_type.id)
            );
            localStorage.setItem(
              'currentSubscription',
              JSON.stringify(sub.subscription)
            );
            location.href =
              environment.railsAppUrl + '/entitys_access/' + id + '/login';
          });
        },
        (error) => {}
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    if (this.changeSubscriptionSub) {
      this.changeSubscriptionSub.unsubscribe();
    }
  }
}
