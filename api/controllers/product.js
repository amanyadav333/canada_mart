const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,products,dbTable } = require("../utils/constant");

const getAllProducts = async (req, res, next) => {
    if (req.method == "GET") {
        try{
            usr_qry = `SELECT * FROM ${dbTable.products}`;
            let result = await executeQry(usr_qry);
            res.statusCode = 200;
            if(result.length==0){
                res.statusCode = 201;
                res.json({
                    status: "false",
                    message: "No products found"
                })
            }else{
                res.statusCode = 200;
                res.json({
                    status: "true",
                    data: result
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
    }
}

module.exports = {
    getAllProducts: getAllProducts,
}