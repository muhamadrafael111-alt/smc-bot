const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMC Bot Running");
});

app.post("/signal", async (req, res) => {
  const { signal, score, reason } = req.body;

  if (score >= 70) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `📊 XAUUSD SMC SIGNAL\n\nSIGNAL: ${signal}\nSCORE: ${score}\nREASON: ${reason}`
      })
    });

    return res.json({ ok: true, telegramSent: true });
  }

  res.json({ ok: true, telegramSent: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SMC BOT RUNNING");
});
