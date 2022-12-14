import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthenticationService} from "./shared/services/authentication.service";
import {RouterLinkWithHref, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];



@NgModule({
  declarations: [
    AppComponent, SignInComponent, SignUpComponent
  ],
    imports: [
      RouterModule.forRoot(
        routes,
        { enableTracing: true } // <-- debugging purposes only
      ),

        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        DragDropModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        provideRemoteConfig(() => getRemoteConfig()),
        provideStorage(() => getStorage()),
        AngularFirestoreModule,

    ],
  providers: [
    ScreenTrackingService,UserTrackingService,AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
