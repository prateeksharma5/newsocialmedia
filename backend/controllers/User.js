const { findOne } = require("../models/User");
const User=require("../models/User");

exports.register=async(req,res)=>{

    try{
        const {name,email,password}=req.body;
        let user =await User.findOne({email});
        if(user){ return res.status(400).json({success:false,
            message:"user already exists"});
        }
        user= await User.create({name,
            email,
            password,
            avatar:{public_id:"sample_id",url:"sample_url"}});

            res.status(201).json({success:true,user});

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};

exports.login= async(req,res)=>{
    try{
        const { email, password }=req.body;
        
        const user= await findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exists"
            });
        }

        const isMatch= await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
            success:false,
            message:"Incorrect password"
        });
    }

    const token = await user.generateToken();

    res.status(200).cookie("token",token).json({

        success:true,
        user,

    });

}catch(error){

    res.status(500).json({
        success:false,
        message:error.message,
    })

}
}
