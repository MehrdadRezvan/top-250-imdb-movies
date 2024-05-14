export default function MovieItem({title, poster, year}) {
  return (
    <li className="pr-2 pl-2">
      <img src={poster} />
      <h6>
        {title} ({year})
      </h6>
    </li>
  );
}
