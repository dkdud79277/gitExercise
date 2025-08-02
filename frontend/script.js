document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            form.reset();
        } else {
            alert('회원가입 처리 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버와 통신 중 오류가 발생했습니다.');
    }
});