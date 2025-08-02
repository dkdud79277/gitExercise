const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// --- 미들웨어 설정 ---
// 1. CORS 허용
app.use(cors());
// 2. JSON 요청 본문 파싱
app.use(express.json());
// 3. 모든 요청에 대한 로깅
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// --- API 라우트 ---
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log('--- New User Registration ---');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('---------------------------');
    res.status(200).json({ message: '회원가입이 성공적으로 완료되었습니다!' });
});

// --- 프론트엔드 정적 파일 제공 ---
// 1. frontend 폴더의 절대 경로를 계산합니다.
const frontendPath = path.join(__dirname, '..', 'frontend');

// 2. 해당 폴더의 파일들(styles.css, script.js 등)을 제공합니다.
app.use(express.static(frontendPath));

// 3. 위에서 일치하는 API나 파일이 없는 모든 GET 요청에 대해 index.html을 제공합니다.
//    (직접 주소창에 /를 입력하거나 새로고침할 때 필요합니다)
// 정적 파일 외 모든 요청(index.html로 라우팅)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});


// --- 서버 실행 ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});