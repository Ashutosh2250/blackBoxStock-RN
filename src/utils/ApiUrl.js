const API_URL = {
    options: '/options',
    base_url: 'https://dev.blackboxstocks.com:8081',
    base_url1: 'https://svc.blackboxstocks.com:8081/notifications',
    taem_trade_url: "https://svc.blackboxstocks.com:8101/modplays",
    gainers: '/gainers',
    market_status: '/marketstatus',
    pre_market_sscan: '/premarketscan',
    post_market_sscan: '/postmarketscan',
    alert_stream: '/alertstream',
    volume_list: '/volumelist',
    market_scan: '/marketscan',
    decliners: '/decliners',
    alert_log: '/alertlog?market=Nasdaq',
    quotes: "/quotes",
    post_market_scan_node: 'updatePostMarketScan',
    pre_market_scan_node: 'updatePreMarketScan',
    market_scan_node: 'updateMarketScan',
    alert_log_node: 'updateAlertLog',
    alert_stream_node: 'updateAlertStream',
    volume_list_node: 'updateVolumeList',
    decliners_node: 'updateDecliners',
    quotes_node: "updatelevel2",
    login_url: 'https://svc.blackboxstocks.com:8102/account/login',
    verify_session_url: 'https://svc.blackboxstocks.com:8102/account/verifysession',
    api_server: "https://api3.blackboxstocks.com",
    alert_stream_get: '/AlertStream',
    api_server1: "https://svc.blackboxstocks.com:8103/alertstream?market=Nasdaq&AlertStreamFilter=0&AlertStreamStartDate=&AlertStreamEndDate=",
    bbApiKey: '00890b3b-fd7c-49ca-8d27-895127d4619d',
    bbApiKey1: '8ac2c890-df0e-4f3e-b002-ae1e02c2ecc4',
    swagger_base_url: "https://svc.blackboxstocks.com:8103/",
    get_profile_data_url: "https://svc.blackboxstocks.com:8102/account/details",
    update_profile_data_url: "https://svc.blackboxstocks.com:8102/account/update",

    search_companies: "SearchCompanies/",

}

export default API_URL;

