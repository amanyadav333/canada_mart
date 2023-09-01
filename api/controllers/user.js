var jwt = require("jsonwebtoken");
const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const validation = require("../validation/user_validation");
const env = require("dotenv").config();
const { off, query } = require("../connection/connection");
const { user } = require("../utils/constant");
let path = require("dotenv").config({
    path: __dirname + "../env",
});
const path2 = require('path');
const fs = require('fs');

const login = async (req, res, next) => {
    if (req.method == "POST") {
        console.log(user.firstName);
        let mobileNumber = req.body.mobile;
        let email = req.body.email;
        console.log(mobileNumber);
        console.log(email);
        let validateUSerBool=validation.loginValidation(mobileNumber,email);
        if(validateUSerBool==""){
            try{
                usr_qry = `SELECT * FROM user WHERE ${user.mobile}= '${mobileNumber}' OR ${user.email}= '${email}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: "false",
                        message: "user not registered"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: "true",
                        data: result[0]
                    })
                }
            }catch(error){
                res.statusCode = 400;
                console.log('*******'+error.message);        
                res.json({
                    status: "false",
                    message: error
                })
            }
        }else{
            res.statusCode = 401;
            res.json({
                status: "false",
                message:validateUSerBool,
            });
        }
    }
}

const signup = async (req, res, next) => {

    if (req.method == "POST") {
        console.log(req.body);
        let firstName = req.body.first_name;
        let lastName = req.body.last_name;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let countryCode = req.body.country_code;
        let deviceToken = req.body.device_token;
        let result = '';
        const schema = Joi.object().keys({
            firstName: Joi.string().max(30).required(),
            lastName: Joi.string().max(30).required(),
            email: Joi.string().max(50).required(),
            mobile: Joi.string().max(12).required(),
            countryCode: Joi.string().max(5).required(),
        });
        const { error, value } = schema.validate({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            countryCode: req.body.country_code,
        }) 
        if(error){
            res.statusCode = 401;
            res.json({
                status: "false",
                message: error.details[0].message
            })
        }else{
            try {
                // checking for existing users  
                result = `SELECT * FROM user WHERE ${user.mobile}= '${mobile}' OR ${user.email}= '${email}'`;
                result = await executeQry(result);
                if(result.length==0){
                    var dateTime = new Date();
                    let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];
                    // add user
                    result =`INSERT INTO user (${user.firstName},${user.lastName},${user.email},${user.mobile},
                        ${user.countryCode},${user.created},${user.updated},${user.deviceToken})
                        values('${firstName}', '${lastName}','${email}', '${mobile}', '${countryCode}' ,
                        '${date}','${date}', '${deviceToken==undefined?"":deviceToken}') `;

                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: "true",
                        message: "user registered successfully"
                    })
                }else{
                    res.statusCode = 201;
                    res.json({
                        status: "false",
                        message: "user already registered"
                    })
                }
            } catch (error) {
                res.statusCode = 400;
                console.log('*******'+error.message);        
                res.json({
                    status: "false",
                    message: error
                })

            }
        }
    }
}

module.exports = {
    signup: signup,
    login: login,
}