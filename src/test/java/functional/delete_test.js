import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waiting_time');

export default function(){
    deleteUser();
}
export function deleteUser(url, payload, params) {
    
    const username = JSON.parse(payload).username;

    let res = http.del(url.concat(username), params);

    check(res, { 
        'Delete User Status': (r) => r.status === 200, 
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }