import SearchBar from "./searchBar.jsx";

const MyComponent = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    // Perform search and update results state
    setResults(search(query));
  };
}
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: 'Search for Local Art Location', // Placeholder text for the search bar
  bbox: [-114.0565422, 51.0233457, -114.0581121, 51.0955565], // Boundary for Berkeley
  proximity: {
    longitude: -114.0571411,
    latitude: 51.0453775
  } // Coordinates of LocalArt
});