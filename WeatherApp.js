// Existing DOM element selections
const container = document.querySelector('.container');
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const logo = document.getElementById('logo');
const activityButtons = document.querySelector('.activity-buttons');

// Add speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

// Logo transition
logo.classList.add('loaded');

async function getCoordinates(city) {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Location not found');
  }

  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

async function getWeather(latitude, longitude) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m&timezone=auto`);
  const data = await response.json();
  return data;
}

function resetAnimationState() {
  container.classList.remove('active');
  weatherBox.classList.remove('active');
  weatherDetails.classList.remove('active');
  error404.classList.remove('active');

  void container.offsetWidth;
}

// Swipe detection
let startX = 0;
let endX = 0;

const activityBox = document.querySelector('.activity-box');
const activityText = document.querySelector('.activity-text');

// Add swipe event listeners to detect left swipe
document.addEventListener('touchstart', function(event) {
  startX = event.touches[0].clientX;
});

document.addEventListener('touchend', function(event) {
  endX = event.changedTouches[0].clientX;
  if (startX - endX > 50) { // Left swipe detected
    displayActivityBox();
  }
});

// Function to display the activity box based on weather
function displayActivityBox() {
  // First, hide the weather box by sliding it to the left
  weatherBox.classList.add('swipe-out');
  weatherDetails.classList.add('swipe-out');

  // After the weather box is hidden, display the activity box
  setTimeout(() => {
    activityBox.classList.add('active');
    activityButtons.classList.add('active');

    const description = weatherBox.querySelector('.description'); // Correctly define description
    const weatherDescription = description.textContent.toLowerCase();
    let activityMessage = '';

    switch (weatherDescription) {
      case 'clear sky':
        activityMessage = "Clear sky today! Go for a walk, have a picnic, or enjoy outdoor sports." +
          " Men: light shorts and t-shirt. Women: sundress or casual attire." +
          " Watch 'The Secret Life of Walter Mitty', enjoy a fresh salad, and read 'The Alchemist' by Paulo Coelho.";
        break;
      case 'partly cloudy':
        activityMessage = "Partly cloudy today! Take a scenic drive, visit a park, or enjoy a coffee at an outdoor café." +
          " Men: jeans and light jacket. Women: sweater and leggings. " +
          "Watch 'Amélie', enjoy warm soup, and read 'The Night Circus' by Erin Morgenstern.";
        break;
      case 'rain':
        activityMessage = "Rainy day! Watch a movie, visit an indoor attraction, or enjoy a warm drink at a café." +
          " Men: waterproof jacket and boots. Women: raincoat and waterproof shoes. " +
          "Watch 'The Grand Budapest Hotel', enjoy warm soup, and read 'The Book Thief' by Markus Zusak.";
        ;
        break;
      case 'snow':
        activityMessage = "Snowy day! Build a snowman, go sledding, or enjoy hot chocolate by the fireplace." +
          " Men: warm coat, gloves, and boots. Women: winter jacket, scarf, and insulated boots." +
          " Watch 'Frozen', enjoy a hearty stew, and read 'The Snow Child' by Eowyn Ivey.";
        ;
        break;
      case 'cloudy':
        activityMessage = "Cloudy day! Visit a gallery, go shopping, or relax at home." +
          " Men: sweater and jeans. Women: cardigan and leggings. " +
          "Watch 'The Pursuit of Happyness', enjoy warm chili, " +
          "and read 'The Great Gatsby' by F. Scott Fitzgerald.";
        ;
        break;
      default:
        activityMessage = 'Enjoy your day!';
    }

    // Apply typing animation by setting text dynamically
    typeText(activityText, activityMessage);
  }, 600); //Delay to wait for weather box to slide out
}

let maleOutfitClickCount = 0;
let femaleOutfitClickCount = 0;
let moviesClickCount = 0;
let foodClickCount = 0;
let booksClickCount = 0;
let moreClickCount = 0;
let currentWeather = '';































































































































































































































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



























  // Team member data
const teamMembers = [
    {
      name: "Kogan",
      image: "Photos/WhatsApp Image 2024-09-11 at 5.48.14 PM.jpeg", // Replace with actual image paths
      email: "Kogannorberte.aurelien@gmail.com"
    },
    {
      name: "Praise",
      image: "Photos/WhatsApp Image 2024-09-11 at 5.36.18 PM.jpeg",
      email: "praisebah@gmail.com"
    },
    {
      name: "Bryan Besong",
      image: "Photos/WhatsApp Image 2024-09-11 at 5.49.31 PM.jpeg",
      email: "tanyibesong.bryanmaurice@gmail.com"
    },
    {
      name: "Akondip Jerry",
      image: "Photos/WhatsApp Image 2024-09-11 at 5.51.13 PM.jpeg",
      email: "akondipjerry2023@gmail.com"
    },
    {
      name: "Buma Glory",
      image: "Photos/WhatsApp Image 2024-09-11 at 5.51.30 PM.jpeg",
      email: "member3@example.com"
    },
    {
      name: "Obemo",
      image: "Photos/WhatsApp Image 2024-09-11 at 6.19.02 PM.jpeg",
      email: "eoobemo09@gmail.com"
    },
    {
      name: "Lewis",
      image: "Photos/WhatsApp Image 2024-09-11 at 6.43.36 PM.jpeg",
      email: "Lontchifobassolartisien.lewis@ict.edu.cm"
    },
    {
      name: "Atobouh",
      image: "Photos/WhatsApp Image 2024-09-11 at 6.48.19 PM.jpeg",
      email: "Atobouh.Ariel@ictunty.edu.cm"
    }
    // ... (add the rest of your team members) ...
  ];
  
  // Create the "About" tab element
  const aboutTab = document.querySelector('.about-tab');
  
  // Add team member information to the tab
  teamMembers.forEach(member => {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('team-member');
    memberDiv.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <p>${member.name}</p>
          <p>${member.email}</p>
      `;
    aboutTab.appendChild(memberDiv);
  });
  
  // Add an event listener to the "About" button
  const aboutButton = document.querySelector('.about-btn');
  aboutButton.addEventListener('click', () => {
    aboutTab.style.display = aboutTab.style.display === 'none' ? 'block' : 'none';
  });
  
  // ... (rest of your JavaScript) ...