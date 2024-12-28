import express from 'express';
import { UserToOrganisation, Organisation } from '../db/index.js';

const OrgRouter = express.Router();

OrgRouter.get('/organizations-by-tags', async (req, res) => {
  console.log("this is being hit");
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

OrgRouter.get('/search-organisations/:name', async (req, res) => {
      try {
        const { name } = req.params;
    
        if (!name) {
          return res.status(400).json({ message: 'Organization name is required.' });
        }
    
        const similarOrgs = await Organisation.find({
          name: { $regex: name, $options: 'i' }, 
        }).select('name'); 
    
        res.status(200).json(similarOrgs);
      } catch (error) {
        console.error('Error fetching similar organizations:', error);
        res.status(500).json({ message: 'Server error', error });
      }
 });


export default OrgRouter;
