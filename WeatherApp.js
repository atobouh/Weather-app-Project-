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

// Function to open a URL in a new tab
function openWebsite(url) {
  window.open(url, '_blank');
}

// Add event listeners for the activity buttons
document.querySelectorAll('.activity-btn').forEach(button => {
  button.addEventListener('click', () => {
    const activity = button.dataset.activity;
    let message = '';

    switch (activity) {
      case 'male-outfits':
        maleOutfitClickCount++;
        if (maleOutfitClickCount === 1) {
          message = "Here are some outfit suggestions for men based on the current weather...";
        } else if (maleOutfitClickCount === 2) {
          maleOutfitClickCount = 0; // Reset click count
          switch (currentWeather) {
            case 'Rain':
              openWebsite('https://www.bing.com/images/search?view=detailV2&ccid=WdLzyQIP&id=9C8A48774AA1A415AA37832C15045BCB715EF486&thid=OIP.WdLzyQIPdHaA39VRoaxLJgHaJQ&mediaurl=https%3A%2F%2Fnextluxury.com%2Fwp-content%2Fuploads%2Fnextluxfashion-20200601-ellisanthony-20200303-bsnekk-768x960.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.59d2f3c9020f747680dfd551a1ac4b26%3Frik%3DhvRecctbBBUsgw%26pid%3DImgRaw%26r%3D0&exph=960&expw=768&q=how+to+dress+in+a+rainy+weather+black+men&simid=607989785965042478&form=IRPRST&ck=DF37CC6F15BBE2547D8D511ED2667475&selectedindex=0&itb=0&ajaxhist=0&ajaxserp=0&vt=0&pivotparams=insightsToken%3Dccid_4hrlCxL7*cp_053C06BB9474B088E748A59B1DE08812*mid_9C8A48774AA1A415AA37BCB9C1D51E3E71BCAA02*simid_608025258114364138*thid_OIP.4hrlCxL7Nkf306vU6d61sAHaJQ&sim=11&iss=VSI&ajaxhist=0&ajaxserp=0');
              return;
            case 'Snow':
              openWebsite('https://www.bing.com/images/search?view=detailv2&form=SBIHVR&iss=sbi&q=imgurl:https%3A%2F%2Fi.pinimg.com%2F474x%2F87%2F9f%2F14%2F879f1474423e80190b032149bddf7909.jpg&pageurl=https%3A%2F%2Fwww.pinterest.com%2Fsearch%2Fpins%2F%3Fq%3Dwinter%2520black%2520man%2520outfit%2520cold%2520weather%26rs%3Dtyped&pagetl=Pinterest&imgalt=This+contains+an+image+of%3A+3+Casual+Fashion+Men%E2%80%99s+Winter+Jacket+looks+you+will+love.%F0%9F%98%89&imgsz=236x419&selectedindex=0&id=https%3A%2F%2Fi.pinimg.com%2F474x%2F87%2F9f%2F14%2F879f1474423e80190b032149bddf7909.jpg&ccid=bNs8Ffyc&mediaurl=https%3A%2F%2Fi.pinimg.com%2F474x%2F87%2F9f%2F14%2F879f1474423e80190b032149bddf7909.jpg&exph=842&expw=474&vt=2&sim=11');
              return;
            default:
              openWebsite('https://www.bing.com/images/search?view=detailv2&form=SBIHVR&iss=sbi&q=imgurl:https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fdb%2F5d%2F32%2Fdb5d320b3b01cd133c3102281fff2508.jpg&pageurl=https%3A%2F%2Fwww.pinterest.com%2Fsearch%2Fpins%2F%3Fq%3DCasual%2520outfits%2520for%2520black%2520men%26rs%3Dsrs%26b_id%3DBF_VAn2vW3IYAAAAAAAAAABkomDv726DOh67pF1LmEyQneXHk7aLwdVFIpCVrZBIMpW3ENwK9galaLYurn6J1SewqK0QRiyUig%26source_id%3DTHrAjPGJ&pagetl=Pinterest&imgalt=This+contains+an+image+of%3A+&imgsz=236x292&selectedindex=0&id=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fdb%2F5d%2F32%2Fdb5d320b3b01cd133c3102281fff2508.jpg&ccid=In1h7cYt&mediaurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fdb%2F5d%2F32%2Fdb5d320b3b01cd133c3102281fff2508.jpg&exph=1588&expw=1284&vt=2&sim=1');
              return;
          }
        }
        break;
      case 'female-outfits':
        femaleOutfitClickCount++;
        if (femaleOutfitClickCount === 1) {
          message = "Here are some outfit suggestions for women based on the current weather...";
        } else if (femaleOutfitClickCount === 2) {
          femaleOutfitClickCount = 0; // Reset click count
          switch (currentWeather) {
            case 'Rain':
            case 'Snow':
              openWebsite('https://www.bing.com/images/search?view=detailv2&form=SBIHVR&iss=sbi&q=imgurl:https%3A%2F%2Fi.pinimg.com%2F474x%2F1e%2F11%2F76%2F1e1176fbbd041dfd8ad37606a372cba5.jpg&pageurl=https%3A%2F%2Fwww.pinterest.com%2Fsearch%2Fpins%2F%3Fq%3Dwinter%2520blackwomen%2520outfit%2520cold%2520weather%26rs%3Dtyped&pagetl=Pinterest&imgalt=This+contains+an+image+of%3A+Cute&imgsz=236x419&selectedindex=0&id=https%3A%2F%2Fi.pinimg.com%2F474x%2F1e%2F11%2F76%2F1e1176fbbd041dfd8ad37606a372cba5.jpg&ccid=pAHJ1%2FlH&mediaurl=https%3A%2F%2Fi.pinimg.com%2F474x%2F1e%2F11%2F76%2F1e1176fbbd041dfd8ad37606a372cba5.jpg&exph=842&expw=474&vt=2&sim=1');
              return;
            default:
              openWebsite('https://www.bing.com/images/search?view=detailv2&form=SBIHVR&iss=sbi&q=imgurl:https%3A%2F%2Fi.pinimg.com%2Foriginals%2F9b%2F0b%2Fff%2F9b0bffd8a75a497772ce8d8c60622397.jpg&pageurl=https%3A%2F%2Fwww.pinterest.com%2Fsearch%2Fpins%2F%3Fq%3Dspring%2520outfits%2520black%2520women%26rs%3Dtyped&pagetl=Pinterest&imgalt=Women+Styles+Club%3A+Business+casual+fall+outfits+for+black+women%3A+Smart+and+classy+looks+for+work&imgsz=236x425&selectedindex=0&id=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F9b%2F0b%2Fff%2F9b0bffd8a75a497772ce8d8c60622397.jpg&ccid=rYnMlp69&mediaurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F9b%2F0b%2Fff%2F9b0bffd8a75a497772ce8d8c60622397.jpg&exph=1016&expw=564&vt=2&sim=1');
              return;
          }
        }
        break;
      case 'movies':
        moviesClickCount++;
        if (moviesClickCount === 1) {
          message = "Consider watching these movies that match the mood of the weather...";
        } else if (moviesClickCount === 2) {
          moviesClickCount = 0;
          openWebsite('https://www.primevideo.com/offers/nonprimehomepage/ref=atv_dl_rdr');
          return;
        }
        break;
      case 'food':
        foodClickCount++;
        if (foodClickCount === 1) {
          message = "Here are some food recommendations that go well with this weather...";
        } else if (foodClickCount === 2) {
          foodClickCount = 0;
          openWebsite('https://www.tripadvisor.com/Restaurants-g293773-zfp19-Yaounde_Centre_Region.html');
          return;
        }
        break;
      case 'books':
        booksClickCount++;
        if (booksClickCount === 1) {
          message = "These books are perfect for reading in the current weather conditions...";
        } else if (booksClickCount === 2) {
          booksClickCount = 0;
          openWebsite('https://manybooks.net/');
          return;
        }
        break;
      case 'more':
        moreClickCount++;
        if (moreClickCount === 1) {
          message = "Here are additional activities you might enjoy in this weather...";
        } else if (moreClickCount === 2) {
          moreClickCount = 0;
          openWebsite('https://www.bing.com/chat?q');
          return;
        }
        break;
    }

    // Update the activity box with the new message
    typeText(activityText, message);
  });
});

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

// Function to handle speech recognition
function handleSpeech() {
  recognition.start();
  console.log('Ready to receive a city name.');
}

// Event listener for speech recognition result
recognition.onresult = function(event) {
  let city = event.results[0][0].transcript;
  city = city.replace(/[.,!?;:]+$/, '').trim();
  console.log('Recognized city:', city);
  searchBox.querySelector('input').value = city;
  searchWeather(city);
};

// Event listener for double click
document.addEventListener('dblclick', handleSpeech);

// For mobile devices, use touchend event
document.addEventListener('touchend', function(event) {
  if (event.touches.length === 0) {
    handleSpeech();
  }
});
// ... (your existing JavaScript) ...

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