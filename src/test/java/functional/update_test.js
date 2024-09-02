import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waiting_time');

export default function(){
  updateUser();
}
export function updateUser (url, payload, params) {

    const username = JSON.parse(payload).username;
    const newEmail = JSON.parse(payload).email;
  
    let res = http.put(url.concat(username), payload, params);
    check(res, { 
        'Update Response Status': (r) => r.status === 200, 
        'Update User Successfully': (r) => JSON.parse(r.body).email == newEmail
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }