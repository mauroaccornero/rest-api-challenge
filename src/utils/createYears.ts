const createYears = () => {
    const year = new Date().getFullYear();
    const range = 200;

    return Array.from({ length: range }, (x, i) => i).map((y) => year - y);
};

export default createYears