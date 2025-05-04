// const PDFDocument = require('pdfkit-table');
// const nodemailer = require('nodemailer');
// const User = require('../models/user');

// // PDF Configuration
// const createPDFDocument = () => {
//   return new PDFDocument({ 
//     margin: 30, 
//     size: 'A4',
//     bufferPages: true
//   });
// };

// // Data Aggregation
// const getUniversityData = async () => {
//   return User.aggregate([
//     {
//       $match: {
//         $and: [
//           { eqScores: { $exists: true, $not: { $size: 0 } } },
//           { iqScores: { $exists: true, $not: { $size: 0 } } },
//           { technicalScores: { $exists: true, $not: { $size: 0 } } }
//         ]
//       }
//     },
//     {
//       $project: {
//         university: 1,
//         eqMax: { $max: "$eqScores.score" },
//         iqMax: { $max: "$iqScores.score" },
//         techMax: { $max: "$technicalScores.score" }
//       }
//     },
//     {
//       $project: {
//         university: 1,
//         totalScore: {
//           $sum: [
//             { $ifNull: ["$eqMax", 0] },
//             { $ifNull: ["$iqMax", 0] },
//             { $ifNull: ["$techMax", 0] }
//           ]
//         }
//       }
//     },
//     {
//       $group: {
//         _id: "$university",
//         averageScore: { $avg: "$totalScore" },
//         totalStudents: { $sum: 1 }
//       }
//     },
//     {
//       $addFields: {
//         averagePercentage: {
//           $round: [
//             { $multiply: [
//               { $divide: ["$averageScore", 194] },
//               100
//             ]},
//             0
//           ]
//         }
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         name: "$_id",
//         score: "$averagePercentage",
//         students: "$totalStudents"
//       }
//     },
//     { $sort: { score: -1 } }
//   ]);
// };

// const getStudentData = async () => {
//   return User.aggregate([
//     { 
//       $match: { 
//         eqScores: { $exists: true, $not: { $size: 0 } },
//         iqScores: { $exists: true, $not: { $size: 0 } },
//         technicalScores: { $exists: true, $not: { $size: 0 } }
//       }
//     },
//     {
//       $project: {
//         university: 1,
//         username: 1,
//         email: 1,
//         technicalField: 1,
//         eqMax: { $max: "$eqScores.score" },
//         iqMax: { $max: "$iqScores.score" },
//         techMax: { $max: "$technicalScores.score" }
//       }
//     },
//     {
//       $project: {
//         university: 1,
//         name: "$username",
//         email: 1,
//         field: "$technicalField",
//         score: {
//           obtained: { $sum: [ "$eqMax", "$iqMax", "$techMax" ] },
//           total: 194
//         }
//       }
//     },
//     { $sort: { "score.obtained": -1 } },
//     {
//       $group: {
//         _id: "$university",
//         students: { $push: "$$ROOT" }
//       }
//     }
//   ]);
// };

// // PDF Generation
// const generateUniversityReport = async () => {
//   return new Promise(async (resolve, reject) => {
//     const doc = createPDFDocument();
//     const buffers = [];
    
//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => resolve(Buffer.concat(buffers)));
//     doc.on('error', reject);

//     try {
//       // Header Section
//       doc.fontSize(12).text(`Report generated on: ${new Date().toLocaleDateString()}`, { align: 'right' });
//       doc.moveDown();
//       doc.fontSize(20).text('University Performance Report', { align: 'center' });
//       doc.moveDown();

//       // Data Fetching
//       const [universities, studentGroups] = await Promise.all([
//         getUniversityData(),
//         getStudentData()
//       ]);

//       // Create students map
//       const studentsMap = new Map();
//       studentGroups.forEach(group => studentsMap.set(group._id, group.students));

//       // University Table
//       const uniTable = {
//         title: "University Rankings",
//         headers: ["University", "Score (%)", "Students"],
//         rows: universities.map(uni => [uni.name, uni.score, uni.students])
//       };
      
//       await doc.table(uniTable, {
//         width: 500,
//         prepareHeader: () => doc.font('Helvetica-Bold')
//       });

//       // Student Pages
//       for (const uni of universities) {
//         doc.addPage();
//         doc.fontSize(16).text(`Top Students - ${uni.name}`, { align: 'center' });
//         doc.moveDown();

//         const students = studentsMap.get(uni.name) || [];
//         const studentTable = {
//           headers: ["Name", "Email", "Field", "Score"],
//           rows: students.map(s => [
//             s.name,
//             s.email,
//             s.field,
//             `${s.score.obtained}/${s.score.total} (${Math.round((s.score.obtained/s.score.total)*100)}%)`
//           ])
//         };

//         await doc.table(studentTable, {
//           width: 500,
//           prepareHeader: () => doc.font('Helvetica-Bold')
//         });
//       }

