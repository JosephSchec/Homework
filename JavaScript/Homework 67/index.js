(function(){
    'use strict';
    function get(id){
        return document.getElementById(id);
    }
    get('form').addEventListener('submit',event=>{
        event.preventDefault();
        get('display').style.display='block';
        let text=get('textArea').value;
        if(text.trim()===''){
            get('alert').innerText='this is a test of the emergency broadcast system';
        }else{
            get('alert').innerText=text;
        }
    });
    get('okBtn').addEventListener('click',()=>{
        get('alert').innerText='';
        get('display').style.display='none';
    });
}());