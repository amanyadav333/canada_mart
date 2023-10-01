
let loginValidation = function loginValidation(mobileNumber,email) {
    if(mobileNumber!=undefined){
        if(mobileNumber==""){
            return "mobile is required";
        }else{
            return "";
        }
    }else if(email!=undefined){
        if(email==""){
            return "email is required";
        }else{
            return "";
        }
    }else{
        return "mobile or email is required";
    }
};

module.exports = {
    loginValidation:loginValidation
};
