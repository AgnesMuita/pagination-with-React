import React,{useState} from "react";
import ReactPaginate from 'react-paginate';
import './App.css';


const NewsCard =(props)=>{
  return (
    <div style={{padding:'20'}}>
      <a href = {props.url}>
        {props.title} by  {props.author}
      </a>
    </div>
  )

}
function App() {
    
  const[hitss, setHits]=useState([]);
  const[dataisLoading, setDataIsLoading] = useState(false);
  const[query,setQuery] = useState('startups');
  const[pageCount, setPageCount] = useState(1);
  const[currentPage, setCurrentPage] = useState(0);

  const handleChange=()=>{
    fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
    .then(res=>res.json())
    .then(body=>{
        console.log(body)
        setHits([...body.hits])
        setPageCount(body.nbPages);
        setDataIsLoading(true)
    })
    .catch(error=>console.error("ERROR",error))
  }

  const handleInput=(event)=>{
    setQuery(event.target.value)
  }

  const handlePageChange=(selectedObject)=>{
      setCurrentPage(selectedObject.selected);
      handleChange();
  }

  return (
      <div style={{paddingTop:'200'}}>
        <input type="text" onChange={handleInput}/>
        <button onClick={handleChange}>Get Data</button>
        {dataisLoading?( 
          hitss.map((item)=>{ 
            // console.log(item)
              return(             
                <NewsCard 
                  comment_text={item.comment_text}
                  story_text={item.story_text}
                  story_url={item.story_url}
                  title={item.title}
                  author={item.author}
                  key={item.objectID}>
                </NewsCard>
              )           
          })
        ):(
        <div></div>
        )}
        {dataisLoading?(
          <ReactPaginate
              pageCount={pageCount}
              pageRange={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'container'}
              previousLinkClassName={'page'}
              breakClassName={'page'}
              nextLinkClassName={'page'}
              pageClassName={'page'}
              disabledClassNae={'disabled'}
              activeClassName={'active'}
          />
        ):(
            <div>Nothing to display</div>
        )}
      </div>
  )
}

export default App;
