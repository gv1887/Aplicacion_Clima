window.addEventListener('load',()=>{
    //asignamos variables
    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let img = document.getElementById('iconoAnimado');
    let buscador = document.getElementById('buscador');
    let boton = document.getElementById('boton');
    let caja1 = document.getElementById('caja1');
    let caja2 = document.getElementById('caja2');
    let fecha = document.getElementById('fecha');
    let wind = document.getElementById('viento');
    let humidity = document.getElementById('humedad');

  

    
      const date = new Date();
      const nombre_mes = date.toLocaleString(undefined, { month: 'short' });
      caja2.style.display='none';
      caja1.style.display='none';
      
             
      boton.addEventListener('click',()=>{
        let ciudad = buscador.value
        if (ciudad === buscador.value.trim())
              if(ciudad === ""){
                alert("por favor, ingrese una ciudad")
                return;
              }
              const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&date=${date}&lang=es&appid=a18efed761bceffe039a14edda7e9517`
      
              fetch(url)
                  .then(response => {return response.json() })
                  .then ( data =>{

                          if(data.cod === "404"){
                            ubicacion.textContent = "Ciudad no encontrada";
                            caja2.style.display = 'block';
                            img.style.display = 'none';
                            caja1.style.display = 'none';
                            fecha.style.display = 'none';
                            
                            return;
                          }
                          
                         
                            caja2.style.display='flex';
                            caja1.style.display = 'block';
                            img.style.display = 'block';

                          let temp = Math.round(data.main.temp -273); //La resta es porque esta en gradps kelvin
                          temperaturaValor.textContent = `${temp} °C`;

                          let pais = data.sys.country
                          
                          let descrip = data.weather[0].description

                          let humedad = data.main.humidity

                          let viento = data.wind.speed 

                          console.log(data)
                          
                          temperaturaDescripcion.textContent = descrip.toUpperCase()

                          fecha.textContent = nombre_mes.toUpperCase() + " - " + date.getDate() 
                          
                          ubicacion.textContent = data.name + " , " + pais

                          humidity.textContent = humedad + " %"

                          wind.textContent = viento + " m/s"
                         

                          
                          

                      //iconos estaticos
                      // let iconoCodigo = data.weather[0].icon
                      // const url_icon = `https://openweathermap.org/img/wn/${icono}.png`


                     
                      switch (data.weather[0].main) {
                          case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'

                            break;
                          case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'

                            break;
                          case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'

                            break;
                          case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                              break;                        
                          case 'Clear':
                              iconoAnimado.src='animated/day.svg'

                            break;
                          case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'

                              break;  
                          case 'Clouds':
                              iconoAnimado.src='animated/cloudy-day-1.svg'

                              break;  
                          default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'

                        }
      
                  })
                  
             })    
        
             
        
})    























