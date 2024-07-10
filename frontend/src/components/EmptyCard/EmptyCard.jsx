const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="mt-10 container mx-auto flex flex-col items-center">
      <img src={imgSrc} alt="empty-note" className="w-[300px] self-center" />
      <p className="w-1/2 text-md font-medium text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
