import React, { useState } from "react";
const App = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const shareURL = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Look back at your 2014 quotes; they might provide helpful guidance for your life.",
          text: "Your 2014 quotes",
          url: "https://ajaykrishnan.netlify.app/NewYear",
        });
      } else {
        alert("Sharing is not supported in your browser. You can manually copy the URL to share.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    setQuote(getQuoteValue(name, dob));
    try {
      setLoading(true);
      const response = await fetch("https://script.google.com/macros/s/AKfycbx9XT3SlgIchIJJ5RNnYmam0E9RlkdyyFBDn1Oj15uOTznwh2Es9ceELllEC8rauEUf0A/exec", {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Length": "<calculated when request is sent>",
          Host: "<calculated when request is sent>",
        },
        body: JSON.stringify({ name, dob }),
      });
      if (response.ok) {
        setShowForm(false);
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRestart = () => {
    setName("");
    setDob("");
    setShowForm(true);
  };
  const getZodiacSign = (dob) => {
    return "Gemini(மிதுனம்)";
  };
  const getQuoteValue = (name, dob) => {
    const firstLetterValue = name.toLowerCase().charCodeAt(0) - "a".charCodeAt(0) + 1;
    const secondLetterValue = name.toLowerCase().charCodeAt(1) - "a".charCodeAt(0) + 1;
    const sum = firstLetterValue + secondLetterValue;
    const age = calculateAge(dob);
    if (age >= 0 && age <= 16) {
      return quotesAge1to16[sum % quotesAge1to16.length];
    } else if (age >= 17 && age <= 25) {
      return quotesAge16to25[sum % quotesAge16to25.length];
    } else if (age >= 26 && age <= 50) {
      return quotesAge26to50[sum % quotesAge26to50.length];
    } else if (age >= 51 && age <= 100) {
      return quotesAge51to100[sum % quotesAge51to100.length];
    } else {
      return "Invalid age range";
    }
  };
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  const quotesAge1to16 = [
    "Little one, your energy knows no bounds. Embrace each day with the same enthusiasm you bring to play.",
    "In the garden of life, may your laughter be the brightest bloom. Keep spreading joy, young soul!",
    "Dear child, your imagination is a universe waiting to be explored. Dream big, and let your creativity soar.",
    "As you grow, so does your incredible memory. Cherish every moment, for it becomes a treasure in the vault of your mind.",
    "Brave hearts are born in young chests. Face each challenge with the courage only a child like you possesses.",
    "Sweet child, may your days be filled with sunshine and your nights with the comforting embrace of dreams.",
    "Your curiosity is the compass that guides you through the map of knowledge. Keep asking, keep learning.",
    "In the dance of life, you are the twirling star. Let the rhythm of your heart lead you to joyous adventures.",
    "Little one, your kindness is a lantern that lights up the world. Shine on, and let your compassion touch every heart.",
    "As the pages of time turn, may your story be one of resilience, growth, and endless possibilities. The best is yet to come.",
  ];
  const quotesAge16to25 = [
    "In 2024, you might cross paths with your life partner or that special someone. Keep your heart open, for destiny often weaves its magic unexpectedly.",
    "As the calendar flips, so might the chapters of your love story. Embrace the possibility of finding your soulmate in the coming year.",
    "You're doing well, and 2024 holds a pivotal moment for you. Seize the opportunities, take risks, and let this year be the turning point you've been waiting for.",
    "Life is a grand stage, and 2024 is your spotlight. Act with purpose, make bold decisions, and let this year be the platform for your greatest achievements.",
    "This new year is not just a chapter; it's a novel waiting to be written. Be the author of your story, and let every decision be a penstroke of success.",
    "In the tapestry of your life, your life partner is a vibrant thread. This year, share your dreams, fears, and triumphs, for together you weave a masterpiece.",
    "The symphony of your journey is enhanced by the harmonious presence of your life partner. 2024 is the year to cherish every note and create a beautiful melody together.",
    "Love is the most exquisite journey, and this year, you're fortunate to have found your co-traveler. Share the joys, navigate the challenges, and make every moment count.",
    "In the garden of love, 2024 has planted seeds of companionship. Nurture the bond with your life partner, and watch as the flowers of happiness bloom throughout the year.",
    "This year is not just about resolutions; it's about revelations. Your life might take a beautiful turn, introducing you to someone who becomes your forever.",
  ];
  const quotesAge26to50 = [
    "As you've completed 25% of your life's journey, let the next phase be a canvas of growth. In 2024, invest in supporting your children, evolving your lifestyle, and fortifying the foundation of your family.",
    "The first quarter is a milestone; the rest is an opportunity. In 2024, be the pillar your family can lean on, and let your life's narrative unfold with resilience and purpose.",
    "With 25% behind you, the road ahead beckons for transformation. In this new year, amplify your commitment to family, nurture your dreams, and let every step shape a legacy.",
    "Life is a perpetual renovation project. In 2024, upgrade your lifestyle, cultivate new experiences, and let the architecture of your existence be a testament to growth.",
    "Your life's journey is a story, and the chapters from 26 to 50 are the heart of the narrative. Write it with purpose, embracing every role – supporter, dreamer, and architect of joy.",
    "In the middle chapters of life, every decision is a brushstroke on the canvas of your legacy. Paint with intention, fostering a haven for your family and sculpting a life rich in experiences.",
    "As you navigate the sea of responsibilities, anchor your ship in the harbor of love and support. 2024 is the year to strengthen the bonds that withstand life's storms.",
    "Your family is the compass guiding you through the map of life. In this year and beyond, let your actions be the North Star, leading your loved ones to happiness and fulfillment.",
    "The second quarter of life is a chance for reinvention. In 2024, be the change you wish to see in your world—supporting, growing, and evolving with each passing day.",
    "With 25% of your life's journey complete, the rest is a canvas waiting for your masterpiece. In 2024, let your life be a work of art, painted with love, support, and the hues of shared dreams.",
  ];
  const quotesAge51to100 = [
    "Having lived half a century, let the second act of your life be a gentle river. Relax, reflect, and gracefully go with the flow, for every ripple tells the story of a well-lived journey.",
    "With 50% of life's journey behind you, embrace the tranquility of the present. In this chapter, savor the moments, rest under the shade of your accomplishments, and let life unfold at its own pace.",
    "As you reach the midpoint, consider it a summit attained. From here on, let the descent be a leisurely stroll, allowing the scenery of your experiences to unfold. Take a rest, and let the world reveal its wonders to you.",
    "Half a century of memories, challenges, and triumphs deserve a pause. In the years ahead, bask in the glow of your achievements, savor the simplicity of the everyday, and let time flow like a serene river.",
    "The journey from 50 to 100 is a gift of time. Rest when needed, explore when desired, and let each day be a chapter in the novel of your life—a story crafted with the wisdom that only time can bestow.",
  ];
  return (
    <>
      {loading === true ? (
        <div style={{ marginTop: "70%" }}>
          <center>
            <span className="loader">
              <span className="loader-box"></span>
              <span className="loader-box"></span>
              <span className="loader-box"></span>
              <span className="loader-box"></span>
              <span className="loader-box"></span>
            </span>
            <br />
            loading...
          </center>
        </div>
      ) : (
        <div style={{ backgroundImage: "url('https://img.freepik.com/free-photo/3d-grunge-room-…tlight-smoky-atmosphere-background_1048-11333.jpg')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
          {showForm ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              <h4 style={{ color: "white", marginTop: 70, fontFamily: "emoji" }}>Wishing you a joyous and prosperous New Year in 2024! Check out this New Year quote just for you.</h4>
              <br />
              <form onSubmit={handleSubmit}>
                <label style={{ color: "white", margin: 0 }}>
                  Enter your Name:
                  <br />
                  <input style={{ color: "white", background: "rgb(49 57 57)", marginTop: 5, border: "1px solid #868686", padding: 10, width: "100%", borderRadius: "10px", fontWeight: 600 }} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label style={{ color: "white" }}>
                  Date of Birth:
                  <br />
                  <input style={{ color: "white", background: "rgb(49 57 57)", marginTop: 5, border: "1px solid #868686", padding: 10, width: "100%", borderRadius: "10px", fontWeight: 600 }} type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </label>
                <br />
                <button type="submit" style={{ width: "80%", borderRadius: "30px" }}>
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: "center", fontFamily: "sans-serif" }}>
              <a href="/">
                <h5 style={{ color: "white", marginTop: "20%" }}>
                  Hey {name},did you know {`${getZodiacSign(dob)}`}is one of the best astrological signs.
                </h5>
                <br />
                <p style={{ color: "white" }}>
                  Happy New Year!
                  <br /> Here are your 2024 quotes.
                </p>
                <b style={{ color: "white" }}>" {quote} "</b>
                <br />
                <br />
              </a>
              <button style={{ width: "80%", borderRadius: "30px" }} onClick={handleRestart}>
                Restart
              </button>
            </div>
          )}
          <center>
            <div style={{ color:"white",marginTop:"10%" }}></div>
            Share this with your friends so they can also check out their own quotes. It will be helpful for them.
            <button style={{ borderRadius: "10px", padding: "5px", width: "100px" }} onClick={shareURL}>
              Share
            </button>
          </center>
        </div>
      )}
    </>
  );
};

export default App;
