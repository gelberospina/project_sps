import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('waiting_time');

export default function(){
  loginUser();
}

export function loginUser (url, params) {
    
    const txtNewSession = 'Logged in user session';
  
    let res = http.get(url.concat("login/"), params);

    check(res, { 
        'Login Response Status': (r) => r.status === 200, 
        'Login Successfully': (r) => r.body.includes(txtNewSession)
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }
  
  export function loginFailUser (url, params) {
  
    let res = http.get(url.concat("login/"), params);

    check(res, { 
        'Login Fail Response Status': (r) => r.status === 400 || r.status === 404
    });

    // Registrar el tiempo de espera en la metrica personalizada
    myTrend.add(res.timings.waiting);

  }