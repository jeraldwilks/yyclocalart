import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
    <footer>
        <p id="footer">Copyright © {currentYear} J3K</p>
        <i>Photo credit: Jessica Theroux, Mural: The River Troll by Rich, Jess, and Felix Theroux</i>
    </footer>
    );
};

export default Footer;