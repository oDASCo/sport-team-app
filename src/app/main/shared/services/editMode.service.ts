import {Injectable} from '@angular/core';


@Injectable()
export class EditModeService {

  public editMode:boolean = false;

  public onEditMode() {
    this.editMode = true;
  }

  public offEditMode() {
    this.editMode = false;
  }

}
