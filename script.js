document.addEventListener("DOMContentLoaded",function(){
    let cityinput=document.getElementById("city-input");
    let citybutton=document.getElementById("get-weather-btn");
    let weatherinfo=document.getElementById("weather-info");
    let cityname=document.getElementById("city-name");
    let temperature=document.getElementById("temperature");
    let description=document.getElementById("description");
    let errormessage=document.getElementById("error-message");
    let API_KEY="92300bf9072543d3c4c85c0342034408";
    citybutton.addEventListener("click", async ()=>{
        let city=cityinput.value.trim();
        if(!city)
            return;
        try{
            let weatherdata=await fetchdata(city);
            // console.log(typeof weatherdata);
            display(weatherdata); 

        }catch(error){
            showerror();
        }
    })
    async function fetchdata(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        
        const response=await fetch(url);
        console.log(typeof response);
        console.log(response);
        if(!response.ok){
            throw new Error("city not found");
        }
        const data=await response.json();
        return data;
    }
    function display(weatherdata){
        weatherinfo.classList.remove("hidden");
        errormessage.classList.add("hidden");
        console.log(weatherdata);
        const {name,main,weather}=weatherdata;
        // console.log("Name " , name);
        cityname.textContent=name;
        temperature.textContent=main.temp;
        description.textContent=weather[0].description;
    }
    function showerror(){
        weatherinfo.classList.add("hidden");
        errormessage.classList.remove("hidden");
    }
})