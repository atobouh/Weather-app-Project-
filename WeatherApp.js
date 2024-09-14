































































































































































































































// Function to add typing animation to the text
function typeText(element, text) {
    element.textContent = ''; // Clear previous content
    let index = 0;
  
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(typingInterval); // Stop typing when done
        element.style.borderRight = 'none'; // Remove caret after typing
      }
    }, 50); // Typing speed (50ms per character)
  }
  
  
  
  async function searchWeather(city) {
    try {
      resetAnimationState();
  
      const { latitude, longitude } = await getCoordinates(city);
      const weatherData = await getWeather(latitude, longitude);
  
      container.style.height = '555px';
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
  
      const image = weatherBox.querySelector('img');
      const temperature = weatherBox.querySelector('.temperature');
      const description = weatherBox.querySelector('.description');
      const humidity = weatherDetails.querySelector('.humidity span');
      const wind = weatherDetails.querySelector('.wind span');
  
      cityHide.textContent = city;
  
      const weatherCode = weatherData.current.weathercode;
  
      switch (weatherCode) {
        case 0:
          image.src = 'images/clear.png';
          description.textContent = 'Clear Sky';
          currentWeather = 'Clear';
          break;
        case 1:
        case 2:
        case 3:
          image.src = 'images/cloud.png';
          description.textContent = 'Partly Cloudy';
          currentWeather = 'Cloudy';
          break;
        case 45:
        case 48:
          image.src = 'images/mist.png';
          description.textContent = 'Fog';
          currentWeather = 'Cloudy';
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
          image.src = 'images/rain.png';
          description.textContent = 'Rain';
          currentWeather = 'Rain';
          break;
        case 71:
        case 73:
        case 75:
        case 77:
          image.src = 'images/snow.png';
          description.textContent = 'Snow';
          currentWeather = 'Snow';
          break;
        default:
          image.src = 'images/cloud.png';
          description.textContent = 'Cloudy';
          currentWeather = 'Cloudy';
      }
  
      temperature.innerHTML = `${Math.round(weatherData.current.temperature_2m)}°C`;
      humidity.innerHTML = `${Math.round(weatherData.current.relative_humidity_2m)}%`;
      wind.innerHTML = `${Math.round(weatherData.current.windspeed_10m)} Km/h`;
  
      container.classList.add('active');
  
  
    } catch (error) {
      console.error(error);
      cityHide.textContent = city;
      container.style.height = '400px';
      error404.classList.add('active');
    }
  }
  
  
  // Event listener for search button click
  searchButton.addEventListener('click', () => {
    const city = searchBox.querySelector('input').value.trim();
    if (city !== '') {
      searchWeather(city);
    }
  });