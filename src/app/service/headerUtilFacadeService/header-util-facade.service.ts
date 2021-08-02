import { Injectable, Injector } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class HeaderUtilFacadeService {

  constructor(private _nbSidebarService: NbSidebarService,
    private injector: Injector) { }

  public get nbSidebarService(): NbSidebarService {
    this._proxyNbSidebarService();
    return this._nbSidebarService;
  }

  private _proxyNbSidebarService() {
    !this._nbSidebarService && (this._nbSidebarService = this.injector.get(NbSidebarService));
  }
}
