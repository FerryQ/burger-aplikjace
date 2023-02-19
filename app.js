function searchPlaces(searchTerm) {
  const apiKey = 'AIzaSyCbMzvAa4uEU1Nfk-8W0_W8Ko4xjp0hykE'; // Nahradit API klíčem

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&key=${apiKey}`;

  fetch(url, { mode: 'no-cors' })
    .then(response => response.json())
    .then(data => {
      let resultsHtml = '';

      data.results.forEach(result => {
        if (result.types.includes('restaurant')) {
          let restaurantInfo = '';
          result.photos && result.photos.length > 0 && (restaurantInfo = `<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}" alt="${result.name}">`);
          resultsHtml += `<li>
            <h4>${result.name}</h4>
            <p>${result.formatted_address}</p>
            ${restaurantInfo}
          </li>`;
        }
      });

      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = `<h3>Výsledky vyhledávání</h3><ul>${resultsHtml}</ul>`;
    })
    .catch(error => console.log(error));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('food-search').value;
  searchPlaces(searchTerm);
}

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);
