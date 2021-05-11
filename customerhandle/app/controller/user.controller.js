const sequelize = require('../config/DbConfig');
const Customer  = require('../model/customer.model.js');
const constants = require('../constants/constant.js');
const Order = require('../model/order.model.js');
const Admin = require('../model/admin.model');

exports.userRegister = (request,response) => {
    console.log("here");
    let params = request.body;
    if ( !params.email && checkEmptyString(params.email)) {
        return response.status(400).send({status: "400" , message: constants.Incomplete_information });
    }else{
        let customerObject = manageCustomerObject(params,undefined);
        Customer.create(customerObject, {

        }).then(async user => {
            if( user ) {
                return response.status(200).send({ status:"200", message: constants.user_created });
            }else{
                return response.status(400).send({ status:"400", message: constants.user_not_created });
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

exports.userLogin = (request,response) => {
    let params = request.body;
    if(!params.email && checkEmptyString(params.email) && !params.password && checkEmptyString(params.password)){
        return response.status(400).send({status: "400" , message: constants.Incomplete_information });
    }else{
        Customer.findOne({
            where : {
                email : params.email,
                password : params.password
            }
        }).then(async user => {
            if (user){
                return response.status(200).send({ 
                    status: "200", 
                    message : constants.success,
                    user : user
                });
            }else{
                return response.status(400).send({status: "400" , message: "username or password wrong"});
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

exports.orderPlaced = (request,response) => {
    let params = request.body;
    if(!params.orderItems && checkEmptyString(orderItems)){
        return response.status(400).send({status: "400", message: "Incomplete Data"});
    }else{
        Customer.findOne({
            where : { email: params.email }
        }).then(async user => {
            if( user ) {
                let customerOrderItem = customerManageObejct(params,user);
                
                Order.create(customerOrderItem ,{
                }).then(async customer => {
                    if( customer ) {
                        return response.status(200).send({ status:"200", message: "order placed" });
                    }else{
                        return response.status(400).send({ status:"400", message: "order not placed" });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }
}

exports.orderUpdate = (request,response) => {
    let params = request.body;
    console.log(params.id);
    console.log(params.orderItems);
    if(!params.id && checkEmptyString(params.id)){
        return response.status("400").send({status: "400" , message: constants.Incomplete_information});
    }else{
        Order.update(
            { orderItems: params.orderItems},
            { where: {id: params.id}
        }).then(async updateOrder => {
            if ( updateOrder ) {
                return response.status("200").send({status: "200" , message: "order updated"});
            }else{
                return response.status("400").send({status: "400" , message: "order not updated"});
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

exports.adminRegister = (request,response) => {
    let params = request.body;
    if(!params.email && checkEmptyString(params.email)){
        return response.status("400").send({status: "400" , message: constants.Incomplete_information});
    }else{
        let adminObject = adminManageObejct(params);
        Admin.create(adminObject, {
        }).then(async admin => {
            if(admin){
                return response.status("200").send({status: "200" , message: "admin created"});
            }else{
                return response.status("200").send({status: "200" , message: "admin not created"});
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

exports.adminOrder = (request,response) => {
    let params = request.body;
    if(!params.email && checkEmptyString(params.email)){
        return response.status("400").send({status: "400" , message: constants.Incomplete_information});
    }else{
        Admin.findOne({
            where: {email: params.email,password: params.password}
        }).then(async admin => {
            if(admin){
                Order.findAll({
                }).then(async adminDet => {
                    if(adminDet){
                        return response.status(200).send({ 
                            status: "200", 
                            message : constants.success,
                            user : adminDet
                        });
                    }
                }).catch(error => {
                    console.log(error);
                })
            }else{
                return response.status(400).send({ 
                    status: "400", 
                    message : "invalid email or password"
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function adminManageObejct(params){
    var { email, password, name, phone} = params;
    //register admin
    let adminObject;
    adminObject = {
        name: name,
        email: email,
        password: password,
        phone: phone    
    }
    return adminObject;
}

function customerManageObejct(params,user){
    var { orderItems } = params;
    let customerOjectItem;
    customerOjectItem = {
        customerId: user.id,
        orderItems : orderItems
    }
    return customerOjectItem;
}

function manageCustomerObject(params,user){
    var { email, password, firstname, lastname, mobile_number} = params;
    var name;
    //register customer
    name = `${firstname} ${lastname}`;
    let userObject;
    userObject = {
        name: name,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        mobile_number: mobile_number    
    }
    return userObject;
}

function checkEmptyString(field)
{
    if( field.toString().replace(/\s/g, "") === "" ){
        return true;
    } 
    else {
        return false;
    }
}
