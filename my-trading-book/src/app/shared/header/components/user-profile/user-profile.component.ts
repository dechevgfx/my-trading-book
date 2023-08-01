import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TradeService } from "src/app/services/trade.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "src/app/models";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  edit = false

  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private tradeService: TradeService,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      displayName: [this.data?.displayName || ''],
      additionalInfo: [this.data?.additionalInfo || ''],
      photoURL: [this.data?.photoURL || ''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.fs.collection(`users`)
      .doc(`${this.data.uid}`)
      .set(this.form.value, { merge: true })
      .then(() => {
        this.close()
      })
  }

  toggleEdit() {
    this.edit = !this.edit
  }

  close(): void {
    this.dialogRef.close();
  }
}
