const PDFDocument = require('pdfkit');
const fs = require('fs');

const colors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  accent: '#F5A623',
  dark: '#333',
  light: '#F2F2F2'
};

// Utility to calculate average
const calculateAverage = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((sum, val) => sum + val, 0) / arr.length;

// Draw horizontal progress bar
const addProgressBar = (doc, label, value, x, y, max = 100) => {
  const barWidth = 100;
  const barHeight = 10;

  const filledWidth = (value / max) * barWidth;

  doc.fontSize(10).fillColor(colors.dark).text(`${label}: ${value.toFixed(1)}`, x, y - 15);
  doc.rect(x, y, barWidth, barHeight).fill(colors.light);
  doc.fillColor(colors.primary).rect(x, y, filledWidth, barHeight).fill();
};

// Cover Page
const addCoverPage = (doc) => {
  const centerX = doc.page.width / 2;
  doc.fillColor(colors.primary)
    .fontSize(36)
    .text('MockBot', centerX, 150, { align: 'center' });

  doc.fillColor(colors.dark)
    .fontSize(28)
    .text('University Performance Report', centerX, 200, { align: 'center' });

  doc.fontSize(14)
    .fillColor(colors.secondary)
    .text(`Date: ${new Date().toLocaleDateString()}`, centerX, 250, { align: 'center' });

  doc.moveDown(2);
  doc.lineWidth(2).moveTo(50, 300).lineTo(doc.page.width - 50, 300).stroke(colors.primary);
};

// University Bar Comparison
const addUniversityComparisonChart = (doc, universityData, x, y) => {
  const chartHeight = 160;
  const barWidth = 20;
  const spacing = 60;

  const universities = Object.values(universityData).map(uni => ({
    name: uni.name,
    iq: calculateAverage(uni.iqScores),
    eq: calculateAverage(uni.eqScores),
    tech: calculateAverage(uni.technicalScores)
  }));

  universities.forEach((uni, i) => {
    const baseX = x + i * spacing;

    const iqHeight = (uni.iq / 12) * chartHeight;
    const eqHeight = (uni.eq / 132) * chartHeight;
    const techHeight = (uni.tech / 50) * chartHeight;

    doc.fillColor(colors.primary)
       .rect(baseX, y + chartHeight - iqHeight, barWidth, iqHeight).fill();

    doc.fillColor(colors.secondary)
       .rect(baseX + barWidth + 2, y + chartHeight - eqHeight, barWidth, eqHeight).fill();

    doc.fillColor(colors.accent)
       .rect(baseX + (barWidth + 2) * 2, y + chartHeight - techHeight, barWidth, techHeight).fill();

    doc.fontSize(8)
       .fillColor(colors.dark)
       .text(uni.name.slice(0, 12), baseX, y + chartHeight + 10, {
         width: (barWidth + 2) * 3,
         align: 'center'
       });
  });

  doc.fontSize(10).fillColor(colors.dark).text('Legend:', x, y + chartHeight + 40);
  doc.rect(x + 50, y + chartHeight + 40, 10, 10).fill(colors.primary);
  doc.text('IQ', x + 65, y + chartHeight + 38);
  doc.rect(x + 100, y + chartHeight + 40, 10, 10).fill(colors.secondary);
  doc.text('EQ', x + 115, y + chartHeight + 38);
  doc.rect(x + 150, y + chartHeight + 40, 10, 10).fill(colors.accent);
  doc.text('Technical', x + 165, y + chartHeight + 38);
};

// Summary Page
function addSummaryPage(doc, universityData) {
    // Add a title
    doc.addPage().fontSize(18).text('University Summary Report', { align: 'center' });
  
    // Safely flatten all students across universities
    const allStudents = universityData.flatMap(u => Array.isArray(u?.students) ? u.students : []);
  
    const totalIQ = allStudents.reduce((sum, s) => sum + (s.iq || 0), 0);
    const totalEQ = allStudents.reduce((sum, s) => sum + (s.eq || 0), 0);
    const totalTech = allStudents.reduce((sum, s) => sum + (s.technical || 0), 0);
    const total = allStudents.length;
  
    if (total === 0) {
      doc.fontSize(12).text('No student data available.', { align: 'left', lineGap: 10 });
      return;
    }
  
    doc.moveDown().fontSize(12);
    doc.text(`Total Students: ${total}`);
    doc.text(`Average IQ Score: ${(totalIQ / total).toFixed(2)}`);
    doc.text(`Average EQ Score: ${(totalEQ / total).toFixed(2)}`);
    doc.text(`Average Technical Score: ${(totalTech / total).toFixed(2)}`);
  }
  
// Student Table Page
function addStudentTablePage(doc, universityData) {
    doc.addPage().fontSize(18).text('Student Performance Table', { align: 'center' });
  
    doc.moveDown().fontSize(12);
  
    universityData?.forEach(uni => {
      doc.moveDown().fontSize(14).text(`University: ${uni?.name || 'N/A'}`);
  
      const students = Array.isArray(uni?.students) ? uni.students : [];
  
      if (students.length === 0) {
        doc.fontSize(10).text('No student data available.', { indent: 20 });
      } else {
        students.forEach((student, index) => {
          doc.fontSize(10).text(
            `${index + 1}. ${student.name || 'N/A'} - IQ: ${student.iq || 0}, EQ: ${student.eq || 0}, Technical: ${student.technical || 0}`,
            { indent: 20 }
          );
        });
      }
    });
  }
  

// Main function


const generateReportPDF = (req, res) => {
    const universityData = req.body.universities;
  
    if (!Array.isArray(universityData)) {
      return res.status(400).json({ error: 'Invalid university data' });
    }
  
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '..', 'reports', `university_report_${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(filePath);
  
    doc.pipe(writeStream);
  
    addTitlePage(doc);
    addSummaryPage(doc, universityData);
    addStudentTablePage(doc, universityData);
  
    doc.end();
  
    writeStream.on('finish', () => {
      res.status(200).json({ message: 'PDF generated', path: filePath });
    });
  
    writeStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to write PDF' });
    });
  };

module.exports = generateReportPDF;
