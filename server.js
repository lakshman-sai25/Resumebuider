/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Resume Schema
const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  skills: String
});

const Resume = mongoose.model('Resume', resumeSchema);

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Save Resume Route
app.post('/api/resume', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving resume', error });
  }
});

// AI Suggestion Route
app.post('/api/suggestions', async (req, res) => {
  try {
    const { name, education, experience, skills } = req.body;

    const prompt = `Here is a resume:\nName: ${name}\nEducation: ${education}\nExperience: ${experience}\nSkills: ${skills}\n\nSuggest improvements to make this resume more professional and impactful.`;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo"
    });

    const suggestions = response.choices[0].message.content;
    res.json({ suggestions });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ message: 'Failed to get suggestions', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
/*require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 Debug .env variables
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✔️ Found" : "❌ Missing");
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "✔️ Found" : "❌ Missing");

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ Resume Schema
const resumeSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  summary: String,
  education: String,
  experience: String,
  skills: String
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

// ✅ OpenAI API Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ Save Resume Route
app.post('/api/resume', async (req, res) => {
  try {
    const { name, address, email, summary, education, experience, skills } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const newResume = await Resume.create({
      name,
      address,
      email,
      summary,
      education,
      experience,
      skills
    });

    res.status(201).json(newResume);
  } catch (error) {
    console.error("❌ Resume save error:", error.message);
    res.status(500).json({ error: "Failed to save resume" });
  }
});

// ✅ AI Suggestions Route
app.post('/api/suggestions', async (req, res) => {
  try {
    const { name, address, email, summary, education, experience, skills } = req.body;

    const prompt = `Suggest improvements for the following resume:\n
Name: ${name}
Address: ${address}
Email: ${email}
Summary: ${summary}
Education: ${education}
Experience: ${experience}
Skills: ${skills}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const suggestions = completion.choices[0].message.content;
    res.json({ suggestions });

  } catch (error) {
    console.error("❌ OpenAI error:", error.message);
    res.status(500).json({ error: "Failed to get AI suggestions" });
  }
});

// ✅ Root Route
app.get('/', (req, res) => {
  res.send("🚀 Smart Resume Builder API is running.");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err.message));

// Resume schema & model
const resumeSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    summary: String,
    education: String,
    experience: String,
    skills: String,
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);

// Save resume
app.post('/api/resume', async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (error) {
    console.error('❌ Save error:', error.message);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// Dummy AI suggestions
app.post('/api/suggestions', async (req, res) => {
  try {
    const dummySuggestions = [
      `Your resume looks solid overall. Focus on measurable achievements like "Increased sales by 15%" and keep your summary concise.`,
      `Great structure! Break up long paragraphs into bullet points for better readability. Highlight certifications or notable tools in your skills section.`,
      `Your resume could be more engaging if you add metrics (e.g. "Led a team of 5", "Completed 10+ successful projects"). Tailor your summary to the role you’re applying for.`,
      `Consider reordering sections so the most relevant experiences come first. Remove generic terms like "hardworking" and show that with results instead.`,
      `Nice start! Add links to your portfolio or GitHub and a one-sentence summary that captures your top strengths for the role you want.`
    ];
    const suggestion = dummySuggestions[Math.floor(Math.random() * dummySuggestions.length)];
    res.json({ suggestions: suggestion });
  } catch (error) {
    console.error('❌ Dummy suggestion error:', error.message);
    res.status(500).json({ error: 'Error generating dummy suggestions' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Smart Resume Builder API is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));