import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import 'ag-grid-enterprise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PizzaPartyComponent } from './snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialog } from './dialog.component';

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
    owrt = new FormControl();
    owrtList: number[] = [
        1,
        2,
        3
    ];
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

    constructor(
        private fuseSidebarService: FuseSidebarService,
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
                    values: [
                        1,
                        2,
                        3
                    ]
                },
                filter: 'agSetColumnFilter',

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
            },


            // {
            //     headerName: 'Country',
            //     field: 'country',
            //     width: 200,
            //     editable: true,
            //     cellEditor: 'agRichSelectCellEditor',
            //     cellEditorParams: {
            //         values: [
            //             'Argentina',
            //             'Brazil',
            //             'Colombia',
            //             'France',
            //             'Germany',
            //             'Greece',
            //             'Iceland',
            //             'Ireland',
            //             'Italy',
            //             'Malta',
            //             'Portugal',
            //             'Norway',
            //             'Peru',
            //             'Spain',
            //             'Sweden',
            //             'United Kingdom',
            //             'Uruguay',
            //             'Venezuela'
            //         ]
            //     },
            //     floatCell: true,
            //     filterParams: {
            //         cellHeight: 20,
            //         newRowsAction: 'keep'
            //     }
            // },
            // {
            //     headerName: 'Language',
            //     field: 'language',
            //     width: 200,
            //     editable: true,
            //     filter: 'agSetColumnFilter',
            //     cellEditor: 'agSelectCellEditor',
            //     cellEditorParams: {
            //         values: [
            //             'English',
            //             'Spanish',
            //             'French',
            //             'Portuguese',
            //             '(other)'
            //         ]
            //     }
            // }
        ];
        // this.groupDefaultExpanded = -1;
        // this.autoGroupColumnDef = {
        //     headerName: 'Name',
        //     field: 'name',
        //     width: 250,
        //     editable: true,
        //     cellRendererParams: { checkbox: true }
        // };
        this.defaultColDef = {
            editable: true,
            filter: true,
            sortable: true,
            // checkboxSelection: function(params) {
            //     var isGrouping =
            //         params.columnApi.getRowGroupColumns().length > 0;
            //     return params.colIndex === 0 && !isGrouping;
            // }
        };
        // this.rowData = createData();
        this.rowData = getFares();
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
    }

    openSuccessSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            panelClass: ['success-snackbar'],
            duration: 5 * 1000
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // AUTO SIZE COLUMNS
        // let allColumnIds = [];
        // this.gridColumnApi.getAllColumns().forEach((column) => {
        //     allColumnIds.push(column.colId);
        // });
        // this.gridColumnApi.autoSizeColumns(allColumnIds);
    }

    getContextMenuItems(params) {
        var result = [
            {
                name: 'Actions',
                subMenu: [
                    'copy',
                    'paste',
                    {
                        name: 'Clear',
                        shortcut: 'Ctrl+B',
                    },
                    {
                        name: 'Insert Single',
                        shortcut: 'Ctrl+Shift+S',
                    },
                    {
                        name: 'Insert Multiple',
                        shortcut: 'Ctrl+Shift+L',
                    },
                    {
                        name: 'Multi-Edit',
                        shortcut: 'Ctrl+E',
                    },
                    {
                        name: 'Multi-Filter',
                        shortcut: 'Ctrl+F',
                    },
                    {
                        name: 'Delete',
                        shortcut: 'Ctrl+Q',
                    },
                    'separator',
                    {
                        name: 'Undo',
                        shortcut: 'Ctrl+N',
                    },
                    {
                        name: 'Redo',
                        shortcut: 'Ctrl+R',
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
                tooltip:
                    'Disabled Example'
            },
            {
                name: 'Travel Details',
                disabled: true,
                tooltip:
                    'Disabled Example'
            },
        ];
        return result;
    }

    ngOnInit() {}

    toggleSidebarOpen(key): void {
        this.fuseSidebarService.getSidebar(key).toggleOpen();
    }
}

function getFares() {
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

function countries() {
    var countries = [
        {
            country: 'Ireland',
            continent: 'Europe',
            language: 'English'
        },
        {
            country: 'Spain',
            continent: 'Europe',
            language: 'Spanish'
        },
        {
            country: 'United Kingdom',
            continent: 'Europe',
            language: 'English'
        },
        {
            country: 'France',
            continent: 'Europe',
            language: 'French'
        },
        {
            country: 'Germany',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Sweden',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Norway',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Italy',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Greece',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Iceland',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Portugal',
            continent: 'Europe',
            language: 'Portuguese'
        },
        {
            country: 'Malta',
            continent: 'Europe',
            language: '(other)'
        },
        {
            country: 'Brazil',
            continent: 'South America',
            language: 'Portuguese'
        },
        {
            country: 'Argentina',
            continent: 'South America',
            language: 'Spanish'
        },
        {
            country: 'Colombia',
            continent: 'South America',
            language: 'Spanish'
        },
        {
            country: 'Peru',
            continent: 'South America',
            language: 'Spanish'
        },
        {
            country: 'Venezuela',
            continent: 'South America',
            language: 'Spanish'
        },
        {
            country: 'Uruguay',
            continent: 'South America',
            language: 'Spanish'
        }
    ];
    return countries;
}
var games = [
    'Chess',
    'Cross and Circle',
    'Daldøs',
    'Downfall',
    'DVONN',
    'Fanorona',
    'Game of the Generals',
    'Ghosts',
    'Abalone',
    'Agon',
    'Backgammon',
    'Battleship',
    'Blockade',
    'Blood Bowl',
    'Bul',
    'Camelot',
    'Checkers',
    'Go',
    'Gipf',
    'Guess Who?',
    'Hare and Hounds',
    'Hex',
    'Hijara',
    'Isola',
    'Janggi (Korean Chess)',
    'Le Jeu de la Guerre',
    'Patolli',
    'Plateau',
    'PÜNCT',
    'Rithmomachy',
    'Sáhkku',
    'Senet',
    'Shogi',
    'Space Hulk',
    'Stratego',
    'Sugoroku',
    'Tâb',
    'Tablut',
    'Tantrix',
    'Wari',
    'Xiangqi (Chinese chess)',
    'YINSH',
    'ZÈRTZ',
    'Kalah',
    'Kamisado',
    'Liu po',
    'Lost Cities',
    'Mad Gab',
    'Master Mind',
    'Nine Men\'s Morris',
    'Obsession',
    'Othello'
];
function createData() {
    var rowCount = 20;
    var row = 0;
    var data = [];
    for (var i = 0; i < rowCount; i++) {
        var rowItem = createRowItem(row);
        data.push(rowItem);
        row++;
    }
    return data;
}
function createRowItem(row) {
    var firstNames = ['Sophie', 'Isabelle', 'Emily', 'Olivia'];
    var lastNames = ['Beckham', 'Black', 'Braxton', 'Brennan'];
    var rowItem: any = {};
    var countryData = countries()[row % countries().length];
    rowItem.country = countryData.country;
    rowItem.language = countryData.language;
    var firstName = firstNames[row % firstNames.length];
    var lastName = lastNames[row % lastNames.length];
    rowItem.name = firstName + ' ' + lastName;
    rowItem.game = {
        name: games[Math.floor(((row * 13) / 17) * 19) % games.length]
    };
    // rowItem.gameName = 'toolTip: ' + rowItem.game.name.toUpperCase();
    return rowItem;
}
