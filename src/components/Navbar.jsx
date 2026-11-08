import {Menu} from "lucide-react";

function Navbar(){
    return (
        <header className="navbar">
            <a href="#home" className="logo">
                SM😎
            </a>
            <nav className="desktop-nav">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
               
                <a href="#contact">Contact</a>           
            </nav>

            <button className="menu-button" aria-label="Open menu">
                <Menu size= {30} />

            </button>


        </header>
    );
}

export default Navbar;
