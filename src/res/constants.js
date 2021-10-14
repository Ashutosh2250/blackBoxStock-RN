const headerData = [
    {
        id: 1,
        tabname: 'SYMBOL'
    },
    {
        id: 2,
        tabname: 'ICON'
    },
    {
        id: 3,
        tabname: 'PRICE'
    },
    {
        id: 4,
        tabname: 'VOLUME'
    },
    {
        id: 5,
        tabname: '%'
    }
];
const headerAlertWithTimeData = [
    {
        id: 1,
        tabname: 'TIME'
    },
    {
        id: 2,
        tabname: 'SYMBOL'
    },
    {
        id: 3,
        tabname: 'ICON'
    },
    {
        id: 4,
        tabname: 'PRICE'
    },
];
const headerAlertWithVolatilityData = [
    {
        id: 1,
        tabname: 'TIME'
    },
    {
        id: 2,
        tabname: 'SYMBOL'
    },
    {
        id: 3,
        tabname: 'ICON'
    },
    {
        id: 4,
        tabname: 'VOLATILITY'
    }
];
const headerAlertWithPercentageData = [
    {
        id: 1,
        tabname: 'TIME'
    },
    {
        id: 2,
        tabname: 'SYMBOL'
    },
    {
        id: 3,
        tabname: 'ICON'
    },
    {
        id: 4,
        tabname: 'PRICE'
    }
]

const OlFilterOptions = [
    {
        id: 1,
        title: 'Top Calls',
        selected: true,
    },
    {
        id: 2,
        title: 'Bottom Calls',
        selected: false,
    },
    {
        id: 3,
        title: 'Top Puts',
        selected: false,
    },
    {
        id: 4,
        title: 'Bottom Puts',
        selected: false,
    }
]


const FlowFirstFilterOptions = [
    {
        id: 1,
        title: 'Puts',
        selected: true,
        // hexD:00x02,
        // filter1:true
    },
    {
        id: 2,
        title: 'Calls',
        selected: true,
    },
    {
        id: 3,
        title: 'Yellow',
        selected: true,
    },
    {
        id: 4,
        title: 'Magenta',
        selected: true,
    },
    {
        id: 5,
        title: 'White',
        selected: true,
    },
    {
        id: 6,
        title: 'Multi Leg',
        selected: false,
    },
    {
        id: 7,
        title: 'Above Ask Only',
        selected: true,
    },
    {
        id: 8,
        title: 'At or Below Bid',
        selected: true,
    },
    {
        id: 9,
        title: '<= .50',
        selected: false,
    },
    {
        id: 10,
        title: '<= 5.00',
        selected: false,
    },
    {
        id: 11,
        title: '>= $100,000 (Val)',
        selected: false,
    },
    {
        id: 12,
        title: '>= $200,000 (Val)',
        selected: false,
    },
    {
        id: 13,
        title: '>= $500,000 (Val)',
        selected: false,
    },
    {
        id: 14,
        title: '< $0.75T MKT CAP',
        selected: false,
    },
    {
        id: 15,
        title: '= Sweep Only',
        selected: false,
    },
    {
        id: 16,
        title: '>= 100 Contracts',
        selected: false,
    },
    {
        id: 17,
        title: '>= 500 Contracts',
        selected: false,
    },
    {
        id: 18,
        title: '>= 5000 Contracts',
        selected: false,
    },
    {
        id: 19,
        title: 'Weekly Only',
        selected: false,
    },
    {
        id: 20,
        title: 'Earnings Report Only',
        selected: false,
        filter1: false
    },
    {
        id: 21,
        title: 'Unusual Activity Only',
        selected: false,
    }
]

const sectors = [
    {
        id: 22,
        title: 'Consumer Discretionary',
        selected: true,
    },
    {
        id: 23,
        title: 'Industrials',
        selected: true,
    },
    {
        id: 24,
        title: 'Information Technology',
        selected: true,
    },
    {
        id: 25,
        title: 'Real Estate',
        selected: true,
    },
    {
        id: 26,
        title: 'Health Care',
        selected: true,
    },
    {
        id: 27,
        title: 'Energy',
        selected: true,
    },
    {
        id: 28,
        title: 'Financials',
        selected: true,
    },
    {
        id: 29,
        title: 'Consumer Staples',
        selected: true,
    },
    {
        id: 30,
        title: 'Materials',
        selected: true,
    },
    {
        id: 31,
        title: 'Communication Services',
        selected: true,
    },
    {
        id: 32,
        title: 'Utilities',
        selected: true,
    }
]
const securityType=[
    {
        id: 33,
        title: 'STOCK',
        selected: true,
        
    },
    {
        id: 34,
        title: 'ETF',
        selected: false,
  
    }


]
const alertStreamFilters = [
    {
        id: 1,
        title: 'Dark Pool Prints/Blocks',
        selected: false,
        hexa: 0x0001
    },
    {
        id: 2,
        title: '52 Week High',
        selected: false,
        hexa: 0x0002
    },
    {
        id: 31,
        title: '52 Week Low',
        selected: false,
        hexa: 0x0004
    },
    {
        id: 3,
        title: 'Stock Price Spike',
        selected: false,
        hexa: 0x0008

    },
    {
        id: 4,
        title: 'Stock Halts',
        selected: false,
        hexa: 0x0010
    },
    {
        id: 5,
        title: 'Low Floats',
        selected: false,
        hexa: 0x0020
    },
    {
        id: 6,
        title: 'All',
        selected: false,
        hexa: ''
    },
    {
        id: 7,
        title: 'History',
        selected: false,
        hexa: ''
    }
]

const optionAlerts = [
    {
        id: 1,
        title: 'Sort by Gainers',
        selected: true,
    },
    {
        id: 2,
        title: 'Sort by Time',
        selected: false,
    }
]

