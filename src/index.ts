import express from "express";
import articleRoutes from "./infrastructure/http/routes/articleRoutes";
import userRoutes from "./infrastructure/http/routes/userRoutes";

const app = express();
const {PORT} = process.env;

app.use(express.json());

app.use('/api', articleRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
