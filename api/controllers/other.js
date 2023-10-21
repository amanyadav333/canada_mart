
const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { enquiry,user,dbTable } = require("../utils/constant");
const TWILIO_ACCOUNT_SID = 'AC4cdd5d0b13fd0256fc64a2ddf51c7be3';
const twilioAccountToken = '4bfc76feb56eca8c740ed953a7a19769';
const {uploadS3} = require("../connection/s3client");
var AWS = require('aws-sdk');
let config={
    accessKeyId: 'AKIA3E4KF3SX3PUOTEN4',
    secretAccessKey: '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',
    region: 'ap-south-1'
  };

const ses = new AWS.SES(config); 


const sentEmailOTP = async (req, res, next) => {
    const params = {
        Source: "qpqconnect@gmail.com",
        Destination: {
          ToAddresses: [
             "amanyadavlogan@gmail.com"
          ]
        },
        Message:{
            Body:{
                Text:{
                    Charset:"UTF-8",
                    Data:"Hello"
                }
            },
            Subject:{
                Charset:"UTF-8",
                Data:"Hii"
            }
        }
      }
    try{
        let tmp=await ses.sendEmail(params).promise();
        console.log("email sent");
    }catch(e){
        console.log(e);
    }   
   
}

const userEnquiry = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        let name = req.body.name;
        let description = req.body.description;
        let mobile = req.body.mobile;
        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(50).required(),
            description: Joi.string().max(255).required(),
            mobile: Joi.string().max(12).required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            description: req.body.description,
            mobile: req.body.mobile,
        });
        if(error){
            res.statusCode = 401;
            res.json({
                status: "false",
                message: error.details[0].message
            })
        }else{
           try{
                // check user exists or not
                if(user_id==undefined || user_id==""){
                    result = `SELECT * FROM ${dbTable.users} WHERE ${user.mobile}= '${mobile}'`;
                    result = await executeQry(result);
                    if(result.length!=0){
                        user_id=result[0].id;
                    }
                }

                // add enquiry
                result =`INSERT INTO ${dbTable.enquiry} (${enquiry.name},${enquiry.description},${enquiry.mobile},${enquiry.userId})
                    values('${name}','${description}', '${mobile}', '${user_id}')`;

                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: "true",
                    message: "enquiry registered successfully"
                })
           }catch (error) {
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

const uploadFile = async (req, res, next) => {
    if (req.method == "POST") {
        let file = req.file;
        let user_id = req.body.user_id;
        let result = '';
        const schema = Joi.object().keys({
            user_id: Joi.string().max(50).required(),
        });
        const { error, value } = schema.validate({
            user_id: req.body.user_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            let url="";
            if(file!=undefined){
                var dateTime = new Date();
                url=await uploadS3(file,"users/"+user_id,"image-"+dateTime.getMilliseconds());
                console.log(url);
                res.statusCode = 200;
                res.json({
                    status: true,
                    data:{
                        "url":url
                    }
                }) 
            }else{
                res.statusCode = 201;
                res.json({
                    status: false,
                    message: "File is empty"
                }) 
            }
        }
    }
}


module.exports = {
    userEnquiry: userEnquiry,
    sentEmailOTP:sentEmailOTP,
    uploadFile:uploadFile
}