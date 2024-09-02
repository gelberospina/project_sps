import {loginUser} from './login_test.js';
import {loginFailUser} from './login_test.js';
import {creationUser} from './creation_test.js';
import {searchUser} from './search_test.js';
import {searchFailUser} from './search_test.js';
import {updateUser} from './update_test.js';
import {deleteUser} from './delete_test.js';

const data = JSON.parse(open("../../data.json"));

//The general URL
const url = data.url;

//General parameters
const params = data.params;

//Test Case #1
const payload1 = JSON.stringify(data.user1Payload);
const payloadUpdate1 = JSON.stringify(data.user1Upload);
const paramsLogin1 = data.paramsLogin1;

//Test Case #2
const payload2 = JSON.stringify(data.user2Payload);
const paramsLogin2 = data.paramsLogin2;

//Test Case #3
const payload3 = JSON.stringify(data.user3Payload);
const paramsLogin3 = data.paramsLogin3;

//Test Case #4
const payload4 = JSON.stringify(data.user4Payload);
const payloadUpdate4 = JSON.stringify(data.user4Upload);

//Running Test Suite
export default function(){
    testCase1();
    testCase2();
    testCase3();
    testCase4();
}

export function testCase1(){
    creationUser(url, payload1, params);
    loginUser(url, paramsLogin1);
    searchUser(url, payload1, params);
    updateUser(url, payloadUpdate1, params);
    deleteUser(url, payload1, params);
    console.log('Test Case #1 executed');
}

export function testCase2(){
    creationUser(url, payload2, params);
    searchUser(url, payload2, params);
    loginUser(url, paramsLogin2);
    deleteUser(url, payload2, params);
    searchFailUser(url, payload2, params);
    console.log('Test Case #2 executed');
}

export function testCase3(){
    loginFailUser(url, paramsLogin3);
    creationUser(url, payload3, params);
    searchUser(url, payload3, params);
    loginUser(url, paramsLogin3);
    deleteUser(url, payload3, params);
    console.log('Test Case #3 executed');
}

export function testCase4(){
    creationUser(url, payload4, params);
    searchUser(url, payload4, params);
    updateUser(url, payloadUpdate4, params);
    searchUser(url, payload4, params);
    deleteUser(url, payload4, params);
    console.log('Test Case #4 executed');
}

