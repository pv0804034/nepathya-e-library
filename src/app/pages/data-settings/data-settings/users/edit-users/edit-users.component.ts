import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Users } from 'src/app/models/User';
import { RolesService } from 'src/app/service/roles/roles.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  @Input() title?: string;
  listOfRoles: any[] = [];
  public users: Users[] = [];
  submitted = false;

  constructor(
    protected ref: NbDialogRef<EditUsersComponent>,
    public usersService: UsersService,
    public roleService: RolesService,
    private toasterService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles: any) => {
      this.listOfRoles = roles;
    });
  }

  public async getAllUsers(): Promise<void> {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.users = data.responseObject;
    });
  }

  onUpdateUsersData(id, form: NgForm) {
    this.usersService.updateUser(id, form.value).subscribe(
      (data) => {
        this.getAllUsers().then(() => {
          this.toasterService.success(
            'User Successfully Updated',
            'Success'
          );
          this.dismiss();
        });
      },
      (error) => {
        this.toasterService.danger(error.error.responseObject, 'Unsuccess');
      }
    );
  }

  dismiss() {
    this.ref.close();
  }
}
