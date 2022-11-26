const fetch=require('node-fetch')
const raw =(val)=>JSON.stringify({
    "user_app_id": {
        "user_id": "jawad",
        "app_id": "facerecognition"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url":val
                }
            }
        }
    ]
})
const fetchImageApi=(req,res)=>{
    console.log(req.body.input)
    const   requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + '6645e806e7444b35a3802aae89132209'

        },
        body: raw(req.body.input)
    };
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            res.json(data)})
        .catch(err=>res.state(404).json('error fetching results'))
}
const imagehandle=(req,res,db)=>
{
    const {id}=req.body;
    db('users').where('id','=',id)
        // .update()
        .increment('entries',1)
        .returning('entries')
        .then(entries=>{

            res.json(entries[0])
        }).catch(err=>res.status(404).json('Unable to get Entries'))
    // if(!found)
    // {
    //     res.status(404).json('Not found')
    // }
}
module.exports={
    imagehandle:imagehandle,
    fetchImageApi:fetchImageApi
}