//       doc.end();
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // Email Service
// const sendReportEmail = async (pdfBuffer) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE || 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: `University Analytics <${process.env.EMAIL_USER}>`,
//     to: process.env.REPORT_RECIPIENT,
//     subject: `University Report - ${new Date().toLocaleDateString()}`,
//     text: 'Please find attached the latest university performance report.',
//     attachments: [{
//       filename: `university-report-${Date.now()}.pdf`,
//       content: pdfBuffer
//     }]
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('📨 Report email sent successfully');
//   } catch (error) {
//     console.error('❌ Email send failed:', error);
//     throw error;
//   }
// };

// module.exports = {
//   generateUniversityReport,
//   sendReportEmail
// };

const PDFDocument = require('pdfkit-table');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// PDF Configuration
const createPDFDocument = () => {
  return new PDFDocument({ 
    margin: 30, 
    size: 'A4',
    bufferPages: true
  });
};

// Data Aggregation
const getUniversityData = async () => {
  return User.aggregate([
    {
      $match: {
        $and: [
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
};

const getStudentData = async () => {
  return User.aggregate([
    { 
      $match: { 
        eqScores: { $exists: true, $not: { $size: 0 } },
        iqScores: { $exists: true, $not: { $size: 0 } },
        technicalScores: { $exists: true, $not: { $size: 0 } }
      }
    },
    {
      $project: {
        university: 1,
        username: 1,
        email: 1,
        technicalField: 1,
        eqMax: { $max: "$eqScores.score" },
        iqMax: { $max: "$iqScores.score" },
        techMax: { $max: "$technicalScores.score" }
      }
    },
    {
      $project: {
        university: 1,
        name: "$username",
        email: 1,
        field: "$technicalField",
        score: {
          obtained: { $sum: [ "$eqMax", "$iqMax", "$techMax" ] },
          total: 194
        }
      }
    },
    { $sort: { "score.obtained": -1 } },
    {
      $group: {
        _id: "$university",
        students: { $push: "$$ROOT" }
      }
    }
  ]);
};

// PDF Generation
const generateUniversityReport = async () => {
    return new Promise(async (resolve, reject) => {
      const doc = createPDFDocument();
      const buffers = [];
  
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
  
      try {
        // Header Section
        doc
          .fillColor('#6A0DAD') // Purple color
          .fontSize(28)
          .font('Helvetica-Bold')
          .text('MockBot', { align: 'center' });
  
        doc
          .fillColor('black')
          .fontSize(12)
          .text(`Report generated on: ${new Date().toLocaleDateString()}`, { align: 'right' })
          .moveDown();
  
        doc
          .fontSize(20)
          .fillColor('#6A0DAD')
          .text('University Performance Report', { align: 'center' })
          .moveDown();
  
        // Data Fetching
        const [universities, studentGroups] = await Promise.all([
          getUniversityData(),
          getStudentData()
        ]);
  
        // Create students map
        const studentsMap = new Map();
        studentGroups.forEach(group => studentsMap.set(group._id, group.students));
  
        // University Table
        const uniTable = {
          title: "University Rankings",
          headers: ["University", "Score (%)", "Students"],
          rows: universities.map(uni => [uni.name, uni.score, uni.students])
        };
  
        await doc.table(uniTable, {
          width: 500,
          prepareHeader: () => doc
            .font('Helvetica-Bold')
            .fillColor('#6A0DAD'),
          prepareRow: (row, i) => doc.fillColor('black'),
          columnSpacing: 10,
          padding: 5,
          borderWidth: 0.5,
          borderColor: '#6A0DAD'
        });
  
        // Student Pages
        for (const uni of universities) {
          doc.addPage();
  
          doc
            .fillColor('#6A0DAD')
            .fontSize(16)
            .font('Helvetica-Bold')
            .text(`Top Students - ${uni.name}`, { align: 'center' })
            .moveDown();
  
          const students = studentsMap.get(uni.name) || [];
  
          const studentTable = {
            headers: ["Name", "Email", "Field", "Score"],
            rows: students.map(s => [
              s.name,
              s.email,
              s.field,
              `${s.score.obtained}/${s.score.total} (${Math.round((s.score.obtained/s.score.total)*100)}%)`
            ])
          };
  
          await doc.table(studentTable, {
            width: 500,
            prepareHeader: () => doc
              .font('Helvetica-Bold')
              .fillColor('#6A0DAD'),
            prepareRow: (row, i) => doc.fillColor('black'),
            columnSpacing: 10,
            padding: 5,
            borderWidth: 0.5,
            borderColor: '#6A0DAD'
          });
        }
  
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  };
  
// Email Service
const sendReportEmail = async (pdfBuffer) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `University Analytics <${process.env.EMAIL_USER}>`,
    to: process.env.REPORT_RECIPIENT,
    subject: `University Report - ${new Date().toLocaleDateString()}`,
    text: 'Please find attached the latest university performance report.',
    attachments: [{
      filename: `university-report-${Date.now()}.pdf`,
      content: pdfBuffer
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📨 Report email sent successfully');
  } catch (error) {
    console.error('❌ Email send failed:', error);
    throw error;
  }
};

module.exports = {
  generateUniversityReport,
  sendReportEmail
};



