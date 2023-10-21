
let loginValidation = function loginValidation(mobileNumber,email,isEmail) {
    if(isEmail!=undefined){
        if(isEmail=="true"){
            if(email!=undefined){
                if(email==""){
                    return "email is required";
                }else{
                    return "";
                }
            }else{
                return "email is required";
            }
        }else if(isEmail=="false"){
            if(mobileNumber!=undefined){
                if(mobileNumber==""){
                    return "mobile is required";
                }else{
                    return "";
                }
            }else{
                return "mobile is required";
            }
        }else{
            return "is_email is required";
        }
    }else{
        return "is_email is required";
    }
};

module.exports = {
    loginValidation:loginValidation
};
