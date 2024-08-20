import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { register } from "../../store/action";
import { Store } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { AuthStateInterface } from "../../types/auth.state.interface";
import { CommonModule } from "@angular/common";
import { selectIsSubmitting } from "../../store/reducers";

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    // CommonModule prevents No pipe found with name 'async'
    imports: [ReactiveFormsModule, RouterLink, CommonModule]
})

export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    })

    isSubmitting$ = this.store.select(selectIsSubmitting)

    constructor(private fb: FormBuilder, private store: Store<{auth: AuthStateInterface}>){}

    onSubmit() {
        let request: RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(register({request}))
    }
}