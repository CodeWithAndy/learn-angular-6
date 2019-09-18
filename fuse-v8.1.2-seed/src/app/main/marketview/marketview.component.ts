import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'app-marketview',
    templateUrl: './marketview.component.html',
    styleUrls: ['./marketview.component.scss']
})
export class MarketviewComponent implements OnInit {
    origin = new FormControl('', [Validators.required]);
    destination = new FormControl('', [Validators.required]);
    carrier = new FormControl('', [Validators.required]);
    ap = false;
    productType = new FormControl();
    productTypes: string[] = [
        'ALL | Product Types',
        'PUB | Public Specified',
        'PVT | Private Specified',
        'CNP | Public Specified',
        'CNV | Private Specified',
        'FBP | Public Fare By Rule',
        'FPV | Public Fare By Rule'
    ];
    minDate = new Date();
    maxDate = new Date(2019, 8, 27);

    constructor(
        private fuseSidebarService: FuseSidebarService,
    ) {}

    ngOnInit() {}

    toggleSidebarOpen(key): void
    {
        this.fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
