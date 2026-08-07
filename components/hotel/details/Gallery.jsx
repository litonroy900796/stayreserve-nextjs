const Gallery = ({ gallery = [] }) => {
  const images = gallery?.length ? gallery : [];

  if (!images.length) {
    return null;
  }

  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-4 imageshowCase">
        <img src={images[0]} className="h-[400px] w-full object-cover rounded-lg" alt="Hotel gallery" />

        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
          {images.slice(1, 5).map((image, index) => (
            <img key={index} src={image} className="w-full h-full object-cover rounded-lg" alt={`Hotel gallery ${index + 2}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
