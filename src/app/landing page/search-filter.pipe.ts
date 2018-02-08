import { Pipe, PipeTransform } from '@angular/core';

	@Pipe({
	  name: 'searchFilter'
	})

	export class SearchFilterPipe implements PipeTransform {

	  transform(value: any[], search: string): any {
		if(!search){return value;}
		//console.log(value)
		let solution = value.filter(v => {
		 // console.log(v);
		  if(!v.categoryName){return;}
		  return v.categoryName.toLowerCase().indexOf(search.toLowerCase())!==-1;
		})
		return solution;
		}
	}
