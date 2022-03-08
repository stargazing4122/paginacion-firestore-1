import React,{ useEffect} from 'react'
import useCounter from '../hooks/useCounter';
import useData from '../hooks/useData';
import Notes from './Notes';

const HomeScreen = () => {
  const {docs, getNextDocs, getPreviousDocs, pages} = useData(8);
  const {counter, nextCounter, previousCounter} = useCounter()

  useEffect(() => {
    getNextDocs();
    console.log(docs)
  }, []);

  const handleNextPage = async() => {
    await getNextDocs(); //duda el async, es necesario ?
    nextCounter();
  }

  const handlePreviousPage = () => {
    getPreviousDocs();
    previousCounter();
  }






  return (
    <div>
      <h1> Practicando paginación</h1>
      <div className="buttons-container">
        <button 
          className="btn btn-outline-primary" 
          type="button" 
          onClick={handlePreviousPage}
          disabled={counter===1}
        >
          Anterior
        </button>
        <span>{ counter } de { pages }</span>
        <button 
          className="btn btn-outline-primary" 
          type="button" 
          onClick={handleNextPage}
          disabled={counter===pages}
        >
          Siguiente
        </button>  
      </div>
        {
          docs.length !== 0
            ? ( <Notes docs={docs} /> )
            : ( <div style={{textAlign: 'center'}}>
                  No data
                </div> )
        }
    </div>
  )
}

export default HomeScreen
