
window.onload = function(){
    
    const button = document.querySelector(".button");
    const text = document.querySelector(".text");


    button.addEventListener("click",()=>{
        button.classList.add("progress");
        text.innerText = "Uploading..."

        setTimeout(()=>{
            button.classList.remove("progress");
            text.innerText = "Uploaded"
        },6000);
    })
}