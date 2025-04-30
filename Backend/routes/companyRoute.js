// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Get all universities with their average scores and student counts
// router.get('/universities', async (req, res) => {
//   try {
//     const universities = await User.aggregate([
//       {
//         $match: {
//           $or: [
//             { eqScores: { $exists: true, $not: { $size: 0 } }},
//             { iqScores: { $exists: true, $not: { $size: 0 }} },
//             { technicalScores: { $exists: true, $not: { $size: 0 } }}
//           ]
//         }
//       },
//       {
//         $project: {
//           university: 1,
//           eqMax: { $max: "$eqScores.score" },
//           iqMax: { $max: "$iqScores.score" },
//           techMax: { $max: "$technicalScores.score" }
//         }
//       },
//       {
//         $project: {
//           university: 1,
//           totalScore: {
//             $sum: [
//               { $ifNull: ["$eqMax", 0] },
//               { $ifNull: ["$iqMax", 0] },
//               { $ifNull: ["$techMax", 0] }
//             ]
//           }
//         }
//       },
//       {
//         $group: {
//           _id: "$university",
//           averageScore: { $avg: "$totalScore" },
//           totalStudents: { $sum: 1 }
//         }
//       },
//       {
//         $addFields: {
//           averagePercentage: {
//             $round: [
//               { $multiply: [
//                 { $divide: ["$averageScore", 194] }, // 132(EQ) + 12(IQ) + 50(Technical)
//                 100
//               ]},
//               0
//             ]
//           }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           name: "$_id",
//           score: "$averagePercentage",
//           students: "$totalStudents"
//         }
//       },
//       { $sort: { score: -1 } }
//     ]);

//     res.json(universities);
//   } catch (error) {
//     console.error('Error fetching universities:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get top students for a specific university
// router.get('/students/:university', async (req, res) => {
//   try {
//     const students = await User.aggregate([
//       { $match: { university: req.params.university } },
//       {
//         $project: {
//           name: "$username",
//           email: 1,
//           field: "$technicalField",
//           eqMax: { $max: "$eqScores.score" },
//           iqMax: { $max: "$iqScores.score" },
//           techMax: { $max: "$technicalScores.score" }
//         }
//       },
//       {
//         $project: {
//           name: 1,
//           email: 1,
//           field: 1,
//           score: {
//             obtained: {
//               $sum: [
//                 { $ifNull: ["$eqMax", 0] },
//                 { $ifNull: ["$iqMax", 0] },
//                 { $ifNull: ["$techMax", 0] }
//               ]
//             },
//             total: 194
//           }
//         }
//       },
//       { $sort: { "score.obtained": -1 } }
//     ]);

//     res.json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all universities with their average scores and student counts (only users with all three scores)
router.get('/universities', async (req, res) => {
  try {
    const universities = await User.aggregate([
      {
        $match: {
          $and: [ // Changed from $or to $and to require all three scores
            { eqScores: { $exists: true, $not: { $size: 0 } } },
            { iqScores: { $exists: true, $not: { $size: 0 } } },
            { technicalScores: { $exists: true, $not: { $size: 0 } } }
          ]
        }
      },
      {
        $project: {
          university: 1,
          eqMax: { $max: "$eqScores.score" },
          iqMax: { $max: "$iqScores.score" },
          techMax: { $max: "$technicalScores.score" }
        }
      },
      {
        $project: {
          university: 1,
          totalScore: {
            $sum: [
              { $ifNull: ["$eqMax", 0] },
              { $ifNull: ["$iqMax", 0] },
              { $ifNull: ["$techMax", 0] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$university",
          averageScore: { $avg: "$totalScore" },
          totalStudents: { $sum: 1 }
        }
      },
      {
        $addFields: {
          averagePercentage: {
            $round: [
              { $multiply: [
                { $divide: ["$averageScore", 194] },
                100
              ]},
              0
            ]
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          score: "$averagePercentage",
          students: "$totalStudents"
        }
      },
      { $sort: { score: -1 } }
    ]);

    res.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top students for a specific university (only those with all three scores)
router.get('/students/:university', async (req, res) => {
  try {
    const students = await User.aggregate([
      { 
        $match: { 
          university: req.params.university,
          // Require all three scores to exist and be non-empty
          eqScores: { $exists: true, $not: { $size: 0 } },
          iqScores: { $exists: true, $not: { $size: 0 } },
          technicalScores: { $exists: true, $not: { $size: 0 } }
        } 
      },
      {
        $project: {
          name: "$username",
          email: 1,
          field: "$technicalField",
          eqMax: { $max: "$eqScores.score" },
          iqMax: { $max: "$iqScores.score" },
          techMax: { $max: "$technicalScores.score" }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          field: 1,
          score: {
            obtained: {
              $sum: [
                { $ifNull: ["$eqMax", 0] },
                { $ifNull: ["$iqMax", 0] },
                { $ifNull: ["$techMax", 0] }
              ]
            },
            total: 194
          }
        }
      },
      { $sort: { "score.obtained": -1 } }
    ]);

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;