const axios = require('axios');

const getQuestions = async (req, res) => {
  try {
    const response = await axios.get('https://apiv3.imocha.io/v3/tests', {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching questions');
  }
};

module.exports = { getQuestions };
