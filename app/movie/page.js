import MovieDetails from "../../components/MovieDetails/movieDetails";
import Image from "next/image";
export default function Movie() {
  return (
    <div>
      <nav>
        <Image
          src="/hbo-max-ctr.png"
          width={100}
          height={100}
          alt="logo"
          className="logo"
        />
        <div>
          <p>Movies</p>
          <p>TV show</p>
          <p>Animations</p>
          <p>Upgrade</p>
        </div>
        <Image
          src="/search.png"
          width={30}
          height={30}
          alt="search"
          className="search"
        />
      </nav>
      <MovieDetails />
    </div>
  );
}
