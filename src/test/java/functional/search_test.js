import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waiting_time');

export default function(){
  searchUser(url, payload, params);
}
export function searchUser(url, payload, params) {

    const usernameA = JSON.parse(payload).username;
    
    let res = http.get(url.concat(usernameA), params);

    check(res, { 
        'Search Response Status': (r) => r.status === 200, 
        'Search User Successfully': (r) => JSON.parse(r.body).username == usernameA
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }

  export function searchFailUser(url, payload, params) {

    const usernameA = JSON.parse(payload).username;
    
    let res = http.get(url.concat(usernameA), params);

    check(res, { 
        'Search Fail Response Status': (r) => r.status === 404 
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }