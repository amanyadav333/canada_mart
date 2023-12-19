const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { user,bussiness,userManagement,typeService,taxInformation,products,dbTable } = require("../utils/constant");
const {uploadS3} = require("../connection/s3client");

const getDashBoardData = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        let result = '';
        let data = {};
        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
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
            try {
                usr_qry = `SELECT * FROM ${dbTable.category} WHERE ${category.isParentCategory}= '1'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["category"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} != '${user_id}' LIMIT 5`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["featured_product"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} != '${user_id}' ORDER BY RAND() LIMIT 30`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["category_product"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} != '${user_id}' AND ${products.isProduct} = '0' LIMIT 5`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["featured_services"]=result;
                }
                res.statusCode = 200;
                res.json({
                    status: true,
                    data: data
                })
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error
                })

            }
        }
    }
}

const getSellerDetail = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        let result = '';
        let data = {};
        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
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
            try {
                usr_qry = `SELECT * FROM ${dbTable.users} WHERE ${user.id}= '${user_id}'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["user"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.bussinessDetail} WHERE ${bussiness.userId} = '${user_id}'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["bussiness_detail"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.taxInformation} WHERE ${taxInformation.userId} = '${user_id}'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["tax_information"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.typeService} WHERE ${typeService.userId} = '${user_id}'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["type_service"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} = '${user_id}'`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["product"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} = '${user_id}' AND ${products.isProduct} = '0' LIMIT 5`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["services"]=result;
                }
                res.statusCode = 200;
                res.json({
                    status: true,
                    data: data
                })
            } catch (error) {
                res.statusCode = 401;
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
    getDashBoardData:getDashBoardData,
    getSellerDetail:getSellerDetail,
}