import express from 'express';
const app = express();
const PORT: string | number = process.env.PORT || 5000;

// handler.use(express.static(path.resolve(__dirname, "../../build")));
// handler.get("/", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
// });
app.use(express.static('./build'));
app.use('*', (req, res) => {
    res.sendFile('./build/index.html');
});

app.listen(PORT, () => console.log(`hosting @${PORT}`));
