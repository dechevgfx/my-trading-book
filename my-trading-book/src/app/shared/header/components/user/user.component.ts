import { Component, EventEmitter, Input, Output } from '@angular/core';
import { routes } from 'src/app/consts';
import { MatDialog } from "@angular/material/dialog";

import { User } from "src/app/models";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user!: User | undefined | null;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;

  constructor(private dialog: MatDialog) {
  }


  public signOutEmit(): void {
    this.signOut.emit();
  }
}

