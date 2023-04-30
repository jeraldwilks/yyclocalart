import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
    <footer>
        <p>Copyright © {currentYear} J3K</p>
        <i>Photo by Jessica Theroux</i>
        </footer>
    );
};

export default Footer;