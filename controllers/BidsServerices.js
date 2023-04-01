const Bids =require('./bids')
exports.getAllBids = async (req, res) => {
    try {
      const bids = await Bids.getAllBids();
      res.json({ data: bids, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.createBid = async (req, res) => {
    try {
      const blog = await Bids.createBid(req.body);
      res.json({ data: blog, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.getBidByItem = async (req, res) => {
    try {
      const blog = await Bids.getBidByItem(req.params.item);
      res.json({ data: blog, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.updateBid = async (req, res) => {
    try {
      const blog = await Bids.updateBid(req.params.item, req.body);
      res.json({ data: blog, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.deleteBid = async (req, res) => {
    try {
      const blog = await Bids.deleteBid(req.params.id);
      res.json({ data: blog, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.buyBid = async (req, res) => {
    try {
        const bid = req.body.bid;

        const PreviousBid =Bids.getBidByItem(req.body.item).lean();
        if (bid <= PreviousBid.price){
        return res.json({'bid':'increase your bid'})
        }
        
          if(req.body.id <= 30){
            const bid = await Bids.updateBid(req.params.item, req.body);
            return res.json({ data: bid, status: "success" });
          }
          else{
            return res.status(200).json({"payment":"mpesa 07 XXXXXXXX or paybill XXXXXX"})

          }
        
           
           
        
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };