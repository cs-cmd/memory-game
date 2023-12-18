import './styles/CardContainer.css'
export default function CardContainer({children}) {
  return (
    <div className='card-container'>
      {children}
    </div>
  )
}