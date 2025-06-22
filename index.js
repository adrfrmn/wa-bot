const { create } = require('@open-wa/wa-automate');
const express = require('express');
const app = express();
app.use(express.json());

create().then(client => {
  console.log("Bot siap jalan 😎");

  // Endpoint buat kirim pesan dari luar
  app.post("/send", async (req, res) => {
    const { to, message } = req.body;
    await client.sendText(to, message);
    res.send("Pesan dikirim ✅");
  });

  // Jawab otomatis buat ngetes
  client.onMessage(async message => {
    if (message.body === "!ping") {
      await client.sendText(message.from, "Pong! Bot aktif ✅");
    }
  });
});

app.listen(3000, () => console.log("Bot jalan di port 3000"));
