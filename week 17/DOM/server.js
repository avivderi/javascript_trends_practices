import express from 'express';
const PORT = 3000;

const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// ===== הדאטה עכשיו חיה בשרת, לא בקובץ ה-JS של הדפדפן =====
const team = [
  {
    id:1,
    name: "נועה כהן",
    role: "Frontend Developer",
    department: "frontend",
    skills: ["React", "CSS", "JSDoc"]
  },
  {
    id:2,
    name: "איתי לוי",
    role: "Backend Developer",
    department: "backend",
    skills: ["Node.js", "PostgreSQL", "Docker"]
  },
  {
    id:3,
    name: "מאיה בן דוד",
    role: "DevOps Engineer",
    department: "devops",
    skills: ["AWS", "Kubernetes", "CI/CD"]
  },
  {
    id:4,
    name: "עומר גל",
    role: "Fullstack Developer",
    department: "frontend",
    skills: ["Vue", "Express", "MongoDB"]
  }
];


server.get('/', (_req, res) => {
  res.send(team);
})

server.get('/:id', (req, res) => {
  const { id } = req.params;
  const specificEmpl = team.find(empl => empl.id === Number(id));

  if (!specificEmpl) {
    return res.status(404).send({ message: 'Employee Not Found' });
  }

  res.send(specificEmpl);
})



server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
