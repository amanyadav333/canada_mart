
let loginValidation = function loginValidation(mobileNumber,email) {
    if(mobileNumber!=undefined){
        if(mobileNumber==""){
            if(email!=undefined){
                if(email!=""){
                    return "";
                }else{
                    return "email is required";
                }
            }else{
                return "Field is required";
            }
        }else{
            return "";
        }
    }else{
        return "Field is required";
    }
};

module.exports = {
    loginValidation:loginValidation
};
