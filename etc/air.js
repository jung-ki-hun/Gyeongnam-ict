const request = require('request');

let apikey = 'lWzqmJDInly7GXNU8xW%2BrcHIL0TMsN6uGV1TVFYUu2HnuXlRDTju6gPyG3YoYgFhf7UVdIrySTsVvpqxP1pABg%3D%3D';

function createGetParam(p) {
    let ret = '?';
    for(let key in p) {
        ret += encodeURIComponent(key) + '=' + (key == 'serviceKey' ? p[key] : encodeURIComponent(p[key])) + '&';
    }
    ret = ret.substr(0, ret.length - 1);
    return ret;
}

async function requestDataTempleted(url, p, processor) {
    let params = {serviceKey: apikey, returnType: 'json'};
    for(let key in p) {
        if(key != 'returnType') params[key] = p[key];
    }
    return new Promise(function(resolve, reject) {
        request({url: url + createGetParam(params)}, function(error, response, body) {
            if(error) {
                reject(error);
            }
            else {
                let parsed = {};
                try {
                    parsed = JSON.parse(body);
                }
                catch(e) {
                    reject(new Error('API Key not valid.'));
                }
                try {
                    if(parsed.response.header.resultCode == '00') {
                        processor(parsed.response.body, resolve, reject)
                    }
                    else {
                        reject(new Error('resultCode was not 00 (given code was ' + parsed.response.header.resultCode + ', resultMsg=' + parsed.response.header.resultMsg + ')'));
                    }
                }
                catch(e) {
                    reject(e);
                }
            }
        });
    });
}

module.exports = {
    getAirStatus: async function getAirStatus(provinceName, subRegionName) {
        return requestDataTempleted('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty', {
            numOfRows: '100',
            pageNo: '1',
            sidoName: provinceName,
            ver: '1.3'
        } ,function  (data, resolve, reject) {
            let air_items = data.items;
            let found = false;
            for(let i = 0; i < air_items.length && !found; ++i) {
                if(air_items[i].stationName == subRegionName) {
                    resolve(air_items[i]);
                    found = true;
                    break;
                }
            }
            if(!found) {
                reject(new Error("subRegionName not found."));
            }
        });
    },
    getMinuDustFrcstDspth: async function getMinuDustFrcstDspth(searchDate, InformCode) {
        return requestDataTempleted('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth', {
            numOfRows: '100',
            pageNo: '1',
            searchDate: searchDate,
            InformCode: InformCode
        } ,function  (data, resolve, reject) {
            resolve(data.items);
        });
    }
}