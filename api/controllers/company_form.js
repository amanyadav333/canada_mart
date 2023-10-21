const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { bussiness,taxInformation,typeService,user,dbTable } = require("../utils/constant");
const {uploadS3} = require("../connection/s3client");

const addTaxInformation = async (req, res, next) => {
    if (req.method == "POST") {
        let business_number = req.body.business_number;
        let issued_date = req.body.issued_date;
        let user_id = req.body.user_id;
    
        let result = '';
        const schema = Joi.object().keys({
            business_number: Joi.string().allow('').max(30).required(),
            issued_date: Joi.string().allow('').max(30).required(),
            user_id: Joi.string().max(50).required(),
        });
        const { error, value } = schema.validate({
            business_number: req.body.business_number,
            issued_date: req.body.issued_date,
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
                let usr_qry = `SELECT * FROM ${dbTable.taxInformation} WHERE ${taxInformation.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    result =`INSERT INTO ${dbTable.taxInformation} (${taxInformation.businessNumber},${taxInformation.issuedDate},${taxInformation.userId})
                        values('${business_number}','${issued_date}', '${user_id}')`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Tax Information add successfully"
                    })   
                }else{
                    let usr_qry = `update  ${dbTable.taxInformation} SET ${taxInformation.businessNumber} ='${business_number}' , ${taxInformation.issuedDate} ='${issued_date}'
                    WHERE  ${taxInformation.userId} ='${user_id}'`;
                    let result = await executeQry(usr_qry);

                    if(result.length==0){
                        res.statusCode = 201;
                        res.json({
                            status: false,
                            message: "Tax Information not update",
                        })
                    }else{
                        res.statusCode = 200;
                        res.json({
                            status: true,
                            message: "Tax Information update",
                            data: result[0]
                        })
                    }
                }
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error.message
                })

            }
        }
    }
}

const addTypeService = async (req, res, next) => {
    if (req.method == "POST") {
        let business_type = req.body.business_type;
        let payment_type = req.body.payment_type;
        let start_week = req.body.start_week;
        let end_week = req.body.end_week;
        let start_time = req.body.start_time;
        let exclude_city = req.body.exclude_city;
        let end_time = req.body.end_time;
        let include_city = req.body.include_city;
        let description = req.body.description;
        let user_id = req.body.user_id;
        

        let result = '';
        const schema = Joi.object().keys({
            business_type: Joi.string().max(30).required(),
            payment_type: Joi.string().max(30).required(),
            start_week: Joi.string().max(30).required(),
            end_week: Joi.string().max(30).required(),
            end_time: Joi.string().max(30).required(),
            start_time: Joi.string().max(30).required(),
            // exclude_city: Joi.string().max(200).required(),
            // include_city: Joi.string().max(200).required(),
            // description: Joi.string().max(500).required(),
            user_id: Joi.string().max(50).required(),
        });
        const { error, value } = schema.validate({
            business_type: req.body.business_type,
            payment_type: req.body.payment_type,
            start_week: req.body.start_week,
            end_week: req.body.end_week,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            // exclude_city: req.body.exclude_city,
            // include_city: req.body.include_city,
            // description: req.body.description,
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
                let usr_qry = `SELECT * FROM ${dbTable.typeService} WHERE ${typeService.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    result =`INSERT INTO ${dbTable.typeService} (${typeService.businessType},${typeService.paymentType},${typeService.startWeek},
                        ${typeService.endWeek},${typeService.startTime},${typeService.endTime},${typeService.excludeCity},${typeService.includeCity},${typeService.description},${typeService.userId})
                        values('${business_type}','${payment_type}', '${start_week}', '${end_week}','${start_time}','${end_time}', 
                        '${exclude_city}','${include_city}','${description}','${user_id}')`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Type and Services add successfully"
                    })   
                }else{
                    let usr_qry = `update  ${dbTable.typeService} SET ${typeService.businessType} ='${business_type}' , ${typeService.paymentType} ='${payment_type}',
                    ${typeService.startTime} ='${start_time}' , ${typeService.startWeek} ='${start_week}'  , ${typeService.endTime} ='${end_time}'  , ${typeService.endWeek} ='${end_week}' 
                    , ${typeService.excludeCity} ='${exclude_city}'  , ${typeService.includeCity} ='${include_city}'  , ${typeService.description} ='${description}' 
                    WHERE  ${typeService.userId} ='${user_id}'`;
                    let result = await executeQry(usr_qry);

                    if(result.length==0){
                        res.statusCode = 201;
                        res.json({
                            status: false,
                            message: "Type and Services not update",
                        })
                    }else{
                        res.statusCode = 200;
                        res.json({
                            status: true,
                            message: "Type and Services update",
                            data: result[0]
                        })
                    }
                }
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error.message
                })

            }
        }
    }
}


