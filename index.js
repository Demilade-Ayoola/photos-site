const auth = "563492ad6f9170000100000188dfd62c5b3a4fa590d75b9ad48efae6";
const gallery = document.querySelector(".gallery");
const  searchInput =  document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let page=1;
let currentSearch; 

searchInput.addEventListener('input', newInput);
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetchPhotos(searchValue);
});
more.addEventListener("click",loadMore);
function newInput (e){
    currentSearch = searchValue;
searchValue = e.target.value;
}

async function getApi (url){
    const fetchData = await fetch(url,{
        method:'GET',
  headers:{
    Accept: 'application/json',
    Authorization: auth
  }
 });
 const data = await fetchData.json();
 return data;
}

function generatePictures (data){
data.photos.forEach(photo => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML =`<div class = "gallery-info"><p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src = ${photo.src.large}></img>`;

    gallery.appendChild(galleryImg);
});
} 
async function curatedPhotos(){
fetchLink =    "https://api.pexels.com/v1/curated?per_page=15&page=1"
const data = await getApi(fetchLink);
generatePictures(data);
}

async function fetchPhotos (query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data = await getApi (fetchLink);
generatePictures(data);  
}
           
function clear(){
    gallery.innerHTML = '';
    searchValue = "";
}
async function loadMore(){
page++;
if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
}
else{
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;

}
const data = await getApi (fetchLink);
generatePictures(data);
}

curatedPhotos();
