import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waitingTime_onLogin', true);

const dataInput = JSON.parse(open("../../data.json"));
const url = dataInput.url;
const payload = JSON.stringify(dataInput.dataInput);
const params = dataInput.params;

export let options = {
    scenarios:{
        ramping:{
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '1m', target: 100 },
                { duration: '45s', target: 0 },
            ]
            },
        spike:{
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 10,
            startTime: '105s',
            stages: [
                { duration: '10s', target: 30 },
                { duration: '20s', target: 30 },
                { duration: '10s', target: 0 },
                { duration: '10s', target: 30 },
                { duration: '20s', target: 30 },
                { duration: '10s', target: 0 },
            ],
            },
        load:{
            executor: 'constant-arrival-rate',
            duration: '60s',
            rate: 3000,
            timeUnit: '1s',
            preAllocatedVUs: 10,
            startTime: '185s',            
            },
        stress:{
            executor: 'ramping-vus',
            startTime: '245s',
            stages: [
                { duration: '1m', target: 1000 }, 
                { duration: '2m', target: 1000 },
                { duration: '1m', target: 0 },
            ]
            }
    }
}


export default function () {
    const loginUrl = url.concat('login')

    let res = http.get(loginUrl, payload, params);

    check(res, { 
        'Response Status': (r) => r.status === 200 
    });

    // Get waiting time
    myTrend.add(res.timings.waiting);
  }

  export function handleSummary(data) {
    return {
      'summary.json': JSON.stringify(data),
    };
  }