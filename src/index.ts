import express from "express";
import { UserRouter } from "./routes/user.route";
import { SocialLinksRouter } from "./routes/socailLinks.route";
import { SkillsRouter } from "./routes/skills.route";
import { ProjectsRouter } from "./routes/projects.route";
import { ExperienceRouter } from "./routes/experience.route";
import cors from "cors"
import { CertAchivementsRouter } from "./routes/cert_achivements.route";
const app = express();
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.json({
        message: "health check"
    });
});

app.use("/api/v1/user", UserRouter)
app.use("/api/v1/projects", ProjectsRouter)
app.use("/api/v1/skills", SkillsRouter)
app.use("/api/v1/socialLinks", SocialLinksRouter)
app.use("/api/v1/experience", ExperienceRouter)
app.use("/api/v1/certs", CertAchivementsRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
