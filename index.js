const loadAllPhones =async (status,brandName) =>{
    console.log(brandName)
    document.getElementById("spinner").style.display = "none";
// ========way-1===============
    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone `)
    // .then(res =>res.json())
    // .then(data => console.log(data))

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`)
    const data = await response.json()
   console.log(data)

if(status){
    displayAllPhone(data.data)
}else{
    displayAllPhone(data.data.slice(0,6))
}



    
    
}

const displayAllPhone = (phones) =>{
 
const phoneContainer = document.getElementById("phones-container")
phones.forEach(phone => {
    const {brand,image,slug} =phone;
    const div = document.createElement("div")
    div.innerHTML=`
    <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">



      <button onclick ="phoneDetails('${slug}')" class="btn btn-primary">ShowDetails</button>
    </div>
  </div>
</div>
    
    `;
    phoneContainer.appendChild(div)
});

}

const handleShowAll = ()=>{
   loadAllPhones(true)
}



// ===== search============
const handleSearch = () =>{
  document.getElementById("spinner").style.display = "block"

  const searchText =document.getElementById("search-box").value;
    setTimeout(function() {
        loadAllPhones(false,searchText)
    }, 3000);
}


const phoneDetails =async (slugs)=>{
const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
const data = await response.json();
console.log(data.data)


const {image,brand,slug}=data.data;

const modalContainer =document.getElementById("modal-container");

modalContainer.innerHTML=`

 <dialog id="my_modal_1" class="modal">
    <div class="modal-box text-center" >
    <div class ="flex justify-center items-center "><img src = "${image}"/></div>
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="py-4"> ${slug}</p>
      <div class="modal-action mx-auto ">
   <form method="dialog">
          <button class="btn text-center mx-auto">Close</button>
         </form>
      </div>
    </div>
  </dialog>
`;
my_modal_1.showModal();
}


loadAllPhones(false,"iphone")