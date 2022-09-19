import { UsersSearchComponent } from './users/users-search/users-search.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { I18NextModule } from 'angular-i18next';
import { UiMaterialModule } from '@peakitpt/ui-material';

import { PageRoutingModule } from './page-routing.module';
import { BaseComponent } from './base/base.component';
import { reducer } from './base/reducers/base.reducer';
import { SideNavEffects } from './base/reducers/base.effects';
import { SharedModule } from '../shared/shared.module';
import { MessagesMenuComponent } from './base/base-components/messages-menu/messages-menu.component';
import { SubscriptionsMenuComponent } from './base/base-components/subscriptions-menu/subscriptions-menu.component';
import { ModulesMenuComponent } from './base/base-components/modules-menu/modules-menu.component';
import { ChangeSubscriptionComponent } from './base/base-components/change-subscription/change-subscription.component';
import { LogoutComponent } from './base/logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

// SEARCH
import { AdvancedSearchComponent } from './base/base-components/advanced-search/advanced-search.component';
import { SectionsSearchComponent } from './sections/sections-search/sections-search.component';
import { CountriesSearchComponent } from './countries/countries-search/countries-search.component';
import { FormationTypesSearchComponent } from './formation-types/formation-types-search/formation-types-search.component';
import { FormationsSearchComponent } from './formations/formations-search/formations-search.component';
import { TextMessagesSearchComponent } from './text-messages/text-messages-search/text-messages-search.component';
import { FamiliesSearchComponent } from './families/families-search/families-search.component';
import { SubscriptionsSearchComponent } from './subscriptions/subscriptions-search/subscriptions-search.component';
import { SubscriptionUsersSearchComponent } from './subscription-users/subscription-users-search/subscription-users-search.component';
import { ReportsSearchComponent } from './reports/reports-search/reports-search.component';
import { BishopricsSearchComponent } from './bishoprics/bishoprics-search/bishoprics-search.component';
import { ArchpristshipsSearchComponent } from './archpristships/archpristships-search/archpristships-search.component';
import { EmenusSearchComponent } from './emenus/emenus-search/emenus-search.component';
import { ChapelriesSearchComponent } from './chapelries/chapelries-search/chapelries-search.component';
import { WorshipplacesSearchComponent } from './worshipplaces/worshipplaces-search/worshipplaces-search.component';
import { PatronsSearchComponent } from './patrons/patrons-search/patrons-search.component';
import { MecsSearchComponent } from './mecs/mecs-search/mecs-search.component';
import { ContentsSearchComponent } from './contents/contents-search/contents-search.component';
import { EventsSearchComponent } from './events/events-search/events-search.component';
import { PersonsSearchComponent } from './persons/persons-search/persons-search.component';
import { UserNewslettersSearchComponent } from './user-newsletters/user-newsletters-search/user-newsletters-search.component';
import { CatechismsSearchComponent } from './catechisms/catechisms-search/catechisms-search.component';
import { GroupsSearchComponent } from './groups/groups-search/groups-search.component';
import { EmolumentsSearchComponent } from './emoluments/emoluments-search/emoluments-search.component';
import { EmolumentsTypesSearchComponent } from './emoluments-types/emoluments-types-search/emoluments-types-search.component';
import { NumerationsSearchComponent } from './numerations/numerations-search/numerations-search.component';
import { NumerationsViewsSearchComponent } from './numerations-views/numerations-views-search/numerations-views-search.component';
import { DeathsSearchComponent } from './deaths/deaths-search/deaths-search.component';
import { MassIntentionsTypesSearchComponent } from './mass-intentions-types/mass-intentions-types-search/mass-intentions-types-search.component';
import { MassIntentionsSearchComponent } from './mass-intentions/mass-intentions-search/mass-intentions-search.component';
import { GestdocumentsSearchComponent } from './gestdocuments/gestdocuments-search/gestdocuments-search.component';
import { ValencesSearchComponent } from './valences/valences-search/valences-search.component';
import { CatholicDirectoryPriestsSearchComponent } from './catholic-directory-priests/catholic-directory-priests-search/catholic-directory-priests-search.component';
import { NewslettersSearchComponent } from './newsletters/newsletters-search/newsletters-search.component';
import { CatholicDirectoryInstitutionsSearchComponent } from './catholic-directory-institutions/catholic-directory-institutions-search/catholic-directory-institutions-search.component';
import { NewslettersLayoutsSearchComponent } from './newsletters-layouts/newsletters-layouts-search/newsletters-layouts-search.component';
import { NewsletterSubscriptionsSearchComponent } from './newsletter-subscriptions/newsletter-subscriptions-search/newsletter-subscriptions-search.component';
import { NewsletterGroupSubscriptionsSearchComponent } from './newsletter-group-subscriptions/newsletter-group-subscriptions-search/newsletter-group-subscriptions-search.component';
import { AccrualsSearchComponent } from './accruals/accruals-search/accruals-search.component';
import { AccrualsTypesSearchComponent } from './accruals-types/accruals-types-search/accruals-types-search.component';
import { CatechumensSearchComponent } from './catechumens/catechumens-search/catechumens-search.component';
import { ChrismsSearchComponent } from './chrisms/chrisms-search/chrisms-search.component';
import { AccrualsProcessmentsSearchComponent } from './accruals-processments/accruals-processments-search/accruals-processments-search.component';
import { AccountingChartAccountsSearchComponent } from './accounting-chart-accounts/accounting-chart-accounts-search/accounting-chart-accounts-search.component';
import { AccountingExercisesSearchComponent } from './accounting-exercises/accounting-exercises-search/accounting-exercises-search.component';
import { CurrentAccountsSearchComponent } from './current-accounts/current-accounts-search/current-accounts-search.component';
import { DocumentsSearchComponent } from './documents/documents-search/documents-search.component';
import { DocumentsTypesSearchComponent } from './documents-types/documents-types-search/documents-types-search.component';
import { AccountingTransactionsSearchComponent } from './accounting-transactions/accounting-transactions-search/accounting-transactions-search.component';
import { AccountingCostCentersSearchComponent } from './accounting-cost-centers/accounting-cost-centers-search/accounting-cost-centers-search.component';
import { AccountingJournalsSearchComponent } from './accounting-journals/accounting-journals-search/accounting-journals-search.component';
import { ClergyTypesSearchComponent } from './clergy-types/clergy-types-search/clergy-types-search.component';
import { AccountingTransactionLinesSearchComponent } from './accounting-transaction-lines/accounting-transaction-lines-search/accounting-transaction-lines-search.component';
import { AccountingBalanceSheetsSearchComponent } from './accounting-balance-sheets/accounting-balance-sheets-search/accounting-balance-sheets-search.component';
import { PriestsSearchComponent } from './priests/priests-search/priests-search.component';
import { AccountingTaxonomyCodesSearchComponent } from './accounting-taxonomy-codes/accounting-taxonomy-codes-search/accounting-taxonomy-codes-search.component';
import { InstitutionTypesSearchComponent } from './institution-types/institution-types-search/institution-types-search.component';
import { CuriaSecretariatsSearchComponent } from './curia-secretariats/curia-secretariats-search/curia-secretariats-search.component';
import { CuriaSecretariatTypesSearchComponent } from './curia-secretariat-types/curia-secretariat-types-search/curia-secretariat-types-search.component';
import { CuriaMinistriesAndOrdersSearchComponent } from './curia-ministries-and-orders/curia-ministries-and-orders-search/curia-ministries-and-orders-search.component';
import { CuriaBaptismsSearchComponent } from './curia-baptisms/curia-baptisms-search/curia-baptisms-search.component';
import { CuriaAdministrativeProcessesSearchComponent } from './curia-administrative-processes/curia-administrative-processes-search/curia-administrative-processes-search.component';
import { CuriaAdministrativeProcessTypesSearchComponent } from './curia-administrative-process-types/curia-administrative-process-types-search/curia-administrative-process-types-search.component';
import { CuriaWeddingsSearchComponent } from './curia-weddings/curia-weddings-search/curia-weddings-search.component';
import { CuriaFunctionsSearchComponent } from './curia-functions/curia-functions-search/curia-functions-search.component';
import { InstitutionsSearchComponent } from './institutions/institutions-search/institutions-search.component';
import { PendingEntitiesSearchComponent } from './pending-entities/pending-entities-search/pending-entities-search.component';

