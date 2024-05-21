import express from 'express';

import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());
app.post('/process-video', (req, res) => {
  const inputVideoPath = req.body.inputVideoPath;
  const outputVideoPath = req.body.outputVideoPath;

  if (!inputVideoPath || !outputVideoPath) {
    res.status(400).send('inputVideoPath and outputVideoPath are required');
  }

  ffmpeg(inputVideoPath)
    .outputOptions('-vf', 'scale=-1:360')
    .on('end', () => {
      console.log('Processing finished !');
      res.status(200).send('Processing finished !');
    })
    .on('error', (err) => {
      console.log(`Error Occured: ${err.message}`);
      res.status(500).send(`Error while processing video: ${err.message}`);
    })
    .save(outputVideoPath);
});

const port = process.env.port || 3033;

app.listen(port, () => {
  console.log(`Vid stream service listnening at http://localhost:${port}`);
});
