import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Button from "@mui/material/Button";
import AssistantIcon from "@mui/icons-material/Assistant";
import Rating from "@mui/material/Rating";

const MovieCard = ({
  movie,
  isFavorite,
  onFavoriteToggle,
  onSuggestedButton,
  isSuggested,
}) => {
  return (
    <Card
      className="w-72 h-auto p-2"
      sx={{backgroundColor: "#FBECB2"}} // Darker background
    >
      <CardMedia
        sx={{height: 280}}
        image={movie.Poster_Link}
        title={movie.Series_Title}
      />
      <CardContent>
        <div>
          <h2 className="font-bold break-words">{movie.Series_Title}</h2>
          <div className="py-2">
            <h3 className="font-bold text-sm">
              Genre:{" "}
              <span className="font-normal break-words">{movie.Genre}</span>
            </h3>
            <h3 className="font-bold text-sm">
              Runtime:{" "}
              <span className="font-normal break-words">{movie.Runtime}</span>
            </h3>
            <div className="flex gap-3  ">
              <h3 className="font-bold text-sm">Rating: </h3>
              <Rating
                size="small"
                value={movie.IMDB_Rating / 2}
                precision={0.25}
                sx={{color: "#272829"}}
                readOnly></Rating>
            </div>
          </div>
        </div>
      </CardContent>

      <CardActions>
        <div className="flex items-center justify-between w-full">
          {isSuggested ? (
            <></>
          ) : (
            <Button
              onClick={() => onSuggestedButton(movie.Genre)}
              variant="contained"
              size="medium"
              startIcon={<AssistantIcon />}
              sx={{
                padding: "8px 12px",
                fontSize: "0.70rem",
                backgroundColor: "#272829", // Assuming checkbox uses primary color
                "&:hover": {
                  backgroundColor: "#0D1521", // Darker shade on hover
                },
              }}>
              Get Suggestions
            </Button>
          )}

          <Checkbox
            icon={<BookmarkBorderIcon />}
            checked={isFavorite}
            onChange={onFavoriteToggle}
            checkedIcon={<BookmarkIcon sx={{color: "#272829"}} />}
          />
        </div>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
