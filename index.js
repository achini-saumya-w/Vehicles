// Dummy vehicle data
const vehicleData = [
    {
        id: 1,
        name: '',
        category: 'Cars',
        price: 'Rs.50000',
        location: '',
        mileage: 20000,
        year: 2018,
        images: ['img1.png', 'img1.png'],
        postedDate: '2023-01-01',
        description: ''
    },
    {
        id: 2,
        name: '',
        category: '',
        price: 'Rs.50000',
        location: 'Colombo',
        mileage: 20000,
        year: 2018,
        images: ['img2.png', 'img2.png', 'img2.png', 'img2.png'],
        postedDate: '2023-01-01',
        description: ''
    },
    {
        id: 3,
        name: '',
        category: '',
        price: 'Rs.50000',
        location: 'Colombo',
        mileage: 20000,
        year: 2018,
        images: ['img3.png', 'img3.png', 'img3.png', 'img3.png'],
        postedDate: '2023-01-01',
        description: ''
    },
    
    
    
];

let filteredVehicles = [...vehicleData];

function handleSearch() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;
    const mileage = document.getElementById('mileage').value;
    const year = document.getElementById('year').value;
    const category = document.getElementById('category').value;

    filteredVehicles = vehicleData.filter(vehicle => {
        return (!minPrice || vehicle.price >= minPrice) &&
               (!maxPrice || vehicle.price <= maxPrice) &&
               (!location || vehicle.location.toLowerCase().includes(location.toLowerCase())) &&
               (!mileage || vehicle.mileage <= mileage) &&
               (!year || vehicle.year >= year) &&
               (!category || vehicle.category.toLowerCase().includes(category.toLowerCase()));
    });

    displayVehicles();
}

function displayVehicles() {
    const vehicleContainer = document.getElementById('vehicleContainer');
    vehicleContainer.innerHTML = '';

    filteredVehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 vehicle-card">
                <div id="carousel${vehicle.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${vehicle.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${img}" alt="Vehicle image">
                            </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${vehicle.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${vehicle.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${vehicle.name}</h5>
                    <p class="card-text">Category: ${vehicle.category}</p>
                    <p class="card-text">Price: ${vehicle.price}</p>
                    <p class="card-text">Location: ${vehicle.location}</p>
                    <p class="card-text">Mileage: ${vehicle.mileage} miles</p>
                    <p class="card-text">Year: ${vehicle.year}</p>
                    <p class="card-text">Posted: ${vehicle.postedDate}</p>
                    <p class="card-text">${vehicle.description.slice(0, 100)}... <a href="#" onclick="handleViewDetails(${vehicle.id})">View More</a></p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${vehicle.id})">View Details</button>
                </div>
            </div>`;
        vehicleContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const vehicle = filteredVehicles.find(v => v.id === id);
    const modal = new bootstrap.Modal(document.getElementById('vehicleModal'));

    document.getElementById('vehicleModalLabel').innerText = vehicle.name;
    document.getElementById('carouselInner').innerHTML = vehicle.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Vehicle image">
        </div>`).join('');
    document.getElementById('modalCategory').innerText = `Category: ${vehicle.category}`;
    document.getElementById('modalPrice').innerText = `Price: ${vehicle.price}`;
    document.getElementById('modalLocation').innerText = `Location: ${vehicle.location}`;
    document.getElementById('modalMileage').innerText = `Mileage: ${vehicle.mileage} miles`;
    document.getElementById('modalYear').innerText = `Year: ${vehicle.year}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${vehicle.postedDate}`;
    document.getElementById('modalDescription').innerText = vehicle.description;

    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    displayVehicles();
});
