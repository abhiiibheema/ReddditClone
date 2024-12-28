const express = require('express');
const { Organisation } = require('../db/index'); 

const router = express.Router();


router.get('/organizations-by-tags', async (req, res) => {
  try {
    const groupedOrgs = await Organisation.aggregate([
      { $unwind: "$tagsOrg" },
      { 
        $group: {
          _id: "$tagsOrg", 
          organizations: { $push: "$$ROOT" } 
        }
      },
      { $sort: { _id: 1 } } 
    ]);

    res.status(200).json(groupedOrgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
