import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomNumberService } from './services/random-number.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RandomData } from './RandomData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        this.form = this.fb.group({
            min: this.fb.control(0, [Validators.min(-100), Validators.max(100), Validators.required]),
            max: this.fb.control(0),
            count: this.fb.control(5),
        })
    }

    num$!: Observable<number[]>
    form!: FormGroup

    randomService = inject(RandomNumberService)
    fb = inject(FormBuilder)

    getRandomNumbers() {
        this.num$ = this.randomService.getRandomNumber(10)
    }

    postWithJson() {
        const data: RandomData = this.form.value
        this.num$ = this.randomService.postRandomNumbersAsJson(data)
    }

    postWithForm() {
        const data: RandomData = this.form.value
        this.num$ = this.randomService.postRandomNumbersAsForm(data)
    }
}
