import { Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { UtilityService } from 'app/shared/utility.service';

@Component({
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent {

  constructor(private utilityService: UtilityService) {}

  onClick(event) {
    if (event === 'fareDetails') {
      this.utilityService.isFareDetails = true;
    } else if (event === 'fareDetailsCIF') {
      this.utilityService.isFareDetailsCIF = true;
    } else if (event === 'footnoteDetails') {
      this.utilityService.isFootnoteDetails = true;
    } else if (event === 'ruleDetails') {
      this.utilityService.isRuleDetails = true;
      this.utilityService.flag = true;
    } else if (event === 'ruleText') {
      this.utilityService.isRuleText = true;
      this.utilityService.flag = false;
    }
  }

}
