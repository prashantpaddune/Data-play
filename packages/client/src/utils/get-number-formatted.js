const getNumberFormat = (num) => {
    const decimalPlaces = 4;

    const factor = 10 ** decimalPlaces;
    const truncatedNumber = Math.floor(num * factor) / factor;

    return truncatedNumber;
};

export default getNumberFormat;