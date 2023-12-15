import './styles/CardContainer.css'
export default function CardContainer({children}) {
  return (
    <main className='card-container'>
      {children}
    </main>
  )
}