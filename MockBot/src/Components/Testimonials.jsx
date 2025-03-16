import React from "react";

const Testimonials = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", color:'black' }}>Join Thousands of Successful <span style={{color:'#5D009F'}}>Candidates </span>Who Trust Mockbot</h1>
      <p style={{ fontSize: "16px", color: "#6c757d", margin: "10px 0 40px" }}>
        Don’t just take our word for it. See what real users are saying about how Huru has helped them land their dream jobs:
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", color:'black'}}>
        {/* Testimonial 1 */}
        <div style={testimonialCardStyle}>
          <h3>Aleena</h3>
          <p style={reviewPlatformStyle}>Review on Website</p>
          <p style={starStyle}>⭐⭐⭐⭐⭐</p>
          <p style={testimonialTextStyle}>
            One of the positive point in Huru that it gives feedback, based on exact answer, not some theoretical knowledge.
            Personally Huru helped me to identify some of my weaker points and improve them. I recommend Huru to all, who
            want to improve their preparation for the interview.
          </p>
        </div>

        {/* Testimonial 2 */}
        <div style={testimonialCardStyle}>
          <h3>Eman</h3>
          <p style={reviewPlatformStyle}>Review on Website</p>
          <p style={starStyle}>⭐⭐⭐⭐⭐</p>
          <p style={testimonialTextStyle}>
            This is a really amazing site and offering for interview practice. What I liked most is answering the questions on video,
            being able to watch how well I did, and then getting immediate feedback on my performance with recommendations for improvement.
            I have a tendency to repeat the same word multiple times, based on the feedback, which I did not know so I practiced more
            and did much better.
          </p>
        </div>

        {/* Testimonial 3 */}
        <div style={testimonialCardStyle}>
          <h3>Usman</h3>
          <p style={reviewPlatformStyle}>Review on Website</p>
          <p style={starStyle}>⭐⭐⭐⭐⭐</p>
          <p style={testimonialTextStyle}>
            I recently started using Huru, the AI-powered interview prep app, and it's been fantastic for enhancing my job interview readiness.
            Its ability to simulate interviews from real job descriptions and provide instant AI feedback on my responses has significantly
            boosted my confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

const testimonialCardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  width: "300px",
  textAlign: "left",
};

const reviewPlatformStyle = {
  fontSize: "14px",
  color: "#6c757d",
};

const starStyle = {
  fontSize: "18px",
  color: "#f39c12",
};

const testimonialTextStyle = {
  fontSize: "14px",
  color: "#333",
  marginTop: "10px",
};

export default Testimonials;
