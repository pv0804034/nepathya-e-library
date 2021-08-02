import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { IDropDown } from 'src/app/interfaces/IDropDown';
import { LoginService } from 'src/app/service/auth/login.service';
import { HeaderUtilFacadeService } from '../service/headerUtilFacadeService/header-util-facade.service';
import { dropdown } from './dropdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userMenu: IDropDown[] = dropdown;
  status: boolean = true;
  user:any = null;

  constructor(
    private router: Router,
    private nbMenuService: NbMenuService,
    private loginService: LoginService,
    private headerUtilFacadeService: HeaderUtilFacadeService
  ) {}
  ngOnInit(): void {
    this.handleProfileMenuItemsSelection();
  }

  private handleProfileMenuItemsSelection(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title: string) => this.handleSelection(title));
  }

  private handleSelection(title: string): void {
    if (title === `Profile`)
      this.router.navigateByUrl('/pages/profile').then(null);
    if (title === `Logout`) {
      this.handleLogOut();
    }
  }

  public toggleSidebar() {
    this.status = !this.status;
    this.headerUtilFacadeService.nbSidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  handleLogOut() {
    this.loginService.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  items: NbMenuItem[] = [
    {
      title: 'Select Language',
      expanded: false,
      children: [
        {
          title: 'English',
        },
        {
          title: 'Nepali',
        },
      ],
    },
  ];
}
