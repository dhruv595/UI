import { Pipe, PipeTransform } from '@angular/core';
import  { FormGroup, FormControl }  from  '@angular/forms';

@Pipe({
  name: 'doctorFilter'
})
export class DoctorFilterPipe implements PipeTransform {

  transform(value: any[], form: any): any {
    console.log("inside pipe");
    console.log(form);
    console.log(!form);
    if (form.controls.zipCode.value == "" && form.controls.gender.value == "" && form.controls.sub_category_id.value == "") return value;
    let solution = value.filter(v => {
      console.log(v);
      if (v.zipCode.zipCode == form.controls.zipCode.value && v.subCategory.subCategoryId == form.controls.sub_category_id.value &&
        v.gender == form.controls.gender.value) return v;

      if (v.zipCode.zipCode == form.controls.zipCode.value && v.subCategory.subCategoryId == form.controls.sub_category_id.value &&
        form.controls.gender.value == "") return v;
      if (v.zipCode.zipCode == form.controls.zipCode.value && form.controls.sub_category_id.value == "" &&
        v.gender == form.controls.gender.value) return v;
      if (form.controls.zipCode.value == "" && v.subCategory.subCategoryId == form.controls.sub_category_id.value &&
        v.gender == form.controls.gender.value) return v;

      if (v.zipCode.zipCode == form.controls.zipCode.value && form.controls.sub_category_id.value == "" &&
        form.controls.gender.value == "") return v;
      if (form.controls.zipCode.value == "" && v.subCategory.subCategoryId == form.controls.sub_category_id.value &&
        form.controls.gender.value == "") return v;
      if (form.controls.zipCode.value == "" && form.controls.sub_category_id.value == "" &&
        v.gender == form.controls.gender.value) return v;

    })
    return solution;
  }

}
