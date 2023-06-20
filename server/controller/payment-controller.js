import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantKey } from '../index.js';

import formidable from 'formidable';

import https from 'https';

export const addPaymentGateway = async (request, response) => {
    try {

        let reqParams = {
            "mid": paytmParams.MID,
            "orderId": paytmParams.ORDER_ID
        }

        let paytmCheckSum = await paytmchecksum.generateSignature(reqParams, paytmMerchantKey);

        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmCheckSum
        }
        response.status(200).json(params);
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}


export const paytmResponse = (request, response) => {

    const form = formidable({});
    const paytmCheckSum = request.body.CHECKSUMHASH;
    if (!paytmCheckSum) {
        return response.status(400).json({ error: "Missing CHECKSUMHASH" });
    }
    delete request.body.CHECKSUMHASH;

    const isVerifySignature = paytmchecksum.verifySignature(request.body, paytmMerchantKey, paytmCheckSum);
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams["mid"] = request.body.MID;
        paytmParams["orderId"] = request.body.ORDER_ID;

        paytmchecksum.generateSignature(paytmParams, paytmMerchantKey).then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            let post_data = JSON.stringify(paytmParams);

            let options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log(result);
                    response.redirect(`http://localhost:3000/`)
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
        response.status(400).json({ error: "Checksum Mismatched" });
    }
}