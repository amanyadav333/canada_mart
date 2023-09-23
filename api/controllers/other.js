
const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { enquiry,user,dbTable } = require("../utils/constant");
const TWILIO_ACCOUNT_SID = 'AC4cdd5d0b13fd0256fc64a2ddf51c7be3';
const twilioAccountToken = '4bfc76feb56eca8c740ed953a7a19769';
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(TWILIO_ACCOUNT_SID, twilioAccountToken);

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

const sentOTP = async (req, res, next) => {
    if (req.method == "POST") {
        let message = req.body.message;
        let mobile = req.body.mobile;
        let result = '';
        const schema = Joi.object().keys({
            message: Joi.string().required(),
            mobile: Joi.string().max(12).required(),
        });
        const { error, value } = schema.validate({
            message: req.body.message,
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
                const message = await client.messages.create({
                    body: 'Hello from Node',
                    to: '+916266991143',
                    from: '+918085734561',
                });
                console.log(message);
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

module.exports = {
    userEnquiry: userEnquiry,
    sentOTP:sentOTP,
}