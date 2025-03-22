import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fechaNacimientoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();

    if (fechaNacimiento > fechaActual) {
      return { fechaInvalida: true }; 
    }
    return null; 
  };
}
