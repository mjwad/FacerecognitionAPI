
const handleSignin=(req,res,db,bcrypt)=>{
    // bcrypt.compare(pass,hash,function (err,res){
    //     //res is true if pass===hash
    // })
    const {email,password}=req.body;
    if(!email||!password)
    {
        return res.status(404).json('Invalid form Submission')
    }
    db.select('email','hash').from('login')
        .where('email','=',email)
        .then(data=>{

            const isValid=  bcrypt.compareSync(password,data[0].hash);
            if(isValid)
            {

                db.select('*').from('users').where(
                    'email','=',email
                )
                    .then(user=>{
                        if(user) {
                            res.json(user[0])
                        }})
                    .catch(err=>res.status(404).json('Error Signing In'))
            }else{
                res.status(404).json('Email or Password Inavlid')
            }
        }).catch(err=>res.status(404).json('Error Signing In'))
    // res.status(404).json('error signin')


}
module.exports={
    handleSignin:handleSignin
}