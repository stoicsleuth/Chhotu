const email = document.querySelector('.formEmail');

email.addEventListener('keyup', (e)=>{
    const value = email.value;
    const isEmail = (/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/).test(value);
    if(isEmail)
        email.style['border-bottom-color'] = 'rgba(33, 195, 75, 0.6)';
    else
        email.style['border-bottom-color'] = 'rgba(216, 61, 61, 0.8)';
        
})

const password = document.querySelector('.formPassword');

password.addEventListener('keyup', (e)=>{
    const value = password.value;
    const isPassword = 6;
    if(value.length>=isPassword)
        password.style['border-bottom-color'] = 'rgba(33, 195, 75, 0.6)';
    else
        password.style['border-bottom-color'] = 'rgba(216, 61, 61, 0.8)';
        
})

document.querySelector('.sexyRedButton').addEventListener('click', (e)=>{
    e.preventDefault();
    setTimeout(()=>{
        document.querySelector('.sexyRedButton').classList.add('onclick');
    },200);
    setTimeout(()=>{
        document.querySelector('.sexyRedButton').classList.remove('onclick');
        document.querySelector('.sexyRedButton').textContent= "Registering..";
        document.getElementById('users-form').action ="/register";
        document.getElementById('users-form').submit();
    },2000);
    
})