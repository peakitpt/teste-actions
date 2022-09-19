import { RedirectComponent } from './redirect/redirect.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ChangeSubscriptionComponent } from './base/base-components/change-subscription/change-subscription.component';
import { LogoutComponent } from './base/logout/logout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'subscription_change/:id',
    component: ChangeSubscriptionComponent,
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'text-messages',
        loadChildren: () =>
          import('./text-messages/text-messages.module').then(
            (m) => m.TextMessagesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'newsletters',
        loadChildren: () =>
          import('./newsletters/newsletters.module').then(
            (m) => m.NewslettersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('./countries/countries.module').then((m) => m.CountriesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'formation-types',
        loadChildren: () =>
          import('./formation-types/formation-types.module').then(
            (m) => m.FormationTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'formations',
        loadChildren: () =>
          import('./formations/formations.module').then(
            (m) => m.FormationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'sections',
        loadChildren: () =>
          import('./sections/sections.module').then((m) => m.SectionsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'patrons',
        loadChildren: () =>
          import('./patrons/patrons.module').then((m) => m.PatronsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'mecs',
        loadChildren: () =>
          import('./mecs/mecs.module').then((m) => m.MecsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'acolytes',
        loadChildren: () =>
          import('./acolytes/acolytes.module').then((m) => m.AcolytesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'readers',
        loadChildren: () =>
          import('./readers/readers.module').then((m) => m.ReadersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'pastoral-agents',
        loadChildren: () =>
          import('./pastoral-agents/pastoral-agents.module').then(
            (m) => m.PastoralAgentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'pastoral-agents-types',
        loadChildren: () =>
          import('./pastoral-agents-types/pastoral-agents-types.module').then(
            (m) => m.PastoralAgentsTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'families',
        loadChildren: () =>
          import('./families/families.module').then((m) => m.FamiliesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'family',
        redirectTo: 'families',
      },
      {
        path: 'bishoprics',
        loadChildren: () =>
          import('./bishoprics/bishoprics.module').then(
            (m) => m.BishopricsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'archpristships',
        loadChildren: () =>
          import('./archpristships/archpristships.module').then(
            (m) => m.ArchpristshipsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'chapelries',
        loadChildren: () =>
          import('./chapelries/chapelries.module').then(
            (m) => m.ChapelriesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'worshipplaces',
        loadChildren: () =>
          import('./worshipplaces/worshipplaces.module').then(
            (m) => m.WorshipplacesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'relationship-degrees',
        loadChildren: () =>
          import('./relationship-degrees/relationship-degrees.module').then(
            (m) => m.RelationshipDegreesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'relationship_degrees',
        redirectTo: 'relationship-degrees',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./subscriptions/subscriptions.module').then(
            (m) => m.SubscriptionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'subscription-users',
        loadChildren: () =>
          import('./subscription-users/subscription-users.module').then(
            (m) => m.SubscriptionUsersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'subscription_users',
        redirectTo: 'subscription-users',
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'reports_views',
        redirectTo: 'reports',
      },
      {
        path: 'emenus',
        loadChildren: () =>
          import('./emenus/emenus.module').then((m) => m.EmenusModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'websiteconfigurations',
        loadChildren: () =>
          import('./websiteconfigurations/websiteconfigurations.module').then(
            (m) => m.WebsiteconfigurationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'contents',
        loadChildren: () =>
          import('./contents/contents.module').then((m) => m.ContentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./documents/documents.module').then((m) => m.DocumentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'documents-types',
        loadChildren: () =>
          import('./documents-types/documents-types.module').then(
            (m) => m.DocumentsTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'persons',
        loadChildren: () =>
          import('./persons/persons.module').then((m) => m.PersonsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-newsletters',
        loadChildren: () =>
          import('./user-newsletters/user-newsletters.module').then(
            (m) => m.UserNewslettersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'newsletter-group-subscriptions',
        loadChildren: () =>
          import(
            './newsletter-group-subscriptions/newsletter-group-subscriptions.module'
          ).then((m) => m.NewsletterGroupSubscriptionsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'catechisms',
        loadChildren: () =>
          import('./catechisms/catechisms.module').then(
            (m) => m.CatechismsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'emoluments',
        loadChildren: () =>
          import('./emoluments/emoluments.module').then(
            (m) => m.EmolumentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'emoluments-types',
        loadChildren: () =>
          import('./emoluments-types/emoluments-types.module').then(
            (m) => m.EmolumentsTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'numerations',
        loadChildren: () =>
          import('./numerations/numerations.module').then(
            (m) => m.NumerationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'numerations-views',
        loadChildren: () =>
          import('./numerations-views/numerations-views.module').then(
            (m) => m.NumerationsViewsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'records-importers',
        loadChildren: () =>
          import('./records-importers/records-importers.module').then(
            (m) => m.RecordsImportersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'new-records-importer',
        redirectTo: 'records-importers',
      },
      {
        path: 'reportmanagments',
        loadChildren: () =>
          import('./reportmanagments/reportmanagments.module').then(
            (m) => m.ReportmanagmentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'reports-groups',
        loadChildren: () =>
          import('./reports-groups/reports-groups.module').then(
            (m) => m.ReportsGroupsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'reports_groups',
        redirectTo: 'reports-groups',
      },
      {
        path: 'reports-groupers',
        loadChildren: () =>
          import('./reports-groupers/reports-groupers.module').then(
            (m) => m.ReportsGroupersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'reports_groupers',
        redirectTo: 'reports-groupers',
      },
      {
        path: 'reports-views',
        redirectTo: 'reports',
      },
      {
        path: 'deaths',
        loadChildren: () =>
          import('./deaths/deaths.module').then((m) => m.DeathsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'mass-intentions-types',
        loadChildren: () =>
          import('./mass-intentions-types/mass-intentions-types.module').then(
            (m) => m.MassIntentionsTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'mass-intentions',
        loadChildren: () =>
          import('./mass-intentions/mass-intentions.module').then(
            (m) => m.MassIntentionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'gestdocuments',
        loadChildren: () =>
          import('./gestdocuments/gestdocuments.module').then(
            (m) => m.GestdocumentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'valences',
        loadChildren: () =>
          import('./valences/valences.module').then((m) => m.ValencesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-statistics',
        loadChildren: () =>
          import('./admin-statistics/admin-statistics.module').then(
            (m) => m.AdminStatisticsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin_statistics',
        redirectTo: 'admin-statistics',
      },
      {
        path: 'subscription-statistics',
        loadChildren: () =>
          import(
            './subscription-statistics/subscription-statistics.module'
          ).then((m) => m.SubscriptionStatisticsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'catholic-directory-institutions',
        loadChildren: () =>
          import(
            './catholic-directory-institutions/catholic-directory-institutions.module'
          ).then((m) => m.CatholicDirectoryInstitutionsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'catholic-directory-priests',
        loadChildren: () =>
          import(
            './catholic-directory-priests/catholic-directory-priests.module'
          ).then((m) => m.CatholicDirectoryPriestsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'newsletters-layouts',
        loadChildren: () =>
          import('./newsletters-layouts/newsletters-layouts.module').then(
            (m) => m.NewslettersLayoutsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'newsletter-subscriptions',
        loadChildren: () =>
          import(
            './newsletter-subscriptions/newsletter-subscriptions.module'
          ).then((m) => m.NewsletterSubscriptionsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'subscription-settings',
        loadChildren: () =>
          import('./subscription-settings/subscription-settings.module').then(
            (m) => m.SubscriptionSettingsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'accruals',
        loadChildren: () =>
          import('./accruals/accruals.module').then((m) => m.AccrualsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accruals-types',
        loadChildren: () =>
          import('./accruals-types/accruals-types.module').then(
            (m) => m.AccrualsTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'catechumens',
        loadChildren: () =>
          import('./catechumens/catechumens.module').then(
            (m) => m.CatechumensModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'chrisms',
        loadChildren: () =>
          import('./chrisms/chrisms.module').then((m) => m.ChrismsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accruals-processments',
        loadChildren: () =>
          import('./accruals-processments/accruals-processments.module').then(
            (m) => m.AccrualsProcessmentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'baptisms',
        loadChildren: () =>
          import('./baptisms/baptisms.module').then((m) => m.BaptismsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'current-accounts',
        loadChildren: () =>
          import('./current-accounts/current-accounts.module').then(
            (m) => m.CurrentAccountsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-exercises',
        loadChildren: () =>
          import('./accounting-exercises/accounting-exercises.module').then(
            (m) => m.AccountingExercisesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-chart-accounts',
        loadChildren: () =>
          import(
            './accounting-chart-accounts/accounting-chart-accounts.module'
          ).then((m) => m.AccountingChartAccountsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-journals',
        loadChildren: () =>
          import('./accounting-journals/accounting-journals.module').then(
            (m) => m.AccountingJournalsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-transaction-document-types',
        loadChildren: () =>
          import(
            './accounting-transaction-document-types/accounting-transaction-document-types.module'
          ).then((m) => m.AccountingTransactionDocumentTypesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-cost-centers',
        loadChildren: () =>
          import(
            './accounting-cost-centers/accounting-cost-centers.module'
          ).then((m) => m.AccountingCostCentersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-balance-sheets',
        loadChildren: () =>
          import(
            './accounting-balance-sheets/accounting-balance-sheets.module'
          ).then((m) => m.AccountingBalanceSheetsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-taxonomy-references',
        loadChildren: () =>
          import(
            './accounting-taxonomy-references/accounting-taxonomy-references.module'
          ).then((m) => m.AccountingTaxonomyReferencesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-transactions',
        loadChildren: () =>
          import(
            './accounting-transactions/accounting-transactions.module'
          ).then((m) => m.AccountingTransactionsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-taxonomy-codes',
        loadChildren: () =>
          import(
            './accounting-taxonomy-codes/accounting-taxonomy-codes.module'
          ).then((m) => m.AccountingTaxonomyCodesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-transaction-types',
        loadChildren: () =>
          import(
            './accounting-transaction-types/accounting-transaction-types.module'
          ).then((m) => m.AccountingTransactionTypesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-balance-sheets',
        loadChildren: () =>
          import(
            './accounting-balance-sheets/accounting-balance-sheets.module'
          ).then((m) => m.AccountingBalanceSheetsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounting-transaction-lines',
        loadChildren: () =>
          import(
            './accounting-transaction-lines/accounting-transaction-lines.module'
          ).then((m) => m.AccountingTransactionLinesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'nominations',
        loadChildren: () =>
          import('./nominations/nominations.module').then(
            (m) => m.NominationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'gdprs',
        loadChildren: () =>
          import('./gdprs/gdprs.module').then((m) => m.GDPRSModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'clergy-types',
        loadChildren: () =>
          import('./clergy-types/clergy-types.module').then(
            (m) => m.ClergyTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'priests',
        loadChildren: () =>
          import('./priests/priests.module').then((m) => m.PriestsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'institution-types',
        loadChildren: () =>
          import('./institution-types/institution-types.module').then(
            (m) => m.InstitutionTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'weddings',
        loadChildren: () =>
          import('./weddings/weddings.module').then((m) => m.WeddingsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-baptisms',
        loadChildren: () =>
          import('./curia-baptisms/curia-baptisms.module').then(
            (m) => m.CuriaBaptismsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'treasury-locations',
        loadChildren: () =>
          import('./treasury-locations/treasury-locations.module').then(
            (m) => m.TreasuryLocationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-ministries-and-orders',
        loadChildren: () =>
          import(
            './curia-ministries-and-orders/curia-ministries-and-orders.module'
          ).then((m) => m.CuriaMinistriesAndOrdersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-secretariats',
        loadChildren: () =>
          import('./curia-secretariats/curia-secretariats.module').then(
            (m) => m.CuriaSecretariatsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-secretariat-types',
        loadChildren: () =>
          import(
            './curia-secretariat-types/curia-secretariat-types.module'
          ).then((m) => m.CuriaSecretariatTypesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-administrative-processes',
        loadChildren: () =>
          import(
            './curia-administrative-processes/curia-administrative-processes.module'
          ).then((m) => m.CuriaAdministrativeProcessesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-administrative-process-types',
        loadChildren: () =>
          import(
            './curia-administrative-process-types/curia-administrative-process-types.module'
          ).then((m) => m.CuriaAdministrativeProcessTypesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-baptisms',
        loadChildren: () =>
          import('./curia-baptisms/curia-baptisms.module').then(
            (m) => m.CuriaBaptismsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'weddings',
        loadChildren: () =>
          import('./weddings/weddings.module').then((m) => m.WeddingsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-ministries-and-orders',
        loadChildren: () =>
          import(
            './curia-ministries-and-orders/curia-ministries-and-orders.module'
          ).then((m) => m.CuriaMinistriesAndOrdersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-secretariats',
        loadChildren: () =>
          import('./curia-secretariats/curia-secretariats.module').then(
            (m) => m.CuriaSecretariatsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-secretariat-types',
        loadChildren: () =>
          import(
            './curia-secretariat-types/curia-secretariat-types.module'
          ).then((m) => m.CuriaSecretariatTypesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-weddings',
        loadChildren: () =>
          import('./curia-weddings/curia-weddings.module').then(
            (m) => m.CuriaWeddingsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-economic-councils',
        loadChildren: () =>
          import(
            './curia-economic-councils/curia-economic-councils.module'
          ).then((m) => m.CuriaEconomicCouncilsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-provisions',
        loadChildren: () =>
          import('./curia-provisions/curia-provisions.module').then(
            (m) => m.CuriaProvisionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-provision-types',
        loadChildren: () =>
          import('./curia-provision-types/curia-provision-types.module').then(
            (m) => m.CuriaProvisionTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'treasury-locations',
        loadChildren: () =>
          import('./treasury-locations/treasury-locations.module').then(
            (m) => m.TreasuryLocationsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'institutions',
        loadChildren: () =>
          import('./institutions/institutions.module').then(
            (m) => m.InstitutionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-weddings',
        loadChildren: () =>
          import('./curia-weddings/curia-weddings.module').then(
            (m) => m.CuriaWeddingsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile-priests',
        loadChildren: () =>
          import('./profile-priests/profile-priests.module').then(
            (m) => m.ProfilePriestsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'appointment-types',
        loadChildren: () =>
          import('./appointment-types/appointment-types.module').then(
            (m) => m.AppointmentTypesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'entitys-access',
        loadChildren: () =>
          import('./entitys-access/entitys-access.module').then(
            (m) => m.EntitysAccessModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'parishioner-processes',
        loadChildren: () =>
          import('./parishioner-processes/parishioner-processes.module').then(
            (m) => m.ParishionerProcessesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'curia-functions',
        loadChildren: () =>
          import('./curia-functions/curia-functions.module').then(
            (m) => m.CuriaFunctionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'redirect',
        component: RedirectComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'module-documentation-links',
        loadChildren: () =>
          import(
            './module-documentation-links/module-documentation-links.module'
          ).then((m) => m.ModuleDocumentationLinksModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'bishopric-integrated-views',
        loadChildren: () =>
          import(
            './bishopric-integrated-views/bishopric-integrated-views.module'
          ).then((m) => m.BishopricIntegratedViewsModule),
      },
      {
        path: 'pending-entities',
        loadChildren: () =>
          import('./pending-entities/pending-entities.module').then(
            (m) => m.PendingEntitiesModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