const addBusinessDetail = async (req, res, next) => {
    if (req.method == "POST") {
        let company_name = req.body.company_name;
        let mobile = req.body.mobile;
        let address = req.body.address;
        let country = req.body.country;
        let state = req.body.state;
        let city = req.body.city;
        let logo = req.body.logo;
        let images = req.body.images;
        let user_id = req.body.user_id;
        

        let result = '';
        const schema = Joi.object().keys({
            company_name: Joi.string().max(50).required(),
            mobile: Joi.string().max(15).required(),
            address: Joi.string().max(500).required(),
            country: Joi.string().max(50).required(),
            user_id: Joi.string().max(50).required(),
        });
        const { error, value } = schema.validate({
            company_name: req.body.company_name,
            mobile: req.body.mobile,
            address: req.body.address,
            country: req.body.country,
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
                console.log('*******'+images);   
                var dateTime = new Date();
                let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];
                let usr_qry = `SELECT * FROM ${dbTable.bussinessDetail} WHERE ${bussiness.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    result =`INSERT INTO ${dbTable.bussinessDetail} (${bussiness.companyName},${bussiness.mobile},${bussiness.address},
                        ${bussiness.country},${bussiness.state},${bussiness.city},${bussiness.userId},${bussiness.created},${bussiness.logo},${bussiness.image})
                        values('${company_name}','${mobile}', '${address}', '${country}','${state}','${city}', 
                        '${user_id}','${date}','${logo}','${images}')`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Business Detail add successfully"
                    })   
                }else{
                    
                }
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error.message
                })

            }
        }
    }
}

const getCompanyUserList = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        const scheme = Joi.object().keys({user_id: Joi.string().max(20).required()});
        const { error, value } = scheme.validate({user_id: req.body.user_id,})
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message:"user_id is required",
            });
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.users} WHERE ${user.parentUserID}= '${user_id}'`;
                let result = await executeQry(usr_qry);
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
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error
                })
            }
        }
    }
}

const getCompanyBusinessDetail = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        const scheme = Joi.object().keys({user_id: Joi.string().max(20).required()});
        const { error, value } = scheme.validate({user_id: req.body.user_id,})
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message:"user_id is required",
            });
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.bussinessDetail} WHERE ${bussiness.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No business detail found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: result[0]
                    })
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
}

const getCompanyTypeService = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        const scheme = Joi.object().keys({user_id: Joi.string().max(20).required()});
        const { error, value } = scheme.validate({user_id: req.body.user_id,})
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message:"user_id is required",
            });
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.typeService} WHERE ${typeService.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No Type Service found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: result[0]
                    })
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
}


const getCompanyTaxInformation = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        const scheme = Joi.object().keys({user_id: Joi.string().max(20).required()});
        const { error, value } = scheme.validate({user_id: req.body.user_id,})
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message:"user_id is required",
            });
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.taxInformation} WHERE ${taxInformation.userId}= '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No Tax Information found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: result[0]
                    })
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
}

module.exports = {
    addBusinessDetail: addBusinessDetail,
    getCompanyUserList:getCompanyUserList,
    getCompanyBusinessDetail:getCompanyBusinessDetail,
    getCompanyTypeService:getCompanyTypeService,
    addTypeService:addTypeService,
    addTaxInformation:addTaxInformation,
    getCompanyTaxInformation:getCompanyTaxInformation
}