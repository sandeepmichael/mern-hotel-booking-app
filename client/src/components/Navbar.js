import React from 'react'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('currentuser'))

    const logoutHandler = () => {
        localStorage.removeItem('currentuser')
        window.location.href='/login'
       // props.history.push('/login')
    }

  // const shopHandler = () => {
    //   localStorage.removeItem('currentuser')
     //  window.location.href = '/'
 //Name  }



    return (
        <div className='App'>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">Book.Com</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {user ?(<> <div className="dropdown">
  <button  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   {user.name}
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="/profile">Profile</a></li>
    <li><a className="dropdown-item" href="/login" onClick={logoutHandler}>Logout</a></li>
  </ul>
</div></>) : (<>
                
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mx-auto">
                                <a className="nav-link" href="/register">Register</a>
                        <a className="nav-link" href="/login">Login</a>
                    </div>
                </div>
                </>)}
              
            </nav>
        </div>
    )
}

export default Navbar
