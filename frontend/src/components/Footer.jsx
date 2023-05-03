import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
    <footer>
        <p id="footer">Copyright © {currentYear} J3K</p>
        <i>Feature photo by Jessica Theroux</i>
    </footer>
    );
};

export default Footer;