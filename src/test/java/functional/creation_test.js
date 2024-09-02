import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waiting_time');

export default function(){
  creationUser(url, payload, params);
}

export function creationUser(url, payload, params) {

    let res = http.post(url, payload, params);

    check(res, { 
        'Creation Response Status': (r) => r.status === 200, 
        'Create User Successfully': (r) => r.username == payload.username
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }