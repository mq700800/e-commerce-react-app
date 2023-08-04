const bcrypt =  require('bcryptjs');
 
const Users =[
    {
        name:"admin",
        email:"admin@admin.com",
        password:bcrypt.hashSync("123456",10),
        isAmin:true
    },
    {
        name:"qasim",
        email:"qassim12@gmail.com",
        password:bcrypt.hashSync("123456",10),
        isAmin:true
    },
    {
        name:"ali",
        email:"ali1@gmail.com",
        password:bcrypt.hashSync("123456",10),
        isAmin:true
    }
    
];

module.exports= Users;