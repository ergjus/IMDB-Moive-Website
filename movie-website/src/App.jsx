import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import MovieCard from "./components/MovieCard";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {fetchMovies} from "./utils/FetchMovies";
import LinearProgress from "@mui/material/LinearProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "./components/Footer";

function App() {
  const [username, setUsername] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate = useNavigate();

  // Initial load of movies from Kaggle dataset
  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      const randomizedMovies = moviesData.sort(() => 0.5 - Math.random());
      setMovies(randomizedMovies);
    };
    loadMovies();
  }, []);

  // Handling movie search
  const handleSearch = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  // When Favorites checkbox is checked or unchecked
  const handleFavoriteToggle = (movie) => {
    console.log("move favorite: ", movie);
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movie)) {
        return prevFavorites.filter((fav) => fav !== movie);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleSuggestMovies = (genre) => {
    console.log("suggest movies: ", genre);
    setLoading(true);

    setTimeout(() => {
      const genreMovies = movies.filter(
        (movie) => movie.Genre && movie.Genre.includes(genre)
      );
      const randomMovies = genreMovies
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setSuggestedMovies(randomMovies);
      setLoading(false);
    }, 2000);
  };

  const generateSuggestionsButton = () => {
    console.log("multi select", selectedGenres);

    const genres = selectedGenres.sort().join(", ");

    setLoading(true);
    setTimeout(() => {
      const genreMovies = movies.filter(
        (movie) => movie.Genre && movie.Genre.includes(genres)
      );
      const randomMovies = genreMovies
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      setSuggestedMovies(randomMovies);
      setLoading(false);
    }, 2000);
  };

  // Filtering movies when search input is populated
  const filteredMovies = movies.filter(
    (movie) =>
      movie.Series_Title &&
      movie.Series_Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    setUsername(""); // Reset username to "log out"
    navigate("/"); // Navigate back to the login page
  };

  const movieGenre = [
    "Adventure",
    "Drama",
    "Action",
    "Comedy",
    "Romance",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Fantasy",
    "Animation",
    "Family",
    "War",
    "Crime",
    "Mystery",
    "Thriller",
    "Biography",
    "Music",
    "Western",
  ];

  return (
    <div>
      {/* Display Header only if the user is logged in */}
      {username && <Header loggedInUser={username} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route
          path="/homepage"
          element={
            username ? (
              <div className="container p-6">
                <div className="p-4">
                  <div className="genreSelector pb-12">
                    <h1 className="text-xl font-bold"> What to watch next? </h1>
                    <p className="text-slate-400">
                      Select your favorite genre and click the button to
                      generate new movie ideas
                    </p>
                    <Autocomplete
                      multiple
                      options={movieGenre}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      onChange={(event, value) => setSelectedGenres(value)}
                      sx={{
                        margin: "6px",
                        paddingTop: "12px",
                        color: "#f5f7f8",
                        "& .MuiAutocomplete-inputRoot": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            color: "#f5f7f8",
                            borderColor: "#fbecb2", // Optional: Change border color
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fbecb2", // Ensure border stays black when focused
                          },
                        },
                        "& .MuiAutocomplete-paper": {
                          backgroundColor: "#272829",
                        },
                        "& .MuiChip-root": {
                          backgroundColor: "#272829", // Darker background for chips
                          color: "#f5f7f8", // Text color for chips
                        },
                        "& .MuiChip-label": {
                          color: "#f5f7f8", // Ensure text inside the chip is white
                        },
                        "& .MuiChip-deleteIcon": {
                          color: "#fbecb2", // Change icon color to a darker gray
                          "&:hover": {
                            color: "#ffffff", // Optional: Change icon color on hover
                          },
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Movie Genre"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#fbecb2",
                              color: "#f5f7f8",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#272829",
                            },
                            "& .MuiInputLabel-shrink": {
                              color: "#f5f7f8",
                              opacity: 0,
                            },
                          }}
                        />
                      )}></Autocomplete>

                    <Button
                      onClick={generateSuggestionsButton}
                      variant="contained"
                      sx={{
                        margin: "6px",
                        marginTop: "10px",
                        backgroundColor: "#151515",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#fbecb2",
                          color: "#151515",
                        },
                      }}>
                      Generate
                    </Button>
                  </div>
                  {loading ? (
                    <div className="w-full">
                      <LinearProgress
                        sx={{
                          backgroundColor: "white",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#fbecb2",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* Suggested Movies Section */}
                  <div className="p-4">
                    <h1 className="text-xl font-bold"> Suggestions </h1>
                    <div className="py-5">
                      <div className="overflow-x-auto whitespace-nowrap">
                        <div className="inline-flex gap-7 py-5">
                          {suggestedMovies.length > 0 ? (
                            suggestedMovies.map((movie, index) => (
                              <MovieCard
                                key={index}
                                movie={movie}
                                isSuggested={true}
                                onFavoriteToggle={() =>
                                  handleFavoriteToggle(movie)
                                }
                                onSuggestedButton={handleSuggestMovies}
                              />
                            ))
                          ) : (
                            <p className="text-slate-400">
                              No suggested movies available.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 pt-10">
                    <h1 className="text-xl font-bold">All Available Movies </h1>
                    <TextField
                      size="small"
                      label="Search movies"
                      onChange={(e) => handleSearch(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#CECFC7",
                          "& fieldset": {
                            borderColor: "#CECFC7",
                          },
                          "&:hover fieldset": {
                            borderColor: "#CECFC7",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#CECFC7",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#CECFC7",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#CECFC7",
                        },
                      }}></TextField>
                  </div>

                  <div className="overflow-x-auto whitespace-nowrap">
                    <div className="inline-flex gap-7 py-5">
                      {filteredMovies.slice(0, 40).map((movie, index) => (
                        <MovieCard
                          key={index}
                          movie={movie}
                          isSuggested={true}
                          isFavorite={favorites.includes(movie)}
                          onFavoriteToggle={() => handleFavoriteToggle(movie)}
                          onSuggestedButton={handleSuggestMovies}></MovieCard>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  {/* Favorites Section */}
                  <div className="flex-1 p-4">
                    <h1 className="text-xl font-bold"> Favorites </h1>
                    <div className="py-5">
                      <div className="overflow-x-auto whitespace-nowrap">
                        <div className="flex flex-wrap gap-2 py-5">
                          {favorites.length > 0 ? (
                            favorites.map((movie, index) => (
                              <MovieCard
                                key={index}
                                movie={movie}
                                isFavorite={true}
                                isSuggested={true}
                                onSuggestedButton={handleSuggestMovies}
                                onFavoriteToggle={() =>
                                  handleFavoriteToggle(movie)
                                }
                              />
                            ))
                          ) : (
                            <p className="text-slate-400">
                              No favorites at the moment. Try adding some!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More content can go here */}
                <div className="p-4">
                  <Footer></Footer>
                </div>
              </div>
            ) : (
              <Navigate to="/" /> // Redirect to login if not logged in
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
