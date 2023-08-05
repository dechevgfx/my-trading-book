import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TradeService } from "src/app/services/trade.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Trade } from "src/app/models/trade";


@Component({
  selector: 'app-trades-form',
  templateUrl: './trades-form.component.html',
  styleUrls: ['./trades-form.component.scss']
})
export class TradeFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  statuses = [
    {
      label: 'Bullish',
      value: 'BULLISH'
    },
    {
      label: 'Bearish',
      value: 'BEARISH'
    }
  ]

  constructor(
    private fb: FormBuilder,
    private userTradeService: TradeService,
    private dialogRef: MatDialogRef<TradeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trade,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      pair: [this.data?.pair || '', Validators.required],
      type: [this.data?.type || null, Validators.required],
      description: [this.data?.description || null, Validators.required],
      image: [this.data?.image || ''],
      likedBy: [this.data?.likedBy || []],
      date: [this.data?.date || null],

    });
  }

  onPostSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (!!this.data) {
      const updateData = { ...this.form.value, id: this.data.id }
      this.userTradeService.update(updateData).then(() => {
        this.close()
      })
    } else {
      this.userTradeService.create(this.form.value).then(() => {
        this.close()
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
