import express from 'express';
import { PasswordCripto } from './PasswordCripto';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando corretamente');
});

app.post('/signup', async (req, res) => {
    

    try {
        const hashedPassword = await PasswordCripto.hashPassword(req.body.password);
        // Salve 'username' e 'hashedPassword' no banco de dados (simulação)

        const verifyPassword = await PasswordCripto.verifyPassword(req.body.password, hashedPassword);
        res.send(verifyPassword)
    } catch (e) {
        res.send(e);
    }
});

// Rota para autenticar um usuário
app.get('/login', async (req, res) => {
    const { username, password } = req.body;

    // Consulte o banco de dados para obter o 'hashedPassword' do usuário com base no 'username' (simulação)
    const hashedPasswordFromDatabase = 'hashedPasswordSimulado';

    try {
        const isPasswordValid = await PasswordCripto.verifyPassword(password, hashedPasswordFromDatabase);

        if (isPasswordValid) {
            res.status(200).json({ message: 'Autenticado com sucesso' });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro na autenticação' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
