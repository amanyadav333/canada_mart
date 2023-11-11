const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { messageTable,dbTable } = require("../utils/constant");

const sentMessage = async (req, res, next) => {
    if (req.method == "POST") {
        let message = req.body.message;
        let sent_user_id = req.body.sent_user_id;
        let reciver_user_id = req.body.reciver_user_id;
        

        let result = '';
        const schema = Joi.object().keys({
            message: Joi.string().max(500).required(),
            sent_user_id: Joi.string().required(),
            reciver_user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            message: req.body.message,
            sent_user_id: req.body.sent_user_id,
            reciver_user_id: req.body.reciver_user_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                var dateTime = new Date();
                let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];
                result =`INSERT INTO ${dbTable.message} (${messageTable.message},${messageTable.sentUserId},${messageTable.reciverUserId},
                    ${messageTable.createdAt})
                    values('${message}','${sent_user_id}', '${reciver_user_id}', '${date}')`;
                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "successfully"
                })   
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error.message
                })

            }
        }
    }
}

const getMessage = async (req, res, next) => {
    if (req.method == "POST") {
        let sent_user_id = req.body.sent_user_id;
        let reciver_user_id = req.body.reciver_user_id;
        

        let result = '';
        const schema = Joi.object().keys({
            sent_user_id: Joi.string().required(),
            reciver_user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            sent_user_id: req.body.sent_user_id,
            reciver_user_id: req.body.reciver_user_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                usr_qry = `SELECT * FROM ${dbTable.message} WHERE ${messageTable.sentUserId} = '${sent_user_id}' AND ${messageTable.reciverUserId} = '${reciver_user_id}' OR 
                            ${messageTable.sentUserId} = '${reciver_user_id}' AND ${messageTable.reciverUserId} = '${sent_user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No chat found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: {data:result}
                    })
                }
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error.message
                })

            }
        }
    }
}

module.exports = {
    sentMessage: sentMessage,
    getMessage:getMessage
}
