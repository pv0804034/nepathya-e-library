import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  menu: NbMenuItem[] = [
    {
      title: $localize`:@@dashboard:Dashboard `,
      icon: 'grid-outline',
      expanded: false,
      link: 'dashboard',
      home: true,
    },
    {
      title: $localize`:@@document: Document`,
      icon: 'shopping-cart',
      link: 'document',
    },
    {
      title: $localize`:@@faculty: Faculty`,
      icon: 'shopping-cart',
      link: 'faculty',
    },
    {
      title: $localize`:@@tag: Tag`,
      icon: 'shopping-cart',
      link: 'tag',
    },
    {
      title: 'Message',
      icon: 'shopping-cart',
      link: 'message'
    },
    {
      title: 'Users',
      icon: 'people',
      link: 'users'
    },
    {
      title: 'Roles',
      icon: 'people',
      link: 'roles'
    },
    {
      title: 'Create Link',
      icon: 'shopping-cart',
      link: 'createLink'
    }
    // {
    //   title: $localize`:@@role: Role`,
    //   icon: 'shopping-cart',
    //   link: 'role',
    // },
    // {
    //   title: $localize`:@@dialog: dialog`,
    //   icon: 'shopping-cart',
    //   link: 'dialog',
    // },
  ];

  items = [
    { title: $localize`:@@profile: Profile` },
    { title: $localize`:@@logout: Logout` },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService,
    private router: Router
  ) { }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  ngOnInit(): void {
    this.handleProfileMenuItemsSelection();
    this.router.navigate(['/pages/dashboard']);
  }

  private handleProfileMenuItemsSelection(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => console.log(title));
  }

  private handleSelection(title: string): void {
    if (title === `Logout`)
      this.router.navigateByUrl('/auth/logout').then(null);
    if (title === `Profile`)
      this.router.navigateByUrl('/pages/profile').then(null);
  }
}
