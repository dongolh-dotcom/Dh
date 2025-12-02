import React from 'react'
import './style.css'
import Mainc from "./maincontent"
import Header from "./Header"


const page = () => {
  return (
    <>
     
 <h1>
   HELLO 
 </h1>     hello movie
 
 <Header/>
      <Mainc/>
      <Mainc/>
            <section>
	<div className="grid hero">
		<div className="item">
		  
		  
		  
		  </div>
		<div className="item">Item 2</div>
		<div className="item">Item 3</div>
		<div className="item">Item 4</div>
	</div>
</section>

  <div className="bento-grid">
    <div className="bento-card">
      <div className="description-container">
        <div className="icon">📄</div>
        <h3>Save your files</h3>
        <p>We automatically save your files as you type.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
    <div className="bento-card large">
      <div className="description-container">
        <div className="icon">🔍</div>
        <h3>Full text search</h3>
        <p>Search through all your files in one place.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
    <div className="bento-card">
      <div className="description-container">
        <div className="icon">🔗</div>
        <h3>Integrations</h3>
        <p>Supports 100+ integrations and counting.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
    <div className="bento-card calendar">
      <div className="description-container">
        <h3>Calendar</h3>
        <p>Use the calendar to filter your files by date.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
    /* Additional cards to fill space */
    <div className="bento-card">
      <div className="description-container">
        <div className="icon">📝</div>
        <h3>Note taking</h3>
        <p>Quickly jot down notes and ideas.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
    <div className="bento-card">
      <div className="description-container">
        <div className="icon">📊</div>
        <h3>Analytics</h3>
        <p>View detailed analytics of your data.</p>
      </div>
      <div className="cta-container">
        <a href="#">
          Learn more
          <span className="arrow-right-icon">→</span>
        </a>
      </div>
      <div className="overlay"></div>
    </div>
  </div>
      
    </Navbar>
  )
}

export default page