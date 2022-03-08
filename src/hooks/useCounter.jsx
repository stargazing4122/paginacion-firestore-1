import { useState} from 'react'

const useCounter = () => {
  const [counter, setCounter] = useState(1);

  const nextCounter = () => {
    setCounter( counter + 1 );
  }

  const previousCounter = () => {
    setCounter( counter - 1 );
  }

  return {
    counter,
    nextCounter,  
    previousCounter,  
  }
  
}

export default useCounter
