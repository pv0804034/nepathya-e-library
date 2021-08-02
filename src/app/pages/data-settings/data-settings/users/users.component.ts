import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Users } from 'src/app/models/User';
import { RolesService } from 'src/app/service/roles/roles.service';
import { UsersService } from 'src/app/service/users/users.service';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: Users[] = [];
  listOfRoles: any[] = [];
  public loading: boolean = true;
  public ac: boolean = false;
  public iac: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private toast: NbToastrService,
    private usersService: UsersService,
    private roleService: RolesService
  ) {}

  public async getAllUsersData(): Promise<void> {
    this.usersService.getAllUsers().subscribe(
      (data: any) => {
        this.users = [];
        this.users = data;
        if(!this.ac){
          for(const d of data){
            if(!d.isActive){
              this.users.push(d);
            }
          }
        }else{
          for(const d of data){
            if(d.isActive){
              this.users.push(d);
            }
          }
        }
        // this.users = data;
        // console.log(this.users);
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccess');
      }
    );
  }

  public async getAllRole(): Promise<void> {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.listOfRoles = data;
      this.loading = false;
    });
  }

  public createUsers(): void {
    this.dialogService.open(AddUsersComponent).onClose.subscribe(
      () => {
        this.users = [];
        this.getAllUsersData();
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'Unsuccess');
      }
    );
  }

  onDelete(id): void {
    Swal.fire({
      title:
        '<span style="color:#ffffff; font-size: 1.5rem; font-weight: 600;">Are you sure?</span>',
      icon: 'warning',
      iconColor: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#EFF2F8',
      cancelButtonColor: '#FF3D71',
      confirmButtonText: '<span style="color:#000000">Delete</span>',
      background: '#588C7F',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe(
          () => {
            this.users = [];
            this.getAllUsersData().then(() => {
              this.toast.success(
                $localize`:@@userDeleted:User successfully deleted`,
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

  onUserDataEdit(data: Users) {
    this.usersService.UserData = data;
    this.dialogService.open(EditUsersComponent).onClose.subscribe(() => {
      this.getAllUsersData();
    });
  }

  ngOnInit(): void {
    this.getAllUsersData().then(null);
    this.getAllRole().then(null);
  }

  active(){
    this.ac = true;
    this.iac = false;
    this.getAllUsersData();
  }

  inactive(){
    this.ac = false;
    this.iac = true;
    this.getAllUsersData();
  }

  change(id){
    this.usersService.change(id).subscribe(() => {
      this.users = [];
      this.getAllUsersData();
      this.toast.success( 'Success');
    },
    (error) => {
      this.toast.danger( 'Unsuccessful');
    }
    )
  }

  filter(role){
    this.getAllUserByRole(role.role);
  }

  getAllUserByRole(role){
    this.users = [];
    this.usersService.getAllUsersByRoleName(role).subscribe(
      (response:any) =>{
        this.users = response.responseObject;
      },(error) => {
        this.toast.danger("not found");
      }
    )
  }
}
