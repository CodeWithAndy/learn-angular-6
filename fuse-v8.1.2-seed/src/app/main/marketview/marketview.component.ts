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

    constructor(
        private fuseSidebarService: FuseSidebarService,
    ) {}

    ngOnInit() {}

    toggleSidebarOpen(key): void
    {
        this.fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
