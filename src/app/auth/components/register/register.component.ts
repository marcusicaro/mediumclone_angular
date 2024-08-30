import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessages.component";
import { authActions } from "../../store/action";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    // CommonModule prevents No pipe found with name 'async'
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages]
})

export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    })

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    })

    constructor(private fb: FormBuilder, private store: Store){}

    onSubmit() {
        let request: RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.register({request}))
    }
}