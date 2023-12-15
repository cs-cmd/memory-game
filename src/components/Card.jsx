export default function Card({name, imageLink, uuid}) {
  console.log(imageLink);
  return (
    <div className='card' uuid={uuid}>
      <img src={imageLink} alt={`${name} berry image`}/> 
      <h3>{name}</h3>
    </div>
  );
}