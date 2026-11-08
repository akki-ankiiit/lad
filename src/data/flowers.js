const posters = {
  "01": "bougainvillea-01.avif",
  "02": "bougainvillea-02.avif",
  "03": "bougainvillea-03.avif",
  "04": "bougainvillea-04.avif",
  "05": "bougainvillea-05.avif",
  "06": "bougainvillea-06.avif",
  "07": "bougainvillea-07.avif",
};

export const flowers = Object.fromEntries(
  Object.entries(posters).map(([id, poster]) => [
    id,
    {
      poster: `/assets/images/${poster}`,
      webm: `/assets/videos/bougainvillea-${id}.webm`,
      mov: `/assets/videos/bougainvillea-${id}.mov`,
    },
  ]),
);
