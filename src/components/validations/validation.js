

const NumberValidation =(value,length)=>{
    let num = value.replace(".", '');
    
    if(isNaN(num)){
        // Its not a number
    }else{
      return num;
    }
}

const validateEmail = (userEmail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(userEmail).toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

export default{
    NumberValidation,
    validateEmail
}