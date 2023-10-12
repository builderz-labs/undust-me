// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/undust', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  walletId: String,
  closedAccounts: Number,
});

const User = mongoose.model('User', userSchema);

app.post('/leaderboard', async (req: { body: { walletId: any; closedAccounts: any; }; }, res: { json: (arg0: any) => void; }) => {
  const { walletId, closedAccounts } = req.body;

  let user = await User.findOne({ walletId });
  if (!user) {
    user = new User({ walletId, closedAccounts });
  } else {
    user.closedAccounts += closedAccounts;
  }

  await user.save();

  res.json(user);
});

app.get('/leaderboard', async (req: any, res: { json: (arg0: any) => void; }) => {
  const users = await User.find().sort({ closedAccounts: -1 }).limit(10);
  res.json(users);
});

app.listen(3000, () => console.log('Server running on port 3000'));
