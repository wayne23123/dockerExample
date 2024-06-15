const fs = require('fs').promises;

const exists = require('fs').exists;

const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');

  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');

  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;

  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');

  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');
  // 將永久文件保存到 feedback 文件夾，但也保存到暫時資料夾

  await fs.writeFile(tempFilePath, content);
  // 保存到暫時資料夾

  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect('/exists');
    } else {
      // await fs.rename(tempFilePath, finalFilePath);
      // .rename 方法 如果文件跨多個設備移動，則重命名方法將不起作用

      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      // 複製文件，然後手動刪除他

      res.redirect('/');
    }
  });
});

app.listen(80);
