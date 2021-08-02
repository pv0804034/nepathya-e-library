import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Roles } from 'src/app/models/Role';
import { RolesService } from 'src/app/service/roles/roles.service';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles: Roles[] = [];
  public loading: boolean = true;

  constructor(
    private dialogService: NbDialogService,
    private roleService: RolesService,
    private toast: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getAllRole().then(null);
  }

  public createRole(): void {
    this.dialogService.open(AddRolesComponent).onClose.subscribe(
      () => {
        this.getAllRole();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccess');
      }
    );
  }

  public async getAllRole(): Promise<void> {
    this.roleService.getAllRoles().subscribe(
      (data: any) => {
        this.roles = data;
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccess');
      }
    );
  }

  public editUnit(data: Roles): void {
    this.roleService.RoleData = data;
    this.dialogService.open(EditRolesComponent, {
      context: {
        editRoletitle: 'Update Role',
      },
    });
  }

  onDelete(roleId): void {
    Swal.fire({
      title:
        '<span style="color:#ffffff; font-size: 1.5rem; font-weight: 600;">Are you sure?</span>',
      icon: 'warning',
      iconColor: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#EFF2F8',
      cancelButtonColor: '#FF3D71',
      confirmButtonText: '<span style="color:#000000">Yes, delete it!</span>',
      background: '#588C7F',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(roleId).subscribe(
          () => {
            this.getAllRole().then(() => {
              this.toast.success(
                $localize`:@@roleDeleted:Role successfully Deleted`,
                $localize`:@@success:Success`
              );
              this.loading = false;
            });
          },
          (error) => {
            this.toast.danger(error.error.responseObject.message, 'Unsuccess');
          }
        );
      }
    });
  }
}
