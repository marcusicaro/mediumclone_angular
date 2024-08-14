import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { register } from "../../store/action";
import { Store } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})

export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    })
    constructor(private fb: FormBuilder, private store: Store){

    }

    onSubmit() {

        let request: RegisterRequestInterface = {
            user: this.form.getRawValue()
        }

        this.store.dispatch(register({request}))
    }
}