const flowHeaderData = [
    {
        id: 1,
        tabname: 'TIME\nSPOT'
    },
    {
        id: 2,
        tabname: 'SYMBOL\nDETAILS'
    },
    {
        id: 3,
        tabname: 'EXP\nTYPE'
    },
    {
        id: 4,
        tabname: 'STRIKE\nVALUE'
    },
    {
        id: 5,
        tabname: 'C/P\nIV'
    }
]
const alertHeaderData = [
    {
        id: 1,
        tabname: 'SYMBOL\nDETAILS'
    },
    {
        id: 2,
        tabname: 'TIME\nALERT'
    },
    {
        id: 3,
        tabname: 'EXP\nHIGH'
    },
    {
        id: 4,
        tabname: 'STRIKE\nLAST'
    },
    {
        id: 5,
        tabname: 'C/P\n%GAIN'
    }
]
const volumeHeaderData = [
    {
        id: 1,
        tabname: 'SYMBOL\nRATIO'
    },
    {
        id: 2,
        tabname: 'VOL COL'
    },
    {
        id: 3,
        tabname: 'C VOL\nPOI'
    },
    {
        id: 4,
        tabname: 'P VOL\nDCOI'
    },
    {
        id: 5,
        tabname: 'P/C\nDPOI'
    },
    {
        id: 6,
        tabname: 'AVG VOL'
    }
]
const olHeaderData = [
    {
        id: 1,
        tabname: 'SYMBOL'
    },
    {
        id: 2,
        tabname: 'EXP'
    },
    {
        id: 3,
        tabname: 'C/P'
    },
    {
        id: 4,
        tabname: 'STRIKE'
    },
    {
        id: 5,
        tabname: 'OI'
    },
    {
        id: 6,
        tabname: 'DOI'
    }
]
const mapHeaderData = [
    {
        id: 1,
        tabname: 'C2'
    },
    {
        id: 2,
        tabname: 'C1'
    },
    {
        id: 3,
        tabname: 'C0'
    },
    {
        id: 4,
        tabname: '0'
    },
    {
        id: 5,
        tabname: 'P0'
    },
    {
        id: 6,
        tabname: 'P1'
    },
    {
        id: 7,
        tabname: 'P2'
    }
]
const callAdPutsHeaderData = [
    {
        id: 1,
        tabname: 'MOST ACTIVE\nSYMBOL'
    },
    {
        id: 2,
        tabname: 'COUNT'
    },
    // {
    //     id: 3,
    //     tabname: 'VALUE'
    // }
]
const bullHeaderData = [
    {
        id: 1,
        tabname: 'BULLISH\nFLOW'
    },
    {
        id: 2,
        tabname: 'COUNT'
    },
    // {
    //     id: 3,
    //     tabname: 'VALUE'
    // }
]
const bearHeaderData = [
    {
        id: 1,
        tabname: 'BEARISH\nFLOW'
    },
    {
        id: 2,
        tabname: 'COUNT'
    },
    // {
    //     id: 3,
    //     tabname: 'VALUE'
    // }
]
const alertStreamData = [
    {
        id: 1,
        tabname: 'TIME'
    },
    {
        id: 2,
        tabname: 'SYMBOL'
    },
    {
        id: 3,
        tabname: 'MESSAGE'
    },
    {
        id: 4,
        tabname: 'PRICE'
    }
]

const settings = [
    {
        id:1,
        text:'Pre Market Alert',
        selected :false,
    },
    {
        id:2,
        text:'Volume Active Alert',
        selected : false,
    },
    {
        id:3,
        text:'Price Spike Alert',
        selected : false,
    },
    {
        id:4,
        text:'Retracement Alert',
        selected: false
    },
    {
        id:5,
        text:'Rapid Decline Alert',
        selected :false,
    },
    {
        id:6,
        text:'Usual Suspect Alert',
        selected :false,
    },
    {
        id:7,
        text:'Options Active Alert',
        selected :false,
    },
    {
        id:8,
        text:'Alpha Gold Alert',
        selected :false,
    },
    {
        id: 9,
        text: 'Team Trades',
        selected: false,
    },
    {
        id: 10,
        text: 'Flow Plays',
        selected: false,
    },
    {
        id: 11,
        text: 'BBS Messages',
        selected: false,
    },
]

const testData = [
    {
        id: 1,
        color: '#FF0000',
        value: -50
    },
    {
        id: 2,
        color: '#FF7A00',
        value: -30
    },
    {
        id: 3,
        color: '#FFFF00',
        value: -10
    },
    {
        id: 4,
        color: '#6ED25A',
        value: 10
    },
    {
        id: 5,
        color: '#00D553',
        value: 30
    },
    {
        id: 6,
        color: '#008D37',
        value: 50
    }
];
const newsData = [
    {
        id: 1,
        title: 'Options News',
        selected: false,
    },
    {
        id: 2,
        title: 'Ratings',
        selected: false,
    },
    
];
const sources = [
    {
        id: 3,
        title: 'Market News',
        selected: true,
    },
    {
        id: 4,
        title: 'Edgar',
        selected: false,
    },
    {
        id: 5,
        title: 'Seeking Aplha/Zero Hedge',
        selected: true,
    },
];


export {
    headerData, headerAlertWithPercentageData, headerAlertWithVolatilityData, testData,
    flowHeaderData, alertHeaderData, volumeHeaderData, alertStreamData,
    olHeaderData, mapHeaderData, callAdPutsHeaderData, bullHeaderData, bearHeaderData,
    headerAlertWithTimeData, OlFilterOptions, FlowFirstFilterOptions, sectors, alertStreamFilters, optionAlerts,
    settings,newsData,sources
}
