const router = require ("express").Router();
const blogs = require("../models/blog")

router.post("/create", async( req,res) => {
    try{
     const {title,desc} = req.body;
     const newblog = new blogs({title,desc});
    await newblog.save()
     .then(() => res.status(200).json({message:"blog create sucessful"}));
    
    }catch (error) {
       
       res.status(400).json({ message: "some error" });
   }
   });
   router.get("/getallblog", async( req,res) => {
    try{
    const data = await blogs.find().sort({createdAt:-1});
    res.status(200).json({ data: data });
    }catch (error) {
     res.status(400).json({ message: "some error" });
   }
   });
   router.get("/getrecentblogs", async( req,res) => {
    try{
    const data = await blogs.find().sort({createdAt:-1}).limit(3);
    res.status(200).json({ data: data });
    }catch (error) {
     res.status(400).json({ message: "some error" });
   }
   });
   router.get("/getblogs/:id", async( req,res) => {
    try{
   const {id}= req.params;
   const data = await blogs.findById(id);
   res.status(200).json({ data: data });
    }catch (error) {
     res.status(400).json({ message: "some error" });
   }
   });
   router.put("/updateblog/:id", async( req,res) => {
    try{
   const {id}= req.params;
   const {title,desc} = req.body;
    await blogs.findByIdAndUpdate(id, {title,desc});
   res.status(200).json({ message: "update blog" });
    }catch (error) {
     res.status(400).json({ message: "some error" });
   }
   });
module.exports = router;