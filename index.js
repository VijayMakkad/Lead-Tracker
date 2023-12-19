const inputbtn = document.getElementById("input-btn");
const inputel = document.getElementById("input-el");
const listel = document.getElementById("leads");
const tabBtn = document.getElementById("tab-btn")

let myleads = [];
let i = 0;
let clearbtn = document.getElementById("reset");

const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"));

if(leadsfromlocalstorage){
  myleads=leadsfromlocalstorage
  render(myleads)
}

tabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myleads.push(tabs[0].url)
      localStorage.setItem("myleads", JSON.stringify(myleads));
      render(myleads)
  })
})

function render(leads) {
  let listitems = "";
  for (i = 0; i < leads.length; i++) {
    //listitems += "<li><a target='_blank' href='"+myleads[i]+"'>" + myleads[i] + "</a></li>";

    listitems += `<li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>
        `;

    /*
          same work as above one line
          const li=document.createElement()
          li.textcontent=myleads[i]
          listel.append(li)
          */
  }
  listel.innerHTML = listitems;
}

inputbtn.addEventListener("click", function () {
  myleads.push(inputel.value); //.value is used to get value from the user
  localStorage.setItem("myleads", JSON.stringify(myleads));

  render(myleads);
  console.log(localStorage.getItem("myleads"));
}); //This doesnt require html to have onclick decalred with function


clearbtn.addEventListener("dblclick", function () {
  myleads = [];
  localStorage.clear()
  render(myleads)
});

// myleads=JSON.parse(myleads) //CONVERTING TO STRING
