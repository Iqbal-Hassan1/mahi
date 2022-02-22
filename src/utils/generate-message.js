import responses from '../config/codes.json';
require('dotenv').config();
import response from '../config/codes.json';
require('dotenv').config();
export const generateMessages = (code) => {

    return response[`${code}`];
    // let err = new Error();
    // Object.assign(err, res);

    // return err;

};
