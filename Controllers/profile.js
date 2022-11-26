const handleProfileGet=(req,res)=>{
    const {id}=req.params;
    db.select('*').from('users').where({
        id:id
    })
        .then(users=>{
            if(users.length)
            {
                res.json(users[0])}else
            {
                res.status(404).json('Not found')
            }
        }).catch(err=>res.status(404).json('Error getting User')
    )
}
module.exports={
    handleProfileGet:handleProfileGet
}