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
          url: "https://ajaykrishnan.netlify.app/",
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
    "Little one, your energy knows no bounds. Embrace each day with the same enthusiasm you bring to play. (சிறியவரே, உங்கள் ஆற்றலுக்கு எல்லையே இல்லை. நீங்கள் விளையாடக் கொண்டுவரும் அதே உற்சாகத்துடன் ஒவ்வொரு நாளையும் தழுவுங்கள்)",
    "In the garden of life, may your laughter be the brightest bloom. Keep spreading joy, young soul! (வாழ்க்கையின் தோட்டத்தில், உங்கள் சிரிப்பு பிரகாசமான மலர்ச்சியாக இருக்கட்டும். மகிழ்ச்சியை பரப்புங்கள், இளைய உள்ளம்!)",
    "Dear child, your imagination is a universe waiting to be explored. Dream big, and let your creativity soar. (அன்புள்ள குழந்தையே, உங்கள் கற்பனையானது ஒரு பிரபஞ்சம் ஆராய்வதற்கு காத்திருக்கிறது. பெரிய கனவு காணுங்கள், உங்கள் படைப்பாற்றல் உயரட்டும்.)",
    "As you grow, so does your incredible memory. Cherish every moment, for it becomes a treasure in the vault of your mind. (நீங்கள் வளரும் போது, ​​உங்கள் நம்பமுடியாத நினைவாற்றல் அதிகரிக்கிறது. ஒவ்வொரு கணத்தையும் போற்றுங்கள், ஏனென்றால் அது உங்கள் மனதின் பெட்டகத்தில் ஒரு பொக்கிஷமாக மாறும்.)",
    "Brave hearts are born in young chests. Face each challenge with the courage only a child like you possesses. (இளம் நெஞ்சில் துணிச்சலான இதயங்கள் பிறக்கின்றன. உங்களைப் போன்ற ஒரு குழந்தைக்கு மட்டுமே இருக்கும் தைரியத்துடன் ஒவ்வொரு சவாலையும் எதிர்கொள்ளுங்கள்.)",
    "Sweet child, may your days be filled with sunshine and your nights with the comforting embrace of dreams. (இனிய குழந்தையே, உங்கள் நாட்கள் சூரிய ஒளியாலும், இரவுகள் கனவுகளின் ஆறுதலான அரவணைப்பாலும் நிரப்பப்படட்டும்.)",
    "Your curiosity is the compass that guides you through the map of knowledge. Keep asking, keep learning. (அறிவின் வரைபடத்தில் உங்களை வழிநடத்தும் திசைகாட்டி உங்கள் ஆர்வமே. கேட்டுக்கொண்டே இருங்கள், கற்றுக்கொண்டே இருங்கள்.)",
    "In the dance of life, you are the twirling star. Let the rhythm of your heart lead you to joyous adventures. (வாழ்க்கையின் நடனத்தில், நீங்கள் சுழலும் நட்சத்திரம். உங்கள் இதயத்தின் தாளம் உங்களை மகிழ்ச்சியான சாகசங்களுக்கு அழைத்துச் செல்லட்டும்.)",
    "Little one, your kindness is a lantern that lights up the world. Shine on, and let your compassion touch every heart. (சிறியவரே, உங்கள் கருணை உலகத்தை ஒளிரச் செய்யும் விளக்கு. பிரகாசிக்கவும், உங்கள் இரக்கம் ஒவ்வொரு இதயத்தையும் தொடட்டும்.)",
    "As the pages of time turn, may your story be one of resilience, growth, and endless possibilities. The best is yet to come.(காலத்தின் பக்கங்கள் புரட்டும்போது, ​​உங்கள் கதை பின்னடைவு, வளர்ச்சி மற்றும் முடிவற்ற சாத்தியக்கூறுகள் கொண்டதாக இருக்கட்டும். சிறந்தது இன்னும் வரவில்லை.)",
  ];
  const quotesAge16to25 = [
    "In 2024, you might cross paths with your life partner or that special someone. Keep your heart open, for destiny often weaves its magic unexpectedly. (2024ல், உங்கள் வாழ்க்கை துணையுடன் அல்லது அந்த சிறப்பு வாய்ந்த ஒருவருடன் நீங்கள் குறுக்கு வழியில் செல்லலாம். உங்கள் இதயத்தைத் திறந்து வைத்திருங்கள், ஏனென்றால் விதி பெரும்பாலும் எதிர்பாராத விதமாக அதன் மந்திரத்தை நெசவு செய்கிறது.)",
    "As the calendar flips, so might the chapters of your love story. Embrace the possibility of finding your soulmate in the coming year. (காலண்டர் புரட்டும்போது, ​​உங்கள் காதல் கதையின் அத்தியாயங்களும் புரட்டலாம். வரும் ஆண்டில் உங்கள் ஆத்ம துணையை கண்டுபிடிப்பதற்கான வாய்ப்பை ஏற்றுக்கொள்ளுங்கள்.)",
    "You're doing well, and 2024 holds a pivotal moment for you. Seize the opportunities, take risks, and let this year be the turning point you've been waiting for. (நீங்கள் சிறப்பாக செயல்படுகிறீர்கள், 2024 உங்களுக்கு ஒரு முக்கிய தருணமாக உள்ளது. வாய்ப்புகளைப் பயன்படுத்திக் கொள்ளுங்கள், அபாயங்களை எடுத்துக் கொள்ளுங்கள், இந்த ஆண்டு நீங்கள் காத்திருக்கும் திருப்புமுனையாக இருக்கட்டும்.)",
    "Life is a grand stage, and 2024 is your spotlight. Act with purpose, make bold decisions, and let this year be the platform for your greatest achievements. (வாழ்க்கை ஒரு பெரிய மேடை, 2024 உங்கள் கவனத்தை ஈர்க்கும். குறிக்கோளுடன் செயல்படுங்கள், தைரியமான முடிவுகளை எடுங்கள், இந்த ஆண்டு உங்களின் மிகப்பெரிய சாதனைகளுக்கான களமாக அமையட்டும்.)",
    "This new year is not just a chapter; it's a novel waiting to be written. Be the author of your story, and let every decision be a penstroke of success. (இந்தப் புத்தாண்டு ஒரு அத்தியாயம் மட்டுமல்ல; இது எழுத காத்திருக்கும் நாவல். உங்கள் கதையின் ஆசிரியராக இருங்கள், மேலும் ஒவ்வொரு முடிவும் வெற்றியின் முத்திரையாக இருக்கட்டும்.)",
    "In the tapestry of your life, your life partner is a vibrant thread. This year, share your dreams, fears, and triumphs, for together you weave a masterpiece. (உங்கள் வாழ்க்கையின் திரையில், உங்கள் வாழ்க்கை துணை ஒரு துடிப்பான நூல். இந்த ஆண்டு, உங்கள் கனவுகள், அச்சங்கள் மற்றும் வெற்றிகளைப் பகிர்ந்து கொள்ளுங்கள், ஏனென்றால் நீங்கள் ஒன்றாக ஒரு தலைசிறந்த படைப்பை உருவாக்குகிறீர்கள்.)",
    "The symphony of your journey is enhanced by the harmonious presence of your life partner. 2024 is the year to cherish every note and create a beautiful melody together. (உங்கள் வாழ்க்கைத் துணையின் இணக்கமான இருப்பால் உங்கள் பயணத்தின் சிம்பொனி மேம்படும். 2024 ஒவ்வொரு குறிப்பையும் நேசித்து ஒரு அழகான மெல்லிசையை உருவாக்குவதற்கான ஆண்டாகும்.)",
    "Love is the most exquisite journey, and this year, you're fortunate to have found your co-traveler. Share the joys, navigate the challenges, and make every moment count. (காதல் என்பது மிக நேர்த்தியான பயணம், இந்த ஆண்டு, உங்களின் இணைப் பயணியைக் கண்டறிவது உங்களுக்கு அதிர்ஷ்டம். மகிழ்ச்சிகளைப் பகிர்ந்து கொள்ளுங்கள், சவால்களுக்குச் செல்லுங்கள், ஒவ்வொரு கணத்தையும் கணக்கிடுங்கள்.)",
    "In the garden of love, 2024 has planted seeds of companionship. Nurture the bond with your life partner, and watch as the flowers of happiness bloom throughout the year. (காதல் தோட்டத்தில், 2024 தோழமையின் விதைகளை விதைத்துள்ளது. உங்கள் வாழ்க்கை துணையுடன் பந்தத்தை வளர்த்துக் கொள்ளுங்கள், மகிழ்ச்சியின் பூக்கள் ஆண்டு முழுவதும் பூப்பதைப் பாருங்கள்.)",
    "This year is not just about resolutions; it's about revelations. Your life might take a beautiful turn, introducing you to someone who becomes your forever. (இந்த ஆண்டு தீர்மானங்கள் மட்டுமல்ல; இது வெளிப்பாடுகள் பற்றியது. உங்கள் வாழ்க்கை ஒரு அழகான திருப்பத்தை எடுக்கலாம், அது எப்போதும் உங்களுடையதாக இருக்கும் ஒருவரை உங்களுக்கு அறிமுகப்படுத்துகிறது.)",
  ];
  const quotesAge26to50 = [
    "As you've completed 25% of your life's journey, let the next phase be a canvas of growth. In 2024, invest in supporting your children, evolving your lifestyle, and fortifying the foundation of your family. (உங்கள் வாழ்க்கைப் பயணத்தில் 25% முடிந்துவிட்டதால், அடுத்த கட்டம் வளர்ச்சியின் கேன்வாஸாக இருக்கட்டும். 2024ல், உங்கள் குழந்தைகளை ஆதரிப்பதற்கும், உங்கள் வாழ்க்கை முறையை மேம்படுத்துவதற்கும், உங்கள் குடும்பத்தின் அடித்தளத்தை வலுப்படுத்துவதற்கும் முதலீடு செய்யுங்கள்.)",
    "The first quarter is a milestone; the rest is an opportunity. In 2024, be the pillar your family can lean on, and let your life's narrative unfold with resilience and purpose. (முதல் காலாண்டு ஒரு மைல்கல்; மீதமுள்ள ஒரு வாய்ப்பு. 2024 ஆம் ஆண்டில், உங்கள் குடும்பம் சாயக்கூடிய தூணாக இருங்கள், மேலும் உங்கள் வாழ்க்கையின் கதைகள் நெகிழ்ச்சி மற்றும் நோக்கத்துடன் வெளிவரட்டும்.)",
    "With 25% behind you, the road ahead beckons for transformation. In this new year, amplify your commitment to family, nurture your dreams, and let every step shape a legacy. (25% உங்களுக்குப் பின்னால் இருப்பதால், முன்னோக்கி செல்லும் பாதை மாற்றத்திற்கு அழைப்பு விடுக்கிறது. இந்தப் புத்தாண்டில், குடும்பத்திற்கான உங்கள் அர்ப்பணிப்பைப் பெருக்கி, உங்கள் கனவுகளை வளர்த்துக் கொள்ளுங்கள், மேலும் ஒவ்வொரு அடியும் ஒரு பாரம்பரியத்தை வடிவமைக்கட்டும்.)",
    "Life is a perpetual renovation project. In 2024, upgrade your lifestyle, cultivate new experiences, and let the architecture of your existence be a testament to growth. (வாழ்க்கை ஒரு நிரந்தர சீரமைப்பு திட்டம். 2024 ஆம் ஆண்டில், உங்கள் வாழ்க்கை முறையை மேம்படுத்தவும், புதிய அனுபவங்களை வளர்த்துக்கொள்ளவும், உங்கள் இருப்பின் கட்டிடக்கலை வளர்ச்சிக்கு சான்றாக இருக்கட்டும்.)",
    "Your life's journey is a story, and the chapters from 26 to 50 are the heart of the narrative. Write it with purpose, embracing every role – supporter, dreamer, and architect of joy. (உங்கள் வாழ்க்கைப் பயணம் ஒரு கதை, 26 முதல் 50 வரையிலான அத்தியாயங்கள் கதையின் இதயம். ஆதரவாளர், கனவு காண்பவர் மற்றும் மகிழ்ச்சியின் கட்டிடக் கலைஞர் - ஒவ்வொரு பாத்திரத்தையும் தழுவி, நோக்கத்துடன் அதை எழுதுங்கள்.)",
    "In the middle chapters of life, every decision is a brushstroke on the canvas of your legacy. Paint with intention, fostering a haven for your family and sculpting a life rich in experiences. (வாழ்க்கையின் நடு அத்தியாயங்களில், ஒவ்வொரு முடிவும் உங்கள் பாரம்பரியத்தின் கேன்வாஸில் ஒரு தூரிகை. எண்ணத்துடன் வண்ணம் தீட்டவும், உங்கள் குடும்பத்திற்கு ஒரு புகலிடமாகவும், அனுபவங்கள் நிறைந்த வாழ்க்கையை செதுக்கவும்.)",
    "As you navigate the sea of responsibilities, anchor your ship in the harbor of love and support. 2024 is the year to strengthen the bonds that withstand life's storms. (நீங்கள் பொறுப்புகளின் கடலில் செல்லும்போது, ​​உங்கள் கப்பலை அன்பு மற்றும் ஆதரவின் துறைமுகத்தில் நங்கூரமிடுங்கள். 2024 வாழ்வின் புயல்களைத் தாங்கும் பிணைப்புகளை வலுப்படுத்தும் ஆண்டாகும்.)",
    "Your family is the compass guiding you through the map of life. In this year and beyond, let your actions be the North Star, leading your loved ones to happiness and fulfillment. (உங்கள் குடும்பம் வாழ்க்கை வரைபடத்தில் உங்களை வழிநடத்தும் திசைகாட்டி. இந்த ஆண்டிலும் அதற்கு அப்பாலும், உங்கள் செயல்கள் வடக்கு நட்சத்திரமாக இருக்கட்டும், உங்கள் அன்புக்குரியவர்களை மகிழ்ச்சி மற்றும் நிறைவுக்கு இட்டுச் செல்லும்.)",
    "The second quarter of life is a chance for reinvention. In 2024, be the change you wish to see in your world—supporting, growing, and evolving with each passing day. (வாழ்க்கையின் இரண்டாவது காலாண்டு மறு கண்டுபிடிப்புக்கான வாய்ப்பு. 2024 ஆம் ஆண்டில், உங்கள் உலகில் நீங்கள் காண விரும்பும் மாற்றமாக இருங்கள் - கடந்து செல்லும் ஒவ்வொரு நாளிலும் ஆதரவு, வளர்ச்சி மற்றும் பரிணாமம்.)",
    "With 25% of your life's journey complete, the rest is a canvas waiting for your masterpiece. In 2024, let your life be a work of art, painted with love, support, and the hues of shared dreams. (உங்கள் வாழ்க்கைப் பயணத்தின் 25% நிறைவடைந்த நிலையில், மீதமுள்ளவை உங்கள் தலைசிறந்த படைப்புக்காகக் காத்திருக்கும் கேன்வாஸ். 2024 ஆம் ஆண்டில், உங்கள் வாழ்க்கை ஒரு கலைப் படைப்பாக இருக்கட்டும், அன்பு, ஆதரவு மற்றும் பகிரப்பட்ட கனவுகளின் சாயல்களால் வரையப்பட்டிருக்கும்.)",
  ];
  const quotesAge51to100 = [
    "Having lived half a century, let the second act of your life be a gentle river. Relax, reflect, and gracefully go with the flow, for every ripple tells the story of a well-lived journey. (அரை நூற்றாண்டு வாழ்ந்த உங்கள் வாழ்க்கையின் இரண்டாவது செயல் மென்மையான நதியாக இருக்கட்டும். ஒவ்வொரு சிற்றலையும் ஒரு நல்ல வாழ்க்கைப் பயணத்தின் கதையைச் சொல்வதால், நிதானமாக, சிந்தித்து, மனதார ஓட்டத்துடன் செல்லுங்கள்.)",
    "With 50% of life's journey behind you, embrace the tranquility of the present. In this chapter, savor the moments, rest under the shade of your accomplishments, and let life unfold at its own pace. (வாழ்க்கைப் பயணத்தின் 50% உங்களுக்குப் பின்னால் இருப்பதால், நிகழ்காலத்தின் அமைதியைத் தழுவுங்கள். இந்த அத்தியாயத்தில், தருணங்களை ரசியுங்கள், உங்கள் சாதனைகளின் நிழலில் ஓய்வெடுங்கள், மேலும் வாழ்க்கை அதன் சொந்த வேகத்தில் வெளிவரட்டும்.)",
    "As you reach the midpoint, consider it a summit attained. From here on, let the descent be a leisurely stroll, allowing the scenery of your experiences to unfold. Take a rest, and let the world reveal its wonders to you. (நீங்கள் நடுப்பகுதியை அடையும்போது, ​​​​அதை ஒரு உச்சிமாநாடு அடைந்ததாகக் கருதுங்கள். இங்கிருந்து, வம்சாவளியை நிதானமாக உலாவும், உங்கள் அனுபவங்களின் இயற்கைக்காட்சி வெளிப்பட அனுமதிக்கிறது. ஓய்வெடுங்கள், உலகம் அதன் அதிசயங்களை உங்களுக்கு வெளிப்படுத்தட்டும்.)",
    "Half a century of memories, challenges, and triumphs deserve a pause. In the years ahead, bask in the glow of your achievements, savor the simplicity of the everyday, and let time flow like a serene river. (அரை நூற்றாண்டு நினைவுகள், சவால்கள் மற்றும் வெற்றிகள் ஒரு இடைநிறுத்தத்திற்கு தகுதியானவை. வரவிருக்கும் ஆண்டுகளில், உங்கள் சாதனைகளின் பிரகாசத்தில் மூழ்கி, அன்றாடத்தின் எளிமையை ரசியுங்கள், மேலும் நேரத்தை அமைதியான நதி போல ஓட விடுங்கள்.)",
    "The journey from 50 to 100 is a gift of time. Rest when needed, explore when desired, and let each day be a chapter in the novel of your life—a story crafted with the wisdom that only time can bestow. (50 முதல் 100 வரையிலான பயணம் காலத்தின் பரிசு. தேவைப்படும்போது ஓய்வெடுக்கவும், விரும்பும் போது ஆராயவும், ஒவ்வொரு நாளும் உங்கள் வாழ்க்கையின் நாவலில் ஒரு அத்தியாயமாக இருக்கட்டும்-காலம் மட்டுமே அளிக்கும் ஞானத்துடன் வடிவமைக்கப்பட்ட கதை.)",
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
        <div>
        <div style={{ backgroundImage: "url('https://img.freepik.com/free-photo/3d-grunge-room-…tlight-smoky-atmosphere-background_1048-11333.jpg')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "94vh" }}>
          {showForm ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              <h4 style={{ color: "white", marginTop: "20%", fontFamily: "emoji" }}>Wishing you a joyous and prosperous New Year in 2024! Check out this New Year quote just for you.</h4>
              <br />
              <form onSubmit={handleSubmit}>
                <label style={{ color: "white", margin: 0 }}>
                  Enter your Name:
                  <br />
                  <input style={{ color: "white", background: "rgb(49 57 57)", marginTop: 5, border: "1px solid #868686", padding: 10, width: "330px",height:"50px", borderRadius: "10px", fontWeight: 600 }} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label style={{ color: "white" }}>
                  Date of Birth:
                  <br />
                  <input style={{ color: "white", background: "rgb(49 57 57)", marginTop: 5, border: "1px solid #868686", padding: 10, width: "330px",height:"50px", borderRadius: "10px", fontWeight: 600 }} type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
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
            <div style={{ color: "white", marginTop: "10%" }}></div>
            Share this with your friends so they can also check out their own quotes. It will be helpful for them.
            <button style={{ borderRadius: "10px", padding: "5px", width: "100px" }} onClick={shareURL}>
              Share
            </button>
          </center>
        </div>
        <div style={{marginTop:"8px"}}>
          <center>
        © 2021 Copyright: Ajay krishnan
        </center>
        </div>
        </div>
      )}
    </>
  );
};

export default App;
