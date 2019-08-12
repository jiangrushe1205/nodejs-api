//express_demo.js 文件
var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var http = require('http');
var app = express();

app.get('/', function (req, res) {

    var algorithm = 'md5WithRSAEncryption';

    var privatePem = fs.readFileSync('rsa_private_key_pkcs8.pem');
    var key = privatePem.toString();
    console.log( "key %s",key);
    //
    var obj = {"msg_id":"123456","channel_code":"CCB","request_body":{"channel_code":"CCB"},"sign":""};

    //拼接字符串,拼接字符串需要按照Key值进行排序。然后使用&符号连接。这一部分需要您实现，demo里面直接拼接后的结果。需要去除sign
    var signStr = "channel_code=CCB&msg_id=123456&request_body={\"channel_code\":\"CCB\"}";

    var sign = signer(algorithm,key,signStr); //数字签名
    console.log( "sign %s",sign);
    obj.sign = sign;

    data = JSON.stringify(obj); //数据以json格式发送
    console.log( JSON.stringify(data))

    var opt = {
        method: "POST",
        host: "testccb.91jyy.com",
        path: "/api/product/list",
        headers:{
            // "Content-Type": "application/x-www-for   m-urlencoded", //for url parameter
            "Content-Type": "application/json", // for json data
            "Content-Length": data.length,

        }
    };

    console.log( JSON.stringify(opt))
    var req = http.request(opt, function(apacheRes){//建立连接 和 响应回调
        if(apacheRes.statusCode == 200){
            apacheRes.setEncoding('utf8');
            var body = "";
            apacheRes.on('data', function(recData){ body += recData;});
            apacheRes.on('end', function(){

                var dataObj = {"reponse_body":{"orders":[{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 14:28:30.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"123456789111110","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458921100567325"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 14:27:01.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"1234567891110","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458920210434966"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 14:25:03.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"123456789110","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458919032107931"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 14:24:13.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"12345678910","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458918528703872"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 13:54:22.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"1234567890","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458900621862411"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 13:53:18.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"416a1e1167454127a10ab19945e2fc5d","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458899978171153"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 13:53:13.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_code":"b89acb2fc3344e1b9fef1a16b665fc0c","order_status":"支付成功","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","pay_time":"2018-12-27 16:05:20.0","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458899929695507"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 11:35:36.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458817361588992"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 11:11:14.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458802740453306"},{"appointment_city":"北京","appointment_time":"2018-12-12","create_time":"2018-12-27 11:09:18.0","dept_name":"神经内科","doctor_name":"姜汝社","hospital_name":"北京协和医院","order_status":"未支付","patient_gender":"1","patient_identity_card":"410727199012050618","patient_mobile":"18301406034","patient_name":"特普朗","payment_amount":"499.00","product_name":"名医预约协助（不指定专家）","serial_number":"100015458801583639799"}],"page":1,"page_count":1,"row":1,"total_page":0},"return_code":"000000","return_msg":"unexpected error.","sign":"B3PEyQPDihJjTvI9H6NN1hRo9l0l1k7GrawW0d+c7B+8+wdFJpMgE3TZe/cVSHIEP6ORDOi5wfPzZkFSCnjJ460xZEvAAq5nrsSjeG1iq+VLkNey5CH3xZuufEeFRSy77cQZR6QsgL8otc0XpG0HIhIO8682gwv8WlB0UC4/oEs="};
                // var dataObj = JSON.parse(body);
                var sign = dataObj.sign;
                console.log("sign key:%s",sign);
                for ( var i = 0; i < dataObj.length; i++) {
                    if(body[i].name == "sign"){
                        delete dataObj[i].name;
                    }
                }

                //拼接字符串,拼接字符串需要按照Key值进行排序。然后使用&符号连接。这一部分需要您实现，demo里面直接拼接后的结果。需要去除sign
                var signStr = "reponse_body="+ JSON.stringify(dataObj.reponse_body)+"&return_code=000000&return_msg=unexpected error.";

                var publicPem = fs.readFileSync('jyy_rsa_public_key_1024.pem');
                var pubkey = publicPem.toString();
                console.log("公钥:%s",pubkey);
                console.log("签名数据:%s",signStr);
                console.log("sign:%s",sign);
                console.log("验证签名:%s",verify(algorithm,pubkey,sign,signStr));         //验证数据，通过公钥、数字签名 =》是原始数据


                res.send(body); /*发送收到的响应*/
            });
        }else{
            res.send(500, "error");
        }
    });


    req.write(data + "\n"); //发送请求
    req.end(); //请求发送完毕

})

//签名
function signer(algorithm,key,data){
    var sign = crypto.createSign(algorithm);
    sign.update(data);
    sig = sign.sign(key, 'base64');
    return sig;
}

//验证签名
function verify(algorithm,pubkey,sig,data){
    var verify = crypto.createVerify(algorithm);
    verify.update(data);
    return verify.verify(pubkey, sig, 'base64')
}

function strToBase64(str) {
    var b = new Buffer(str);
    return str.toString('base64');
}

function base64ToStr(str) {
    var b = new Buffer(str, 'base64')
    return b.toString();
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})


