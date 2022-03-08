import { useState, useEffect } from 'react'

import db from '../firestore/config';


const useData = ( limit ) => {
  const notesRef = db.collection('/CDfBUVb8geU3Ct5Daxsdn1G23jM2/journal/notes');

  const [docs, setDocs] = useState([]);
  const [pages, setPages] = useState(0);
  const [refDocs, setRefDocs] = useState({
    first: null,
    last: null,
  })

  const getPage = () => {
    notesRef.get().then( snapShot => {
      const numOfDocs = snapShot.docs.length;
      setPages(Math.ceil(numOfDocs / limit));    
    })
  }

  useEffect(() => {
    getPage();
  }, [])


  const getNextDocs = () => {
    notesRef
      .orderBy('title')
      .startAfter(refDocs.last)
      .limit(limit)
      .get().then( snapShot => {
        setRefDocs({
          first: snapShot.docs[0] || null,
          last: snapShot.docs[snapShot.docs.length - 1] || null,
        });
        const data = [];
        snapShot.forEach( snapChild => {
          data.push({id: snapChild.id, ...snapChild.data()})
        });
        setDocs([ ...data ]);
      });
  }

  const getPreviousDocs = () => {
    notesRef
      .orderBy('title')
      .endBefore(refDocs.first)
      .limitToLast(limit)
      .get().then( snapShot => {
        setRefDocs({
          first: snapShot.docs[0] || null,
          last: snapShot.docs[snapShot.docs.length - 1] || null,
        });
        const data = [];
        snapShot.forEach( snapChild => {
          data.push({id: snapChild.id, ...snapChild.data()})
        });
        setDocs([ ...data ]);
      });
  }

  return {
    docs,
    getNextDocs,
    getPreviousDocs,
    pages,
  }
}

export default useData
