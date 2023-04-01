const Bid =require('../models/bid');

exports.getAllBids = async () => {

    return await Bid.find();
  };
   
  exports.createBid = async (Bid) => {
    
    return await Bid.create(Bid);
  };
  exports.getBidByItem = async (item) => {
    
    return await Bid.find(item);
  };
   
  exports.updateBid = async (item, Bid) => {
    return await Bid.findOneAndUpdate(item, Bid, {upsert:true,new:true,runValidators:true},(err, bid)=>{
        if(error){ console.log(error)} else {console.log(bid)}
    });
  };
   
  exports.deleteBid = async (item) => {
    return await Bid.findByIdAndDelete(item);
  };