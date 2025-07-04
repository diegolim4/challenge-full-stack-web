import App from './src/server'

const app = new App()

const port = process.env.PORT || 3001;

app.app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
