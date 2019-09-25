import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarExampleComponent } from './snackbar-example.component';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector: 'app-marketview',
    templateUrl: './marketview.component.html',
    styleUrls: ['./marketview.component.scss']
})
export class MarketviewComponent implements OnInit, OnDestroy {
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
    owrt = new FormControl();
    owrtList: number[] = [1, 2, 3];
    groupId = new FormControl();
    groupIds: string[] = ['1', '2', '3', '4', '5'];
    minDate = new Date();
    maxDate = new Date(2019, 8, 27);

    gridApi;
    gridColumnApi;
    columnDefs;
    groupDefaultExpanded;
    autoGroupColumnDef;
    defaultColDef;
    rowData;
    rowSelection;
    sideBar;

    private fuseConfig: any;
    private unsubscribeAll: Subject<any>;

    constructor(
        private fuseSidebarService: FuseSidebarService,
        private fuseConfigService: FuseConfigService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {
        this.columnDefs = [
            {
                field: 'MRKT',
                headerName: 'MRKT'
            },
            {
                field: 'CXR',
                headerName: 'CXR'
            },
            {
                field: 'ORIG',
                headerName: 'ORIG'
            },
            {
                field: 'DEST',
                headerName: 'DEST'
            },
            {
                field: 'OR',
                headerName: 'O/R',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    values: [1, 2, 3]
                },
                filter: 'agSetColumnFilter'
            },
            {
                field: 'CUR',
                headerName: 'CUR'
            },
            {
                field: 'baseFareAmt',
                headerName: 'Base Fare AMT',
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'qwAmt',
                headerName: 'QW AMT',
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'rtAmt',
                headerName: 'RT AMT',
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'fareClass',
                headerName: 'Fare Class'
            },
            {
                field: 'FTC',
                headerName: 'FTC'
            },
            {
                field: 'yqyrAmt',
                headerName: 'YQ/YR AMT',
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'yqyrRoutingOutbound',
                headerName: 'YQ/YR Routing Outbound'
            },
            {
                field: 'yqyrRoutingInbound',
                headerName: 'YQ/YR Routing Inbound'
            },
            {
                field: 'AP',
                headerName: 'AP'
            },
            {
                field: 'minStay',
                headerName: 'Min Stay'
            },
            {
                field: 'maxStay',
                headerName: 'Max Stay'
            }
        ];
        this.defaultColDef = {
            editable: true,
            filter: true,
            sortable: true
        };
        this.rowData = this.getFares();
        this.rowSelection = 'multiple';
        this.sideBar = {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel'
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel'
                }
                // {
                //     id: "customStats",
                //     labelDefault: "Custom Stats",
                //     labelKey: "customStats",
                //     iconKey: "custom-stats",
                //     toolPanel: "customStatsToolPanel"
                // }
            ]
            // defaultToolPanel: 'filters'
        };
        this.unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to config changes
        this.fuseConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(config => {
                this.fuseConfig = config;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    openSuccessSnackBar(): void {
        this._snackBar.openFromComponent(SnackbarExampleComponent, {
            panelClass: ['success-snackbar'],
            duration: 5 * 1000
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SaveDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onGridReady(params): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // AUTO SIZE COLUMNS
        // let allColumnIds = [];
        // this.gridColumnApi.getAllColumns().forEach((column) => {
        //     allColumnIds.push(column.colId);
        // });
        // this.gridColumnApi.autoSizeColumns(allColumnIds);
    }

    getContextMenuItems(params): any[] {
        const result = [
            {
                name: 'Actions',
                subMenu: [
                    'copy',
                    'paste',
                    {
                        name: 'Clear',
                        shortcut: 'Ctrl+B'
                    },
                    {
                        name: 'Insert Single',
                        shortcut: 'Ctrl+Shift+S'
                    },
                    {
                        name: 'Insert Multiple',
                        shortcut: 'Ctrl+Shift+L'
                    },
                    {
                        name: 'Multi-Edit',
                        shortcut: 'Ctrl+E'
                    },
                    {
                        name: 'Multi-Filter',
                        shortcut: 'Ctrl+F'
                    },
                    {
                        name: 'Delete',
                        shortcut: 'Ctrl+Q'
                    },
                    'separator',
                    {
                        name: 'Undo',
                        shortcut: 'Ctrl+N'
                    },
                    {
                        name: 'Redo',
                        shortcut: 'Ctrl+R'
                    }
                ]
            },
            'separator',
            {
                name: 'Fare Construction'
            },
            {
                name: 'Seasonality Details'
            },
            {
                name: 'Surcharge Text'
            },
            {
                name: 'YQ/YR Details'
            },
            {
                name: 'Fare Rule Text',
                disabled: true,
                tooltip: 'Disabled Example'
            },
            {
                name: 'Travel Details',
                disabled: true,
                tooltip: 'Disabled Example'
            }
        ];
        return result;
    }

    toggleSidebarOpen(key): void {
        this.fuseSidebarService.getSidebar(key).toggleOpen();
    }

    getFares(): any[] {
        return [
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 5000,
                qwAmt: 5000,
                rtAmt: 10000,
                fareClass: 'W1N0C9S1',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 6783,
                qwAmt: 6783,
                rtAmt: 13566,
                fareClass: 'RNN0C9S3',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 299,
                qwAmt: 299,
                rtAmt: 598,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 400,
                qwAmt: 400,
                rtAmt: 800,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 700,
                qwAmt: 700,
                rtAmt: 1400,
                fareClass: 'VLW2T1M5',
                FTC: 'ERU',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 5000,
                qwAmt: 5000,
                rtAmt: 10000,
                fareClass: 'W1N0C9S1',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 6783,
                qwAmt: 6783,
                rtAmt: 13566,
                fareClass: 'RNN0C9S3',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 299,
                qwAmt: 299,
                rtAmt: 598,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 400,
                qwAmt: 400,
                rtAmt: 800,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 700,
                qwAmt: 700,
                rtAmt: 1400,
                fareClass: 'VLW2T1M5',
                FTC: 'ERU',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 5000,
                qwAmt: 5000,
                rtAmt: 10000,
                fareClass: 'W1N0C9S1',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 6783,
                qwAmt: 6783,
                rtAmt: 13566,
                fareClass: 'RNN0C9S3',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 299,
                qwAmt: 299,
                rtAmt: 598,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 400,
                qwAmt: 400,
                rtAmt: 800,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 700,
                qwAmt: 700,
                rtAmt: 1400,
                fareClass: 'VLW2T1M5',
                FTC: 'ERU',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 5000,
                qwAmt: 5000,
                rtAmt: 10000,
                fareClass: 'W1N0C9S1',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 6783,
                qwAmt: 6783,
                rtAmt: 13566,
                fareClass: 'RNN0C9S3',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 299,
                qwAmt: 299,
                rtAmt: 598,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '7|1|+',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 400,
                qwAmt: 400,
                rtAmt: 800,
                fareClass: 'YCA',
                FTC: 'XOX',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: 'IAD-LHR',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            },
            {
                MRKT: 'WASLON',
                CXR: 'AA',
                ORIG: 'WAS',
                DEST: 'LON',
                OR: 2,
                CUR: 'USD',
                baseFareAmt: 700,
                qwAmt: 700,
                rtAmt: 1400,
                fareClass: 'VLW2T1M5',
                FTC: 'ERU',
                yqyrAmt: 225,
                yqyrRoutingOutbound: 'IAD-LHR',
                yqyrRoutingInbound: '',
                AP: '1',
                minStay: '3',
                maxStay: '3'
            }
        ];
    }
}
