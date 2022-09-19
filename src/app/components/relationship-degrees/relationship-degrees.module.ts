import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { reducer } from './reducers/relationship-degrees.reducer';
import { RelationshipDegreesEffects } from './reducers/relationship-degrees.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextModule } from 'angular-i18next';

import { RelationshipDegreesService } from '@peakitpt/ui-kyrios-api';
import { RelationshipDegreesRoutingModule } from './relationship-degrees-routing.module';
import { RelationshipDegreesListComponent } from './relationship-degrees-list/relationship-degrees-list.component';
import { RelationshipDegreesDetailsComponent } from './relationship-degrees-details/relationship-degrees-details.component';
import { RelationshipDegreesFormComponent } from './relationship-degrees-form/relationship-degrees-form.component';
import { RelationshipDegreesDeleteComponent } from './relationship-degrees-delete/relationship-degrees-delete.component';
import { RelationshipDegreesSearchComponent } from './relationship-degrees-search/relationship-degrees-search.component';

@NgModule({
  declarations: [
    RelationshipDegreesListComponent,
    RelationshipDegreesDetailsComponent,
    RelationshipDegreesFormComponent,
    RelationshipDegreesDeleteComponent,
    RelationshipDegreesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('relationship-degrees', reducer),
    EffectsModule.forFeature([RelationshipDegreesEffects]),
    UiMaterialModule,
    FlexLayoutModule,
    I18NextModule,
    SharedModule,
    RelationshipDegreesRoutingModule,
  ],
  providers: [
    RelationshipDegreesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
})
export class RelationshipDegreesModule {}
