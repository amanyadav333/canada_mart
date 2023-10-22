var jwt = require("jsonwebtoken");
const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const validation = require("../validation/user_validation");
const env = require("dotenv").config();
const { off, query } = require("../connection/connection");
const { user,dbTable } = require("../utils/constant");
let path = require("dotenv").config({
    path: __dirname + "../env",
});
const path2 = require('path');
const fs = require('fs');
const {uploadS3} = require("../connection/s3client");

const checkUserExist = async (req, res, next) => {
    if (req.method == "GET") {
        let mobileNumber = req.query.mobile;
        let email = req.query.email;
        const schema = Joi.object().keys({
            email: Joi.string().max(50).required(),
            mobile: Joi.string().max(12).required(),
        });
        const { error, value } = schema.validate({
            email: req.query.email,
            mobile: req.query.mobile,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try{
                usr_qry = `SELECT * FROM ${dbTable.users} WHERE ${user.mobile}= '${mobileNumber}' OR ${user.email}= '${email}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "user not exist"
                    })
                }else{
                    res.statusCode = 201;
                    res.json({
                        status: false,            
                        message: "user all ready exist"

                    })
                }
            }catch(error){
                res.statusCode = 400;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error
                })
            }
        }
    }
}

const login = async (req, res, next) => {
    if (req.method == "POST") {
        let mobileNumber = req.body.mobile;
        let email = req.body.email;
        const schemaMobile = Joi.object().keys({mobile: Joi.string().max(12).required()});
        const schemaEmail = Joi.object().keys({email: Joi.string().max(50).required()});
        const { error, value } = schemaMobile.validate({mobile: req.body.mobile,}) 
        console.log(mobileNumber);
        if(error){
            const { error, value } = schemaEmail.validate({email: req.body.email,}) 
            if(error){
                res.statusCode = 201;
                res.json({
                    status: false,
                    message:"mobile or email is required",
                });
                return;
            }
        }
        try{
            usr_qry = `SELECT * FROM ${dbTable.users} WHERE ${user.mobile}= '${mobileNumber}' OR ${user.email}= '${email}'`;
            let result = await executeQry(usr_qry);
            if(result.length==0){
                res.statusCode = 201;
                res.json({
                    status: false,
                    message: "user not registered"
                })
            }else{
                if(result[0]["parent_user_id"]==null){
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: result[0]
                    })
                }else{
                    console.log(result[0]["parent_user_id"]);
                    usr_qry = `SELECT * FROM ${dbTable.users} WHERE ${user.id}= '${result[0]["parent_user_id"]}'`;
                    let tmpResult = await executeQry(usr_qry);
                    console.log(tmpResult.length==0);
                    if(tmpResult.length!=0){
                        result[0]["user_data"]=tmpResult[0];
                        console.log(tmpResult[0]["email"]);
                        res.statusCode = 200;
                        res.json({
                            status: true,
                            data: result[0]
                        })
                    }else{
                        res.statusCode = 200;
                        res.json({
                            status: true,
                            data: result[0]
                        })
                    }
                }
            }
        }catch(error){
            res.statusCode = 400;
            console.log('*******'+error);        
            res.json({
                status: false,
                message: error
            })
        }
    }
}

const signup = async (req, res, next) => {

    if (req.method == "POST") {
        console.log(req.body);
        let name = req.body.name;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let countryCode = req.body.country_code;
        let is_company = req.body.is_company;
        let role = req.body.role;
        let deviceToken = req.body.device_token;
        let parent_user_id = req.body.parent_user_id;
        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(100).required(),
            email: Joi.string().max(50).required(),
            mobile: Joi.string().max(12).required(),
            countryCode: Joi.string().max(5).required(),
            is_company: Joi.boolean().required(),
            role: Joi.string().max(20).required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            countryCode: req.body.country_code,
            is_company: req.body.is_company,
            role: req.body.role,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                console.log('*******'+is_company);        
                console.log('*******'+parent_user_id);        
                // checking for existing users  
                let result = `SELECT * FROM ${dbTable.users} WHERE ${user.mobile}= '${mobile}' OR ${user.email}= '${email}'`;
                result = await executeQry(result);
                if(result.length==0){
                    var unique_id=name+mobile+email;
                    var dateTime = new Date();
                    let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];
                    if(is_company=="true"){
// add user
                        let result2 =`INSERT INTO ${dbTable.users} (${user.name},${user.email},${user.mobile},
                            ${user.countryCode},${user.created},${user.updated},${user.deviceToken},${user.unique_id},${user.isCompany},${user.role})
                            values('${name}','${email}', '${mobile}', '${countryCode}' ,
                            '${date}','${date}', '${deviceToken==undefined?"":deviceToken}','${unique_id}','${is_company}','${role}')`;

                        result = await executeQry(result2);
                    }else{
                        // add user
                        let result2 =`INSERT INTO ${dbTable.users} (${user.name},${user.email},${user.mobile},
                            ${user.countryCode},${user.created},${user.updated},${user.deviceToken},${user.unique_id},${user.isCompany},${user.role},${user.parentUserID})
                            values('${name}','${email}', '${mobile}', '${countryCode}' ,
                            '${date}','${date}', '${deviceToken==undefined?"":deviceToken}','${unique_id}','${is_company}','${role}','${parent_user_id}')`;

                        result = await executeQry(result2);
                    }
                    
                    result = `SELECT * FROM ${dbTable.users} WHERE ${user.mobile}= '${mobile}' OR ${user.email}= '${email}'`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "user registered successfully",
                        data:result[0]
                    })
                }else{
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "user already registered with this mobile/email",
                    })
                }
            } catch (error) {
                res.statusCode = 400;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error
                })

            }
        }
    }
}

const updateUser = async (req, res, next) => {

    if (req.method == "POST") {
        console.log(req.body);
        let name = req.body.name;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let file = req.file;
        let user_id = req.body.user_id;
        const schema = Joi.object().keys({
            name: Joi.string().max(100).required(),
            email: Joi.string().max(50).required(),
            mobile: Joi.string().max(12).required(),
            user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            user_id: req.body.user_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                let url="";
                console.log("file:"+file);
                if(file!=undefined){
                    console.log("file:"+file.path);
                    url=await uploadS3(file,"users/"+user_id,"user_profile.png");
                    console.log(url);
                }

                let usr_qry = `update  ${dbTable.users} SET ${user.name} ='${name}' , ${user.mobile} ='${mobile}',
                ${user.email} ='${email}' , ${user.profile} ='${url}' WHERE  ${user.id} ='${user_id}'`;
                let result = await executeQry(usr_qry);
                            
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "user profile not update",
                    })
                }else{
                    result = `SELECT * FROM ${dbTable.users} WHERE  ${user.id} ='${user_id}'`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "user profile update",
                        data: result[0]
                    })
                }
            } catch (error) {
                res.statusCode = 400;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error
                })

            }
        }
    }
}


const getUserProfile = async (req, res, next) => {
    if (req.method == "POST") {

        let user_id = req.body.user_id;
        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            user_id: req.body.user_id,
        }) 
        if(error){
            res.statusCode = 401;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try{
                usr_qry = `SELECT * FROM ${dbTable.users} where id='${user_id}'`;
                let result = await executeQry(usr_qry);
                res.statusCode = 200;
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No user found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: result
                    })
                }
            }catch(error){
                res.statusCode = 400;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error
                })
            }
        }
    }
}

module.exports = {
    signup: signup,
    login: login,
    getUserProfile:getUserProfile,
    checkUserExist:checkUserExist,
    updateUser:updateUser
}