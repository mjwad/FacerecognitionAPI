
const handleRegister=(req,res,db,bcrypt)=>{
    const {email,name,password}=req.body;
    if(!email||!name||!password)
    {
        return res.status(404).json('Invalid form Submission')
    }
    const hash=bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert
        ({
            hash:hash,
            email:email,

        })
            .into('login')
            .returning('email')
            .then(loginemail=>{
                return trx('users')
                    .returning('*')
                    .insert({
                        email:loginemail[0].email,
                        name:name,
                        joined:new Date()
                    })
                    .then(user=> res.json(user[0])
                    )
                    .catch(err=>res.status(404).json('unable to register'))

            }).then(trx.commit)
            .catch(trx.rollback)
    })

}
module.exports={
    handleRegister:handleRegister
}