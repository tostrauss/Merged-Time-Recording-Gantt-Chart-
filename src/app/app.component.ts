import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { GlobalInitializer, AuthGuard } from 'my-library';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
// Globals
import { HeaderComponent } from './gantt-chart/header/header.component';
import { checkmarkOutline, personOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import path from 'path';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  RENDER: boolean = false;
  globalConfig: any;
  private globalSubscription!: Subscription;
  ShowHeaderFooter: boolean = true;

  constructor(
    private globalInitializer: GlobalInitializer,
    private router: Router,
    private myLibrary: MyLibraryService  // <-- Using 'MyLibraryService'
  ) {
    // Dynamic Icons * can probably initialize the entire app here 
    addIcons({
      settingsOutline,
      personOutline,
      checkmarkOutline
    });
  }

  ngOnInit() {
    // ROUTING HANDLER
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });

    // Paths 
    /*
      ready for andrey TO FINISH
    */

    const RoutingArray = [
      { path: '', component: 'HomeComponent', canActivate: [AuthGuard] },
      { path: 'header', component: 'HeaderComponent', canActivate: [AuthGuard] },
    ];

    // run into function PathsArray
    // GLOBAL INITIALIZER
    this.globalSubscription = this.globalInitializer
      .initGlobals(GLOBALS_App, RoutingArray, 'https://dev.collegerecruit.us/CORE_FE/GATEWAY.php')
      .subscribe(
        (config: any) => {
          this.globalConfig = config;
          this.myLibrary.setGlobalConfig(config);
          this.myLibrary.setGlobalInitializer(this.globalInitializer);
          this.myLibrary.setRouter(this.router);
          this.RENDER = true;
        },
        (error: any) => {
          console.error(error);
          this.RENDER = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.globalSubscription) {
      this.globalSubscription.unsubscribe();
    }
  }

  // --------------------------------------------------------------------------------
  // BELOW ARE TAKEACTION EXAMPLES
  // --------------------------------------------------------------------------------

  /**
   * Example: Retrieve Time Clock Data
   */
  retrieveTimeClockData() {
    this.myLibrary.TakeAction({ "CALL": 'g3tT1m3' }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Time Clock Data:', response);
        },
        error: (err: any) => {
          console.error('Error retrieving time clock data:', err);
        }
      });
  }

  /**
   * Example: Retrieve Gantt Data
   */
  retrieveGanttData() {
    this.myLibrary.TakeAction({ "CALL": 'retrieveGanttData' }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Gantt Data:', response);
        },
        error: (err: any) => {
          console.error('Error retrieving Gantt data:', err);
        }
      });
  }

  /**
   * Example: Update Gantt Data
   * You can pass additional fields in `data` which get spread into the "CALL" object
   */
  updateGanttData(data: any) {
    this.myLibrary.TakeAction({ "CALL": 'updateGanttData', ...data }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Update Gantt Data Response:', response);
        },
        error: (err: any) => {
          console.error('Error updating Gantt data:', err);
        }
      });
  }

  /**
   * Example: Update Time Clock Data
   */
  updateTimeClockData(data: any) {
    this.myLibrary.TakeAction({ "CALL": 'updateTimeClockData', ...data }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Update Time Clock Data Response:', response);
        },
        error: (err: any) => {
          console.error('Error updating time clock data:', err);
        }
      });
  }

  /**
   * Example: Delete Gantt Data
   */
  deleteGanttData(id: string) {
    this.myLibrary.TakeAction({ "CALL": 'deleteGanttData', id }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Delete Gantt Data Response:', response);
        },
        error: (err: any) => {
          console.error('Error deleting Gantt data:', err);
        }
      });
  }

  /**
   * Example: Delete Time Clock Data
   */
  deleteTimeClockData(id: string) {
    this.myLibrary.TakeAction({ "CALL": 'deleteTimeClockData', id }, true)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Delete Time Clock Data Response:', response);
        },
        error: (err: any) => {
          console.error('Error deleting time clock data:', err);
        }
      });
  }
}

// For addition of variables 
export var GLOBALS_App: any[] = [];
