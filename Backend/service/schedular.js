const cron = require('node-cron');
const { generateUniversityReport, sendReportEmail } = require('../utils/reportUtils');

function scheduleReport() {
  // Debug version (runs every 5 minutes)
  cron.schedule('*/5 * * * *', async () => {
    console.log(`⏱️ [DEBUG] Attempting report generation at ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT`);
    
    try {
      console.log('Step 1: Generating PDF...');
      const pdfBuffer = await generateUniversityReport();
      
      console.log('Step 2: PDF generated successfully, size:', pdfBuffer.length + ' bytes');
      
      console.log('Step 3: Sending email...');
      await sendReportEmail(pdfBuffer);
      
      console.log('📨✅ [SUCCESS] Full pipeline completed');
    } catch (error) {
      console.error('❌ [FULL ERROR]', error.stack);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Karachi"
  });
}

module.exports = { scheduleReport };