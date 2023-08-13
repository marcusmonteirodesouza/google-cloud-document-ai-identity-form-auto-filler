import { Routes } from '@angular/router';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

export const routes: Routes = [
  {
    path: 'upload-document',
    component: UploadDocumentComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: UploadDocumentComponent,
  },
  {
    path: '**',
    redirectTo: 'upload-document',
  },
];
