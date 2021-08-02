import { Users } from './../../../../../models/User';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/service/users/users.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { RolesService } from 'src/app/service/roles/roles.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  submitted = false;
  public loading: boolean = true;
  public users: Users[] = [];
  public addUser: FormGroup;
  listOfRoles: any[] = [];
  role = new FormControl('');

  constructor(
    private usersService: UsersService,
    protected ref: NbDialogRef<AddUsersComponent>,
    private toast: NbToastrService,
    private roleService: RolesService
  ) {
    this.addUser = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllUsersData().then(null);
    this.roleService.getAllRoles().subscribe((roleData: any) => {
      this.listOfRoles = roleData;
    });
  }

  dismiss() {
    this.ref.close();
  }

  public async getAllUsersData(): Promise<void> {
    this.usersService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
            this.toast.danger(error.error.responseObject.message, 'सफल भएन');
      }
    );
  }

  saveUserData() {
    let dropD = this.addUser.value;
    dropD.role = this.role.value;
    this.loading = true;
    this.usersService.createUser(this.addUser.value).subscribe(
      (response: any) => {
        this.getAllUsersData().then(() => {
          this.toast.success(
            $localize`:@@userCreated:प्रयोगकर्ता सफलतापूर्वक सुरक्षित गरियो.`,
            $localize`:@@success: सफल भयो`
          );
          this.dismiss();
        });
      },
      (error) => {
        this.loading = false;
        this.toast.danger(error.error.responseObject.message, 'सफल भएन');
      }
    );
  }
}