@NgModule({
  declarations: [
    BaseComponent,
    MessagesMenuComponent,
    SubscriptionsMenuComponent,
    ModulesMenuComponent,
    AdvancedSearchComponent,
    ChangeSubscriptionComponent,
    LogoutComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxChartsModule,
    StoreModule.forFeature('base', reducer),
    EffectsModule.forFeature([SideNavEffects]),
    UiMaterialModule,
    FormsModule,
    I18NextModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PageRoutingModule,
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    ArchpristshipsSearchComponent,
    BishopricsSearchComponent,
    ChapelriesSearchComponent,
    WorshipplacesSearchComponent,
    SectionsSearchComponent,
    CountriesSearchComponent,
    FormationTypesSearchComponent,
    FormationsSearchComponent,
    TextMessagesSearchComponent,
    FamiliesSearchComponent,
    UsersSearchComponent,
    SubscriptionsSearchComponent,
    SubscriptionUsersSearchComponent,
    ReportsSearchComponent,
    PatronsSearchComponent,
    MecsSearchComponent,
    EmenusSearchComponent,
    ContentsSearchComponent,
    EventsSearchComponent,
    PersonsSearchComponent,
    UserNewslettersSearchComponent,
    CatechismsSearchComponent,
    GroupsSearchComponent,
    EmolumentsSearchComponent,
    EmolumentsTypesSearchComponent,
    NumerationsSearchComponent,
    NumerationsViewsSearchComponent,
    DeathsSearchComponent,
    MassIntentionsTypesSearchComponent,
    MassIntentionsSearchComponent,
    GestdocumentsSearchComponent,
    ValencesSearchComponent,
    CatholicDirectoryPriestsSearchComponent,
    NewslettersSearchComponent,
    CatholicDirectoryInstitutionsSearchComponent,
    NewslettersLayoutsSearchComponent,
    NewsletterSubscriptionsSearchComponent,
    NewsletterGroupSubscriptionsSearchComponent,
    AccrualsSearchComponent,
    AccrualsTypesSearchComponent,
    CatechumensSearchComponent,
    ChrismsSearchComponent,
    AccrualsProcessmentsSearchComponent,
    AccountingChartAccountsSearchComponent,
    AccountingExercisesSearchComponent,
    CurrentAccountsSearchComponent,
    DocumentsSearchComponent,
    DocumentsTypesSearchComponent,
    AccountingTransactionsSearchComponent,
    AccountingCostCentersSearchComponent,
    AccountingJournalsSearchComponent,
    ClergyTypesSearchComponent,
    AccountingTransactionLinesSearchComponent,
    AccountingBalanceSheetsSearchComponent,
    PriestsSearchComponent,
    AccountingTaxonomyCodesSearchComponent,
    InstitutionTypesSearchComponent,
    CuriaSecretariatsSearchComponent,
    CuriaSecretariatTypesSearchComponent,
    CuriaMinistriesAndOrdersSearchComponent,
    CuriaBaptismsSearchComponent,
    CuriaAdministrativeProcessesSearchComponent,
    CuriaAdministrativeProcessTypesSearchComponent,
    CuriaWeddingsSearchComponent,
    CuriaFunctionsSearchComponent,
    InstitutionsSearchComponent,
    PendingEntitiesSearchComponent,
  ],
})
export class PageModule {}
