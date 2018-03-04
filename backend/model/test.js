var getname = (name)=>{
    if (name == "Tech City"){
        return "software tech Channel"
    }else{
        throw "Invalid name";
    }
}

module.exports.getname = getname;