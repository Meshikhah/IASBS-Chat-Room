    var state=false;
    function allEnglishCodes(e) {
        var englishUniCode = /^[A-Za-z0-9-+!#$*=]*$/;
        if (englishUniCode.test(e.key)) {
        }
        else {
            e.preventDefault();
        }
    }
    function checkPassword() {
        const password = document.getElementById('pass').value
        var englishUniCode = /^[A-Za-z0-9-+!#$*=]*$/;
        if (password.length < 8) {
            return 1
        }
        else if (!englishUniCode.test(password)) {
            return 2
        }
        else {
            return 0
        }
    }
    function limitCharchters(limit, elementId, e) {
        const elementValue = document.getElementById(elementId).value
        if (elementValue.length >= limit) {
            e.preventDefault()
        }
    }

    function validateEmail() {
        const value = document.getElementById('uiEmail').value
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function checkRePassword() {
        const password = document.getElementById('pass').value
        const rePassword = document.getElementById('confirmPass').value
        if (rePassword != password) {
            return false
        }
        else {
            return true
        }
    }

    function selectChanged(selectId, event) {
        const selectValue = document.getElementById(selectId).value
        console.log(event)
    }
    
	function toggle(){
        
		if(state)
			{
				document.getElementById("pass").setAttribute("type","password"); 
				//document.getElementById("togglePassword").style.color='#7a797e';
                state=false;
                		
			}
			else
			{
				document.getElementById("pass").setAttribute("type","text"); 
				document.getElementById("togglePassword").style.color='#5887ef';
				state=true;
			}
    }
    function check() {
        errorsField = document.getElementById('errors')
        firstName = document.getElementById('uiName').value
        lastName = document.getElementById('uiFamily').value
        email = document.getElementById('uiEmail').value
        inneredHtml = ''
		errorsField.innerHTML = inneredHtml
		var x=true;
		
		if (firstName.length < 1) {
            inneredHtml += '<p>Please add your name</p>'
			x=false;
        }
        if (lastName.length < 1) {
            inneredHtml += '<p>Please add your family name</p>'
			x=false;
        }
        if (email.length < 1) {
            inneredHtml += '<p>please add email</p>'
			x=false;
        }
		
        if (!validateEmail()) {
            inneredHtml += '<p>your email format is wrong</p>'
			x=false;
        }
		
        checkPasswordStatus = checkPassword()
		
        if (checkPasswordStatus == 1) {
            inneredHtml += '<p>your password should be at least 8 characters</p>'
			x=false;
        }

        if (checkRePassword() == false) {
            inneredHtml += '<p>your passwords dont math</p>'
			x=false;
        }
		
		if(x===false)
		{
			errorsField.innerHTML = inneredHtml
			return false
		}
		
        // console.log(inneredHtml)
		document.getElementById("myForm").submit();
		return true;
		

    }