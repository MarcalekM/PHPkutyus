document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('userForm');
    const errorDiv = document.getElementById('error');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        errorDiv.innerHTML = "";
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.querySelector('input[name="course"]:checked');
        const photo = document.getElementById('photo').files[0];

        console.log('Név: ', name);
        console.log('Email: ', email);
        console.log('Tel: ', phone);
        console.log('Tanfolyam: ', course ? course.value : "Nincs kiválasztva");
        console.log('Fotó: ', photo ? photo.name : "Nincs kiválasztva");

        let errors = [];
        if(name === ''){
            errors.push('A név megadása kötelező');
        }
        const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if(!emailPattern.test(email)){
            errors.push('Az email formátum helytelen');
        }
        if(phone.length < 7){
            errors.push('A telefonszám túl rövid');
        }
        if(!course){
            errors.push('Válasszon tanfolyamot');
        }
        console.log('Hibák: ' , errors);
        if(errors.length > 0){
            errorDiv.innerHTML = errors.join('<br>');
        }
        else{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('course', course.value);

            if(photo){
                formData.append('photo', photo);
            }

            console.log('formData: ', formData);

            fetch('form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log('Szerver válasza:');
                console.log(data);
                errorDiv.innerHTML = data;
            }).catch(error => {
                console.error('Fetch hiba: ', error);
                error.message
            })
        };
    });
});