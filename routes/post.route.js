const express = require("express")
const jwt = require("jsonwebtoken");
const PostModel = require("../model/post.model");
const { post } = require("./user.route");
const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    let token = req.headers.authorization;
    let querry = req.body;
    if (querry.device) {
        try {
            const decode = jwt.verify(token, process.env.key)
            if (decode) {
                const userId = decode.userId;
                const data = await PostModel.find({ userId: userId })
                let filteredData = data.filter((e) => {
                    return e.device === querry.device
                });
                res.send({ Data: filteredData });
            } else {
                res.send({ Data: [] })
            }
        } catch (e) {
            res.send(e)
        }
    } else {
        try {
            const decode = jwt.verify(token, process.env.key)
            if (decode) {
                const userId = decode.userId;
                const data = await PostModel.find({ userId: userId })
                res.send({ Data: data });
            } else {
                res.send({ Data: [] })
            }
        } catch (e) {
            res.send(e)
        }
    }
})

postRouter.post("/add", async(req,res)=>{
    const payload=req.body
    try{
        const newPost = new PostModel(payload);
        await newPost.save()
        res.send({msg:"Post Saved", New_Post:newPost})
    }catch(e){
        res.send({"msg":e.message})
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    const payload=req.body
    const id=req.params.id;
    try{
        await PostModel.findByIdAndUpdate(id,{...payload});
        let UpdatePost = await PostModel.findById(id)
        res.send({msg:"Post Updated", Updated_Post:UpdatePost})
    }catch(e){
        res.send({"msg":e.message})
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    const id=req.params.id;
    try{
        await PostModel.findByIdAndDelete(id);
        res.send({msg:"Post Deleted"})
    }catch(e){
        res.send({"msg":e.message})
    }
})


module.exports=postRouter