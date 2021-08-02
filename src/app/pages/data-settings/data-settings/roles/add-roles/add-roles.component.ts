import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Roles } from 'src/app/models/Role';
import { RolesService } from 'src/app/service/roles/roles.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss'],
})
export class AddRolesComponent implements OnInit {
  submitted = false;
  public loading: boolean = true;
  public roles: Roles[] = [];
  addRole: FormGroup;

  @Input() title?: string;
  constructor(
    protected ref: NbDialogRef<AddRolesComponent>,
    private roleService: RolesService,
    private toast: NbToastrService
  ) {
    this.addRole = new FormGroup({
      role: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllRole().then(null);
  }

  public async getAllRole(): Promise<void> {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.roles = data.responseObject;
      this.loading = false;
    });
  }

  dismiss() {
    this.ref.close();
  }

  saveRoleData() {
    this.loading = true;
    this.roleService.createRoles(this.addRole.value).subscribe(
      (response: any) => {
        this.getAllRole().then(() => {
          this.toast.success(
            $localize`:@@roleDataCreated:Successfully added`,
            $localize`:@@success: Success`
          );
          this.dismiss();
        });
      },
      (error) => {
        this.loading = false;
        this.toast.danger(error.error.responseObject.message, 'Unsuccess');
      }
    );
  }
}
