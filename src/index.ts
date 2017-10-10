import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SampleComponent } from './sample.component';
// import { SampleDirective } from './sample.directive';
// import { SamplePipe } from './sample.pipe';
// import { SampleService } from './sample.service';

import { XapiService } from './services/xapi.service';



export * from './services/interfaces';

// export * from './sample.component';
// export * from './sample.directive';
// export * from './sample.pipe';
// export * from './sample.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // SampleComponent,
    // SampleDirective,
    // SamplePipe
  ],
  exports: [
    // SampleComponent,
    // SampleDirective,
    // SamplePipe
  ]
})
export class AngularXapiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularXapiModule,
      providers: [ XapiService ]
    };
  }
}
