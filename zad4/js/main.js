
let endofThePage = 0
let preloading = false;

console.log("infinite scroll");

const showPreloader = ()=>{
    let preloader = document.getElementById('preloader');
    console.log('showPreloader()');
    preloader.style.display ='block';
    preloading = true;


}
const hidePreloader = ()=>{
    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display ='none';
    preloading = false;
    
}

const getData = ()=>{
    if (!preloading){
        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(res=>res.json())
        .then(data=>{
            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);
    
            for (let user of data){
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let website = document.createElement('p');
    
                pId.innerText =`User ID : ${user.id}`;
                pName.innerText =`User Name : ${user.name}`;
                website.innerHTML =`User URL : ${user.website} <br /> ------`;
    
                body.appendChild(pId);
                body.appendChild(pName);
                body.appendChild(website);
    
            }
            preloading = false;
            hidePreloader();
    
            console.log(data);
        })
        .catch(error=>{
            console.log(error);
        });
    }
    }
  
const scrollToEndofPage = ()=>{
    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight =Math.ceil(scrollTop + clientHeight);

console.log(`scrollHeight: ${scrollHeight}`);
console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
console.log(`scrollTop: ${scrollTop}`);
console.log(`clientHeight: ${clientHeight}`);
console.log(`=======`);

if (sumScrollTopClientHeight >= scrollHeight){
    endofThePage += 1
    console.log(`scrolled to the end of the page: ${endofThePage}`);
    getData();

}



    getData();
}


window.addEventListener('scroll', scrollToEndofPage);