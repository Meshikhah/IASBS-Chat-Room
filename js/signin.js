var state=false;
function toggle(){
    if(state)
        {
            document.getElementById("pass").setAttribute("type","password"); 
            document.getElementById("togglePassword").style.color='#7a797e';
            state=false;
                    
        }
        else
        {
            document.getElementById("pass").setAttribute("type","text"); 
            document.getElementById("togglePassword").style.color='#5887ef';
            state=true;
        }
}