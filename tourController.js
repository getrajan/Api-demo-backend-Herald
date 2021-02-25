
const Tour = require('./tourModel');

exports.createTour = (req,res,next)=>{

    const {title,description,coverPhoto} = req.body;

    if(!title || !description || !coverPhoto){
        return res.status(400).json({
            status:"Failed",
            message:"Required field can't be empty"
        });   
    }

    const tour = new Tour({
        title:title,
        description:description,
        coverPhoto:coverPhoto
    });

    tour.save().then((data)=>{
        res.status(201).json({
            status:"Success",
            message:"Tour created successfully",
            data
        });
    }).catch((err)=>{
        if(err.code==11000){
            res.status(409).json({
                status:"failed",
                message:"Duplication Error"
            });
        }
        else{
            res.status(500).json({
                status:"failed",
                message:err.message || "Some error occured",
                err
            });
        }
    });
}

exports.getTour = (req,res) =>{
    const id = req.body.id;
    console.log(`***** ${id}`)
    Tour.findById(id,function(err,tour){
        if(err){
            res.status(200).json({
                status:"failed",
                message:"Tour get failed",
                err,
            });
        }else{
            res.status(200).json({
                status:"success",
                message:"Tour get successfully",
                tour,
            });
        }
    });
}

exports.getTours = (req,res)=>{
    Tour.find().then((tours)=>{
        res.status(200).json({
            status:"success",
            message:"All tours get successfully",
            tours
        });
    }).catch(error=>{
        res.status(400).json({
            status:"failed",
            message:"Get tours failed",
            error
        });
    });
}

exports.deleteTour = (req,res)=>{
    Tour.findByIdAndDelete(req.body.id,function(err){
        if(err){
            res.status(400).json({
                status:"success",
                message:"Can't delete tour",
                err
            });
        }
        res.status(204).json({
            status:"success",
            message:"This tour deleted successfully"
        });
    });
}

exports.updateTour = async (req, res) => {
    try {
      const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: 'success',
        data: { updatedTour },
      });
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err,
      });
    }
  };