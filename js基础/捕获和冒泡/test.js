const ul = document.getElementsByClassName("xxx");
ul.addEventListener("click", function (e) {
    const target = e.target;
    if(target.tagName.toLowerCase() === 'li'){
        const liList = document.querySelectorAll('li');
        const index = Array.prototype.indexOf.call(liList,target);
        console.log(index)
    }
});
