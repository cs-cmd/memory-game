import './styles/Card.css'

export default function Card({name, imageLink, uuid, onClick}) {
  return (
    <div className='card' uuid={uuid} onClick={onClick}>
      <img src={imageLink} alt={`${name} berry image`}/> 
      <h3>{name}</h3>
    </div>
  );
}