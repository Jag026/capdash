//import React, { useState, useEffect } from 'react';

//formats price to return a readable value, takes in an integer
function cryptoFormatter(int) {
    if (int < 1) {
        return int.toFixed(2).slice(1)
    }
    if (int < 999) {
        return int.toFixed(2)
    }
    if (int > 999) {
        const fixedInt = Number(int.toFixed());
        return fixedInt.toLocaleString();
    }
}


export default cryptoFormatter;